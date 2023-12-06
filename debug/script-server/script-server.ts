import WebSocket from "ws";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { Output, ScriptStatus } from "./script-server.types";

type ProcessRecord = {
  process: ChildProcessWithoutNullStreams;
  cancelled?: boolean;
};

const processes: Record<string, ProcessRecord> = {};

const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", async (message: string) => {
    const { command, script } = JSON.parse(message);
    switch (command) {
      case "start":
        if (processes[script]) {
          console.warn("script already running");
          return;
        }
        const scriptProcess = spawn("pnpm", [script]);
        processes[script] = { process: scriptProcess };
        sendRunning(ws, script);
        scriptProcess.stdout.on("data", (data) => {
          sendRunning(ws, script, data);
        });
        scriptProcess.stderr.on("data", (data) => {
          sendRunning(ws, script, data);
        });
        scriptProcess.on("close", (code) => {
          if (code === 0) {
            sendSuccess(ws, script);
          } else if (processes[script].cancelled) {
            sendCancelled(ws, script);
          } else {
            sendFailed(ws, script, code ?? 1);
          }
          delete processes[script];
        });
        break;
      case "stop":
        const processRecord = processes[script];
        if (!processRecord) {
          console.warn("script already stopped");
          break;
        }
        processRecord.cancelled = true;
        processRecord.process.kill();
        break;
      default:
        throw new Error("command not implemented");
    }
  });
});

function sendStatus(ws: WebSocket, status: ScriptStatus) {
  ws.send(JSON.stringify(status));
}

function sendRunning(ws: WebSocket, script: string, data?: Output) {
  sendStatus(ws, {
    script,
    status: "running",
    output: data,
  });
}

function sendSuccess(ws: WebSocket, script: string) {
  sendStatus(ws, {
    script,
    status: "success",
    message: "Success!",
  });
}

function sendCancelled(ws: WebSocket, script: string) {
  sendStatus(ws, {
    script,
    status: "stopped",
    message: "cancelled",
  });
}

function sendFailed(ws: WebSocket, script: string, code: number) {
  sendStatus(ws, {
    script,
    status: "failed",
    message: "Code: " + code,
  });
}
