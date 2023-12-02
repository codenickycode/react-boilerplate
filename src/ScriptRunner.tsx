import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { ScriptStatus } from "../script-server/script-server.types";
import { ConsoleOutput } from "./components/ConsoleOutput";

type ScriptName = "lint" | "test" | "typecheck";

const socketUrl = "ws://localhost:8000";

export function ScriptRunner({ script }: { script: ScriptName }) {
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<ScriptStatus | null>(socketUrl);

  useEffect(() => {
    sendJsonMessage({ script });
  }, [script, sendJsonMessage]);

  const { status, message, output } = lastJsonMessage || {};

  return (
    <div>
      <h3>
        Script: {script} ➡ {message || status}
      </h3>
      <ConsoleOutput output={output} />
    </div>
  );
}
