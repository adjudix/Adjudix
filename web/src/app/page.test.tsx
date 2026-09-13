import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page shell", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Adjudix Dispute Resolution Institute/i })
    ).toBeInTheDocument();
  });

  it("renders a primary CTA button", () => {
    render(<Home />);
    // Exact match: an FAQ item's own trigger ("How do I file a dispute?") is
    // also a button and would match a loose case-insensitive substring here.
    expect(screen.getByRole("button", { name: "File a Dispute" })).toBeInTheDocument();
  });

  it("renders an FAQ section with at least one question", () => {
    render(<Home />);
    expect(screen.getByText(/What is Adjudix/i)).toBeInTheDocument();
  });
});
