import yargs from "yargs";
import WebSocket from "ws";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { ArgvZ, ScriptRunnerMessageZ } from "./script-server.types";
import {
  cancelledMessage,
  failedMessage,
  runningMessage,
  successMessage,
} from "./messages";

const argv = ArgvZ.parse(
  yargs
    .option("server-port", {
      alias: "serverPort",
      type: "number",
    })
    .option("client-port", {
      alias: "clientPort",
      type: "number",
    })
    .help().argv
);

type ProcessRecord = {
  process: ChildProcessWithoutNullStreams;
};

const processes: Record<string, ProcessRecord> = {};

const wss = new WebSocket.Server({
  port: argv.serverPort,
  verifyClient: (info, callback) => {
    const allowed = info.origin === `http://localhost:${argv.clientPort}`;
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
    if (signal === "SIGINT" || signal === "SIGTERM") {
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
  processRecord.process.kill("SIGINT");
}
