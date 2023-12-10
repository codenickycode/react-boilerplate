import { forwardRef } from "react";
import { Section } from "../../components/Section";
import { ChecklistItem } from "./ChecklistItem";
import ReactIcon from "../../assets/react.svg";

export function BundlerChecklist() {
  return (
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
