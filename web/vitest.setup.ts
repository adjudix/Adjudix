import "@testing-library/jest-dom/vitest";
import { expect, vi } from "vitest";
import { toHaveNoViolations } from "jest-axe";

// jest-axe exports toHaveNoViolations already shaped as { toHaveNoViolations: fn },
// so it's spread directly, not re-wrapped in another object.
expect.extend(toHaveNoViolations);

// Client components such as AudienceFinder call useRouter(), which throws
// outside a mounted App Router. Tests render pages in isolation, so stub the
// router while keeping the rest of next/navigation real.
vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => "/",
  };
});
