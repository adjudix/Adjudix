import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { FaqAccordion } from "./faq-accordion";

const items = [
  { question: "What is SIAC?", answer: "Not us, a different institution." },
  { question: "What is Adjudix?", answer: "An arbitration and ADR institute." },
];

describe("FaqAccordion", () => {
  it("renders all questions", () => {
    render(<FaqAccordion items={items} />);
    expect(screen.getByText("What is SIAC?")).toBeInTheDocument();
    expect(screen.getByText("What is Adjudix?")).toBeInTheDocument();
  });

  it("hides answers until a question is expanded", () => {
    // Base UI unmounts a closed panel's content by default (keepMounted=false),
    // rather than hiding it in place, so the assertion is absence, not visibility.
    render(<FaqAccordion items={items} />);
    expect(screen.queryByText("An arbitration and ADR institute.")).not.toBeInTheDocument();
  });

  it("reveals the answer when its question is clicked", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);
    await user.click(screen.getByText("What is Adjudix?"));
    expect(screen.getByText("An arbitration and ADR institute.")).toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FaqAccordion items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
