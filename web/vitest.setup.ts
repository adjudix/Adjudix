import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

// jest-axe exports toHaveNoViolations already shaped as { toHaveNoViolations: fn },
// so it's spread directly, not re-wrapped in another object.
expect.extend(toHaveNoViolations);
