import { useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./styles/ConsoleOutput.module.css";
import Ansi from "ansi-to-react";
import { Output } from "../script-server/script-server.types";
import clsx from "clsx";

export function ConsoleOutput({ output }: { output: Output | undefined }) {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (output) {
      const newLine = String.fromCharCode(...(output?.data || []));
      setCodeLines((prevLines) => [...prevLines, newLine]);
      setTimeout(() => {
        linesRef.current?.querySelector("code")?.scrollIntoView();
      }, 200);
    }
  }, [output]);

  return (
    <div className={clsx(styles.console)}>
      <pre>
        {codeLines.map((line, i) => {
          // attach the ref to the last line so we can scroll the console
          const ref = i === codeLines.length - 1 ? linesRef : null;
          return (
            <div ref={ref} key={line + i}>
              <Ansi>{line}</Ansi>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
