import { useEffect, useState } from "react";
import {
  ScriptRunnerCommand,
  ScriptStatus,
  ScriptStatusType,
} from "../../script-server/script-server.types";
import { ConsoleOutput } from "./ConsoleOutput";

interface ScriptRunnerProps {
  script: string;
  wsMessage: ScriptStatus;
  sendCommand: (script: string, command: ScriptRunnerCommand) => void;
}

export function ScriptRunner(props: ScriptRunnerProps) {
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>(
    {} as ScriptStatus
  );
  useEffect(() => {
    if (props.script !== props.wsMessage.script) {
      return;
    }
    setScriptStatus(props.wsMessage);
  }, [props.script, props.wsMessage, scriptStatus.status]);

  const toggleScript = () => {
    if (scriptStatus.status === "running") {
      props.sendCommand(props.script, "stop");
    } else {
      props.sendCommand(props.script, "start");
    }
  };

  return (
    <div className="min-w-[38rem] flex flex-col items-center justify-center bg-bg-secondary p-4 rounded-md font-mono">
      <div className="w-full flex justify-between items-center pb-3">
        <h4 className="self-start p-0">
          {props.script}
          {" _ "}
          {statusEmoji(props.script, scriptStatus.status)}{" "}
          {scriptStatus.message || scriptStatus.status}
        </h4>
        <button
          aria-label={`${buttonLabel(scriptStatus.status)} ${
            props.script
          } script`}
          onClick={toggleScript}
        >
          {buttonLabel(scriptStatus.status)} {buttonIcon(scriptStatus.status)}
        </button>
      </div>
      <ConsoleOutput output={scriptStatus.output} script={props.script} />
    </div>
  );
}

const statusEmoji = (script: string, status?: ScriptStatusType) => {
  if (status === "cancelling") return "🚫";
  if (status === "cancelled") return "𝘅";
  if (status === "failed") return "❌";
  if (status === "success") return "✅";
  if (status === undefined) return "?";
  if (script.includes("lint")) return "🧹";
  if (script.includes("test")) return "🧪";
  if (script.includes("type")) return "🔎";
  if (script.includes("build")) return "🛠️";
  return "👾";
};

const buttonLabel = (status?: ScriptStatusType) => {
  switch (status) {
    case "running":
    case "cancelling":
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
    case "cancelling":
      return "⏹";
    case "failed":
    case "cancelled":
    case "success":
    case undefined:
    default:
      return "▶️";
  }
};
