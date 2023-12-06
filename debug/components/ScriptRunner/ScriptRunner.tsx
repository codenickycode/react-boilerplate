import useWebSocket from "react-use-websocket";
import {
  ScriptStatus,
  ScriptStatusType,
} from "../../script-server/script-server.types";
import { ConsoleOutput } from "../ConsoleOutput/ConsoleOutput";
import { useEffect, useRef } from "react";

const socketUrl = "ws://localhost:8000";

const statusEmoji = (script: string, status?: ScriptStatusType) => {
  if (status === undefined) return "?";
  if (status === "stopped") return "?";
  if (status === "failed") return "❌";
  if (status === "success") return "✅";
  if (script.includes("lint")) return "🧹";
  if (script.includes("test")) return "🧪";
  if (script.includes("type")) return "🔎";
  if (script.includes("build")) return "🛠️";
};

const buttonLabel = (status?: ScriptStatusType) => {
  switch (status) {
    case "running":
      return "stop";
    case "failed":
    case "stopped":
    case "success":
    case undefined:
    default:
      return "run";
  }
};

const buttonIcon = (status?: ScriptStatusType) => {
  switch (status) {
    case "running":
      return "⏹";
    case "failed":
    case "stopped":
    case "success":
    case undefined:
    default:
      return "▶️";
  }
};

export function ScriptRunner({
  script,
  runOnMount,
}: {
  script: string;
  runOnMount: boolean;
}) {
  const runningRef = useRef(false);

  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<ScriptStatus | null>(socketUrl);

  const { status, message, output } = lastJsonMessage || {};

  const toggleScript = () => {
    if (status === "running") {
      sendJsonMessage({ script, command: "stop" });
    } else {
      sendJsonMessage({ script, command: "start" });
    }
  };

  useEffect(() => {
    if (runOnMount && !runningRef.current) {
      runningRef.current = true;
      sendJsonMessage({ script, command: "stop" });
      sendJsonMessage({ script, command: "start" });
    }
  }, [runOnMount, script, sendJsonMessage]);

  if (status !== "running") {
    runningRef.current = false;
  }

  return (
    <div className="min-w-[38rem] flex flex-col items-center justify-center bg-bg-secondary p-4 rounded-md font-mono">
      <div className="w-full flex justify-between items-center pb-3">
        <h4 className="self-start p-0">
          {script}
          {" _ "}
          {statusEmoji(script, status)} {message || status}
        </h4>
        <button
          aria-label={`${buttonLabel(status)} ${script} script`}
          onClick={toggleScript}
        >
          {buttonLabel(status)} {buttonIcon(status)}
        </button>
      </div>
      <ConsoleOutput output={output} script={script} />
    </div>
  );
}
