# Project Overview

## Co budujemy

Webowa gra Higher/Lower. Gracz dostaje dwa pozornie niepowiązane obiekty sprowadzone
do wspólnej jednostki i wskazuje, który ma większą wartość.

Robocza nazwa: **Verso**. Hasło: **„Compare the incomparable."**

```
   POLSKA                    TAYLOR SWIFT
   38 mln                        ???
   mieszkańcy               miesięczni słuchacze
              L U D Z I E
```

## Status projektu — ważne dla każdej decyzji

**Faza koncepcyjna. Nie ma jeszcze ani linijki kodu.**

Stack, architektura i źródła danych są **świadomie nieokreślone** — patrz
`architecture-context.md`. Nie wybieraj ich samodzielnie.

Decyzje projektowe podejmujemy **na bieżąco, w trakcie budowania**, nie z góry.
Kiedy decyzja zapadnie, trafia do `progress-tracker.md` razem z powodem.

## Jak działa gra

Rdzeń, z którego wynika reszta:

**Ciągłość łańcucha trzyma obiekt, nie jednostka.** Odsłonięty obiekt przechodzi na lewo
jako punkt odniesienia następnej rundy, ale mierzony jest **inną cechą w innej jednostce**.

```
R1  [Polska · mieszkańcy 38 mln]       vs  [Taylor Swift · słuchacze ???]   LUDZIE
R2  [Taylor Swift · majątek 1,6 mld $] vs  [Burj Khalifa · koszt ???]       MONEY
R3  [Burj Khalifa · wysokość 828 m]    vs  [Titanic · długość ???]          DŁUGOŚĆ
     └────── ten sam obiekt, nowa cecha, nowa jednostka ──────┘
```

To rozwiązuje konflikt, którego nie da się obejść inaczej: klasyczny Higher/Lower trzyma
ciągłość jednostką, więc zostawienie obiektu zamyka kolejne rundy w tej samej kategorii.
Przeniesienie ciągłości na obiekt daje drabinę **i** zmianę jednostki co rundę.

**Konsekwencja dla danych:** każdy obiekt musi mieć minimum 2 cechy w minimum 2 różnych
jednostkach — raz występuje jako zakryty pretendent, raz jako odsłonięty punkt odniesienia.

## Jednostki

`people` · `money` · `length` · `weight` · `time` · `speed` · `area`

W obrębie jednej rundy jednostka jest zawsze wspólna. Zmienia się między rundami.

## Dla kogo

Gracz mobilny, wchodzący z linku lub z mediów społecznościowych, grający w przerwie.
Nie chce się uczyć zasad ani zakładać konta — chce kliknąć i grać.

Kluczowe: **jedna decyzja ma zajmować kilka sekund**. To nie jest preferencja estetyczna,
tylko wymaganie konstrukcyjne — z niego wynikają późniejsze decyzje o interfejsie.

## Cel

Efekt **„serio?!"** — zaskoczenie ze zderzenia odległych dziedzin. To kryterium
rozstrzygające przy sporach projektowych: jeśli zmiana zwiększa wygodę, ale zmniejsza
szansę na zaskoczenie, jest zła.

```
MOCNE   koszt GTA V vs koszt Burj Khalifa     rozrywka × architektura
SŁABE   koszt GTA V vs koszt RDR2             ta sama dziedzina → zwykły quiz
```

## Zakres v1

- Tryb **Endless** — gra do pierwszego błędu, waluta to streak
- Tryb **Daily** — ten sam zestaw dla wszystkich danego dnia, wynik trafia do rankingu
- Baza obiektów z cechami w siedmiu jednostkach
- Ekran pojedynku: dwie karty, jednostka, animowana odsłona wartości
- Krótkie „Did you know?" po odpowiedzi

## Poza zakresem v1

- Konta użytkowników i logowanie
- Tryb wieloosobowy / pojedynki ze znajomymi
- Kategorie tematyczne wybierane przez gracza
- Monetyzacja

## Kryteria sukcesu

Gra jest gotowa, gdy: runda trwa kilka sekund bez uczucia pośpiechu, łańcuch nie rwie się
przez całą sesję, obie mechaniki trybów działają, a nowy gracz rozumie zasadę bez czytania
instrukcji dłuższej niż jedno zdanie.
