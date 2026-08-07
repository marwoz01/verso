# Code Standards

## general

- **no comments.** Not in `.ts`, `.tsx`, `.css` or config files. No JSDoc, no section
  banners, no "why" notes. Code carries its own explanation through naming and structure
- if a piece of code needs a comment to be understood, that is the signal to rename it
  or split it - not to annotate it
- reasoning, decisions and gotchas belong in `context/`, never in the source. A comment
  is a second copy that drifts from the first the moment either changes
- keep modules small and single-purpose
- fix root causes - do not layer workarounds
- do not mix unrelated concerns in one component or module
- name files after the responsibility they contain, not the technology
- respect the system boundaries defined in `architecture-context.md`

## typescript

- strict mode is required throughout the project
- avoid `any`; use explicit types or narrowly scoped interfaces
- derive types from data where possible (`Unit` comes from the `UNITS` array, not a
  hand-written union that can drift from it)
- validate unknown external input at system boundaries before trusting it

## next.js (app router)

- default to react server components
- add `"use client"` only when the component needs browser interactivity, hooks or animation
- the game loop is client-side by nature - keep the boundary explicit and as low in the tree
  as possible, so the shell around it can stay static
- route params are Promises - `const { x } = await params`
- run `pnpm build` before `pnpm typecheck` on a fresh checkout; `.next/types` must exist first
  (see `architecture-context.md`)

## game logic

- pair selection, difficulty and chain rules live in `src/lib/`, plain TypeScript, **no React
  imports** - they are the part that gets tuned most often and must be testable in isolation
- the round loop must stay deterministic given the same input: a shared Daily set requires
  every player to see an identical sequence
- never let a rendering concern decide game state (which object wins, what comes next)
- every rule that can produce a "no candidate found" outcome must state what happens then -
  silent failure in the chain is the worst possible bug here

## animation (gsap)

- use `@gsap/react`'s `useGSAP()` rather than raw `useEffect` - it handles cleanup and scoping
- scope selectors with `{ scope: ref }`; multiple instances of the same component on screen
  must not animate each other
- the value reveal must have a still fallback under `prefers-reduced-motion` that still
  communicates the result - the animation carries meaning here, so it cannot simply be dropped
- verdict (correct/incorrect) never lands before the value has finished revealing

## styling

- use design tokens from the Tailwind theme (`src/app/globals.css` via `@theme`) - no raw
  tailwind color classes like `neutral-*` / `zinc-*` and no hardcoded hex in components
- never name a color token after a Tailwind core scale key (`base`, `sm`, `lg`, ...) -
  `--color-base` would hijack `text-base` and silently replace font-size with a color
- mobile-first: design for narrow screens first, layer breakpoints upward
- `:hover` may enhance, never gate - most traffic is mobile, where hover does not exist
- the whole card is the interaction target, not a small button inside it
- load fonts with the `latin-ext` subset - Polish diacritics fall back without it
- `--color-accent` is decoration only (1.9:1 on white); use `--color-accent-ink` for any text
- decorative SVG: stroke only, `currentColor`, `aria-hidden="true"` - see `ui-context.md`
- when absolutely positioning a mark over text, size it from `inset` **or** `h`/`w`,
  never both - the rules overwrite each other

## content

- objects, attributes, values, sources and "Did you know?" texts are **data, never code**
- no object or value hardcoded in a component - not even temporarily, not even for a test
- if a piece of content cannot be pulled from the data layer, the fix is to add a field
- store every value in its **base unit** (metre, kilogram, second, USD); formatting into
  `mln` / `km` / `km/h` is a presentation concern
- every value carries its source and measurement date - numbers go stale

## testing

- tests live next to the code as `*.test.ts` and run through Vitest (`pnpm test`)
- test the engine, not the rendering: pair selection, chain continuity, edge cases
- the `@/*` alias works in tests via `vitest.config.mts` - keep imports identical to app code
- **verify by observing, not by inferring** - a command exiting 0 is not evidence it did its job

## git

- **never run `git commit` or `git push`.** Propose the message in chat and stop;
  the owner reviews and commits. Only an explicit "commit this" overrides it
- **conventional commits, one line: `<type>: <subject>`**
- types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`
- English, imperative, lowercase after the colon, no trailing period
- **no body by default.** Reasoning lives in `context/progress-tracker.md` - repeating it in
  the commit message creates a second copy that will drift from the first
- add a body only when the "why" cannot be recovered from the diff or the context files
- one commit per logical change; do not bundle unrelated work

```
chore: init project
feat: add pair selection engine
fix: keep verdict from landing before the reveal ends
docs: record stack decision in progress-tracker
```

## file organization

- `src/lib/` - game logic and data, framework-free
- `src/components/` - presentational components, composition only, no game logic
- `src/app/` - routes, layout, styles
- `context/` - project context files, not shipped code
