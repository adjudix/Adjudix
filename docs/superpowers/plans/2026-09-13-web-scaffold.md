# Adjudix Web Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a working Next.js + TypeScript + Tailwind v4 project in `web/`, with Adjudix's design tokens wired in from `design/color-system.md` and `design/typography.md`, shadcn/ui installed, a testing pipeline in place, and two fully tested foundational components (Button, Accordion) built to the exact specs in `planning/components.md` — proven working together on a minimal Home page shell.

**Architecture:** The Next.js app lives in `web/`, separate from the existing docs-only project root (`research/`, `planning/`, `design/`, `build/`). Design tokens become CSS custom properties inside Tailwind v4's `@theme` block in `web/src/app/globals.css` — no `tailwind.config.js`, this is the CSS-first v4 approach. Components are built on shadcn/ui (Radix underneath), customized to Adjudix's variant/state requirements, under `web/src/components/ui/`. Every component ships with a colocated test file using Vitest + React Testing Library + jest-axe.

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS v4, shadcn/ui, Vitest, @testing-library/react, jest-axe, ESLint.

---

## Scope note

This plan covers Phase 8 (project scaffolding) from `build/implementation-plan.md`, narrowed to a provable first vertical slice: the project boots, tokens are real, and two components (Button, Accordion) are built and tested to spec. It deliberately does **not** cover the full component library from `planning/components.md` — each remaining component group (Navigation, Forms, Directory/Filtering, etc.) gets its own plan once this foundation is proven, per the writing-plans scope-check rule against bundling multiple subsystems into one plan.

## Task 1: Initialize the Next.js project

**Files:**
- Create: `web/` (entire scaffolded project)

- [ ] **Step 1: Scaffold the app**

Run:
```bash
cd "E:/IT Company/GIGS/ADJUDIX"
npx create-next-app@latest web --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --use-npm --no-turbopack
```
Expected: a `web/` directory is created containing `package.json`, `src/app/`, `tsconfig.json`, `next.config.ts`, and (Tailwind v4) `src/app/globals.css` already containing `@import "tailwindcss";` with no separate `tailwind.config.js` file generated.

- [ ] **Step 2: Verify the Tailwind version installed is v4**

Run: `cd web && npm ls tailwindcss`
Expected output contains `tailwindcss@4.x.x`. If it installed v3 instead (older `create-next-app` default), run `npm install tailwindcss@latest @tailwindcss/postcss@latest` inside `web/` and confirm `globals.css` uses `@import "tailwindcss";` (v4 syntax) rather than the v3 `@tailwind base; @tailwind components; @tailwind utilities;` directives — replace those three lines with the single v4 import if present.

- [ ] **Step 3: Verify the dev server boots**

Run: `cd web && npm run dev` (then stop it with Ctrl+C once confirmed)
Expected: console output showing `Ready in <N>ms` and `Local: http://localhost:3000` with no errors.

- [ ] **Step 4: Commit**

```bash
cd "E:/IT Company/GIGS/ADJUDIX"
git init
git add web/ .gitignore 2>/dev/null || git add web/
git commit -m "chore: scaffold Next.js app in web/"
```
Expected: `git init` reports `Initialized empty Git repository`; the commit succeeds and includes the full `web/` tree (confirm `web/node_modules` is NOT included — `create-next-app` generates a `.gitignore` inside `web/` that excludes it, but since we're committing from the parent root, run `git status` first and verify `node_modules` does not appear in the file list before committing).

## Task 2: Install and initialize shadcn/ui

**Files:**
- Create: `web/components.json`
- Modify: `web/src/app/globals.css`

- [ ] **Step 1: Check the current CLI's init flags before running it**

Run: `cd web && npx shadcn@latest init --help`
Expected: a help listing showing available flags (e.g. `-d, --defaults`, `-y, --yes`, `-b, --base-color`). Note the exact current flag names from this output — CLI flags occasionally change between versions, so this step exists specifically to catch that before the next step fails.

- [ ] **Step 2: Run init non-interactively**

Run: `npx shadcn@latest init -d -y --base-color slate` (adjust flags to match what Step 1's `--help` actually showed, if different)
Expected: `web/components.json` is created, and `web/src/app/globals.css` gains a `@theme inline` block (or equivalent CSS variable block, depending on CLI version) defining shadcn's default color variables (`--background`, `--foreground`, etc.) plus a `cn()` utility added at `web/src/lib/utils.ts`.

- [ ] **Step 3: Verify the utils file exists**

Run: `cat web/src/lib/utils.ts` (or `Get-Content web/src/lib/utils.ts` on PowerShell)
Expected: a file exporting a `cn` function that merges `clsx` and `tailwind-merge`.

- [ ] **Step 4: Commit**

```bash
git add web/components.json web/src/app/globals.css web/src/lib/utils.ts web/package.json web/package-lock.json
git commit -m "chore: initialize shadcn/ui"
```

## Task 3: Wire Adjudix design tokens into the Tailwind theme

**Files:**
- Modify: `web/src/app/globals.css`

- [ ] **Step 1: Add Adjudix's brand tokens to the `@theme` block**

Open `web/src/app/globals.css`. After the existing `@theme` (or `@theme inline`) block that shadcn's init added, append a second `@theme` block with Adjudix's palette from `design/color-system.md`:

```css
@theme {
  --color-navy-950: #0A1526;
  --color-navy-900: #0F1F3D;
  --color-navy-800: #152A4E;
  --color-navy-700: #1D3A66;
  --color-navy-600: #2A4D82;
  --color-navy-500: #3D659E;
  --color-navy-100: #E4EAF3;
  --color-navy-50: #F4F7FB;

  --color-gold-700: #8A6A1D;
  --color-gold-600: #A87F22;
  --color-gold-500: #C9962B;
  --color-gold-100: #F5E9CE;

  --color-crimson-700: #8F0E24;
  --color-crimson-600: #A81029;
  --color-crimson-500: #C41230;

  --color-success-600: #1E7A45;
  --color-success-100: #E3F5EA;
  --color-warning-600: #B4740A;
  --color-warning-100: #FBEEDA;
  --color-error-600: #D0342C;
  --color-error-100: #FBE4E2;
  --color-info-600: #205A9E;
  --color-info-100: #E6EEF8;

  --color-ink-900: #131722;
  --color-ink-700: #3A4152;
  --color-ink-500: #6B7280;
  --color-ink-300: #C5CAD3;
  --color-ink-100: #EDEFF3;

  --font-serif: "Source Serif 4", Georgia, "Times New Roman", serif;
  --font-sans: "IBM Plex Sans", -apple-system, "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", "JetBrains Mono", monospace;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```

This makes utilities like `bg-navy-800`, `text-ink-700`, `font-serif`, `rounded-md` available immediately (Tailwind v4 auto-generates utilities from `@theme` variables — no separate config mapping needed).

- [ ] **Step 2: Add the Google Fonts import**

At the very top of `web/src/app/globals.css`, before `@import "tailwindcss";`, add:

```css
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

- [ ] **Step 3: Verify the tokens compile**

Create a temporary test file `web/src/app/token-check/page.tsx`:

```tsx
export default function TokenCheck() {
  return (
    <div className="bg-navy-800 text-white p-8 font-serif text-3xl">
      Token check: navy-800 background, serif heading
    </div>
  );
}
```

Run: `npm run dev`, then visit `http://localhost:3000/token-check` in a browser (or use the `run` skill / `claude-in-chrome` to screenshot it).
Expected: a dark navy box with white serif text rendered — confirms the custom tokens are live Tailwind utilities, not silently ignored.

- [ ] **Step 4: Delete the temporary test route**

Run: `rm -rf web/src/app/token-check` (or `Remove-Item -Recurse -Force web/src/app/token-check` on PowerShell)

- [ ] **Step 5: Commit**

```bash
git add web/src/app/globals.css
git commit -m "feat: wire Adjudix design tokens into Tailwind v4 theme"
```

## Task 4: Set up the testing pipeline

**Files:**
- Create: `web/vitest.config.ts`
- Create: `web/vitest.setup.ts`
- Modify: `web/package.json`

- [ ] **Step 1: Install test dependencies**

Run:
```bash
cd web
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe @types/jest-axe
```
Expected: all packages install without error; `web/package.json` `devDependencies` now lists each of them.

- [ ] **Step 2: Write the Vitest config**

Create `web/vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 3: Write the setup file**

Create `web/vitest.setup.ts`:

```typescript
import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend({ toHaveNoViolations });
```

- [ ] **Step 4: Add the test script**

Modify `web/package.json` — in the `"scripts"` object, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a smoke test to confirm the pipeline works**

Create `web/src/app/smoke.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Hello() {
  return <p>hello adjudix</p>;
}

describe("test pipeline smoke test", () => {
  it("renders and finds text", () => {
    render(<Hello />);
    expect(screen.getByText("hello adjudix")).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it and verify it passes**

Run: `cd web && npm test`
Expected: `1 passed` in the output, exit code 0.

- [ ] **Step 7: Delete the smoke test**

Run: `rm web/src/app/smoke.test.tsx` (or `Remove-Item web/src/app/smoke.test.tsx` on PowerShell)

- [ ] **Step 8: Commit**

```bash
git add web/package.json web/package-lock.json web/vitest.config.ts web/vitest.setup.ts
git commit -m "chore: set up Vitest + Testing Library + jest-axe"
```

## Task 5: Build the Button component (spec: `planning/components.md` 6.1)

**Files:**
- Create: `web/src/components/ui/button.tsx` (shadcn-generated, then customized)
- Test: `web/src/components/ui/button.test.tsx`

- [ ] **Step 1: Install the base shadcn Button**

Run: `cd web && npx shadcn@latest add button -y`
Expected: `web/src/components/ui/button.tsx` is created, exporting `Button` and a `buttonVariants` CVA definition with `default`/`destructive`/`outline`/`secondary`/`ghost`/`link` variants and `default`/`sm`/`lg`/`icon` sizes.

- [ ] **Step 2: Write the failing test for Adjudix's variant set**

Per `components.md` 6.1, Adjudix needs exactly: `primary`, `secondary`, `ghost`, `destructive`, `accent`. Create `web/src/components/ui/button.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "./button";

describe("Button", () => {
  it("renders the primary variant with navy-800 background class", () => {
    render(<Button variant="primary">File a Dispute</Button>);
    const btn = screen.getByRole("button", { name: "File a Dispute" });
    expect(btn.className).toContain("bg-navy-800");
  });

  it("renders the accent variant with crimson-500 background class", () => {
    render(<Button variant="accent">File Emergency Arbitration</Button>);
    const btn = screen.getByRole("button", { name: "File Emergency Arbitration" });
    expect(btn.className).toContain("bg-crimson-500");
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
```

- [ ] **Step 2: Run it to see it fail**

Run: `npm test -- button.test.tsx`
Expected: FAIL — `variant="primary"` and `variant="accent"` aren't defined yet (shadcn's default variants are `default`/`destructive`/`outline`/`secondary`/`ghost`/`link`), and there is no `loading` prop.

- [ ] **Step 3: Customize the CVA variants to match Adjudix's spec**

Open `web/src/components/ui/button.tsx`. Replace the `buttonVariants` CVA call's `variants.variant` object with:

```typescript
variant: {
  primary:
    "bg-navy-800 text-white shadow-sm hover:shadow-md hover:bg-navy-700 rounded-full",
  secondary:
    "border-2 border-navy-800 text-navy-800 bg-transparent hover:bg-navy-50 rounded-full",
  ghost:
    "text-navy-800 underline-offset-4 hover:underline bg-transparent",
  destructive:
    "bg-error-600 text-white shadow-sm hover:bg-error-700 rounded-full",
  accent:
    "bg-crimson-500 text-white shadow-sm hover:bg-crimson-700 rounded-full",
},
```

Keep the existing `size` variants as shadcn generated them (`default`, `sm`, `lg`, `icon`) — they don't conflict with anything in `components.md` 6.1, which only specifies `sm`/`md`/`lg`.

Then add a `loading` prop to the `Button` component function itself (not the CVA variants — loading is behavior, not a style variant). Find the `Button` function/`forwardRef` definition and modify its props and JSX:

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
            {children}
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";
```

(Keep whatever `Slot`/`cn`/`cva` imports shadcn's generated file already had at the top — only the `variants` object and the component body change.)

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- button.test.tsx`
Expected: `5 passed`.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/ui/button.tsx web/src/components/ui/button.test.tsx
git commit -m "feat: customize Button with Adjudix variants (primary/secondary/ghost/destructive/accent) and loading state"
```

## Task 6: Add the Accordion component (spec: `planning/components.md` 6.2)

**Files:**
- Create: `web/src/components/ui/accordion.tsx` (shadcn-generated)
- Test: `web/src/components/ui/faq-accordion.test.tsx`
- Create: `web/src/components/ui/faq-accordion.tsx`

- [ ] **Step 1: Install the base shadcn Accordion**

Run: `npx shadcn@latest add accordion -y`
Expected: `web/src/components/ui/accordion.tsx` created, wrapping Radix's `@radix-ui/react-accordion` primitives (`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`).

- [ ] **Step 2: Write the failing test for the FAQ wrapper**

Per `components.md` 6.2, Adjudix needs an FAQ-specific wrapper taking a flat `items[]` prop (question/answer pairs) rather than requiring every page to hand-assemble `AccordionItem`/`AccordionTrigger`/`AccordionContent`. Create `web/src/components/ui/faq-accordion.test.tsx`:

```tsx
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
    render(<FaqAccordion items={items} />);
    expect(screen.queryByText("An arbitration and ADR institute.")).not.toBeVisible();
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
```

- [ ] **Step 3: Run it to see it fail**

Run: `npm test -- faq-accordion.test.tsx`
Expected: FAIL — `./faq-accordion` doesn't exist yet.

- [ ] **Step 4: Write the FaqAccordion wrapper**

Create `web/src/components/ui/faq-accordion.tsx`:

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  allowMultipleOpen?: boolean;
}

export function FaqAccordion({ items, allowMultipleOpen = false }: FaqAccordionProps) {
  return (
    <Accordion type={allowMultipleOpen ? "multiple" : "single"} collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npm test -- faq-accordion.test.tsx`
Expected: `4 passed`.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/ui/accordion.tsx web/src/components/ui/faq-accordion.tsx web/src/components/ui/faq-accordion.test.tsx
git commit -m "feat: add Accordion primitive and FaqAccordion wrapper"
```

## Task 7: Build a minimal Home page shell proving both components work together

**Files:**
- Modify: `web/src/app/page.tsx`
- Test: `web/src/app/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `web/src/app/page.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page shell", () => {
  it("renders the hero headline", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Adjudix Dispute Resolution Institute/i })).toBeInTheDocument();
  });

  it("renders a primary CTA button", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /File a Dispute/i })).toBeInTheDocument();
  });

  it("renders an FAQ section with at least one question", () => {
    render(<Home />);
    expect(screen.getByText(/What is Adjudix/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to see it fail**

Run: `npm test -- page.test.tsx`
Expected: FAIL — the current `create-next-app` boilerplate page has none of this content.

- [ ] **Step 3: Replace the boilerplate Home page**

Replace the full contents of `web/src/app/page.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";

const faqItems = [
  {
    question: "What is Adjudix?",
    answer:
      "Adjudix Dispute Resolution Institute is an arbitration, mediation, conciliation, and online dispute resolution institute.",
  },
  {
    question: "How do I file a dispute?",
    answer: "Use the ODR Platform's filing flow, accessible from this page.",
  },
];

export default function Home() {
  return (
    <main className="bg-navy-50 min-h-screen">
      <section className="bg-navy-900 text-white px-8 py-24 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold">
          Adjudix Dispute Resolution Institute
        </h1>
        <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto">
          Dialogue. Dispute. Resolution. A better tomorrow.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary" size="lg">
            File a Dispute
          </Button>
          <Button variant="secondary" size="lg">
            Explore Training Institute
          </Button>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-8 py-16">
        <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={faqItems} />
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run the test again to verify it passes**

Run: `npm test -- page.test.tsx`
Expected: `3 passed`.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all test files pass (button, faq-accordion, page — smoke test was already deleted in Task 4).

- [ ] **Step 6: Visually verify in a real browser**

Run: `npm run dev`, then use the `run` skill (or `claude-in-chrome`) to open `http://localhost:3000` and take a screenshot.
Expected: a navy hero band with serif white headline, two pill-shaped buttons (solid navy "File a Dispute", outlined navy "Explore Training Institute"), and a working FAQ accordion below it that expands on click.

- [ ] **Step 7: Commit**

```bash
git add web/src/app/page.tsx web/src/app/page.test.tsx
git commit -m "feat: build Home page shell using Button and FaqAccordion"
```

## Task 8: Lock in linting and final verification

**Files:**
- Modify: `web/package.json` (if needed)

- [ ] **Step 1: Run the linter**

Run: `cd web && npm run lint`
Expected: no errors. If shadcn-generated files trigger any lint warnings (e.g. unused `React` import in older-style files), fix them directly in the flagged file.

- [ ] **Step 2: Run a full clean build**

Run: `npm run build`
Expected: build completes successfully with no type errors, producing a `.next/` output directory and a route summary listing `/` in the console output.

- [ ] **Step 3: Run the full test suite one final time**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 4: Final commit**

```bash
cd "E:/IT Company/GIGS/ADJUDIX"
git add -A
git commit -m "chore: verify lint, build, and test pipeline all pass" --allow-empty
```

---

## Self-Review Notes

- **Spec coverage:** Task 1-2 cover environment/tooling setup (not directly in `components.md` but a prerequisite). Task 3 implements every color/font token from `design/color-system.md` and `design/typography.md`. Task 5 implements `components.md` 6.1 (Button) in full including its stated variants and loading state. Task 6 implements `components.md` 6.2 (Accordion/FAQ) including its accessibility requirement (Radix's built-in `aria-expanded` handling, verified via the jest-axe test). Task 7 proves both components compose on a real page. Remaining components in `planning/components.md` (Navigation, Forms, Directory, etc.) are explicitly out of scope per this plan's Scope Note — each needs its own follow-up plan.
- **Placeholder scan:** no TBD/TODO markers; every step has complete, runnable code or an exact command with expected output.
- **Type consistency:** `FaqAccordion`'s `items: FaqItem[]` shape (`question`/`answer`) is used identically in its test and in the Home page's `faqItems` array. `Button`'s `variant` prop values (`primary`/`secondary`/`ghost`/`destructive`/`accent`) are used identically across Task 5's test and Task 7's Home page usage.
