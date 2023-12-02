import styles from "./DebugDashboard.module.css";
import { ScriptRunner } from "./ScriptRunner";
import ReactIcon from "../assets/react.svg";

interface DebugDashboardProps {
  testCopy: string;
}

export function DebugDashboard(props: DebugDashboardProps) {
  return (
    <>
      <ReactIcon />
      <h1 className={styles.header}>{props.testCopy}</h1>
      <h2>Bundler Checklist</h2>
      <ol>
        <li>{"React Icon (svg loader)"}</li>
        <li>{"Blue header (css modules)"}</li>
        <li>{"Open Sans (font loader)"}</li>
        <li>{`process.env.secret=${process.env.secret} (dot env plugin)`}</li>
      </ol>
      <h2>Package Scripts</h2>
      <ScriptRunner script="lint" />
      <ScriptRunner script="test" />
      <ScriptRunner script="typecheck" />
    </>
  );
}
