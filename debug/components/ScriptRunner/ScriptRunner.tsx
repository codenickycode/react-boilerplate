import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { ScriptStatus } from "../../script-server/script-server.types";
import { ConsoleOutput } from "../ConsoleOutput/ConsoleOutput";

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

  const { status, message, output } = lastJsonMessage || {};
  const emoji = statusEmoji(script, status);
  const statusMessage = message || status;

  return (
    <div className="min-w-[38rem] flex flex-col items-center justify-center bg-bg-secondary p-4 rounded-md">
      <h4 className="self-start pb-3">
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
