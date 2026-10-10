import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Dispute Resolution and assured Implementation under one roof/i })
    ).toBeInTheDocument();
  });

  it("renders the primary CTA button", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "File a Dispute" })).toBeInTheDocument();
  });

  it("renders all three pillar cards", () => {
    render(<Home />);
    // Some labels (e.g. "Training Institute") also appear in the panel
    // showcase section below, a deliberate cross-link, not a duplicate bug.
    expect(screen.getByText("Dispute Resolution & Implementation")).toBeInTheDocument();
    expect(screen.getByText("ODR Platform")).toBeInTheDocument();
    expect(screen.getAllByText("Training Institute").length).toBeGreaterThan(0);
  });

  it("renders the comparison table with all three criteria", () => {
    render(<Home />);
    expect(screen.getByText("Choosing the decision-maker")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Enforceability")).toBeInTheDocument();
  });

  it("renders an FAQ section with at least one question", () => {
    render(<Home />);
    expect(screen.getByText(/What is Adjudix/i)).toBeInTheDocument();
  });
});
