import styles from "./styles/DebugDashboard.module.css";
import { ScriptRunner } from "./ScriptRunner";
import ReactIcon from "../assets/react.svg";
import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
  useRef,
  useState,
} from "react";

export function DebugDashboard() {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <div className={styles.debugDashboard}>
      <Section title="Bundler Checklist" divide>
        <ol className={styles.bundlerChecklistItems}>
          <BundlerChecklistItem
            Item={FontLoaderItem}
            description="(font loader)"
            check={fontLoaderCheck}
          />
          <BundlerChecklistItem
            Item={CssModulesItem}
            description="(css modules)"
            check={cssModulesCheck}
          ></BundlerChecklistItem>
          <BundlerChecklistItem
            Item={SvgLoaderItem}
            description="(svg loader)"
            check={svgLoaderCheck}
          ></BundlerChecklistItem>
          <BundlerChecklistItem
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
const processEnvCheck = (element: HTMLElement) => {
  return Boolean(process.env.secret);
};

function BundlerChecklistItem({
  Item,
  description,
  check,
  className,
}: {
  Item: ForwardRefExoticComponent<RefAttributes<HTMLElement>>;
  description: string;
  check: (ref: HTMLElement) => boolean;
  className?: string;
}) {
  const [element, setRef] = useState<HTMLElement | null>(null);
  const status = element === null ? "⏳" : check(element) ? "✅" : "❌";
  return (
    <li className={className}>
      <Item ref={setRef} /> {" _ "} {status}
      <br />
      <span className={styles.bundlerChecklistItemSub}>{description}</span>
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
