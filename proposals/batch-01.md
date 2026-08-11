# Partia 01 — 10 obiektów, 31 wartości do weryfikacji

> **Nic z tego pliku nie wchodzi do gry, dopóki nie odhaczysz wiersza.** Wartości pochodzą
> z pamięci modelu i część z nich jest błędna — to założenie robocze, nie ostrzeżenie
> asekuracyjne. Po weryfikacji zamieniam ten plik na pliki w `src/data/objects/`.

Kolumna **„wyświetlana"** istnieje po to, żebyś porównywał z tym, co pisze źródło.
Kolumna **„bazowa"** to liczba, która trafia do kodu — przeliczam ją sam po Twoim „ok",
żeby nie mnożyć okazji do pomyłki.

Legenda pewności: **A** — liczba kanoniczna, spór mało prawdopodobny ·
**B** — powszechnie cytowana, ale warto spojrzeć · **C** — zgaduję, sprawdź uważnie.

---

## Zanim zaczniesz — trzy pułapki w tej partii

**Tonaż statku to nie masa.** Titanic bywa opisywany jako „46 328 ton" — to *Gross Register
Tonnage*, miara **objętości**, nie wagi. Do jednostki `weight` idzie **wyporność** (~52 310 t).
Wzięcie GRT wsadziłoby do gry liczbę w złej jednostce, a gra by tego nie wykryła.

**Prędkość geparda jest sporna.** Krąży 120 km/h, ale pomiary terenowe dają ~93–104 km/h.
Wybierz jedną wartość i jedno źródło, bo to jest cecha, którą gracz „zna" i wychwyci.

**Koszty historyczne mają dwie liczby.** Titanic „7,5 mln USD" to kwota z 1912 r., nie
dzisiejsza. Trzymajmy kwoty **nominalne z roku budowy** i zapisujmy rok w `retrievedAt` —
inaczej za rok nikt nie odtworzy, czy liczba była już waloryzowana.

---

## 1. Burj Khalifa · `architecture`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | wysokość | `length` | 828 m | 828 | static | A | https://en.wikipedia.org/wiki/Burj_Khalifa |
| ☐ | koszt budowy | `money` | 1,5 mld USD | 1_500_000_000 | static | B | https://en.wikipedia.org/wiki/Burj_Khalifa |
| ☐ | powierzchnia użytkowa | `area` | 309 473 m² | 309_473 | static | B | https://en.wikipedia.org/wiki/Burj_Khalifa |

## 2. Titanic · `transport`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | długość | `length` | 269,1 m | 269.1 | static | A | https://en.wikipedia.org/wiki/Titanic |
| ☐ | wyporność | `weight` | 52 310 t | 52_310_000 | static | B | https://en.wikipedia.org/wiki/Titanic |
| ☐ | czas tonięcia | `time` | 2 h 40 min | 9_600 | static | A | https://en.wikipedia.org/wiki/Sinking_of_the_Titanic |
| ☐ | koszt budowy (1912) | `money` | 7,5 mln USD | 7_500_000 | static | B | https://en.wikipedia.org/wiki/Titanic |

## 3. Płetwal błękitny · `nature`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | długość | `length` | 30 m | 30 | static | B | https://en.wikipedia.org/wiki/Blue_whale |
| ☐ | masa | `weight` | 150 t | 150_000 | static | B | https://en.wikipedia.org/wiki/Blue_whale |
| ☐ | prędkość pływania | `speed` | ~32 km/h | 9 | static | C | https://en.wikipedia.org/wiki/Blue_whale |

## 4. Polska · `geography`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | liczba mieszkańców | `people` | 37,6 mln | 37_600_000 | slow | B | https://stat.gov.pl/ |
| ☐ | powierzchnia | `area` | 312 696 km² | 312_696_000_000 | static | A | https://stat.gov.pl/ |
| ☐ | PKB nominalne | `money` | ~810 mld USD | 810_000_000_000 | fast | C | https://data.worldbank.org/country/poland |

## 5. Międzynarodowa Stacja Kosmiczna · `space`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | prędkość orbitalna | `speed` | 27 600 km/h | 7_660 | static | A | https://en.wikipedia.org/wiki/International_Space_Station |
| ☐ | masa | `weight` | ~420 t | 419_725 | slow | B | https://en.wikipedia.org/wiki/International_Space_Station |
| ☐ | okres orbitalny | `time` | 93 min | 5_580 | static | A | https://en.wikipedia.org/wiki/International_Space_Station |

## 6. Mount Everest · `nature`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | wysokość n.p.m. | `length` | 8 849 m | 8_849 | static | A | https://en.wikipedia.org/wiki/Mount_Everest |
| ☐ | liczba zdobywców | `people` | ~6 000 osób | 6_000 | slow | C | https://en.wikipedia.org/wiki/List_of_Mount_Everest_summiters |
| ☐ | typowa długość wyprawy | `time` | ~60 dni | 5_184_000 | static | C | https://en.wikipedia.org/wiki/Mount_Everest |

## 7. Wieża Eiffla · `architecture`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | wysokość | `length` | 330 m | 330 | static | A | https://en.wikipedia.org/wiki/Eiffel_Tower |
| ☐ | masa konstrukcji | `weight` | 10 100 t | 10_100_000 | static | B | https://en.wikipedia.org/wiki/Eiffel_Tower |
| ☐ | zwiedzający rocznie | `people` | ~7 mln | 7_000_000 | slow | B | https://www.toureiffel.paris/en |

## 8. Gepard · `nature`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | prędkość maksymalna | `speed` | ~104 km/h | 29 | static | C | https://en.wikipedia.org/wiki/Cheetah |
| ☐ | masa | `weight` | 50 kg | 50 | static | B | https://en.wikipedia.org/wiki/Cheetah |
| ☐ | długość życia na wolności | `time` | ~12 lat | 378_432_000 | static | C | https://en.wikipedia.org/wiki/Cheetah |

## 9. Watykan · `geography`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | powierzchnia | `area` | 0,44 km² | 440_000 | static | A | https://en.wikipedia.org/wiki/Vatican_City |
| ☐ | liczba mieszkańców | `people` | ~764 osoby | 764 | slow | B | https://en.wikipedia.org/wiki/Vatican_City |
| ☐ | długość granicy | `length` | 3,2 km | 3_200 | static | B | https://en.wikipedia.org/wiki/Vatican_City |

## 10. Usain Bolt · `sport`

| ✓ | cecha | jednostka | wyświetlana | bazowa | zmienność | pewność | źródło |
|---|---|---|---|---|---|---|---|
| ☐ | rekord świata na 100 m | `time` | 9,58 s | 9.58 | static | A | https://worldathletics.org/records/by-category/world-records |
| ☐ | prędkość szczytowa | `speed` | ~44,2 km/h | 12.27 | static | B | https://worldathletics.org/ |
| ☐ | wzrost | `length` | 1,95 m | 1.95 | static | A | https://worldathletics.org/ |

---

## Co ta partia daje silnikowi

Dobierałem obiekty pod **pokrycie jednostek**, nie pod atrakcyjność — przy pustej bazie
to jednostki rzadkie decydują, czy łańcuch w ogóle ruszy:

```
length   7 obiektow      time     5 obiektow
weight   5 obiektow      speed    4 obiekty
people   4 obiekty       money    3 obiekty
area     3 obiekty
```

Każda jednostka ma co najmniej 3 obiekty, czyli minimum, przy którym runda w tej jednostce
da się w ogóle rozegrać, a łańcuch ma dokąd pójść dalej. `speed` i `area` dostały świadomie
więcej uwagi, niż wynikałoby z proporcji — to wąskie gardło opisane w `progress-tracker.md`.

Dziedziny wyszły wąsko: `nature` 3, `architecture` 2, `geography` 2, `transport`, `space`,
`sport` po jednym. Na „compare the incomparable" to za mało i **następna partia powinna iść
w drugą stronę** — muzyka, film, gospodarka, technologia — nawet kosztem gorszego pokrycia
jednostek, bo bazowe pokrycie już będzie stało.

## Jak to odhaczać

1. Otwórz źródło, znajdź liczbę, porównaj z kolumną „wyświetlana".
2. Zgadza się → `☐` na `☑`. Nie zgadza się → wpisz poprawną wartość obok, nie kasuj wiersza.
3. Wiersz nie do zweryfikowania w rozsądnym czasie → skreśl. Lepiej mieć 28 pewnych wartości
   niż 31, z których trzech nikt nie sprawdził.
4. Odeślij plik — zamieniam go na `src/data/objects/*.ts` i przemierzam symulator
   na prawdziwych danych.

**Jeśli wypadnie cały obiekt**, zostaje mu mniej niż 3 cechy i nie przejdzie walidacji —
wtedy albo dokładamy mu czwartą cechę, albo wypada z partii. Walidacja to złapie
(`pnpm test:run`), więc nie da się tego przeoczyć.

## Czego ten plik nie rozstrzyga

**Które źródła uznajemy za wiarygodne.** Wpisałem głównie Wikipedię, bo jest szybka
do sprawdzenia — ale przy wartościach spornych (gepard, PKB) trzeba zejść do przypisu
i wziąć źródło pierwotne. Decyzja o standardzie źródeł jest wciąż otwarta
w `progress-tracker.md` i ta partia jest dobrym momentem, żeby ją podjąć na konkretach.
