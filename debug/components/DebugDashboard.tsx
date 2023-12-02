import styles from "./styles/DebugDashboard.module.css";
import { ScriptRunner } from "./ScriptRunner";
import ReactIcon from "../assets/react.svg";

export function DebugDashboard() {
  console.log(styles);
  return (
    <div className={styles.debugDashboard}>
      <h2>Bundler Checklist</h2>
      <ol>
        <li>{"Open Sans (font loader)"}</li>
        <li className={styles.cssModuleCheck}>{"Blue class (css modules)"}</li>
        <li>
          <ReactIcon className={styles.icon} />
          {" (svg loader)"}
        </li>
        <li>{`process.env.secret=${process.env.secret} (dot env plugin)`}</li>
      </ol>
      <h2>Scripts</h2>
      <ScriptRunner script="lint" />
      <ScriptRunner script="test" />
      <ScriptRunner script="typecheck" />
    </div>
  );
}
