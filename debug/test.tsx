import { act, render, screen } from "@testing-library/react";

function TestComponent() {
  return "test!";
}

test("should render the test copy from props", async () => {
  await act(async () => render(<TestComponent />));
  expect(screen.getByText("test!")).toBeInTheDocument();
});
