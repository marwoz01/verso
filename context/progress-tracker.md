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
  - **Tokeny motywu i typografia ustalone** — pełny opis w `ui-context.md`.
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
- **Motyw przeniesiony z `villo.framer.website`** (2026-08-11). Decyzja właściciela: pełna
  podmiana dotychczasowego kierunku „biała kartka + zielony marker" na ciemny system referencji.
  Pełny opis tokenów w `ui-context.md`.
  - **Tylko motyw ciemny.** Villo przełącza paletę przez `prefers-color-scheme`; my bierzemy
    wyłącznie jego ciemną odsłonę i przybijamy ją w `:root` plus `color-scheme: dark`.
    Wariantu jasnego nie ma — jedna paleta to jeden zestaw decyzji przy każdym komponencie.
  - **Akcent `#e0f11f` zamiast `#2df100`.** Kluczowa konsekwencja: limonka na `#121212` daje
    15,1:1 w obie strony, więc **akcent może nieść tekst i służyć za obrys fokusa**. Znika
    wyjątek „obrys fokusa jest czarny", który wymuszała zieleń na bieli (1,53:1).
  - **DM Sans zamiast Outfit**, dalej jeden krój, dalej `["latin", "latin-ext"]`.
    Skala typografii przeniesiona 1:1 razem ze sparowanymi interliniami i trackingiem —
    dlatego `text-*` nie wymaga już dokładania `leading-*` ani `tracking-*`.
  - **Powierzchnie z drabinki przezroczystości** `#f0f0f0` w krokach 10/20/30/50 % zamiast
    osobnych szarości. Blok „how it works" przestał być odwróconą płachtą (`bg-foreground`),
    bo na ciemnym tle czytałby się jak biała dziura — jest teraz `bg-card`, bez obramowania.
  - **Nowe logo: `Sparkle` w limonce nad wordmarkiem „VERSO"** wersalikami w wadze 900.
    Kafelek pod znakiem zniknął — przy 15,1:1 nie jest już potrzebny. Favikona
    (`src/app/icon.tsx`) generowana z kodu przez `ImageResponse`; stary `icon.png` skasowany,
    bo dwa pliki `icon.*` w jednym katalogu to konflikt tras.
  - **Big Shoulders na nagłówki i wordmark**, DM Sans zostaje na interfejs i akapity.
    Sprawdzone, że Big Shoulders ma `latin-ext` — bez tego polskie znaki spadłyby na font
    zastępczy. Krój jest wąski i display'owy, więc nie schodzi poniżej ~26 px.
  - **Przyciski: niskie, wąskie, jeden promień 8 px, bez wersalików.** Trzy iteracje —
    rozstrzelone wersaliki i promień skalowany z rozmiarem (do 22 px) odrzucone jako
    przekombinowane. Efekt 3D niosą trzy tokeny cienia (`shadow-raised`,
    `shadow-raised-hover`, `shadow-pressed`), celowo płytkie.
  - **Hover to krok 30 % drabinki** (`#f0f0f04d`, czyli `#555555` na tle) — ten sam token
    dla wszystkich wariantów, żaden nowy kolor w palecie.
  - **Jeden styl na cały tekst drugorzędny** (`text-2xs font-medium uppercase`): linia hasła,
    akapit prowadzący i treść bloku „how it works" wyglądają identycznie. Powód: trzy różne
    stopnie i wagi sprawiały, że strona wyglądała na złożoną z czterech krojów zamiast dwóch.
    Koszt: 10 px wersalikami nie uniesie długiego zdania — przy dłuższych tekstach trzeba
    będzie świadomie dołożyć stopień do czytania.
  - **`outline` i `marker` dostały `bg-card`.** Były przezroczyste i przez to ich cień czytał
    się słabiej niż cień wypełnionego `default`, mimo tego samego tokena — cienie wewnętrzne
    nie mają się na czym rysować bez powierzchni. Dwa przyciski obok siebie muszą mieć
    tę samą bryłę.
  - **Graffiti przestawione na `em`.** Pikselowe `inset` rozjechały pętlę przy zejściu tekstu
    z 14 px na 10 px, a podkreślenie miało dwie wartości breakpointowe do ręcznego pilnowania.
    Po przeliczeniu na `em` obie wyszły tą samą liczbą, więc wariant `sm:` zniknął.
    Reguła i gotowe klasy w `ui-context.md`.
  - **Pułapka Tailwinda v4:** `max-w-prose` jest wbudowaną utility (`65ch`) i **nie da się jej
    nadpisać** tokenem `--container-prose` — token po cichu nie działa. Nasza szerokość
    akapitu nazywa się dlatego `--container-narrow` / `max-w-narrow`. Sprawdzone odczytem
    zbudowanego CSS, nie założeniem.
  - **Zweryfikowane odczytem zbudowanego CSS i HTML**: `pnpm build` przechodzi, `pnpm lint`
    kod wyjścia 0, `pnpm test:run` 2/2, `html{font-family:var(--font-dm-sans)}` rozwiązuje się
    poprawnie, zakres `U+100-2BA` obecny (polskie diakrytyki), gwiazdka renderuje się jako
    pełna bryła. **Nie obejrzane w przeglądarce** — brak narzędzi przeglądarkowych w sesji.

## Następne kroki

1. **Zestaw startowy obiektów — 40 pozycji po 3 cechy (120 zweryfikowanych wartości).**
   Liczba pochodzi z symulatora, nie z szacunku. Tryb pracy: AI proponuje obiekt, cechy,
   wartości i konkretne linki → plik roboczy poza `src/data/` → człowiek otwiera link
   i potwierdza liczbę → dopiero wtedy wpis wchodzi do repo. Małymi partiami, bo przy
   200 wiarygodnie wyglądających wpisach naraz review zamienia się w przyklepywanie.
2. **Taksonomia dziedzin** — `src/lib/domains.ts` ma dziś listę roboczą. Domknąć ją przy
   pierwszej partii obiektów, na realnych przypadkach, nie z góry.
3. **Przemierzyć symulator na prawdziwej bazie.** Liczby z syntetycznej są **górnym
   ograniczeniem** — patrz „Znane luki".
4. **Pierwszy ekran pojedynku** — `playChain` zwraca gotową listę rund, więc widok
   ma już z czego rysować.

- **Silnik łańcucha i pomiar zdrowia bazy** (2026-08-11). Model danych, walidacja, silnik
  i symulator. Zero Reacta, zero I/O — `src/lib/game/`, 23 testy. Pełne uzasadnienie decyzji
  w sekcji „Decyzje z sesji grill-me" poniżej.
  - **Główne ryzyko konceptu rozstrzygnięte.** „Czy łańcuch przetrwa 20 rund" wisiało
    nierozstrzygnięte od 2026-08-07. Odpowiedź: **tak, i to wcześniej, niż zakładaliśmy.**
    Symulator na bazie syntetycznej, 400 biegów na konfigurację:

    ```
    cech  obiektow  wartosci  pelnych 20 rund  bez rozluznien
      2      25        50          70%             29%
      2      40        80          99%             92%
      3      25        75         100%             90%
      3      40       120         100%            100%
      4      25       100         100%            100%
    ```

  - **Cechy ważą więcej niż obiekty — zmierzone, nie założone.** 25 obiektów po 3 cechy
    (75 wartości) bije 40 obiektów po 2 cechy (80 wartości): mniej pracy kuratorskiej,
    lepszy wynik. Stąd podniesienie progu z 2 na 3 cechy. Ta zależność jest **zakodowana
    w teście** (`cechy waza wiecej niz obiekty`), więc powrót do progu 2 wywali suite.
  - **Cel dla pierwszej bazy: 40 obiektów po 3 cechy.** Pierwsza konfiguracja ze 100 %
    pełnych biegów i 100 % bez rozluźnień, z zapasem na to, że realne dane będą gorsze
    od syntetycznych.
  - **Drabina rozluźnień ma 4 poziomy, nie 5.** Plan zakładał, że pierwszym rozluźnieniem
    jest zdjęcie preferencji dziedziny — to był błąd logiczny. Dziedzina jest **wyłącznie
    sortowaniem**, nigdy filtrem, więc jej zdjęcie nie może odblokować pustego wyniku.
    Realne filtry są dwa (powtórki, pasmo wartości), co daje 4 sensowne kombinacje.
  - **Różnorodność jednostek przez karę za świeżość.** Rdzeń gwarantuje tylko, że sąsiednie
    rundy mają różne jednostki — bez kary silnik oscylowałby między gęstymi `money`
    i `length`. Wynik: mediana 6 z 7 jednostek w 20 rundach, dominacja 25–30 %.

- **Ekran pojedynku na danych podglądowych** (2026-08-11). `/[locale]/play`, przycisk
  „Endless" ze strony głównej prowadzi już do gry. Cel: móc **zobaczyć i kliknąć** mechanikę,
  zanim baza zostanie zweryfikowana.
  - **`src/lib/game/preview-unverified.ts` to rusztowanie, nie baza.** 10 obiektów z partii 01,
    wartości **niezweryfikowane** — nazwa pliku i baner na ekranie mówią to wprost. Znika
    w chwili, gdy powstanie `src/data/objects/`.
  - **`src/lib/game/format.ts`** — jednostki bazowe na czytelne. Wielkości rzędu miliona idą
    przez `Intl.NumberFormat` z `notation: "compact"`, więc „mld" / „B" biorą się z locale
    i nie trzeba ich tłumaczyć. Ręcznie tłumaczone są tylko jednostki czasu.
  - **Wskaźnik rozluźnienia widoczny na ekranie.** Bez niego nie da się ocenić, czy dobór par
    działa, czy tylko udaje — przy 10 obiektach schodzi po drabinie często i to jest poprawne
    zachowanie, nie usterka.
  - **Mediana łańcucha na danych podglądowych: 10 rund**, 6 z 7 jednostek, dominacja 27 %,
    żadna jednostka nie głoduje. Zgodne z oczekiwaniem przy 10 obiektach — łańcuch bez
    powtórek nie przekroczy ich liczby.
  - **Pułapka React 19:** `setState` w efekcie do wylosowania ziarna wywala
    `react-hooks/set-state-in-effect`. Bramka hydratacji stoi na `useSyncExternalStore`
    (`() => true` na kliencie, `() => false` na serwerze) — ziarno losuje się wtedy w lazy
    initializerze `useState`, a serwer i klient renderują to samo do czasu hydratacji.
  - **Big Shoulders nie ma metryk zastępczych w Next 16** — build ostrzegał i pomijał
    generowanie fontu zastępczego, co przy nagłówku 128 px daje widoczny skok układu.
    Ustawione jawnie: `fallback` na kroje wąskie + `adjustFontFallback: false`.

## Decyzje z sesji grill-me (2026-08-11)

Punktem wyjścia były trzy propozycje właściciela. Wszystkie trzy odpadły po weryfikacji,
ale każda wskazała realny problem — i to te problemy rozstrzygnęliśmy.

- **Clerk na dane — odrzucone.** Clerk to uwierzytelnianie, nie magazyn; a konta są poza
  zakresem v1. Zostaje decyzja z `architecture-context.md`: pliki TS w repo. Powód: baza jest
  tylko do odczytu, rośnie ręcznie i wymaga review przed wejściem, bo każda liczba musi być
  prawdziwa. Git daje diff, historię i cofnięcie; baza danych żadnej z tych rzeczy bez
  dobudowania.
- **Model AI w runtime — odrzucone.** Rozbija trzy filary naraz: Daily wymaga determinizmu,
  runda ma trwać kilka sekund, a gra stoi na prawdziwości liczb. AI idzie do **tworzenia**
  bazy, gdzie zamienia research w weryfikację, a bramka człowieka zostaje.
- **Baza wektorowa — odrzucone.** Zarabia na siebie od ~100 tys. wektorów; baza kuratorowana
  ręcznie nigdy tyle nie urośnie. Ale **dystans semantyczny jest prawdziwym problemem** —
  „compare the incomparable" to dosłownie pytanie o odległość dziedzin. Rozwiązany tagami.
- **Dystans jako preferencja, nigdy jako twardy filtr.** Silnik i tak spełnia trzy warunki
  naraz; czwarty twardy zagłodziłby łańcuch przy małej bazie. Jako sortowanie nigdy nie
  zagłodzi. Ta sama zasada obowiązuje przy różnorodności jednostek.
- **Embeddingi odłożone, nie odrzucone.** Warunek wejścia: baza na tyle duża, że wybór
  realnie istnieje — przy 40 obiektach i trzech warunkach często jest jeden kandydat albo
  zero, a precyzyjna miara odległości nie ma wtedy czego rozstrzygać. Gdy przyjdzie czas:
  macierz dystansów liczona offline i zapisana kwantyzowana, bez bazy wektorowej.
- **Daily = ziarno z daty, bez serwera.** Patrz korekta w `architecture-context.md`.
- **Pasmo wartości: próg dolny, hojny sufit.** Odwrotnie niż w klasycznym Higher/Lower.
  Tam gracz zna dziedzinę, więc bliskość wartości robi trudność. W Verso niepewność jest
  wysoka już na starcie, bo obiekty są z odległych dziedzin — zbliżanie wartości zamienia
  rundę w rzut monetą, a to w grze do pierwszego błędu kończy bieg bez winy gracza.
  Próg dolny broni przy okazji przed niepewnością źródeł: przy różnicy 8 % i błędzie
  pomiaru 5 % „poprawna" odpowiedź bywa faktycznie błędna.
- **Bez krzywej progresji trudności.** Nie da się jej nastroić przed pierwszym graniem.
  `MIN_RATIO`, `MAX_RATIO` i waga kary za świeżość to stałe w `candidates.ts`.
- **Zmienność wartości jako trzecie pole przy źródle.** Data mówi „wpis ma 14 miesięcy",
  ale nie mówi, czy to problem. Bez tego rozróżnienia zostaje odświeżanie wszystkiego
  albo niczego.

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
- **Favikona rozjechana z motywem.** `src/app/icon.png` to wciąż zielony kafelek z `ArrowUpDown` —
  kolor i znak, których po podmianie motywu nie ma już nigdzie indziej. Do przerobienia na
  `src/app/icon.tsx` (`ImageResponse` z `next/og`), co wymaga skasowania dotychczasowego PNG-a;
  dwa pliki `icon.*` w jednym katalogu to konflikt tras.
- **Brak kontroli wersji.** `create-next-app` uruchomiony z `--disable-git`, repozytorium nie
  jest zainicjowane. Warto to zrobić przed pierwszą większą zmianą — dziś każde skasowanie
  pliku jest nieodwracalne.
- **Liczby symulatora są górnym ograniczeniem, nie obietnicą.** Baza syntetyczna zakłada
  wartości rozłożone logarytmicznie w każdej jednostce i dostępność jednostek według wag
  z `fixtures.ts` — obie założone przeze mnie, obie optymistyczne. Prawdziwe obiekty
  **klastrują się**: budynki i statki tłoczą się w zakresie 10–1000 m, więc próg dolny
  odetnie ich więcej, niż widać w symulacji. Wniosek „koncept nie jest strukturalnie zepsuty
  i cechy ważą więcej niż obiekty" jest solidny; liczba „40 obiektów wystarczy" wymaga
  przemierzenia na realnej bazie i może urosnąć.
- **`speed` i `area` to wąskie gardło.** Wagi dostępności w `fixtures.ts` dają im 1 i 2
  wobec 5 dla `money` i `length`, bo niewielu obiektom da się sensownie przypisać prędkość.
  Kara za świeżość celowo pcha silnik w te jednostki, czyli dokładnie tam, gdzie najłatwiej
  o zakleszczenie. Przy kuracji bazy warto dosypywać obiekty z prędkością i powierzchnią
  ponad proporcję.
- **Grafiki obiektów abstrakcyjnych** („czas istnienia ZSRR", „PKB Polski") to nierozwiązany
  problem projektowy, nie drobiazg — dotyczy sporej części bazy. Patrz `ui-context.md`.
- **Baza obiektów jest pusta.** Silnik i walidacja stoją, ale `src/data/objects/` nie istnieje —
  testy silnika biegną wyłącznie na danych syntetycznych. Do pierwszej rozgrywki brakuje
  120 zweryfikowanych wartości.
- **Kształt źródła ustalony, dobór źródeł nie.** Model wymusza URL, datę i zmienność, ale nie
  mówi, które źródła uznajemy za wiarygodne. Do rozstrzygnięcia przy pierwszej partii.
- **Dwujęzyczność nierozstrzygnięta.** `<html lang="en">` zostaje do czasu decyzji, żeby nie
  zmieniać tego dwa razy.

Pliki specyfikacji funkcji powstają w `context/feature-specs/` w miarę potrzeb — zanim
zaczniesz funkcję, sprawdź lub zaproponuj odpowiedni plik.

---
_Ostatnia aktualizacja: 2026-08-07 (stack wybrany, projekt postawiony, narzędzia zweryfikowane)_
