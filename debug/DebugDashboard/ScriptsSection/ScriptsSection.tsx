import { useState } from "react";
import { Section } from "../../components/Section";
import { ScriptRunner } from "./ScriptRunner";

interface ScriptsSectionProps {
  scripts: string[];
}

export function ScriptsSection(props: ScriptsSectionProps) {
  const [runAllScripts, setRunAllScripts] = useState(false);
  return (
    <Section title="Scripts">
      <div className="flex justify-end p-4 font-mono">
        <button onClick={() => setRunAllScripts((prev) => !prev)}>
          {runAllScripts ? "stop" : "run"} all {runAllScripts ? "⏹" : "▶️"}
        </button>
      </div>
      <div className="grid grid-cols-auto-fill-38rem gap-4">
        {props.scripts.map((script) => (
          <ScriptRunner
            key={`${script}+${runAllScripts}`}
            script={script}
            runOnMount={runAllScripts}
          />
        ))}
      </div>
    </Section>
  );
}
