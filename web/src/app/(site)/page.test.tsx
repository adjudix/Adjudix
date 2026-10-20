import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// No database in tests: the page shows the content written in code.
vi.mock("@/db", () => ({ databaseConfigured: () => false, db: () => null, schema: {} }));
const { default: Page } = await import("./page");
// Home is an async server component behind the console's page wrapper;
// render what the wrapped page resolves to.
const Home = async () => {
  const wrapped = (await Page({})) as React.ReactElement<Record<string, unknown>>;
  const original = wrapped.type as (props: unknown) => Promise<React.ReactElement>;
  return render(await original(wrapped.props));
};

describe("Home page", () => {
  it("renders the hero headline", async () => {
    await Home();
    expect(
      screen.getByRole("heading", { name: /Dispute Resolution and assured Implementation under one roof/i })
    ).toBeInTheDocument();
  });

  it("renders the primary CTA button", async () => {
    await Home();
    expect(screen.getByRole("link", { name: "File a Dispute" })).toBeInTheDocument();
  });

  it("renders all three pillar cards", async () => {
    await Home();
    // Some labels (e.g. "Training Institute") also appear in the panel
    // showcase section below, a deliberate cross-link, not a duplicate bug.
    expect(screen.getByText("Dispute Resolution & Implementation")).toBeInTheDocument();
    expect(screen.getByText("ODR Platform")).toBeInTheDocument();
    expect(screen.getAllByText("Training Institute").length).toBeGreaterThan(0);
  });

  it("renders the comparison table with all three criteria", async () => {
    await Home();
    expect(screen.getByText("Choosing the decision-maker")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Enforceability")).toBeInTheDocument();
  });

  it("renders an FAQ section with at least one question", async () => {
    await Home();
    expect(screen.getByText(/What is Adjudix/i)).toBeInTheDocument();
  });
});
