# UI / Design Context

Kierunek wizualny. **Tokenów, palety ani typografii jeszcze nie ma** — powstaną, gdy dojdziemy
do pierwszego ekranu. Dziś ten plik trzyma tylko to, co wynika wprost z konceptu.

## Kierunek

**Mocny minimalizm.** Głównym elementem interfejsu są dwa duże porównywane obiekty:
grafika, nazwa, jednostka i wielka liczba. Nic poza tym.

Logika tego wyboru: decyzja ma zajmować kilka sekund. Każdy element, który trzeba przeczytać
albo zinterpretować, zjada ten budżet. Interfejs, który „nic nie robi", jest tu funkcją,
nie stylem.

Kiedy pojawia się pytanie „dodać jeszcze jeden element?" — odpowiedź brzmi nie.

## Anatomia ekranu

```
┌─────────────────────┬─────────────────────┐
│     [ grafika ]     │     [ grafika ]     │
│                     │                     │
│      POLSKA         │    TAYLOR SWIFT     │ ← nazwa obiektu
│  liczba mieszkańców │ miesięczni słuchacze│ ← cecha, mała
│                     │                     │
│      38 mln         │        ???          │ ← liczba, dominanta
└─────────────────────┴─────────────────────┘
              L U D Z I E                     ← jednostka, wspólna
```

Dwie informacje, dwa miejsca — i to nie jest kosmetyka:

- **jednostka jest wspólna** dla obu kart, więc stoi raz, pośrodku
- **cecha jest różna** po każdej stronie, więc stoi przy karcie

Bez obu gracz nie wie, co porównuje: „mieszkańcy" i „słuchacze" to ta sama jednostka,
ale nie to samo pytanie.

**Layout:** desktop — karty obok siebie · mobile — jedna nad drugą.

## Co wynika z „kilku sekund na decyzję"

Wymaganie z `project-overview.md`, przełożone na interfejs:

- gracz nie powinien musieć czytać zdania, żeby zrozumieć rundę
- liczba jest dominantą wizualną, wszystko inne jest podpisem
- nic nie powinno wymagać przewijania ani celowania w mały element
- przejście do kolejnej rundy nie może wymagać osobnego kliknięcia „dalej"

## Odsłona wartości

Moment odsłony to najmocniejsza chwila gry — tam mieszka efekt „serio?!".
Wartość nie powinna po prostu „się pojawić".

`[do zaprojektowania]` Konkretna forma animacji, czas trwania i sposób pokazania werdyktu.
Jedyne, co już wiadomo: **werdykt nie może wyprzedzić odsłony wartości**, bo wtedy napięcie
znika w połowie ruchu.

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

Paleta i tokeny · typografia · sposób oznaczania jednostki (kolor? ikona? sam napis?) ·
forma animacji odsłony · wariant karty typograficznej · stan po błędnej odpowiedzi.

Ustalamy je, gdy dojdziemy do odpowiedniego ekranu — nie wcześniej.
