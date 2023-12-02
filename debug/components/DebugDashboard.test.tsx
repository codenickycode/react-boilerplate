import { act, render, screen } from "@testing-library/react";
import { DebugDashboard } from "./DebugDashboard";

test("should render the test copy from props", async () => {
  await act(async () => render(<DebugDashboard testCopy="test!" />));
  expect(screen.getByText("test!")).toBeInTheDocument();
});
