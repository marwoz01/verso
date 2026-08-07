# Feature Specs

Specyfikacje pojedynczych funkcji. Jeden plik = jedna funkcja, nazwa po odpowiedzialności:
`round-loop.md`, `pair-engine.md`, `daily-mode.md`, `value-reveal.md`.

## Po co to jest

Kolejność jest celowa: **najpierw spec, potem kod**. Krótki opis uzgodniony przed pisaniem
zamyka pytania, których inaczej nikt nie zada, a które i tak wyjdą — tyle że w połowie
implementacji albo po niej.

Zgodnie z `ai-workflow-rules.md` (sekcja „Think Before Coding"): jeśli zaczynasz funkcję
i nie ma dla niej pliku, zaproponuj krótką specyfikację i poczekaj na potwierdzenie, zanim
napiszesz pierwszą linijkę.

**To jest miejsce, w którym podejmujemy decyzje projektowe** — jedna funkcja naraz, wtedy
gdy do niej dochodzimy. Nie w `project-overview.md` i nie z góry.

## Szablon

```markdown
# <Nazwa funkcji>

## Problem
Co gracz chce osiągnąć i dlaczego dziś nie może.

## Zakres
Co wchodzi. Równie ważne: co świadomie NIE wchodzi.

## Dane
Których pól modelu obiektu dotyczy. Czy trzeba coś dodać.

## Zachowanie
Ścieżka szczęśliwa krok po kroku. Potem przypadki brzegowe:
brak kandydata w bazie, brak grafiki, wartości zbyt bliskie, koniec sesji.

## UI
Co z `ui-context.md` obowiązuje. Zachowanie mobile-first.

## Kryteria akceptacji
Sprawdzalne warunki — takie, które da się zaobserwować, nie „ma działać".
```

## Zasada

Kryteria akceptacji muszą dać się **zaobserwować**, nie wywnioskować. Sukces polecenia
nie jest dowodem, że polecenie zrobiło swoje — dowodem jest odczytany wynik.
