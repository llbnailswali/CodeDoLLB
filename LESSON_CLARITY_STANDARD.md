# CodeDo lesson clarity standard

This is the authoritative standard for a dimension of quality
[LESSON_QUALITY_STANDARD.md](LESSON_QUALITY_STANDARD.md) does not cover:
whether a learner can actually **read and understand** a lesson's prose
without confusion. `LESSON_QUALITY_STANDARD.md` governs coverage,
correctness, and stage acceptance -- whether the content teaches the right
things and whether the code runs. This file governs whether the *writing
itself* gets in the way of understanding, independent of whether the
underlying content is correct.

**Our main purpose is that the learner should be able to understand the
concept without confusion.** Correctness, coverage, and execution checks
are necessary but not sufficient for that -- a lesson can pass every check
in `LESSON_QUALITY_STANDARD.md` and still leave a learner confused because
of how it's written or rendered. This file exists so that dimension gets
checked as deliberately as coverage and execution do, not left to chance.

A world (or a lesson) is not fully audited until it has been checked
against **both** files. `LESSON_QUALITY_STANDARD.md`'s "Verified" status is
about coverage/correctness only -- it does not by itself mean this file's
checks were performed. Track clarity-pass status separately per world in
Section 5 below, the same way `data_gathering_progress.md` tracks
`LESSON_QUALITY_STANDARD.md` status separately from raw authored-inventory
counts.

## 1. The four checks

Every prose field in every stage (Learn, Explore, Predict, Write & Run,
Debug -- `subtitle`, `explanation`, `keyTakeaway`, `description`,
`whatChanged`, `whatItMeans[].description`, `detail`, `hints`, `summary`,
`bugLabel`, `title`) gets checked against all four:

### A. Readability check (line breaks, wall-of-text)

A multi-sentence or multi-idea field must not be a single dense paragraph.
Break at natural idea boundaries with `\n\n` (a real paragraph gap) or `\n`
(a tight line break within the same visual block, no gap) -- pick whichever
matches how separate the ideas actually are. A short, single-idea field
(most `whatChanged`/`whatItMeans` entries, most `label`s) needs no break at
all; don't add one for its own sake.

**Before adding a `\n`/`\n\n` to any field, verify the rendering component
actually respects it.** Plain browser CSS (`white-space: normal`, the
default) collapses any `\n` into a single space -- a break added to content
without checking this is silently invisible in the real app. See
PITFALLS.md's "Learn's subtitle/explanation/keyTakeaway and Debug's
explanation silently dropped every `\n` line break" entry for the bug this
caused, and the fix (`whitespace-pre-line` added to the relevant
containers). As of this writing, confirmed to support `\n`/`\n\n`:

| Field | Component | Container |
| --- | --- | --- |
| `learn.subtitle` | `Learn.tsx` | subtitle `<p>` |
| `learn.explanation` | `Learn.tsx` | explanation `<span>` |
| `learn.keyIdeas[].description` | `Learn.tsx` | key-idea `<p>` |
| `learn.keyTakeaway` | `Learn.tsx` | key-takeaway `<p>` |
| `explore.cards[].whatChanged` | `Explore.tsx` | what-changed `<p>` |
| `predict.questions[].explanation.detail` | `Predict.tsx` | explanation `<p>` |
| `writeRun.description` | `WriteRun.tsx` | description `<p>` (already had it -- the original numbered-steps convention) |
| `debug.explanation` | `Debug.tsx`, `DebugIde.tsx` | resolved-state / Defect Diagnosis `<p>` |

Any field NOT in this table (e.g. `explore.cards[].whatItMeans[].description`,
`predict.questions[].prompt`) has not been checked/fixed for `\n` support --
verify before relying on a break there, the same way this table was built:
grep the rendering component for the field and confirm
`whitespace-pre-line`/`whitespace-pre-wrap` is present, or add it (a
one-line, low-risk change, same pattern as the rows above) if the field
genuinely needs multi-paragraph support.

### B. Confusion check

Read every prose field asking: could a learner reading only this walk away
with a wrong or incomplete mental model, or a genuine moment of "wait,
what?" Concretely, look for:

- **A named-but-undemonstrated distinction.** Prose that says "X and Y
  differ" (or "matters," "is different," etc.) but never shows an example
  of the difference, especially if it explicitly says the difference is
  deferred/out of scope for this stage. The reader is told something
  exists without being shown what it actually is.
- **Non-parallel or ambiguous sentence structure.** Two things joined by
  "or"/"and" where only one is a complete phrase (e.g. `"reassign x to x +
  1" or "x - 1"` -- the second quote silently drops "reassign x to").
  Pairings implied only by list order rather than stated explicitly.
- **Meta-commentary instead of teaching content.** Prose that describes the
  *lesson's own scope decision* ("which this lesson intentionally avoids")
  rather than just explaining the concept -- this reads as an authoring
  note leaking into learner-facing text, not a natural explanation.
- **Visual/typographic collisions** between this codebase's prose
  conventions and the literal syntax being taught -- see check C.
- **Factual drift** between `description`, the `// TODO` hint in
  `initialCode`, `solutionCode`/`fixedCode`, and `expectedOutput` (already
  covered by `LESSON_QUALITY_STANDARD.md` and `audit:output-quotes`, but
  re-check it here too since it's also a confusion source, not just a
  correctness one).

This check is inherently a judgment call, not fully mechanizable -- but see
`Escaped confusing`, i.e. #2 below, which is a common pattern worth a real
scan.

### C. Punctuation/operator collision check (mechanical)

Run:

```sh
npm run audit:dash-collision
```

This runs `scripts/audit-dash-collision.mjs`, which scans every prose field
across the whole curriculum for this codebase's plain-ASCII `--` em-dash
convention sitting in the same string as a literal `--`/`++` operator
mention -- a specific, previously-real confusion source (see PITFALLS.md
and `WORLD_2_CONTENT_REVIEW.md`'s W2-08). Every match is a worklist item,
not an automatic failure -- triage each one the same way W2-08 did: is the
operator mention and the punctuation dash close enough in the same
sentence to actually confuse a reader, or is it a harmless coincidence
(e.g. `-- (decrement)`, which is self-disambiguating)?

### D. Generic/reused stage-subtitle check (mechanical)

Run:

```sh
npm run audit:generic-subtitles
```

This runs `scripts/audit-generic-subtitles.mjs`, which scans every
`worldNLessonsData.ts` file and flags any `learn.subtitle`,
`explore.subtitle`, or `predict.subtitle` that is reused, word-for-word
(after normalizing away digit runs, so "5 coverage-derived scenarios..."
and "6 coverage-derived scenarios..." are recognized as the same
template), across 2 or more lessons in the same file.

**Why this matters as much as any other confusion check:** the stage
subtitle is the first thing a learner reads on entering Explore or
Predict -- a generic, reused one gives zero signal about what that
specific lesson actually covers, and in the worst cases isn't about the
lesson's content at all. Confirmed in production data: World 10's Explore
subtitle is the literal same sentence ("Examine how data flows through
collection transformations.") for all 10 lessons regardless of whether
the lesson is `map`, `groupBy`, or `zip`; World 11's Predict subtitle
("Independent Kotlin reasoning with one correct answer per question.") is
identical across all 14 lessons; and World 11's Explore subtitle ("N
coverage-derived scenarios; no fixed activity quota.") describes the
**authoring process** (how many examples were planned and why), not
anything about Kotlin -- the exact same meta-commentary pattern check B
already names, just sitting in the stage header itself instead of inside
one card. As of the first run of this scanner, this pattern was confirmed
across Worlds 10-17 (every world authored via a sync commit, i.e. every
world that has never been through a clarity pass) -- see each world's
`WORLD_N_CONTENT_REVIEW.md` for per-world triage once performed.

Every match is a worklist item, not an automatic failure, but there is
essentially no legitimate reason for two different lessons' stage
subtitles to be identical -- unlike check C's dash collisions (which can
be a harmless coincidence), a reused subtitle is close to always worth
rewriting. Rewrite each affected lesson's subtitle to describe what that
lesson's own Explore cards or Predict questions actually demonstrate,
the same way World 13's per-card fixes replaced "Added distinct coverage
for X" with real content (see `WORLD_13_CONTENT_REVIEW.md`'s clarity-pass
section) -- apply the identical standard one level up, at the stage
subtitle itself.

## 2. Process per world

1. Run `npm run audit:dash-collision` and `npm run audit:generic-subtitles`
   scoped mentally to the world being audited (both report file:line for
   the whole repo; filter to the relevant `worldNLessonsData.ts` file).
2. For each lesson, read every stage's prose fields end to end -- not just
   skimmed -- against checks A and B above. Reading "stage 1" (Learn) in
   isolation is a good first pass, since it's what a learner sees before
   anything else, but Explore/Predict/Write&Run/Debug prose needs the same
   read, including the stage-level subtitle itself (check D), not just
   the cards/questions inside it.
3. For any field needing a line break, confirm rendering support (Section
   1's table) before adding one; fix the component first if missing.
4. Fix what's found directly in the `worldNLessonsData.ts` file.
5. Re-run `npm run audit:dash-collision`, `npm run audit:generic-subtitles`,
   `npx tsc --noEmit`, `npm run audit:output-quotes`, and the world's own
   `npm run test:worldN-content` (or equivalent) to confirm nothing broke.
6. Log findings and fixes in that world's `WORLD_N_CONTENT_REVIEW.md`
   (a new numbered finding, same style as W2-08/W2-09), and update this
   file's Section 5 status row.
7. If a genuinely new, generalizable confusion pattern was found (not
   specific to one lesson's wording), log it in `PITFALLS.md` too, the
   same way the `--` collision and the `whitespace-pre-line` rendering gap
   were.

## 3. What this standard does NOT cover

- Whether the content is factually correct or complete -- that's
  `LESSON_QUALITY_STANDARD.md` and `PITFALLS.md`'s engine-correctness
  entries.
- Browser visual QA (actual rendered layout, mobile width, dark/light
  theme) -- still a separate, manual, not-yet-systematized check across
  every world's review file.
- Whether the CODE examples are correct Kotlin -- that's
  `compileAndRunKotlin`/`LESSON_QUALITY_STANDARD.md`'s execution
  verification.

## 4. Worked example

World 2's Increment & Decrement lesson (`world-2` -> lesson 5) is the
worked example this whole standard was extracted from. See
`WORLD_2_CONTENT_REVIEW.md`'s W2-08/W2-09 for the full before/after:
Learn's `subtitle` named a prefix/postfix distinction without showing it
in that stage's own example; its `subtitle`/`keyTakeaway` had `--`
em-dash/operator collisions and non-parallel phrasing; several prose
fields were dense single paragraphs with no line breaks, and three of them
turned out to render \n as nothing at all until the component fix landed.

## 5. Per-world clarity-pass status

Separate from `LESSON_QUALITY_STANDARD.md`/`data_gathering_progress.md`'s
coverage/correctness status. "Not yet passed" here does not mean the
world's content is wrong -- only that this specific readability/confusion/
line-break pass has not been performed on it yet.

| World | Clarity pass | Notes |
| --- | --- | --- |
| World 1 — Kotlin Awakening | Not yet passed | |
| World 2 — Operator Forge | Partial | Only lesson 5 (Increment & Decrement) passed, via W2-08/W2-09. Lessons 1-4, 6-7 and the Boss not yet checked. `audit:dash-collision` also caught 2 reused `predict.subtitle` occurrences elsewhere in this file ("Read the code, predict the result, then check your answer." on `card-arith-5`/`card-incdec-7`) -- not yet triaged. |
| World 3 — Decision Maker | Not yet passed | `audit:generic-subtitles` flags a `predict.subtitle` reused across 4 lessons ("Read the code, predict the result, then check your answer.") -- not yet triaged. |
| World 4 — Loop Master | Not yet passed | |
| World 5 — Function Forge | Not yet passed | |
| World 6 — Collection Valley | Not yet passed | |
| World 7 — Null Safety Shield | Not yet passed | |
| World 8 — Object Kingdom | Not yet passed | |
| World 9 — Lambda Lab | Not yet passed | |
| World 10 — Collection Wizardry | Not yet passed | `audit:generic-subtitles` flags the SAME `explore.subtitle` ("Examine how data flows through collection transformations.") and the SAME `predict.subtitle` ("Trace each transformation and evaluate the output.") reused across all 10 lessons -- the worst case found: zero lesson-specific stage subtitles in the entire world. |
| World 11 — OOP Evolution | Not yet passed | `audit:generic-subtitles` flags an `explore.subtitle` reused across all 14 lessons that is pure authoring-process meta-commentary ("N coverage-derived scenarios; no fixed activity quota.", N substituted per lesson) rather than content, plus a `predict.subtitle` identical across all 14 lessons. |
| World 12 — Generic Realm | Not yet passed | `audit:generic-subtitles` flags an `explore.subtitle` and a `predict.subtitle` each reused across all 15 lessons, despite this world being marked Verified under `LESSON_QUALITY_STANDARD.md`. |
| World 13 — Scope Masters | Partial | Card/question-level content passed (see `WORLD_13_CONTENT_REVIEW.md`'s "Clarity pass" section: fixed a systemic meta-commentary pattern across ~19 filler cards/questions, 3 unsolvable-from-text Write & Run tasks, a Mastered count-drift bug, several wall-of-text fields, a grammar bug, and worked around a genuine engine gap printing/comparing Kotlin's `Unit`) -- but check D (added after this world's pass) found `explore.subtitle` reused across 9 of 10 lessons and `predict.subtitle` reused across the same 9, not yet fixed. Downgraded from "Passed" once check D existed and was run against this world's own data. |
| World 14 — Sequence Dimension | Not yet passed | `audit:generic-subtitles` flags an `explore.subtitle` and a `predict.subtitle` each reused across all 13 lessons. |
| World 15 — Error Fortress | Not yet passed | `audit:generic-subtitles` flags a `predict.subtitle` reused across all 15 lessons. |
| World 16 — Coroutine Academy | Not yet passed | `audit:generic-subtitles` flags an `explore.subtitle` and a `predict.subtitle` (again authoring-process meta-commentary, "N coverage-derived scenarios...") each reused across all 12 lessons. |
| World 17 — Flow Universe | Not yet passed | `audit:generic-subtitles` flags an `explore.subtitle` and a `predict.subtitle` each reused across all 10 lessons. |

Every world from 9 through 17 (every world authored via a sync commit,
i.e. every world that has never been through any clarity pass) has this
generic-stage-subtitle problem confirmed by `npm run audit:generic-subtitles`
as of 2026-09-21. This is the single largest unfixed finding this standard
has produced so far, spanning ~110 lessons.

Update this table as each world's pass completes. This table, not the
existing quality-verification table in `data_gathering_progress.md`, is
the source of truth for clarity-pass status -- don't conflate a world
being "Verified" under `LESSON_QUALITY_STANDARD.md` with having passed
this standard.
