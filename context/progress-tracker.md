# Progress Tracker

> Aktualizuj ten plik po zakończeniu każdego zadania: aktualna faza, co w trakcie, co zrobione,
> co dalej. Na początku każdej nowej sesji przeczytaj go jako pierwszy, żeby wiedzieć, gdzie
> stanął projekt.

## Aktualna faza

**Strona główna gotowa, gra jeszcze nie zbudowana.** Stoi szkielet, tokeny motywu i typografia.
Nie ma ekranu pojedynku ani żadnych danych o obiektach — przyciski trybów nie są podpięte.

## W trakcie

Nic nie jest w połowie.

## Zrobione

- **Koncept i rdzeń mechaniki** (2026-08-07). Gra Higher/Lower na obiektach z różnych dziedzin
  sprowadzonych do wspólnej jednostki. **Ciągłość łańcucha trzyma obiekt, nie jednostka** —
  odsłonięty obiekt zostaje punktem odniesienia, ale mierzony inną cechą w innej jednostce.
  Powód: klasyczny carry-over zamyka kolejne rundy w jednej kategorii, co zabija sens
  „compare the incomparable". Konsekwencja dla danych: obiekt potrzebuje min. 2 cech
  w min. 2 różnych jednostkach.
- **Zakres v1**: tryby Endless i Daily, siedem jednostek, ekran pojedynku z animowaną odsłoną,
  krótkie „Did you know?". Poza zakresem: konta, multiplayer, wybór kategorii, monetyzacja.
- **Katalog kontekstowy** (2026-08-07) — struktura przeniesiona z projektu `tattoo-studio`.
- **Szersza specyfikacja z sesji `grill-me` skasowana** (2026-08-07). Rozstrzygała z góry
  ~15 decyzji: pasmo trudności, timing rundy, formatowanie liczb, strukturę Daily, tożsamość
  gracza, onboarding. Odrzucona świadomie — za dużo naraz jak na fazę bez kodu. Decyzje
  podejmujemy pojedynczo, przy konkretnych funkcjach, i zapisujemy tutaj.
- **Stack wybrany i projekt postawiony** (2026-08-07): Next.js 16 (App Router, Turbopack)
  + React 19 + TypeScript + Tailwind v4, GSAP 3 + `@gsap/react`, Vitest 4, pnpm 10.
  Uzasadnienie wyboru Next mimo tego, że Verso jest grą, a nie stroną treściową — w
  `architecture-context.md`.
  - **GSAP zamiast Motion** — decyzja właściciela: GSAP jest znany z innego projektu.
    Koszt: przejście karty prawa→lewo trzeba zrobić przez `Flip` zamiast dostać z `layoutId`.
  - **Dane obiektów jako typowane pliki TS w repo**, nie CMS ani baza. Są tylko do odczytu,
    wersjonowane w gicie, sprawdzane przy buildzie. CMS dopiero, gdy bazę zacznie kuratorować
    ktoś nietechniczny.
  - **Bez backendu na tym etapie** — Endless działa w całości po stronie klienta. Decyzja
    o bazie i API czeka do trybu Daily.
  - Świadomie **nie** dołożone: biblioteka stanu, biblioteka i18n, zestaw komponentów UI, ORM.
- **`src/lib/units.ts`** — siedem jednostek z zakresu v1 jako `const` + typ `Unit` wyprowadzony
  z tablicy. Pierwszy plik produktowy; służy też jako sprawdzenie, że alias `@/*` działa
  w testach.
- **Boilerplate `create-next-app` usunięty w całości** (2026-08-07): strona demo z logotypami
  i linkami UTM Vercela, katalog `public/` z pięcioma logotypami, favicon Vercela, domyślny
  README, demonstracyjny motyw w `globals.css` (`--background`/`--foreground` z automatycznym
  trybem ciemnym). Zostało: `@import "tailwindcss"` i zastępcza strona z nazwą i hasłem.
  - **Fonty Geist też wyleciały.** To firmowy krój Vercela, a typografia jest nierozstrzygnięta
    (`ui-context.md`) — zostawienie go byłoby udawaniem podjętej decyzji. Do czasu wyboru
    obowiązuje domyślny systemowy stos Tailwinda. **Przy wyborze kroju pamiętać o podzbiorze
    `latin-ext`** — bez niego polskie znaki diakrytyczne spadają na font zastępczy i tekst
    rozjeżdża się w pionie.
  - Metadane zmienione z „Create Next App" na „Verso".
- **Zweryfikowane odczytem, nie założeniem**: `pnpm lint` kod wyjścia 0, `pnpm typecheck`
  kod wyjścia 0, `pnpm test:run` 2/2 przechodzą, `pnpm build` prerenderuje `/` i `/_not-found`.
- **Strona główna** (2026-08-07). Układ wzorowany na ekranie startowym The Higher Lower Game
  (wyśrodkowana kolumna: znak, pytanie, opis, dwa tryby, ramka z zasadą), styl wzorowany na
  `artemartemartem.com`: biel, czarna typografia, dużo powietrza.
  - **Tokeny motywu i typografia ustalone** — pełny opis w `ui-context.md`. Krój: Inter Tight,
    jeden na wszystko. Wybrany za neutralność: typografia ma być spokojna, żeby marker
    mógł krzyczeć.
  - **Dwa zielone, nie jeden.** `--color-accent` (`#00d26a`) czyta się jak marker, ale daje
    na bieli 1,9:1 — jest wyłącznie dekoracją. Pod tekst służy `--color-accent-ink`
    (`#00713a`, 6,1:1, przechodzi AA). Mylenie ich to najłatwiejszy sposób na nieczytelny napis.
  - **`src/components/graffiti.tsx`** — cztery znaki markerowe (`ArrowUp`, `Underline`,
    `Circle`, `Burst`) jako SVG. Jedyny element dekoracyjny w projekcie. Reguły w `ui-context.md`.
  - **Bez GSAP.** Strona jest statyczna, animacji nikt nie zamawiał. GSAP czeka na odsłonę
    wartości i przejście karty — czyli na miejsca, gdzie ruch niesie znaczenie.
  - Treść po angielsku, bo wszystkie posiadane elementy marki są angielskie (nazwa, hasło).
    Do rewizji razem z decyzją o dwujęzyczności.
  - **Nie zweryfikowane wizualnie** — brak narzędzi przeglądarkowych w sesji, w której
    powstała. Sprawdzone: build przechodzi, 4 znaki SVG w wyjściu HTML, tokeny i `font-sans`
    rozwiązują się poprawnie w zbudowanym CSS, podzbiór `U+100-2BA` pokrywa polskie diakrytyki.
    **Pozycjonowanie znaków graffiti nad tekstem wymaga obejrzenia w przeglądarce.**

## Następne kroki

1. **Zestaw startowy obiektów** — 40–60 pozycji z cechami w min. 2 jednostkach, wartościami
   w jednostkach bazowych i źródłami. Blokuje wszystko poniżej: bez danych nie da się ani
   przetestować mechaniki, ani zbudować ekranu.
2. **Silnik doboru par + test łańcucha** — czysty TypeScript w `src/lib/`, bez Reacta.
   Test „czy łańcuch przechodzi 20 rund na realnych danych" rozstrzyga główne ryzyko konceptu.
3. **Pierwszy ekran pojedynku** — dopiero gdy 1 i 2 działają. Wtedy też wymieniamy domyślną
   stronę z `create-next-app` i ustalamy tokeny motywu.

## Znane luki / świadome długi

- **Pułapka: `pnpm typecheck` na świeżym klonie się wywali** z `Cannot find name 'LayoutProps'`.
  Next 16 generuje typy tras do `.next/types/`, a katalog powstaje dopiero przy pierwszym
  `next build` / `next dev`. W CI `typecheck` musi iść **po** buildzie. Opis w
  `architecture-context.md`.
- **Przyciski „Endless" i „Daily" nie prowadzą nigdzie** — to `<button>` bez obsługi zdarzeń,
  bo tryby nie istnieją. Podpiąć przy pierwszym ekranie pojedynku.
- **Strona główna nie została obejrzana w przeglądarce.** Sprawdzić `pnpm dev` i potwierdzić,
  że zielona pętla obejmuje „something else", a podkreślenie siedzi pod „bigger" — SVG
  pozycjonowane absolutnie łatwo rozjeżdżają się przy zmianie długości tekstu.
- **Brak favikony.** Usunięta razem z boilerplate'em (była to favikona Vercela). W dev konsoli
  pojawi się 404 dla `/favicon.ico`, dopóki nie wstawimy własnej.
- **Brak kontroli wersji.** `create-next-app` uruchomiony z `--disable-git`, repozytorium nie
  jest zainicjowane. Warto to zrobić przed pierwszą większą zmianą — dziś każde skasowanie
  pliku jest nieodwracalne.
- **Nie wiadomo, czy łańcuch utrzyma się przez dłuższą sesję.** Każdy krok wymaga obiektu,
  który ma cechę w jednostce poprzednika, jeszcze nie wystąpił i daje sensowną różnicę wartości.
  Trzy warunki naraz przy małej bazie mogą być nie do spełnienia. To główne ryzyko konceptu —
  rozstrzyga je punkt 2 w „Następnych krokach".
- **Grafiki obiektów abstrakcyjnych** („czas istnienia ZSRR", „PKB Polski") to nierozwiązany
  problem projektowy, nie drobiazg — dotyczy sporej części bazy. Patrz `ui-context.md`.
- **Źródła wartości nieokreślone.** Bez nich każda liczba w bazie jest nieweryfikowalna,
  a gra opiera się na tym, że liczby są prawdziwe.
- **Dwujęzyczność nierozstrzygnięta.** `<html lang="en">` zostaje do czasu decyzji, żeby nie
  zmieniać tego dwa razy.

Pliki specyfikacji funkcji powstają w `context/feature-specs/` w miarę potrzeb — zanim
zaczniesz funkcję, sprawdź lub zaproponuj odpowiedni plik.

---
_Ostatnia aktualizacja: 2026-08-07 (stack wybrany, projekt postawiony, narzędzia zweryfikowane)_
