import { useEffect, useState } from "react";
import {
  ScriptRunnerCommand,
  ScriptStatus,
  ScriptStatusType,
} from "../../script-server/script-server.types";
import { ConsoleOutput } from "./ConsoleOutput";

type ExtendedScriptStatusType = ScriptStatusType | "cancelling";

interface ExtendedScriptStatus extends Omit<ScriptStatus, "status"> {
  status: ExtendedScriptStatusType;
}

interface ScriptRunnerProps {
  script: string;
  wsMessage: ScriptStatus;
  sendCommand: (script: string, command: ScriptRunnerCommand) => void;
}

export function ScriptRunner(props: ScriptRunnerProps) {
  const [scriptStatus, setScriptStatus] = useState<ExtendedScriptStatus>(
    {} as ScriptStatus
  );
  useEffect(() => {
    if (props.script !== props.wsMessage.script) {
      return;
    }
    if (
      scriptStatus.status === "cancelling" &&
      props.wsMessage.status === "running"
    ) {
      // ignore updates sneaking through while cancelling
      return;
    }
    setScriptStatus(props.wsMessage);
  }, [props.script, props.wsMessage, scriptStatus.status]);

  const toggleScript = () => {
    if (scriptStatus.status === "running") {
      setScriptStatus((prev) => ({
        ...prev,
        // it sometimes takes time to kill the process
        status: "cancelling",
      }));
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

const statusEmoji = (script: string, status?: ExtendedScriptStatusType) => {
  if (status === "cancelling") return "🚫";
  if (status === "cancelled") return "𝘅";
  if (status === "failed") return "❌";
  if (status === "success") return "✅";
  if (status === undefined) return "?";
  if (script.includes("lint")) return "🧹";
  if (script.includes("test")) return "🧪";
  if (script.includes("type")) return "🔎";
  if (script.includes("build")) return "🛠️";
};

const buttonLabel = (status?: ExtendedScriptStatusType) => {
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

const buttonIcon = (status?: ExtendedScriptStatusType) => {
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
