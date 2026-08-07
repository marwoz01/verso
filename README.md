# Verso

Webowa gra Higher/Lower. Gracz porównuje pozornie niepowiązane obiekty sprowadzone
do wspólnej jednostki — populację Polski z liczbą słuchaczy Taylor Swift, koszt GTA V
z kosztem budowy Burj Khalifa.

**Compare the incomparable.**

## Stan

Projekt postawiony, gra jeszcze nie zbudowana. Szczegóły: `context/progress-tracker.md`.

## Uruchomienie

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Polecenia

| polecenie | co robi |
|---|---|
| `pnpm dev` | serwer deweloperski |
| `pnpm build` | build produkcyjny |
| `pnpm start` | serwer produkcyjny |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` — **wymaga wcześniejszego `pnpm build`**, patrz niżej |
| `pnpm test` | Vitest w trybie ciągłym |
| `pnpm test:run` | Vitest jednorazowo |

### `pnpm typecheck` na świeżym klonie

Wywali się z `Cannot find name 'LayoutProps'`. To nie jest błąd w kodzie: Next 16 generuje
typy tras do `.next/types/`, a katalog powstaje dopiero przy pierwszym `next build` lub
`next dev`. Kolejność to `pnpm build` → `pnpm typecheck`, także w CI.

## Dokumentacja projektu

Katalog `context/` — zacznij od `context/progress-tracker.md`.

| plik | co zawiera |
|---|---|
| `context/progress-tracker.md` | faza, co zrobione, co dalej |
| `context/project-overview.md` | co budujemy, dla kogo, zakres v1 |
| `context/architecture-context.md` | stack, struktura, niezmienniki |
| `context/code-standards.md` | reguły kodu |
| `context/ui-context.md` | kierunek wizualny |
| `context/ai-workflow-rules.md` | zasady pracy nad projektem |
| `context/feature-specs/` | specyfikacje funkcji — powstają przed kodem |
