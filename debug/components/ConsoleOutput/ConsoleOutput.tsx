import { useEffect, useState } from "react";
import styles from "./ConsoleOutput.module.css";
import Ansi from "ansi-to-react";
import { Output } from "../../script-server/script-server.types";
import clsx from "clsx";

export function ConsoleOutput({ output }: { output: Output | undefined }) {
  const [rootEl, setRootRef] = useState<HTMLDivElement | null>(null);
  const [codeLines, setCodeLines] = useState<string[]>([]);

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
    <div ref={setRootRef} className={clsx(styles.console)}>
      <pre>
        {codeLines.map((line, i) => {
          return <Ansi key={line + i}>{line}</Ansi>;
        })}
      </pre>
    </div>
  );
}
