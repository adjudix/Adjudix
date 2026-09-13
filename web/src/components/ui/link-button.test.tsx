import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { LinkButton } from "./link-button";

describe("LinkButton", () => {
  it("renders a real <a> with role link, not role button", () => {
    render(
      <LinkButton variant="primary" href="/odr/file">
        File a Dispute
      </LinkButton>
    );
    const el = screen.getByRole("link", { name: "File a Dispute" });
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/odr/file");
  });

  it("applies the requested variant's background token class", () => {
    render(
      <LinkButton variant="ember" href="/dispute-resolution/emergency">
        Emergency Arbitration
      </LinkButton>
    );
    const el = screen.getByRole("link", { name: "Emergency Arbitration" });
    expect(el.className).toContain("bg-ember");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <LinkButton variant="primary" href="/odr/file">
        File a Dispute
      </LinkButton>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
