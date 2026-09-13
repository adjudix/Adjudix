// @types/jest-axe only augments Jest's matcher interfaces, not Vitest's.
// This adds toHaveNoViolations to Vitest's own Assertion type.
import "vitest";

interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- required declaration-merging pattern
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- required declaration-merging pattern
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
