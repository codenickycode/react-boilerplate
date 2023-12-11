import { useEffect, useState } from "react";
import Ansi from "ansi-to-react";
import {
  Output,
  ScriptStatusType,
} from "../../script-server/script-server.types";

interface ConsoleOutputProps {
  output: Output | undefined;
  script: string;
  status: ScriptStatusType;
}

export function ConsoleOutput(props: ConsoleOutputProps) {
  const promptLine = `$ pnpm run ${props.script} ▋`;
  const [rootEl, setRootRef] = useState<HTMLDivElement | null>(null);
  const [codeLines, setCodeLines] = useState<string[]>([
    "\n",
    "\n",
    "\n",
    "\n",
  ]);

  // Add output each time it's received
  useEffect(() => {
    if (props.output) {
      const newLine = String.fromCharCode(...(props.output?.data || []));
      setCodeLines((prevLines) => [...prevLines, newLine]);
    }
  }, [props.output, rootEl]);

  // add prompt after runs
  useEffect(() => {
    if (props.status !== "running" && props.status !== "cancelling") {
      setCodeLines((prev) => [...prev, "\n", promptLine]);
    }
  }, [promptLine, props.status]);

  // Keep the console scrolled to the bottom
  useEffect(() => {
    const top = rootEl?.scrollHeight ?? 0;
    rootEl?.scrollTo({ top });
  }, [codeLines.length, rootEl]);

  return (
    <div
      ref={setRootRef}
      className="w-[98%] border border-divider-primary p-card h-40 overflow-auto bg-code-background text-code-text"
    >
      <pre>
        {codeLines.map((line, i) => {
          return <Ansi key={line + i}>{line}</Ansi>;
        })}
      </pre>
    </div>
  );
}
