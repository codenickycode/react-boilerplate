import { ScriptRunner } from "../components/ScriptRunner/ScriptRunner";
import ReactIcon from "../assets/react.svg";
import { ReactNode, forwardRef } from "react";
import { ChecklistItem } from "../components/ChecklistItem";

export function DebugDashboard() {
  return (
    <div className="my-0 mx-auto max-w-7xl p-1">
      <Section title="Bundler Checklist" divide>
        <div className="flex flex-wrap gap-8 justify-evenly text-sm">
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
        </div>
      </Section>
      <Section title="Scripts">
        <div className="grid grid-cols-auto-fill-38rem gap-4">
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
  <span ref={ref} className="text-accent-primary">
    Blue class
  </span>
));
const cssModulesCheck = (element: HTMLElement) => {
  return element.classList.contains("text-accent-primary");
};

const SvgLoaderItem = forwardRef<HTMLElement>((props, ref) => (
  <span className="inline" ref={ref}>
    <ReactIcon className="w-6 h-6 fill-text-primary" />
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
      <div className="py-0 px-4">{children}</div>
      {divide && (
        <div className="my-8 mx-0 border-b-[1px] border-divider-primary" />
      )}
    </>
  );
}
