# CodeDo — Active Task Tracker

> **Source of Truth Documents:**
> - `CODEDO_PROJECT_PLAN.md` (90-Day Product & Development Roadmap)
> - `CODEDO_DATA_GATHERING.md` (90-Day Curriculum & Challenge Data Pipeline)

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
- [x] World 1 (Foundations) full lesson expansion: 8 lessons (40 questions complete)
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
