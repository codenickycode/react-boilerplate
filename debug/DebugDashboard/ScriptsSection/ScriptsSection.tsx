import { Section } from "../../components/Section";
import { ScriptRunner } from "./ScriptRunner";
import {
  ScriptRunnerCommand,
  ScriptStatus,
} from "../../script-server/script-server.types";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://localhost:8000";

const defaultMessage = {
  script: "unknown",
  status: "unknown",
  numberOfRunningProcesses: 0,
} satisfies ScriptStatus;

interface ScriptsSectionProps {
  scripts: string[];
}

export function ScriptsSection(props: ScriptsSectionProps) {
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<ScriptStatus | null>(socketUrl);

  const sendCommand = (script: string, command: ScriptRunnerCommand) => {
    sendJsonMessage({ script, command });
  };

  const stopAll = () => {
    for (const script of props.scripts) {
      sendJsonMessage({ script, command: "stop" });
    }
  };

  const runAll = () => {
    stopAll();
    for (const script of props.scripts) {
      sendJsonMessage({ script, command: "start" });
    }
  };

  const wsMessage = lastJsonMessage || defaultMessage;
  const allStopped = wsMessage.numberOfRunningProcesses === 0;

  return (
    <Section title="Scripts">
      <div className="flex justify-end p-4 font-mono">
        <button onClick={allStopped ? runAll : stopAll}>
          {allStopped ? "run" : "stop"} all {allStopped ? "▶️" : "⏹"}
        </button>
      </div>
      <div className="grid grid-cols-auto-fill-38rem gap-4">
        {props.scripts.map((script) => (
          <ScriptRunner
            key={script}
            script={script}
            wsMessage={wsMessage}
            sendCommand={sendCommand}
          />
        ))}
      </div>
    </Section>
  );
}
