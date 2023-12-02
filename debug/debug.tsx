import { DebugDashboard } from "./DebugDashboard/DebugDashboard";
import "./index.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (!container) {
  throw new Error("no root container!");
}
const root = createRoot(container);
root.render(<DebugDashboard />);
