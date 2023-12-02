import styles from "./styles/DebugDashboard.module.css";
import { ScriptRunner } from "./ScriptRunner";
import ReactIcon from "../assets/react.svg";
import { ReactNode } from "react";

export function DebugDashboard() {
  return (
    <div className={styles.debugDashboard}>
      <Section title="Bundler Checklist" divide>
        <ol className={styles.bundlerChecklistItems}>
          <BundlerChecklistItem item="Open Sans" description="(font loader)" />
          <BundlerChecklistItem
            className={styles.cssModuleCheck}
            item="Blue class"
            description="(css modules)"
          ></BundlerChecklistItem>
          <BundlerChecklistItem
            item={<ReactIcon className={styles.icon} />}
            description="(svg loader)"
          ></BundlerChecklistItem>
          <BundlerChecklistItem
            item={`process.env.secret=${process.env.secret}`}
            description="(dot env plugin)"
          />
        </ol>
      </Section>
      <Section title="Scripts">
        <div className={styles.scriptRunners}>
          <ScriptRunner script="lint" />
          <ScriptRunner script="test" />
          <ScriptRunner script="typecheck" />
        </div>
      </Section>
    </div>
  );
}

function BundlerChecklistItem({
  item,
  description,
  className,
}: {
  item: ReactNode;
  description: string;
  className?: string;
}) {
  return (
    <li className={className}>
      {item}
      <br />
      {description}
    </li>
  );
}

function Divider() {
  return <div className={styles.divider} />;
}

function Section({
  title,
  children,
  divide,
}: {
  title: string;
  children: ReactNode;
  divide?: boolean;
}) {
  return (
    <>
      <h3>{title}</h3>
      <div className={styles.sectionChildren}>{children}</div>
      {divide && <Divider />}
    </>
  );
}
