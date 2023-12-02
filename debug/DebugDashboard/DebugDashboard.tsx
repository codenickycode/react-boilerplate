import styles from "./DebugDashboard.module.css";
import { ScriptRunner } from "../components/ScriptRunner/ScriptRunner";
import ReactIcon from "../assets/react.svg";
import { ReactNode, forwardRef } from "react";
import { ChecklistItem } from "../components/ChecklistItem";

export function DebugDashboard() {
  return (
    <div className={styles.debugDashboard}>
      <Section title="Bundler Checklist" divide>
        <ol className={styles.bundlerChecklistItems}>
          <ChecklistItem
            Item={FontLoaderItem}
            description="(font loader)"
            check={fontLoaderCheck}
          />
          <ChecklistItem
            Item={CssModulesItem}
            description="(css modules)"
            check={cssModulesCheck}
          ></ChecklistItem>
          <ChecklistItem
            Item={SvgLoaderItem}
            description="(svg loader)"
            check={svgLoaderCheck}
          ></ChecklistItem>
          <ChecklistItem
            Item={ProcessEnvItem}
            description="(dot env plugin)"
            check={processEnvCheck}
          />
        </ol>
      </Section>
      <Section title="Scripts">
        <div className={styles.scriptRunners}>
          <ScriptRunner script="lint" />
          <ScriptRunner script="test" />
          <ScriptRunner script="typecheck" />
          <ScriptRunner script="css" />
          <ScriptRunner script="build" />
        </div>
      </Section>
    </div>
  );
}

const FontLoaderItem = forwardRef<HTMLElement>((props, ref) => (
  <span ref={ref}>Open Sans</span>
));
const fontLoaderCheck = (element: HTMLElement) => {
  return getComputedStyle(element).fontFamily.includes("Open Sans");
};

const CssModulesItem = forwardRef<HTMLElement>((props, ref) => (
  <span ref={ref} className={styles.cssModuleCheck}>
    Blue class
  </span>
));
const cssModulesCheck = (element: HTMLElement) => {
  return element.classList.contains(styles.cssModuleCheck);
};

const SvgLoaderItem = forwardRef<HTMLElement>((props, ref) => (
  <span ref={ref}>
    <ReactIcon className={styles.icon} />
  </span>
));
const svgLoaderCheck = (element: HTMLElement) => {
  return Boolean(element.querySelector("svg"));
};

const ProcessEnvItem = forwardRef<HTMLElement>((props, ref) => (
  <code ref={ref}>process.env.secret</code>
));
const processEnvCheck = () => {
  return Boolean(process.env.secret);
};

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
      {divide && <div className={styles.divider} />}
    </>
  );
}
