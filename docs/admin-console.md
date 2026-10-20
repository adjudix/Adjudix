# Adjudix Console (admin portal)

A private console, inside the website's own Next.js app, for editing everything the site shows: forms, pages, structured data, menus and settings, plus the inbox of everything visitors send. It is never linked from the site, never in the sitemap or robots.txt, and every response carries `noindex`.

## Turning it on

Set these on every Vercel project that serves the site (and in `web/.env.local` locally):

| Variable | What it is |
| --- | --- |
| `ADMIN_PATH` | The console's private address, e.g. `adx-7f3k2q9m`. The console opens at `https://adjudixadr.com/adx-7f3k2q9m`. 6–64 letters, numbers, `-` or `_`. Unset = no console at all. Treat it like a password. |
| `TURSO_DATABASE_URL` | The Turso database (`libsql://…`). Create one in the Turso dashboard or with `turso db create adjudix`. |
| `TURSO_AUTH_TOKEN` | A token for that database (`turso db tokens create adjudix`). |
| `BLOB_READ_WRITE_TOKEN` | A **Private** Vercel Blob store (prefix `BLOB`) for documents attached to forms. Readable only through the console. |
| `MEDIA_READ_WRITE_TOKEN` | A **Public** Vercel Blob store (prefix `MEDIA`) for images and PDFs uploaded in Media. |

Without a database the public site still works exactly as built. It serves the content written in code. Locally, with `TURSO_DATABASE_URL` unset, a SQLite file at `web/.data/adjudix.db` is used. Without Blob storage, local development keeps files under `web/.data/uploads` and `web/public/uploads`.

Every `npm run build` applies pending database migrations first (`scripts/console/migrate.ts`).

## The two super admins

Super admins exist only from the command line. The console can't create, change or remove them.

```bash
cd web
TURSO_DATABASE_URL=… TURSO_AUTH_TOKEN=… npm run console:super -- first@adjudixadr.com "Full Name"
TURSO_DATABASE_URL=… TURSO_AUTH_TOKEN=… npm run console:super -- second@adjudixadr.com "Full Name"
```

Each command prints a generated password once. At first sign-in the super admin chooses their own password and must set up two-step verification (any authenticator app). At most two super admins can exist; `--reset` issues a new password to an existing one.

## Roles and users

Super admins open **Users & roles** to:

- create roles from a grid of modules (Submissions, Forms, Pages, Collections, Media, Site settings, Audit log) × actions (View, Edit content, Change structure, Publish, Delete);
- create admin users with an email and a role. The password is generated and shown once (or emailed through Brevo), and the user replaces it at first sign-in;
- change a user's role, issue a new password, sign them out everywhere, disable or delete them.

**Edit content** changes wording, choices and items. **Change structure** adds, removes and moves fields, blocks and collection items. **Publish** makes drafts visible on the site. Without it a role can only prepare drafts. The server checks every permission on every action; hidden buttons are only a convenience.

Sign-in: 5 wrong attempts lock an account for 15 minutes, and 20 failed attempts from one network in 15 minutes pause sign-in from it. Sessions last 12 hours and are httpOnly, SameSite=strict cookies stored only as hashes.

## What can be edited, where

| In the console | Changes on the site |
| --- | --- |
| **Forms** | All 23 forms: open or close them, edit every label, choice, button and message, add, remove and drag fields between sections (or drag a field type in from the palette), conditional fields, layout, delivery mailbox. Live preview; undo/redo. A closed form shows its "closed" message instead. |
| **Submissions** | Every form entry, saved even when email fails, with its documents (private, opened only through the console). Status, assignee, internal notes, CSV export. |
| **Pages** | Every page as blocks: header, text, tiles, cards, numbered steps, tables, comparisons, FAQs, figures, image and text, buttons, CTA bands, forms, lists from collections, built-in features, and the page templates (mechanism, course, practice area, membership tier, competition, partner). Add, edit, drag, hide, duplicate and delete blocks; preview at desktop, tablet and phone width; click a section in the preview to select it; autosaving drafts; SEO title and description; new pages at any address; "Back to the page as built". |
| **Collections** | Members & panel, training tracks, student courses, competitions, articles, model clauses, fee schedule (and calculator), Code editions, Code of Procedure text, Moral Code. Add, edit, drag, hide and duplicate items. |
| **Media** | Image, PDF and video uploads for pages and collections. |
| **Site settings** | Announcement bar, main and second menus, footer columns and copyright, contact mailboxes, consultation pop-up (wording, timing, on/off), the home-page intro, translation languages. |
| **Audit log** | Every change, by whom and when. |

Every editor saves **drafts**. **Publish** puts them live within seconds, and **History** keeps every published version for one-click restore into the draft.

### How pages work

Each page built in code opens in the editor as blocks:

- **Pages built from a page template** (practice areas, mechanisms, courses, membership tiers, competitions, partner categories) open with all their content as an editable template block.
- **Most other pages** were converted by hand into blocks (`web/src/lib/pages/seeds.ts`), word for word.
- **A few pages whose content lives in a collection** (fees, panel, register, directory, model clauses, Moral Code, Code of Procedure, blog list) or that have a bespoke design (home, contact, credits, portal) open as one locked **Original section**. Their data is edited in Collections, Forms or Site settings (the block says where), and new blocks can be added around them.

A page with no published blocks shows exactly as built.

## For developers

- Content store: `web/src/lib/content` (published reads with code fallbacks, drafts, versions). Schemas: `lib/content/schema.ts`; collections: `lib/content/collections.ts`; block types: `lib/blocks/types.ts`, rendered by `components/blocks/render.tsx`.
- Database schema: `web/src/db/schema.ts`. After changing it, run `npm run db:generate` and commit the migration in `web/drizzle/`.
- New page in code: run `npm run pages:wrap` to make it editable. `npm run dev` and `npm run build` refresh the page index (`lib/pages/loaders.ts`), and a test fails if it's stale.
- The proxy (`web/src/proxy.ts`) maps `/<ADMIN_PATH>` onto `app/(console)/console` and answers 404 for `/console` itself.
