# AI Workflow Rules

## 1. Think Before Coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]

**Verify by observing, not by inferring.** A command exiting 0 is not evidence that it did
its job - read back the result.

## 5. Decyzje podejmujemy po kolei (project-specific)

Ten projekt jest w fazie koncepcyjnej i właściciel świadomie **nie chce rozstrzygać
wszystkiego z góry**. Stack, architektura i źródła danych są odłożone.

- Nie wybieraj technologii samodzielnie. Zapytaj, gdy zadanie tego wymaga.
- Nie projektuj „na zapas" pod funkcje, których jeszcze nie budujemy.
- Kiedy decyzja zapadnie — dopisz ją do `progress-tracker.md` **razem z powodem**.
  Bez powodu za miesiąc nikt nie odtworzy, dlaczego coś wygląda tak, a nie inaczej.
- Jeśli zadanie wymaga decyzji, której nie ma — zaproponuj jedną opcję z uzasadnieniem,
  nie listę czterech wariantów do przejrzenia.

## 6. Treść nie mieszka w kodzie (project-specific)

Obiekty, ich cechy, wartości, źródła i teksty „Did you know?" to **dane**, nie kod.

Nigdy nie wpisuj obiektu ani wartości na sztywno w komponencie — nawet tymczasowo,
nawet „na potrzeby testu". Gra polega na rozroście bazy do setek obiektów; każda
wartość w JSX to pozycja, której nikt później nie znajdzie.

Jeśli czegoś nie da się wyciągnąć z danych, brakuje pola w modelu treści.
