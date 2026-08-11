# Architecture Context

## Stack technologiczny

| Warstwa | Technologia | Rola |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 + TypeScript | routing, SSR dla linków do udostępniania, później API rankingu Daily |
| Styling | Tailwind CSS v4 | utility + tokeny motywu (`@theme` w `src/app/globals.css`) |
| Animacje | GSAP 3 + `@gsap/react` | odsłona wartości, przejście karty prawa→lewo (Flip) |
| Testy | Vitest 4 | silnik doboru par i logika rundy |
| Fonty | DM Sans (interfejs) + Big Shoulders (nagłówki) przez `next/font/google`, podzbiory `latin` + `latin-ext` | patrz `ui-context.md` |
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
    globals.css          # wejscie Tailwind v4 + tokeny motywu (@theme)
    icon.tsx             # favikona generowana przez ImageResponse
    [locale]/            # root layout + strona glowna, patrz Dwujezycznosc
  components/            # komponenty prezentacyjne (graffiti.tsx, ui/)
  lib/
    units.ts             # siedem jednostek
    domains.ts           # dziedziny - steruja „compare the incomparable"
    i18n.ts              # stale i typy, BEZ importow
    dictionaries/        # tresc interfejsu
    game/                # silnik lancucha, zero Reacta
      types.ts           # GameObject, Trait, Round, ChainState
      random.ts          # PRNG z ziarna + hash daty
      candidates.ts      # filtry, scoring, drabina rozluznien
      chain.ts           # startChain, nextRound, playChain
      validate.ts        # niezmienniki bazy
      simulate.ts        # pomiar zdrowia bazy
      fixtures.ts        # dane syntetyczne - tylko dla testow
  data/objects/          # baza obiektow, jeden plik na obiekt
context/                 # ten katalog - pliki kontekstowe projektu
vitest.config.mts        # alias @/* dla testow
```

**`src/lib/game/` nie importuje Reacta ani niczego z `app/`.** Cały silnik jest zbiorem
czystych funkcji, więc testuje się go bez przeglądarki i bez renderowania — a `playChain`
zwraca gotową listę rund, którą warstwa widoku tylko wyświetla.

`fixtures.ts` produkuje **dane syntetyczne wyłącznie na potrzeby testów** — obiekty nazywają
się `obj-0`, `obj-1` i nie mają nic wspólnego z bazą gry. To nie jest wyjątek od reguły 7
z `ai-workflow-rules.md`: reguła zakazuje treści w komponentach, a nie kontrolowanych danych
w teście silnika, gdzie realne wartości uczyniłyby test kruchym.

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

Zaimplementowany w `src/lib/game/types.ts`, wymuszany przez `src/lib/game/validate.ts`.

```
Obiekt
├── id               stabilny klucz, uzywany przez silnik
├── nazwa            { en, pl }
├── dziedzina        Domain (src/lib/domains.ts) - steruje „compare the incomparable"
└── cechy[]          min. 3, w min. 3 ROZNYCH jednostkach
    ├── etykieta     { en, pl } - „miesieczni sluchacze"
    ├── jednostka    Unit (src/lib/units.ts)
    ├── wartosc      w jednostce bazowej (metry, kilogramy, sekundy, USD)
    ├── zrodlo       { url, retrievedAt }
    └── zmiennosc    static | slow | fast
```

Trzy rzeczy trzymamy od pierwszego dnia, bo dopisanie ich później oznacza przejście całej
bazy od nowa:

- **wartość w jednostce bazowej**, nie w tej, w której ma się wyświetlić — przeliczanie
  na `mln`, `km` czy `km/h` to zadanie warstwy prezentacji
- **źródło i data pomiaru przy każdej wartości** — liczby się starzeją, a bez daty
  nie wiadomo, którą trzeba odświeżyć
- **znacznik zmienności** — sama data mówi „ten wpis ma 14 miesięcy", ale nie mówi, czy to
  problem. Wysokość Burj Khalifa nie zmieni się nigdy, miesięczni słuchacze zmieniają się
  co tydzień. Bez tego rozróżnienia zostaje odświeżanie wszystkiego albo niczego. Znacznik
  jest też regułą kuratorską: przy dwóch równie ciekawych cechach wybieramy `static`

**Nazwy i etykiety mieszkają w pliku obiektu, nie w `src/lib/dictionaries/`.** Słowniki niosą
interfejs; treść obiektu zostaje przy obiekcie, żeby dodanie pozycji było jednym plikiem,
a nie edycją trzech.

Dane obiektów żyją jako **typowane pliki TS w repozytorium**, nie w CMS ani bazie: są tylko
do odczytu, wersjonowane w gicie i sprawdzane przy buildzie. CMS dokładamy dopiero, gdy bazę
zacznie kuratorować ktoś nietechniczny.

## Kolejność, którą warto wykorzystać

**Endless nie potrzebuje serwera.** Da się go zbudować i zagrać w całości po stronie klienta.

**Daily też nie — poza rankingiem.** To korekta wcześniejszego zapisu (2026-08-11), który
sklejał dwie osobne rzeczy. Łańcuch nie zależy od decyzji gracza: gracz tylko zgaduje, nie
wpływa na to, jaki obiekt przyjdzie następny. Sekwencja jest więc **czystą funkcją bazy
i ziarna**, a ziarno dla Daily bierze się z daty — każdy klient wyliczy identyczny łańcuch
samodzielnie:

```
chain(dane, ziarno) → [runda 1, runda 2, ...]

Endless   ziarno losowe
Daily     ziarno = hash(data + wersja danych)
```

Wspólnego zestawu dnia nie trzeba więc nigdzie trzymać. Backendu wymaga **ranking**, czyli
garść wyników — i to jest osobna, nadal odłożona decyzja.

**Wersja danych w ziarnie jest konieczna, nie ozdobna:** dodanie obiektu zmienia łańcuch dla
tej samej daty, więc deploy w środku dnia rozjechałby graczy przed nim i po nim. Wersję
podbijamy wyłącznie przy zaplanowanych aktualizacjach bazy.

Pierwszy grywalny build może więc nie mieć w ogóle warstwy serwerowej.

## Do rozstrzygnięcia

| Obszar | Kiedy stanie się blokujące |
|---|---|
| Źródła wartości i sposób ich weryfikacji | przy budowaniu bazy startowej |
| Backend i baza rankingu Daily | przy trybie Daily |
| Trwałość rekordu gracza | przy trybie Endless |
| Pozyskiwanie grafik obiektów | przy warstwie wizualnej kart |
| Hosting | przy pierwszym wdrożeniu |

## Dwujęzyczność

Segment `[locale]` w `src/app/`, **oba języki z prefiksem** (`/en`, `/pl`). Goły `/`
przekierowuje na `DEFAULT_LOCALE` przez `redirects()` w `next.config.ts`.

**Dlaczego prefiks dla obu, a nie „domyślny bez prefiksu":** wariant bez prefiksu wymaga
middleware negocjującego język i komplikuje `generateStaticParams`. Prefiks dla obu daje dwie
statycznie prerenderowane ścieżki i zero middleware. Koszt: `/en` zamiast `/`.

**`src/app/[locale]/layout.tsx` jest root layoutem** — nie ma `src/app/layout.tsx`. Dzięki temu
`<html lang>` bierze się z segmentu, a nie jest zaszyte na sztywno.

```
src/lib/i18n.ts              stale, typ Dictionary, isLocale - BEZ importow
src/lib/dictionaries/en.ts   tresc angielska
src/lib/dictionaries/pl.ts   tresc polska
src/lib/dictionaries/index.ts  getDictionary
```

**`i18n.ts` nie może niczego importować.** `next.config.ts` czyta z niego `DEFAULT_LOCALE`,
a Next kompiluje config osobno, bez aliasu `@/` — każdy import w tym pliku wywali build
z `MODULE_NOT_FOUND`. Stąd rozdzielenie: stałe i typy w `i18n.ts`, ładowanie słowników
w `dictionaries/index.ts`.

Teksty z osadzonym akcentem (znak graffiti na fragmencie zdania) trzymane są jako
`{ before, highlight, after }` — pozwala to przenieść akcent na inne słowo w innym języku
bez HTML-a w słowniku.

## Niezmienniki

- **Zero obiektów i wartości zaszytych w kodzie.** Patrz `ai-workflow-rules.md`, reguła 6.
- **Gdy wybierzemy krój — ładujemy go z podzbiorem `latin-ext`.** Bez niego polskie znaki
  diakrytyczne spadają na font zastępczy i tekst rozjeżdża się w pionie. Scaffold miał
  ten błąd domyślnie.
- Kod pod `.next/` jest generowany — nie edytować.
- `AGENTS.md` jest dopisywany przez `next dev` — nie usuwać go z repozytorium.
