import { BundlerChecklist } from "./BundlerChecklist/BundlerChecklist";
import { ScriptsSection } from "./ScriptsSection/ScriptsSection";

export function DebugDashboard() {
  return (
    <div className="my-0 mx-auto max-w-7xl p-1">
      <BundlerChecklist />
      <ScriptsSection scripts={["lint", "test", "typecheck", "css", "build"]} />
    </div>
  );
}
