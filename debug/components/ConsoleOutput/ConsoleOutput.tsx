import { useEffect, useState } from "react";
import Ansi from "ansi-to-react";
import { Output } from "../../script-server/script-server.types";

export function ConsoleOutput({
  output,
  script,
}: {
  output: Output | undefined;
  script: string;
}) {
  const [rootEl, setRootRef] = useState<HTMLDivElement | null>(null);
  const [codeLines, setCodeLines] = useState<string[]>([
    "\n",
    "\n",
    "\n",
    "\n",
    "\n",
    `$ pnpm run ${script} ▋`,
  ]);

  // Add output each time it's received
  useEffect(() => {
    if (output) {
      const newLine = String.fromCharCode(...(output?.data || []));
      setCodeLines((prevLines) => [...prevLines, newLine]);
    }
  }, [output, rootEl]);

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
