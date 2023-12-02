import { useEffect, useState } from "react";
import styles from "./styles/ConsoleOutput.module.css";
import Ansi from "ansi-to-react";
import { Output } from "../script-server/script-server.types";

const DISPLAY_LAST = 2;

export function ConsoleOutput({ output }: { output: Output | undefined }) {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (output) {
      const newLine = String.fromCharCode(...(output?.data || []));
      setCodeLines((prevLines) => [...prevLines, newLine]);
    }
  }, [output]);

  return (
    <div className={styles.console}>
      <div className={styles.content}>
        <div className={styles.lines}>
          <pre>
            {codeLines.map((line, i) => (
              <Ansi key={line + i}>{line}</Ansi>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
