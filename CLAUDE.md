@AGENTS.md

# Verso

Webowa gra Higher/Lower. Gracz porównuje pozornie niepowiązane obiekty sprowadzone
do wspólnej jednostki. Hasło: **„Compare the incomparable."**

**Projekt postawiony, gra jeszcze nie zbudowana.** Stack: Next.js 16 + React 19 +
TypeScript + Tailwind v4 + GSAP, testy w Vitest, pnpm.

## Zanim cokolwiek zrobisz

Przeczytaj `context/progress-tracker.md` — mówi, gdzie stanął projekt.

| plik | co zawiera |
|---|---|
| `context/progress-tracker.md` | **czytaj pierwszy** — faza, co zrobione, co dalej |
| `context/project-overview.md` | co budujemy, dla kogo, zakres v1 |
| `context/ai-workflow-rules.md` | jak pracować nad tym projektem |
| `context/architecture-context.md` | stack i architektura — dziś nierozstrzygnięte |
| `context/code-standards.md` | reguły kodu |
| `context/ui-context.md` | kierunek wizualny |
| `context/feature-specs/` | specyfikacje funkcji — powstają przed kodem |

## Dwie zasady, które łatwo złamać

1. **Nie wybieraj technologii samodzielnie.** Stack, architektura i źródła danych są
   świadomie odłożone. Decyzje podejmujemy po kolei, w trakcie budowania.
2. **Zero obiektów i wartości zaszytych w kodzie.** Obiekty, cechy, liczby i teksty
   to dane, nie kod — nawet tymczasowo, nawet do testu.
3. **Zero komentarzy w kodzie.** Żadnych `//`, `/* */` ani JSDoc — także w plikach
   konfiguracyjnych. Uzasadnienia idą do `context/`, nie do źródeł.

## Commity

**Nie commituj samodzielnie.** Po zmianie pokaż, co się zmieniło i jak działa,
zaproponuj wiadomość w czacie i zatrzymaj się — review i commit należą do właściciela.

Format: jedna linia, po angielsku, z przedrostkiem — `chore: init project`.
Bez opisu; uzasadnienia idą do `context/progress-tracker.md`.
Pełna konwencja: `context/code-standards.md`, sekcja `git`.

## Rdzeń, którego nie wolno „uprościć"

Ciągłość łańcucha trzyma **obiekt**, nie jednostka. Odsłonięty obiekt zostaje punktem
odniesienia następnej rundy, ale mierzony jest **inną cechą w innej jednostce**.
Z tego wynika wymóg: każdy obiekt potrzebuje min. 2 cech w min. 2 różnych jednostkach.

Szczegóły: `context/project-overview.md`.
