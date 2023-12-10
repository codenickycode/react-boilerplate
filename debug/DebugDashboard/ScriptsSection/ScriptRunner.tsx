import useWebSocket from "react-use-websocket";
import {
  ScriptStatus,
  ScriptStatusType,
} from "../../script-server/script-server.types";
import { ConsoleOutput } from "./ConsoleOutput";
import { useEffect, useRef } from "react";

const socketUrl = "ws://localhost:8000";

interface ScriptRunnerProps {
  script: string;
  runOnMount: boolean;
}

export function ScriptRunner(props: ScriptRunnerProps) {
  const runningRef = useRef(false);

  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<ScriptStatus | null>(socketUrl);

  const { status, message, output } = lastJsonMessage || {};

  const toggleScript = () => {
    if (status === "running") {
      sendJsonMessage({ script: props.script, command: "stop" });
    } else {
      sendJsonMessage({ script: props.script, command: "start" });
    }
  };

  useEffect(() => {
    if (props.runOnMount && !runningRef.current) {
      runningRef.current = true;
      sendJsonMessage({ script: props.script, command: "stop" });
      sendJsonMessage({ script: props.script, command: "start" });
    }
  }, [props.runOnMount, props.script, sendJsonMessage]);

  if (status !== "running") {
    runningRef.current = false;
  }

  return (
    <div className="min-w-[38rem] flex flex-col items-center justify-center bg-bg-secondary p-4 rounded-md font-mono">
      <div className="w-full flex justify-between items-center pb-3">
        <h4 className="self-start p-0">
          {props.script}
          {" _ "}
          {statusEmoji(props.script, status)} {message || status}
        </h4>
        <button
          aria-label={`${buttonLabel(status)} ${props.script} script`}
          onClick={toggleScript}
        >
          {buttonLabel(status)} {buttonIcon(status)}
        </button>
      </div>
      <ConsoleOutput output={output} script={props.script} />
    </div>
  );
}

const statusEmoji = (script: string, status?: ScriptStatusType) => {
  if (status === undefined) return "?";
  if (status === "cancelled") return "𝘅";
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
    case "cancelled":
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
    case "cancelled":
    case "success":
    case undefined:
    default:
      return "▶️";
  }
};
