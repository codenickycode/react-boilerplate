import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { ScriptStatus } from "../script-server/script-server.types";
import { ConsoleOutput } from "./ConsoleOutput";
import styles from "./styles/ScriptRunner.module.css";

type ScriptName = "lint" | "test" | "typecheck";

const socketUrl = "ws://localhost:8000";

const emoji: Record<ScriptName, string> = {
  lint: "🧹",
  test: "🧪",
  typecheck: "🔎",
};

export function ScriptRunner({ script }: { script: ScriptName }) {
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<ScriptStatus | null>(socketUrl);

  useEffect(() => {
    sendJsonMessage({ script });
  }, [script, sendJsonMessage]);

  const { status, message, output } = lastJsonMessage || {};

  return (
    <div className={styles.scriptRunner}>
      <h3>
        {emoji[script]}
        {"  "}
        {script} ➡ {message || status}
      </h3>
      <ConsoleOutput output={output} />
    </div>
  );
}
