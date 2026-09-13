import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "./button";

describe("Button", () => {
  it("renders the primary variant with the gold accent token class", () => {
    render(<Button variant="primary">File a Dispute</Button>);
    const btn = screen.getByRole("button", { name: "File a Dispute" });
    expect(btn.className).toContain("bg-primary");
  });

  it("renders the ember variant with the ember token class", () => {
    render(<Button variant="ember">Emergency Arbitration</Button>);
    const btn = screen.getByRole("button", { name: "Emergency Arbitration" });
    expect(btn.className).toContain("bg-ember");
  });

  it("shows a loading state and disables the button", async () => {
    render(<Button loading>Submit</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("fires onClick when enabled", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(clicked).toBe(true);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button variant="primary">Apply Now</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
