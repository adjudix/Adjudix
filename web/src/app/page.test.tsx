import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Arbitration, mediation, and ADR under one roof/i })
    ).toBeInTheDocument();
  });

  it("renders the primary CTA button", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "File a Dispute" })).toBeInTheDocument();
  });

  it("renders all three pillar cards", () => {
    render(<Home />);
    expect(screen.getByText("Dispute Resolution")).toBeInTheDocument();
    expect(screen.getByText("ODR Platform")).toBeInTheDocument();
    expect(screen.getByText("Training Institute")).toBeInTheDocument();
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
