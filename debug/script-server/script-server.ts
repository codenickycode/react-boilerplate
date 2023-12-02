import WebSocket from "ws";
import { spawn } from "child_process";
import { ScriptStatus } from "./script-server.types";

const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", async (message: string) => {
    const { script } = JSON.parse(message);
    const scriptProcess = spawn("pnpm", [script]);
    const sendStatus = (status: ScriptStatus) =>
      ws.send(JSON.stringify(status));

    sendStatus({
      script,
      status: "running",
    });

    scriptProcess.stdout.on("data", (data) => {
      sendStatus({
        script,
        status: "running",
        output: data,
      });
    });

    scriptProcess.stderr.on("data", (data) => {
      sendStatus({
        script,
        status: "running",
        output: data,
      });
    });

    scriptProcess.on("close", (code) => {
      if (code !== 0) {
        sendStatus({
          script,
          status: "failed",
          message: "Code: " + code,
        });
      } else {
        sendStatus({
          script,
          status: "success",
          message: "Success!",
        });
      }
    });
  });
});
