# CodeDo — Active Task Tracker

> **Source of Truth Documents:**
> - `CODEDO_MASTER_PLAN.md` — **current** curriculum plan of record (22 worlds matching the app's actual world names: Kotlin Awakening, Operator Forge, ... Production Kotlin). Use this for world names, chapters, per-world topic scope, and the 6-step lesson-authoring methodology (Learn/Explore/Predict/Write&Run/Debug/Mastered, coverage-driven exercise counts, debugging bug-type/difficulty ladder).
> - `CODEDO_PROJECT_PLAN.md` and `CODEDO_DATA_GATHERING.md`/`data_gathering_progress.md` are **deprecated** (old 10-world, topic-named curriculum) -- see the deprecation notices at the top of each. Their already-authored content (294+ questions) is still valuable and will be reused/remapped, but they are no longer the plan of record.

---

## 🔴 PRIORITY: Topic-aware activity selection (lesson authoring rule)

**Do not default to writing all 6 stages for every lesson.** Per `CODEDO_MASTER_PLAN.md`'s "topic-aware activity selection" / "minimums apply only to applicable activities" principle: before authoring a lesson, decide which of Explore / Predict / Write&Run / Debug actually apply to that specific topic. A purely conceptual topic (the plan's own example: "What is Kotlin?") should be **Learn → Predict-as-MCQ → Mastered only** — no Explore, no Write&Run, no Debug, and no premature teaching of syntax/mechanics that belongs to a later topic (e.g. function parameters/return types belong to the Functions world, not a "what is X" theory lesson).

This is now a real, supported feature, not just a content guideline:
- `FiveStageLesson` (`src/data/lessonStagesData.ts`): only `learn` and `mastered` are required; `explore`, `predict`, `writeRun`, `debug` are all optional — omit whichever don't apply.
- `PredictQuestion.code` is optional too, so `predict` can be used as a pure comprehension MCQ (no code snippet) for theory topics.
- `Detail.tsx` computes `activeStages` dynamically from whichever fields are present and renders/steps through only those — stage numbering, progress dots, and the dev "Skip menu" all adapt automatically. No further engine work needed to skip stages for a new lesson; just omit the fields in its data.

Reference implementation: World 1's `what-is-kotlin` lesson (Learn+MCQ only) vs `kotlin-syntax` lesson (full Learn/Explore/Predict/Write&Run/Debug) in `lessonStagesData.ts` — use these as the template for future lessons in this world and beyond.

---

## 🎯 Current Status
- **Product Model**: 90-Day Kotlin Journey (10 Worlds)
- **Daily Rule**: 3 New Core Lessons/Day + Unlimited Practice/Battles/Quests
- **Architecture**: React 18 + TypeScript + Vite + Tailwind CSS + Web Audio API
- **Design System**: Soft Neumorphism + Obsidian Cyber Theme (`#0B0F19`) + Snake Ribbon Game Path
- **Persistence**: Centralized `StorageManager` with automatic calendar-based daily reset

---

## 📋 90-Day Roadmap & Implementation Status

### Phase 0: Foundation & Persistence
- [x] Establish authoritative documentation (`CODEDO_PROJECT_PLAN.md` & `CODEDO_DATA_GATHERING.md`)
- [x] Responsive full-screen web layout (without device bezels or external toolbars)
- [x] Centralized typed persistence (`StorageManager` for stats, theme, sound, mistakes, daily reset)
- [x] Modular curriculum repositories under `/src/data/curriculum/`
- [x] Web Audio API sound synthesizer (`soundFX`: tap, success, error, chime)

### Phase 1: Core Learning & 90-Day Curriculum Expansion
- [x] Snake Ribbon SVG winding path with Completed, Today Available, and Locked states
- [x] Syntax highlighter (`renderKotlinCodeLine`) & dynamic challenge badges
- [x] World 1 (Kotlin Awakening) full 13-lesson expansion authored & integrated:
  - 1. What is Kotlin? (theory/conceptual: Learn + MCQ + Mastered)
  - 2. Kotlin Syntax & main() (entry point & sequential execution)
  - 3. Comments (// and /* */ with interactive compiler bypass visual)
  - 4. print() and println() (console terminal newline behavior visual)
  - 5. val vs var (immutability lock vs reassignable var visual)
  - 6. Variables & Type Inference (automatic inference vs : Type visual)
  - 7. Int & Long (32-bit vs 64-bit with L suffix visual)
  - 8. Float & Double (Double default vs Float with f suffix visual)
  - 9. Boolean (true/false binary logic & NOT operator visual)
  - 10. Char (strict single quotes 'A' vs Strings visual)
  - 11. Strings (double quotes, .length & concatenation visual)
  - 12. String Templates ($var and ${expr} interpolation visual)
  - 13. World 1 Boss: Personal Profile Program (capstone visual & comprehensive challenge)
- [x] Integrated `WORLD_1_LESSON_VISUALS` directly into Step 1 (Learn stage) for all World 1 lessons
- [x] World 2 (Logic) full lesson expansion: 5 lessons + Logic Boss (26 questions complete)
- [x] World 3 (Loops) full lesson expansion: 5 lessons + Loop Boss (26 questions complete)
- [x] World 4 (Functions) full lesson expansion: 7 lessons + Function Boss (36 questions complete)
- [x] World 5 (Classes & OOP) full lesson expansion: 6 lessons + Object Architect Boss (31 questions complete)
- [x] World 6 (Collections & Functional Kotlin) full lesson expansion: 6 lessons + Stream Weaver Boss (31 questions complete)
- [x] World 7 (Generics & Advanced Type System) full lesson expansion: 5 lessons + Type Alchemist Boss (26 questions complete)
- [x] World 8 (Coroutines & Asynchronous Kotlin) full lesson expansion: 5 lessons + Async Overlord Boss (26 questions complete)
- [x] World 9 (Android & Jetpack Compose Fundamentals) full lesson expansion: 5 lessons + Compose Architect Boss (26 questions complete)
- [x] World 10 (Real-World Architecture & Clean Code) full lesson expansion: 5 lessons + Grandmaster Capstone Boss (26 questions complete)
- [ ] Enforce "Today's Goal Complete" celebratory card when 3 daily core lessons are finished

### Phase 2: Retention & Practice Lab
- [x] Target Practice launcher with drill categories (Sprint, Type Inference, Conditionals, Loops)
- [x] Mistakes tracking & review bank launcher (`StorageManager.recordMistake`)
- [ ] Fine-grained Skill Mastery percentage tracking (influenced by attempts, difficulty, recency)
- [ ] Contextual Daily Quests engine (generate 3 quests/day with dynamic progress & rewards)
- [ ] Interactive Achievements system with unlock toast notifications & claims

### Phase 3: Competition & Battle
- [x] 10-Question Daily Battle Arena question bank (`DAILY_BATTLE_POOL`)
- [x] Practice view battle launcher
- [ ] Battle completion summary with percentile ranking vs. simulated field
- [ ] Weekly League promotion/relegation timer & dynamic user movement

### Phase 4 & 5: Advanced Kotlin & Android Foundations
- [ ] World 7: Kotlin Mastery (Scope functions, Extensions, Sealed classes, Generics)
- [ ] World 8: Coroutines & Async Kotlin (suspend, Dispatchers, Flow)
- [ ] World 9: Android Foundations (Compose, ViewModel, Lifecycle, Navigation)

### Phase 6: Real Projects
- [ ] World 10: Interactive project ladder (Number Guessing, Quiz, To-Do, Notes, Expense, Weather)
- [ ] Project prerequisite skill gate checks

---

## 🏆 Completed Milestones
- Established clean baseline and full audit for the 90-Day CodeDo product direction.
- Preserved existing Snake Ribbon, audio effects, neumorphic design, and dark mode.
- Verified zero TypeScript compilation errors and clean Vite production builds.
