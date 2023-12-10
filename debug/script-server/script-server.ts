import WebSocket from "ws";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { ScriptRunnerMessageZ } from "./script-server.types";
import {
  cancelledMessage,
  failedMessage,
  runningMessage,
  successMessage,
} from "./messages";

const SERVER_PORT = 8000;
const CLIENT_PORT = 3003;

type ProcessRecord = {
  process: ChildProcessWithoutNullStreams;
};

const processes: Record<string, ProcessRecord> = {};

const wss = new WebSocket.Server({
  port: SERVER_PORT,
  verifyClient: (info, callback) => {
    const allowed = info.origin === `http://localhost:${CLIENT_PORT}`;
    callback(allowed);
  },
});

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", async (message: string) => {
    const { command, script } = ScriptRunnerMessageZ.parse(JSON.parse(message));
    if (command === "start") {
      startScript(ws, script);
    }
    if (command === "stop") {
      stopScript(script);
    }
  });
});

function startScript(ws: WebSocket, script: string) {
  if (processes[script]) {
    console.warn("script already running");
    return;
  }

  const scriptProcess = spawn("pnpm", [script]);
  processes[script] = { process: scriptProcess };

  ws.send(runningMessage(script));

  scriptProcess.stdout.on("data", (data) => {
    ws.send(runningMessage(script, data));
  });

  scriptProcess.stderr.on("data", (data) => {
    ws.send(runningMessage(script, data));
  });

  scriptProcess.on("close", (code, signal) => {
    if (signal === "SIGINT") {
      ws.send(cancelledMessage(script));
    } else if (code === 0) {
      ws.send(successMessage(script));
    } else {
      ws.send(failedMessage(script, code ?? 1));
    }
    delete processes[script];
  });
}

function stopScript(script: string) {
  const processRecord = processes[script];
  if (!processRecord) {
    console.warn("script already stopped");
    return;
  }
  processRecord.process.kill("SIGINT");
}
