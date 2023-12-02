import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { ScriptStatus } from "../../script-server/script-server.types";
import { ConsoleOutput } from "../ConsoleOutput/ConsoleOutput";
import styles from "./ScriptRunner.module.css";

type ScriptName = "build" | "css" | "lint" | "test" | "typecheck";

const socketUrl = "ws://localhost:8000";

const statusEmoji = (script: ScriptName, status?: ScriptStatus["status"]) => {
  if (status === undefined) return "?";
  if (status === "failed") return "❌";
  if (status === "success") return "✅";
  if (script === "lint") return "🧹";
  if (script === "test") return "🧪";
  // typecheck
  return "🔎";
};

export function ScriptRunner({ script }: { script: ScriptName }) {
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<ScriptStatus | null>(socketUrl);

  useEffect(() => {
    sendJsonMessage({ script });
  }, [script, sendJsonMessage]);

  const { status, message, output } = lastJsonMessage || {};
  const emoji = statusEmoji(script, status);
  const statusMessage = message || status;

  return (
    <div className={styles.scriptRunner}>
      <h4>
        <pre>
          <code>
            {script}
            {" _ "}
            {emoji} {statusMessage}
          </code>
        </pre>
      </h4>
      <ConsoleOutput output={output} />
    </div>
  );
}
