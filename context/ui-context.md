# UI / Design Context

Źródło prawdy dla wyglądu. Tokeny definiujemy **raz** w `src/app/globals.css` (Tailwind v4,
blok `@theme`) i odwołujemy się do nich wyłącznie przez nazwy utility (`bg-paper`, `text-ink`,
`text-accent`). Zero surowych klas kolorów Tailwinda (`neutral-*`, `zinc-*`) i zero hex
w komponentach.

## Kierunek

**Ciemny minimalizm z jednym akcentem.** Prawie czarne tło, jasna typografia, limonkowy akcent
jako jedyny kolor. System pobrany z `villo.framer.website` (2026-08-11) — decyzja właściciela,
pełna podmiana wcześniejszego kierunku „biała kartka + zielony marker".

Referencja daje: jeden neutralny grotesk, bardzo dużo powietrza, ostre krawędzie (4 px),
typografię prowadzoną wagą i skalą zamiast kolorem.

Logika podziału ról zostaje ta sama: **typografia jest spokojna, żeby akcent mógł krzyczeć.**
Gdyby krój też miał charakter, dwa głosy biłyby się o uwagę.

Przy pytaniu „dodać jeszcze jeden element?" odpowiedź brzmi nie. Ta estetyka wygrywa
odejmowaniem.

## Kolory

**Tylko motyw ciemny.** Villo przełącza się przez `prefers-color-scheme`, my bierzemy wyłącznie
jego ciemną paletę i ustawiamy ją na stałe w `:root` plus `color-scheme: dark`. Wariantu jasnego
nie ma i nie jest planowany — jedna paleta to jeden zestaw decyzji.

Baza to **semantyczne tokeny shadcn** (`background`, `foreground`, `primary`, `muted-foreground`…)
ustawione na nasze wartości — dzięki temu każdy `shadcn add` wygląda jak nasz projekt bez
tłumaczenia klas. `marker` i `alert` są tokenami własnymi, bo nie mają odpowiednika w shadcn.

| Rola | Token (utility) | Wartość | Kontrast na `#121212` |
|---|---|---|---|
| Tło | `bg-background` | `#121212` | — |
| Tekst główny | `text-foreground` | `#f0f0f0` | 16,6:1 |
| Tekst drugorzędny | `text-muted-foreground` | `#f0f0f080` | 4,86:1 — przechodzi AA |
| Marker / akcent | `text-marker` / `bg-marker` | `#e0f11f` | **15,1:1** |
| Alert | `text-alert` / `bg-alert` | `#ff2244` | 5,1:1 |
| Powierzchnia | `bg-card` | `#f0f0f01a` | — |
| Hover przycisku | `bg-accent` | `#f0f0f04d` | tekst `#f0f0f0` daje 6,5:1 |
| Obramowanie | `border-border` | `#f0f0f033` | — |
| Obrys fokusa | `ring-ring` | `#e0f11f` | 15,1:1 |

**Drabinka przezroczystości** to sposób villo na budowanie powierzchni: jeden kolor pierwszego
planu `#f0f0f0` w czterech krokach — `1a` (10 %), `33` (20 %), `4d` (30 %), `80` (50 %). Zamiast
osobnych szarości mamy jedną wartość i cztery natężenia, więc powierzchnie same trzymają się
razem.

Stany hover biorą **krok 30 %** — na `#121212` wychodzi z tego `#555555`. Dlatego hover nie
wprowadza żadnej nowej wartości do palety, tylko sięga o jeden szczebel drabinki wyżej niż
`bg-card`. Ten sam token obsługuje wszystkie warianty przycisku, więc najechanie na dowolny
z nich daje ten sam szary — również na `default`, gdzie oznacza to zejście z limonki.

**Limonka niesie tekst — to zmiana wobec poprzedniego kierunku.** Zieleń `#2df100` na bieli dawała
1,53:1 i musiała być tylko wypełnieniem; `#e0f11f` na `#121212` daje 15,1:1 w obie strony,
zarówno jako litery, jak i jako wypełnienie pod czarnym tekstem. Dlatego:

```
jako WYPELNIENIE z tekstem #121212   15,1:1   ✓ kafelek logo, przycisk glowny
jako TEKST albo kreska na tle        15,1:1   ✓ graffiti, wariant `marker`, obrys fokusa
```

Znika przez to wyjątek „obrys fokusa jest czarny, bo akcent nie ma kontrastu" — **obrys fokusa
jest teraz akcentem**.

Zaznaczenie tekstu (`::selection`) jest limonkowe z tekstem w kolorze tła.

## Typografia

**Dwa kroje, rozdzielone rolą:**

| rola | krój | utility |
|---|---|---|
| Nagłówki, wordmark | **Big Shoulders** | `font-heading` |
| Interfejs, akapity, przyciski | **DM Sans** | `font-sans` (domyślny) |

Big Shoulders to wąski krój display — dobiera się do dużych stopni i wersalików, i to jedyne
miejsce, gdzie ma sens. Poniżej ~26 px robi się ciasny i traci czytelność, więc **nie schodzi
do akapitów ani do etykiet**. Nagłówki idą wersalikami, bo w tym kroju rysunek wielkich liter
jest mocniejszy niż małych.

Podział ról zostaje ten sam co wcześniej — jeden głos prowadzi, drugi milczy. Wcześniej rolę
display niósł DM Sans wagą 900; teraz niesie ją osobny krój, a DM Sans wraca do tego, w czym
jest dobry.

`Manrope` z referencji świadomie pominięty — jest tam tylko deklaracją zastępczą
i nie trafia na ekran.

**Podzbiory obu krojów: `["latin", "latin-ext"]`.** `latin-ext` jest wymagany — bez niego polskie
znaki diakrytyczne spadają na font zastępczy i tekst rozjeżdża się w pionie. Sprawdzone, że
Big Shoulders ten podzbiór ma; zweryfikowane w zbudowanym CSS: zakres `U+100-2BA` jest obecny.

Skala przeniesiona 1:1 z villo, razem ze sparowanymi interliniami i trackingiem — dlatego
`text-*` nie wymaga dokładania `leading-*` ani `tracking-*`:

| Token | Rozmiar | Interlinia | Tracking |
|---|---|---|---|
| `text-2xs` | 10 px | 140 % | 0,08em |
| `text-sm` | 14 px | 170 % | — |
| `text-base` | 16 px | 170 % | — |
| `text-lg` | 18 px | 170 % | — |
| `text-xl` | 20 px | 140 % | — |
| `text-2xl` | 22 px | 140 % | — |
| `text-3xl` | 26 px | 130 % | — |
| `text-4xl` | 32 px | 120 % | −0,02em |
| `text-5xl` … `text-9xl` | 42 / 46 / 60 / 80 / 128 px | 110 % | −0,02em |

Reguła villo: **im większy stopień, tym ciaśniejsza interlinia i ciaśniejszy tracking.** Tekst
czytany leci na 170 %, display na 110 %.

**Cały tekst drugorzędny ma jedno wspólne traktowanie:** `text-2xs font-medium uppercase`
w `text-muted-foreground`. Linia hasła pod wordmarkiem, akapit prowadzący i treść bloku
„how it works" wyglądają identycznie — to jeden styl, nie trzy. Wcześniejsza wersja dawała
każdemu z nich inny stopień i inną wagę (18 px normal, 14 px normal, 10 px semibold), przez co
strona wyglądała na złożoną z czterech krojów zamiast dwóch.

Konsekwencja, z którą trzeba żyć: **etykieta ma 10 px i wersaliki, więc nie nadaje się na długie
zdania.** Dopóki teksty są krótkie, działa; przy dłuższym akapicie trzeba będzie dołożyć osobny
stopień do czytania — i wtedy świadomie, nie przypadkiem.

Wagi: 400 (akapit), 500 (etykieta, przycisk), 700 (nagłówek), 900 (display). Wcześniejsza
waga 300 na akapitach zniknęła — na ciemnym tle cienki krój się rozmywa.

Tracking osobno: `tracking-tight` −0,02em (display), `tracking-wide` 0,04em,
`tracking-widest` 0,08em (etykiety wersalikami).

## Zaokrąglenia

Skala z villo, gdzie 4 px jest wartością dominującą (76 wystąpień), a większe promienie obsługują
elementy okrągłe i pigułki:

| Token | Wartość |
|---|---|
| `rounded-sm` | 4 px |
| `rounded-md` | 8 px |
| `rounded-lg` | 10 px |
| `rounded-xl` | 22 px |
| `rounded-2xl` … `rounded-4xl` | 43 / 50 / 85 px |

Domyślną wartością powierzchni jest `rounded-sm`. Wcześniejsza reguła „jedna wartość na wszystko"
przestała obowiązywać, bo villo realnie używa kilku — ale trzon nadal siedzi na 4 px.

Przyciski mają **jeden promień na wszystkie rozmiary: `rounded-md` (8 px)**. Wcześniejsza wersja
skalowała promień z rozmiarem (8 / 10 / 22 px) — odrzucona jako przekombinowana: przy 22 px
przycisk czytał się jak pigułka, a nie jak przycisk.

## Przyciski — bryła i proporcje

Przyciski są **niskie, wąskie i podłużne**. To jedyny element z efektem 3D.

| rozmiar | wysokość | padding | stopień |
|---|---|---|---|
| `sm` | 32 px | 12 px | 12 px |
| `default` | 36 px | 16 px | 14 px |
| `lg` | 40 px | 20 px | 14 px |

**Przyciski nie idą wersalikami.** To zmiana wobec pierwszej wersji: rozstrzelone wersaliki
(`uppercase` + `tracking-widest`) rozpychały je na szerokość i kłóciły się z „minimalistyczne".
Etykieta jest w normalnej wielkości liter, wagą 600, bez trackingu. Wersaliki z szerokim
trackingiem zostają tam, gdzie mają sens — przy drobnych etykietach (`text-2xs`), nie na
przyciskach.

Bryłę niosą trzy tokeny cienia z `globals.css`, więc stan nie rozłazi się po klasach komponentu:

| token | stan |
|---|---|
| `shadow-raised` | spoczynek |
| `shadow-raised-hover` | najechanie, razem z `-translate-y-px` |
| `shadow-pressed` | wciśnięcie, razem z powrotem do `translate-y-0` |

Bryłę robią **dwa cienie wewnętrzne plus dwa zewnętrzne**: jasny podkreślnik u góry
(`inset 0 1px`), ciemny u dołu (`inset 0 -1px`), do tego bliski cień kontaktowy i daleki,
rozmyty. Sam zewnętrzny cień dałby naklejkę, nie bryłę — krawędzie muszą łapać światło.

Cienie są **płytkie, ale osadzone niżej niż szerzej** (2–4 px przesunięcia w dół, 3–8 px
rozmycia). Przy przycisku wysokim na 36 px mocniejsze rozmycie robi z niego klawisz; przesunięcie
w dół daje bryłę bez tego efektu.

**Każdy wariant z bryłą musi mieć wypełnienie.** `outline` i `marker` dostały `bg-card` —
wcześniej były przezroczyste i przez to ich cień czytał się wyraźnie słabiej niż cień
wypełnionego `default`, mimo że oba używały tego samego tokena. Cienie wewnętrzne rysują się
na powierzchni; bez powierzchni nie ma czego cieniować, a zewnętrzny cień pod przezroczystym
przyciskiem ginie w ciemnym tle. Dwa przyciski obok siebie muszą mieć tę samą bryłę, więc
przezroczystość odpada.

Ruch idzie w parze z cieniem: hover podnosi o 1 px i rozsuwa cień, `active` sadza przycisk
z powrotem i zamienia cień zewnętrzny na wewnętrzny. Dlatego komponent ma `transition-all`,
a nie `transition-colors`.

`ghost` i `link` bryły nie dostają — to warianty tekstowe, cień zrobiłby z nich przyciski.

## Szerokości

`max-w-narrow` 550 px (akapit prowadzący) · `max-w-content` 928 px (kolumna treści) ·
`max-w-page` 1200 px (punkt, w którym villo przestaje rosnąć).

Odstępy zostają na domyślnej skali Tailwinda — villo operuje wielokrotnościami 4 px
(10, 20, 24, 32, 40, 56, 64, 80), więc `gap-2.5` … `gap-20` pokrywają je bez własnych tokenów.

## Ikony

**Wyłącznie `lucide-react`.** Nie rysujemy własnych ikon i nie mieszamy zestawów.

| miejsce | ikona |
|---|---|
| logo | `Sparkle` — pełna czterokońcowa gwiazdka, `fill="currentColor"` + `strokeWidth={0}` |
| blok „how it works" | `ArrowRightLeft` — obiekt przechodzi w prawo→lewo i zmienia cechę |

Logo to **limonkowa gwiazdka nad wordmarkiem „VERSO" wersalikami w wadze 900**, pod spodem linia
hasła kapitalikami. Kafelek zniknął: na ciemnym tle akcent ma 15,1:1, więc znak nie potrzebuje
podkładki, żeby się wybić — to ta sama zmiana, co przy obrysie fokusa.

`Sparkle` jest ikoną stroke'ową, więc solidną bryłę robimy przez `fill="currentColor"`
i `strokeWidth={0}` naraz — samo `fill` zostawia widoczny kontur.

Wcześniejsze logo (`ArrowUpDown` na zielonym kafelku) odrzucone razem z zieloną paletą.
Odrzucone przy tamtym wyborze i nadal nieaktualne: `scale`, `chevrons-up-down`,
`unfold-vertical`, `arrow-up-narrow-wide`, `git-compare-arrows`, `trending-up-down`.

**Favikona jest generowana z kodu**, nie leży jako binarka: `src/app/icon.tsx` (`ImageResponse`
z `next/og`, 64 × 64, gwiazdka `#e0f11f` na kafelku `#121212`). Poprzedni `src/app/icon.png`
skasowany — dwa pliki `icon.*` w jednym katalogu to konflikt tras, a przy okazji znika binarka,
która przy każdej zmianie palety rozjeżdżała się po cichu.

Kafelek zostaje **tylko w favikonie**: sam znak na przezroczystym tle gubi się na jasnym pasku
kart przeglądarki. Na stronie tła pod znakiem nie ma.

## System graffiti

`src/components/graffiti.tsx` — dwa znaki: `Underline` i `Circle`. To jedyne własne SVG
w projekcie; wszystko, co jest ikoną, bierzemy z `lucide-react`.

Te dwa zostają, bo **nie są ikonami, tylko śladami nanoszonymi na tekst** — lucide nie ma
odpowiednika, a ich sens polega na tym, że wyglądają na postawione ręką. `ArrowUp` i `Burst`
usunięte: pełniły rolę ikon, a tę przejął lucide.

Reguły, bez których to przestaje wyglądać na marker:

- **wyłącznie obrys (`stroke`), nigdy wypełnienie** — marker rysuje linie, nie plamy
- **ścieżki celowo niesymetryczne**, końce zachodzą na siebie; idealna elipsa czyta się
  jak ikona z biblioteki, nie jak ruch ręki
- **kolor z `currentColor`** — steruje nim klasa `text-*` rodzica, więc znak działa
  na każdym tle bez wariantów
- **`aria-hidden="true"`** — to ozdoba, czytnik ekranu nie ma tu czego ogłaszać
- `strokeLinecap="round"` wszędzie: marker nie ma ostrych końców

Pozycjonowanie nad tekstem — **wszystkie wymiary w `em`, nigdy w pikselach.** Znak ma się
skalować razem ze stopniem pisma, który obrysowuje.

| znak | klasy |
|---|---|
| `Circle` | `absolute top-1/2 left-1/2 h-[2.4em] w-[calc(100%+1.6em)] -translate-x-1/2 -translate-y-1/2` |
| `Underline` | `absolute bottom-[-0.25em] left-0 h-[0.36em] w-full` |

Powód jest z doświadczenia: obie wersje pikselowe rozjechały się przy pierwszej zmianie
typografii — pętla po zejściu tekstu z 14 px na 10 px zaczęła siedzieć pod literami zamiast
na nich, a podkreślenie miało osobne wartości na dwa breakpointy, które trzeba było pilnować
ręcznie. W `em` obie wartości breakpointowe okazały się tą samą liczbą (0,25em i 0,36em),
więc wariant `sm:` zniknął sam.

`Circle` centruje się przez `top-1/2` + `-translate-y-1/2`, a nie przez `-inset-y`. Środek
pudełka linii jest o pół piksela niżej niż środek wersalików — na tyle blisko, że nie widać,
i na tyle stabilnie, że nie zależy od kroju.

Rozmiar bierze się **albo** z `inset`, **albo** z `h`/`w` — nigdy z obu naraz, bo reguły
się nadpisują.

## Anatomia ekranu pojedynku

`[do zaprojektowania]` — powstanie przy pierwszym ekranie gry.

```
┌─────────────────────┬─────────────────────┐
│     [ grafika ]     │     [ grafika ]     │
│      POLSKA         │    TAYLOR SWIFT     │ ← nazwa obiektu
│  liczba mieszkańców │ miesięczni słuchacze│ ← cecha, mała
│      38 mln         │        ???          │ ← liczba, dominanta
└─────────────────────┴─────────────────────┘
              L U D Z I E                     ← jednostka, wspólna
```

**Jednostka na środku została usunięta** (2026-08-11, decyzja właściciela). Powyższy szkic
opisuje stan sprzed zmiany; zostawiam go, bo pokazuje, co ta etykieta niosła.

Pytanie „co my właściwie porównujemy" niesie teraz **etykieta cechy przy każdej karcie**
(„wysokość", „długość granicy") plus **przyrostek przy odsłoniętej wartości** (`m`, `km`,
`USD`). Ryzyko zostaje i warto je znać: przed odsłonięciem prawa karta pokazuje `?` bez
przyrostka, więc gracz zna jednostkę tylko z etykiet. Gdyby to okazało się mylące, etykieta
jednostki wraca — ale nie na środek, bo środek zajęła teraz odsłona werdyktu.

**Layout:** desktop — karty obok siebie · mobile — jedna nad drugą.

## Co wynika z „kilku sekund na decyzję"

- gracz nie powinien musieć czytać zdania, żeby zrozumieć rundę
- liczba jest dominantą wizualną, wszystko inne jest podpisem
- nic nie powinno wymagać przewijania ani celowania w mały element
- przejście do kolejnej rundy nie może wymagać osobnego kliknięcia „dalej"

## Grafiki obiektów — problem do rozwiązania

Obiekty dzielą się na dwie grupy i to nie po równo:

```
MAJĄ OCZYWISTY OBRAZ          NIE MAJĄ ŻADNEGO
Burj Khalifa                  czas istnienia ZSRR
Taylor Swift                  koszt produkcji GTA V
płetwal błękitny              PKB Polski
```

Druga grupa to spora część bazy, więc **nie może być traktowana jako brak grafiki**.
Potrzebne będą dwa równorzędne warianty karty, nie jeden wariant plus stan awaryjny.

`[do zaprojektowania]` Jak wygląda karta obiektu abstrakcyjnego.

## Ruch — ekran pojedynku

GSAP wchodzi tutaj i tylko tutaj. Cztery animacje, każda niesie znaczenie:

| ruch | stała | czas | krzywa | po co |
|---|---|---|---|---|
| naliczanie wartości | `COUNT_UP`, `COUNT_EASE` | 2,5 s | `power4.out` | szybko na starcie, mocne wyhamowanie na końcu — napięcie przed liczbą |
| błysk werdyktu | — | 0,15 s + 0,45 s | — | limonka przy trafieniu, czerwień przy błędzie |
| znak werdyktu | — | 0,3 s | `back.out(2)` | `Check` albo `X`, wyskakuje ze skali 0,5 |
| przejście kart | `SLIDE` | 0,55 s | `power2.inOut` | prawa wchodzi na miejsce lewej, lewa wypada, nowa wjeżdża z prawej |
| pauza przed menu końca | `GAME_OVER_HOLD` | 1,8 s | — | czas na zobaczenie `X` i odsłoniętej liczby, zanim zakryje je menu |

Wszystkie cztery stałe stoją na górze `duel.tsx` i są jedynym miejscem do strojenia tempa.

**Naliczanie zamiast pojawienia się liczby** jest tu sednem, nie ozdobą. Odsłona jest jedynym
momentem rundy, w którym gracz czeka — liczba, która po prostu się pojawia, zabiera ten moment.
Wyhamowanie na końcu robi to samo, co bęben przed werdyktem.

**Granicą widocznego hamowania nie jest krzywa, tylko precyzja zapisu.** Liczby idą przez
notację zwartą z jednym miejscem po przecinku, więc „7 mln" obejmuje wszystko od 6,95 do 7,04.
Gdy wartość wejdzie w ten przedział, tekst przestaje się zmieniać, choć tween nadal biegnie.
Mocniejsze wyhamowanie (`expo.out`, `power4.out`) wchodzi w ten przedział **wcześniej**, więc
wydłuża moment, w którym nic się nie rusza, zamiast wydłużać widoczne zwalnianie.

Dziś nie przeszkadza, bo błysk werdyktu startuje 0,3 s przed końcem naliczania i przykrywa
ogon. Gdyby trzeba było iść dalej w „wolniejszy koniec", właściwym ruchem jest **więcej miejsc
po przecinku w trakcie animacji**, nie ostrzejsza krzywa.

**Przejście robi trzy rzeczy naraz** i dlatego jest czytelne: prawa karta przesuwa się
o `xPercent: -100`, czyli dokładnie o własną szerokość, więc ląduje tam, gdzie stała lewa.
Lewa wypada w `-110` z zanikiem. Nowa wjeżdża z `100`. To jest wizualny zapis rdzenia gry —
odsłonięty obiekt zostaje i staje się punktem odniesienia.

Werdykt jest **limonką, nie zielenią**. Paleta ma jeden akcent i drugi kolor alertu; trzeci
byłby wyłomem w „minimalizm z jednym akcentem". Limonka na `#121212` czyta się jako
potwierdzenie, a czerwień `#ff2244` jako błąd.

**Ograniczenie:** przejście jest poziome także na wąskim ekranie, gdzie karty stoją jedna nad
drugą. Kierunek „w lewo" nadal czyta się jako wyjście, ale metafora „prawa staje się lewą"
na mobile nie działa. Do rozstrzygnięcia, gdy ekran zobaczy telefon.

## Ruch — przejścia między ekranami

`src/components/transition.tsx`. Siedem limonkowych kolumn na całą wysokość, `z-50`, ponad
wszystkim. Jeden ruch w dwóch połowach:

```
ZASŁONIĘCIE   origin: bottom   scaleY 0 → 1   rosną w górę
              stagger from: "center"          od środka na boki
                    ↓ dopiero teraz router.push
ODSŁONIĘCIE   origin: top      scaleY 1 → 0   kurczą się w górę
              stagger from: "center"          ten sam porządek
```

**Zamiana punktu zaczepienia z `bottom` na `top` jest tu wszystkim.** Obie połowy biegną
wtedy w tę samą stronę — ekran wygląda, jakby jedna płachta przejechała po nim w górę,
a nie jakby coś urosło i opadło.

`stagger: { from: "center" }` daje rozejście od środka. Siedem kolumn to liczba nieparzysta,
więc środek jest kolumną, a nie szczeliną — rozejście wychodzi symetryczne.

**Nawigacja czeka na animację.** `router.push` odpala się w `onComplete` zasłaniania, więc
gracz nigdy nie zobaczy pustego ekranu w trakcie ładowania. Odsłonięcie rusza po zmianie
`usePathname()`, ale tylko gdy ustawiona jest flaga `arriving` — bez niej kolumny mrugnęłyby
przy pierwszym wejściu na stronę.

Objęte przejściem: „Endless" ze strony głównej i „Wróć na stronę główną" z ekranu przegranej.
**Nieobjęte:** przycisk „Daily" (nie prowadzi jeszcze nigdzie), przełącznik języka oraz przyciski
wstecz/dalej przeglądarki — tamte zmieniają `pathname` bez flagi, więc idą bez animacji.

**Nie ma obsługi `prefers-reduced-motion`.** Pełnoekranowe przetarcie to dokładnie ten rodzaj
ruchu, który przeszkadza osobom wrażliwym na animacje. Do dołożenia przez `gsap.matchMedia()`.

## Jeszcze nieustalone

Sposób oznaczania jednostki na ekranie pojedynku (kolor? ikona? sam napis?) · forma animacji
odsłony · wariant karty typograficznej · stan po błędnej odpowiedzi · favikona.
