# Architecture Context

## Stack technologiczny

| Warstwa | Technologia | Rola |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 + TypeScript | routing, SSR dla linków do udostępniania, później API trybu Daily |
| Styling | Tailwind CSS v4 | utility + tokeny motywu (`@theme` w `src/app/globals.css`) |
| Animacje | GSAP 3 + `@gsap/react` | odsłona wartości, przejście karty prawa→lewo (Flip) |
| Testy | Vitest 4 | silnik doboru par i logika rundy |
| Fonty | **jeszcze nie wybrane** — domyślny systemowy stos Tailwinda | Geist usunięty razem z boilerplate'em |
| Menedżer pakietów | pnpm 10 | |

To założenia startowe, nie dogmaty. Jeśli w trakcie budowy pojawi się dobry powód, żeby coś
zmienić — zmień, ale zaktualizuj ten plik.

**Dlaczego Next, skoro Verso to gra, a nie strona treściowa.** Prawie cała rozgrywka dzieje
się po stronie klienta i sam Endless nie potrzebuje serwera. Next zarabia na siebie w dwóch
miejscach: tryb Daily wymaga wspólnego zestawu dnia i rankingu, czyli backendu — a Next daje
go bez osobnej usługi; oraz linki z wynikiem potrzebują sensownego SSR, żeby cokolwiek
pokazywały po wklejeniu.

**Dlaczego GSAP, a nie Motion.** Decyzja właściciela projektu — GSAP jest już znany
z innego projektu. Koszt: przejście karty prawa→lewo wymaga wtedy `Flip`, zamiast dostać je
z `layoutId`. Zysk: zero czasu na naukę drugiej biblioteki.

## Struktura katalogów

```
src/
  app/
    globals.css          # samo @import "tailwindcss" - tokeny motywu jeszcze nie istnieja
    layout.tsx           # root layout
    page.tsx             # strona zastepcza - do wymiany przy pierwszym ekranie gry
  lib/                   # logika niezalezna od Reacta (units.ts, dalej silnik)
context/                 # ten katalog - pliki kontekstowe projektu
vitest.config.mts        # alias @/* dla testow
```

Katalogu `public/` nie ma — został usunięty razem z boilerplate'em. Utworzymy go, gdy pojawi
się pierwszy statyczny zasób.

Rozszerzenie `.mts` w konfiguracji Vitest jest **konieczne**: przy `.ts` Vite ładuje plik jako
CommonJS i ostrzega o składni ESM. `tsconfig.json` obejmuje `**/*.mts`, więc typecheck to widzi.

## Pułapka: `pnpm typecheck` na świeżym klonie

`tsc --noEmit` **wywali się na czystym repozytorium** z błędem
`Cannot find name 'LayoutProps'`. To nie jest błąd w kodzie.

Next 16 generuje typy tras do `.next/types/`, a `tsconfig.json` je dołącza. Katalog powstaje
dopiero przy pierwszym `next build` albo `next dev`. Kolejność jest więc:

```bash
pnpm build       # albo pnpm dev - generuje .next/types
pnpm typecheck   # dopiero teraz przejdzie
```

W CI: `typecheck` musi iść **po** buildzie, nigdy przed.

## Model danych

Kształt wynika z mechaniki (patrz `project-overview.md`):

```
Obiekt
├── nazwa
└── cechy[]          min. 2, w min. 2 ROZNYCH jednostkach
    ├── etykieta     „miesieczni sluchacze"
    ├── jednostka    Unit (src/lib/units.ts)
    ├── wartosc      w jednostce bazowej (metry, kilogramy, sekundy, USD)
    └── zrodlo       skad wartosc pochodzi i z kiedy jest
```

Dwie rzeczy trzymamy od pierwszego dnia, bo dopisanie ich później oznacza przejście całej
bazy od nowa:

- **wartość w jednostce bazowej**, nie w tej, w której ma się wyświetlić — przeliczanie
  na `mln`, `km` czy `km/h` to zadanie warstwy prezentacji
- **źródło i data pomiaru przy każdej wartości** — liczby się starzeją, a bez daty
  nie wiadomo, którą trzeba odświeżyć

Dane obiektów żyją jako **typowane pliki TS w repozytorium**, nie w CMS ani bazie: są tylko
do odczytu, wersjonowane w gicie i sprawdzane przy buildzie. CMS dokładamy dopiero, gdy bazę
zacznie kuratorować ktoś nietechniczny.

## Kolejność, którą warto wykorzystać

**Endless nie potrzebuje serwera.** Da się go zbudować i zagrać w całości po stronie klienta.
Dopiero Daily wymusza wspólny zestaw dnia i ranking, czyli backend i bazę.

Pierwszy grywalny build może więc nie mieć w ogóle warstwy serwerowej — a decyzja o bazie
poczeka do momentu, w którym zabierzemy się za Daily.

## Do rozstrzygnięcia

| Obszar | Kiedy stanie się blokujące |
|---|---|
| Źródła wartości i sposób ich weryfikacji | przy budowaniu bazy startowej |
| Podejście do dwujęzyczności (PL/EN) | przy pierwszym tekście w interfejsie |
| Backend i baza rankingu Daily | przy trybie Daily |
| Trwałość rekordu gracza | przy trybie Endless |
| Pozyskiwanie grafik obiektów | przy warstwie wizualnej kart |
| Hosting | przy pierwszym wdrożeniu |

`<html lang="en">` w `layout.tsx` zostaje na razie bez zmian — zmienimy je razem z decyzją
o dwujęzyczności, żeby nie robić tego dwa razy.

## Niezmienniki

- **Zero obiektów i wartości zaszytych w kodzie.** Patrz `ai-workflow-rules.md`, reguła 6.
- **Gdy wybierzemy krój — ładujemy go z podzbiorem `latin-ext`.** Bez niego polskie znaki
  diakrytyczne spadają na font zastępczy i tekst rozjeżdża się w pionie. Scaffold miał
  ten błąd domyślnie.
- Kod pod `.next/` jest generowany — nie edytować.
- `AGENTS.md` jest dopisywany przez `next dev` — nie usuwać go z repozytorium.
