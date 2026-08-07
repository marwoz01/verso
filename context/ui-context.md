# UI / Design Context

Źródło prawdy dla wyglądu. Tokeny definiujemy **raz** w `src/app/globals.css` (Tailwind v4,
blok `@theme`) i odwołujemy się do nich wyłącznie przez nazwy utility (`bg-paper`, `text-ink`,
`text-accent`). Zero surowych klas kolorów Tailwinda (`neutral-*`, `zinc-*`) i zero hex
w komponentach.

## Kierunek

**Minimalizm z jednym akcentem.** Biała kartka, czarna typografia, zielony marker jako jedyny
kolor. Referencja: `artemartemartem.com` — duża, ciasno złożona typografia, bardzo dużo
powietrza, ręczne elementy dające ciepło.

Logika podziału ról: **typografia jest spokojna, żeby marker mógł krzyczeć.** Gdyby krój też
miał charakter, dwa głosy biłyby się o uwagę. Dlatego neutralny grotesk plus jeden mocny,
odręczny akcent.

Przy pytaniu „dodać jeszcze jeden element?" odpowiedź brzmi nie. Ta estetyka wygrywa
odejmowaniem.

## Kolory

| Rola | Token (utility) | Wartość | Kontrast na bieli |
|---|---|---|---|
| Tło | `bg-paper` | `#ffffff` | — |
| Tekst główny | `text-ink` | `#0b0b0b` | 19,5:1 |
| Tekst drugorzędny | `text-ink-muted` | `#5c5c5c` | 6,4:1 — przechodzi AA |
| Marker (dekoracja) | `text-accent` / `border-accent` | `#00d26a` | **1,9:1 — nigdy pod tekst** |
| Zielony tekstowy | `text-accent-ink` | `#00713a` | 6,1:1 — przechodzi AA |

**Dwa zielone to nie niedopatrzenie.** `accent` jest wystarczająco jaskrawy, żeby czytać się
jak marker, ale na bieli daje 1,9:1 — tekst w tym kolorze byłby nieczytelny. Dlatego istnieje
`accent-ink`: ten sam zielony przyciemniony do progu AA, wyłącznie pod litery.

Zaznaczenie tekstu (`::selection`) i obrys fokusa też są zielone — marker działa wszędzie.

## Typografia

**Inter Tight** (`next/font/google`), jeden krój na wszystko, zróżnicowany wagą i skalą.

Wybrany, bo jest neutralny i ciasny: wąskie światła pozwalają złożyć wielki nagłówek bez
rozjeżdżania się w szerokość, a brak charakteru zostawia scenę markerowi.

**Podzbiory: `["latin", "latin-ext"]`.** `latin-ext` jest wymagany — bez niego polskie znaki
diakrytyczne spadają na font zastępczy i tekst rozjeżdża się w pionie. `create-next-app` ma
ten błąd domyślnie.

| Rola | Klasy |
|---|---|
| Znak (wordmark) | `text-6xl sm:text-8xl font-extrabold tracking-tighter uppercase leading-[0.85]` |
| Nagłówek | `text-3xl sm:text-5xl font-bold tracking-tight` |
| Etykieta / meta | `text-xs sm:text-sm font-medium tracking-[0.15em] uppercase` |
| Akapit | `text-base sm:text-lg leading-relaxed` |
| Przycisk | `text-base font-bold tracking-wide uppercase` |

Kontrast między ogromnym, ciasnym znakiem a maleńkim, rozstrzelonym tekstem meta **jest** tym
kierunkiem, nie dodatkiem do niego.

## System graffiti

`src/components/graffiti.tsx` — cztery znaki: `ArrowUp`, `Underline`, `Circle`, `Burst`.
To jedyny element dekoracyjny w całym projekcie.

Reguły, bez których to przestaje wyglądać na marker:

- **wyłącznie obrys (`stroke`), nigdy wypełnienie** — marker rysuje linie, nie plamy
- **ścieżki celowo niesymetryczne**, końce zachodzą na siebie; idealna elipsa czyta się
  jak ikona z biblioteki, nie jak ruch ręki
- **kolor z `currentColor`** — steruje nim klasa `text-*` rodzica, więc znak działa
  na każdym tle bez wariantów
- **`aria-hidden="true"`** — to ozdoba, czytnik ekranu nie ma tu czego ogłaszać
- `strokeLinecap="round"` wszędzie: marker nie ma ostrych końców

Pozycjonowanie nad tekstem: rozmiar bierze się **albo** z `inset`, **albo** z `h`/`w` —
nigdy z obu naraz, bo reguły się nadpisują.

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

Jednostka jest wspólna dla obu kart, więc stoi raz, pośrodku. Cecha jest różna po każdej
stronie, więc stoi przy karcie. Bez obu gracz nie wie, co porównuje: „mieszkańcy"
i „słuchacze" to ta sama jednostka, ale nie to samo pytanie.

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

## Jeszcze nieustalone

Sposób oznaczania jednostki na ekranie pojedynku (kolor? ikona? sam napis?) · forma animacji
odsłony · wariant karty typograficznej · stan po błędnej odpowiedzi · favikona.
