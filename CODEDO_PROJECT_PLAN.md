# CodeDo — Product & Development Plan

> **Purpose:** Persistent source of truth for building CodeDo as a polished, gamified programming-learning product.
>
> **North Star:** “I’m not studying programming. I’m playing my way toward becoming a developer.”

---

## 1. Product Vision

### Product
**CodeDo**

### Core concept
**Duolingo-style habit building + mobile game progression + programming education + mastery practice + coding projects.**

CodeDo should feel like:
- A premium mobile game
- A daily habit
- A skill-building journey
- A programming challenge game
- A visible progression map

CodeDo should NOT feel like:
- An LMS
- A traditional course platform
- A developer dashboard
- A coding IDE
- A documentation website

---

# 2. Product Goals

## Primary goals

1. Give users a reason to open CodeDo every day.
2. Make programming education feel like a game.
3. Create visible, satisfying progression.
4. Build real Kotlin understanding rather than memorization.
5. Turn mistakes into personalized practice.
6. Gradually move the user from beginner Kotlin to practical Kotlin/Android development.
7. Support sustained, meaningful daily use.
8. Keep the architecture extensible for future curricula and backend integration.

## Engagement loop

```text
OPEN APP
    ↓
SEE TODAY'S GOAL
    ↓
START NEXT LESSON
    ↓
SOLVE SHORT CHALLENGES
    ↓
COMPLETE LESSON
    ↓
GET REWARD
    ↓
PRACTICE WEAK SKILLS
    ↓
DAILY BATTLE
    ↓
UNLOCK NEXT CONTENT
    ↓
RETURN TOMORROW
```

Every feature should reinforce this loop.

---

# 3. Existing Design & Technical Foundation — Preserve

The existing implementation uses:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Web Audio API
- canvas-confetti
- SVG graphics
- Google Fonts
- Google Material Symbols Outlined

Do NOT replace the existing framework or redesign the whole application without an explicit requirement.

The current visual direction is:

- Soft premium neumorphism
- Light theme
- Dark cyber/obsidian theme
- Excellent spacing and padding
- Beautiful Kotlin code blocks
- Tactile controls
- Rewarding animation
- Snake Ribbon learning path

### Typography

- **Outfit** — headings, titles, badges
- **Plus Jakarta Sans** — body/explanations
- **JetBrains Mono** — Kotlin code, technical counters

### Spacing

Use an 8px-based system:

`8, 12, 16, 20, 24, 32, 40, 48`

Mobile horizontal padding:

`20–24px`

Cards:

`16–24px` internal padding

Major sections:

`24–32px` vertical spacing

Prefer whitespace over crowding.

### Radius

- Controls: 12–14px
- Cards: 18–24px
- Large cards: 24–32px
- Lesson nodes: circular/highly rounded

### Neumorphism

Use soft raised/inset surfaces carefully.

Raised:
- Buttons
- Lesson nodes
- Cards
- Stats
- Navigation

Inset:
- Progress indicators
- Inputs
- Selected controls

The effect should feel **soft + premium + tactile**, not like an old neumorphic website.

---

# 4. Primary Navigation

Four primary destinations:

```text
🏠 Learn
🧩 Practice
🏆 Leaderboard
👤 Profile
```

Learn is the primary destination.

Keep the existing floating/neumorphic navigation design.

---

# 5. Learning Path — Core Experience

The Learn screen must remain the most important screen.

It must use the:

## Snake Ribbon Learning Path

The path is a vertically scrolling game map.

```text
LEFT
  ↓
CENTER
  ↓
RIGHT
  ↓
CENTER
  ↓
LEFT
  ↓
CENTER
  ↓
RIGHT
```

Use SVG for the connecting ribbon/path.

Users can scroll through the full future journey.

### Lesson states

#### Completed
- Checkmark
- Success treatment

#### Available Today
Most visually prominent:
- Raised surface
- Brand treatment
- Play icon
- Subtle glow
- Slight animation
- TODAY badge
- START/CONTINUE CTA

#### Locked
Future lessons remain visible:
- Lock icon
- Muted but attractive treatment
- Lesson name

Users may scroll through locked content but cannot start it.

When a locked node is tapped:

> 🔒 Complete today’s lessons to unlock this.

---

# 6. Daily Progression Rule

Default:

## 3 new learning lessons per day

This rule controls the core learning path.

Important clarification:

**The 3/day rule applies to new core lessons, not to the total amount of activity available each day.**

Users may additionally complete:
- Practice
- Mistake review
- Daily Battle
- Speed challenges
- Mastery challenges
- Project activities

This prevents the core curriculum from being exhausted too quickly while still allowing users to spend more time in the app.

### Daily reset

At a new calendar day:

1. Unlock the next core lessons.
2. Reset daily lesson count.
3. Generate daily battle.
4. Refresh daily recommendations.

For development, an internal test mechanism may simulate a new day. Never expose development controls in normal production UI.

---

# 7. Curriculum Strategy

For the authoritative world-by-world, topic-by-topic curriculum (worlds,
topics, boss fights, the six-step lesson structure), see
**`CODEDO_MASTER_PLAN.md`** — do not duplicate or re-derive curriculum
structure here.

This file governs the *product* wrapper around that curriculum: the daily
progression rule (§6 above), session design, and the rest of this document
apply regardless of how many worlds or lessons `MASTER_PLAN.md` currently
defines.

---

# 8. Daily Session Design

A normal day should provide multiple layers of activity.

## Core session

### 1. Learn
2–5 minute interactive lesson(s).

### 2. Practice
Short reinforcement questions.

### 3. Mastery
Target weak skills.

### 4. Daily Battle
10 questions, 5-minute default.

A user should be able to complete the required learning in approximately 5–15 minutes, while motivated users can stay for 15–30+ minutes.

---

# 9. Lesson Structure

A normal lesson should contain approximately 5 core challenges.

Basic interaction:

```text
Question
↓
Attempt
↓
Immediate feedback
↓
Short explanation
↓
Next question
```

Do not create long textbook explanations.

Supported challenge types:

- Multiple Choice
- True / False
- Fill in the Blank
- Code Completion
- Find the Bug
- Code Ordering
- Output Prediction
- Match Concept
- Tap Correct Line
- Boss Challenge

Every challenge should support:

```text
id
type
question
code
options
correctAnswer
explanation
hint
difficulty
skill
```

## Implementation: topic-aware activity selection is a real, supported feature

Per `CODEDO_MASTER_PLAN.md`'s "Minimums Apply Only to Applicable Activities"
principle: not every lesson needs every stage. This isn't just a content
guideline — it's implemented in code:

- `FiveStageLesson` (`src/data/lessonStagesData.ts`): only `learn` and
  `mastered` are required; `explore`, `predict`, `writeRun`, `debug` are
  all optional — omit whichever don't apply to a given topic.
- `PredictQuestion.code` is optional too, so `predict` can be used as a
  pure comprehension MCQ (no code snippet) for theory topics.
- `Detail.tsx` computes `activeStages` dynamically from whichever fields
  are present and renders/steps through only those — stage numbering,
  progress dots, and the dev "Skip menu" all adapt automatically. No
  further engine work is needed to skip stages for a new lesson; just omit
  the fields in its data.

Reference implementation: World 1's `what-is-kotlin` lesson (Learn+MCQ
only) vs. `kotlin-syntax` lesson (full Learn/Explore/Predict/Write&Run/
Debug) in `lessonStagesData.ts`.

---

# 10. Difficulty Model

Use at least:

```text
Beginner
Easy
Medium
Hard
Boss
```

Difficulty should increase gradually.

Do not jump from syntax recognition directly to difficult algorithmic problems.

Use:

```text
recognize
→ understand
→ predict
→ modify
→ debug
→ create
```

---

# 11. Mastery System

Lesson completion does NOT equal skill mastery.

Every skill has a mastery score.

Example:

```text
Variables       92%
Conditions      84%
Loops           61%
Functions       43%
Collections     20%
```

Mastery increases through successful practice.

When a user struggles with a skill, Practice prioritizes that skill.

Do not simply repeat the same question.

Generate/select varied questions testing the same underlying skill.

---

# 12. Mistake Tracking

For every incorrect answer store:

```text
questionId
skillId
mistakeCount
lastMistakeDate
```

Use mistakes to power:

- Mistakes Review
- Weak Skills
- Adaptive Practice
- Daily recommendations

Incorrect answers should teach, not punish.

---

# 13. Practice Screen

Header:

> **Practice Lab 🧠**
>
> Turn mistakes into mastery.

Sections:

1. Weak Skills
2. Mistakes Review
3. Speed Challenge
4. Random Practice

Skill cards:

- Skill name
- Mastery %
- Mistake count
- Practice CTA

---

# 14. Daily Battle

Default:

- 10 questions
- 5-minute time limit
- Questions limited to unlocked curriculum

Prototype:
- Use seeded simulated opponents
- Clearly treat them as simulated
- Never imply they are real users

Result example:

```text
⚔️ BATTLE COMPLETE

Your score
860

You beat
82%
of today's simulated field
```

Future architecture should allow real multiplayer without rewriting the battle UI.

---

# 15. Weekly League

Leagues:

```text
Bronze
Silver
Gold
Platinum
Diamond
Master
```

Show:
- Rank
- Avatar
- Name
- Weekly Score (cumulative Daily Battle results)
- Promotion zone
- Current user
- Time remaining

Top 3 receive stronger visual treatment.

Current user should always be easy to find.

Prototype leaderboard data can be simulated, but never falsely present simulated users as real people.

---

# 16. World Completion

When a world finishes:

```text
🎉 WORLD COMPLETE!

KOTLIN FOUNDATIONS

✓ Variables
✓ Data Types
✓ Operators
✓ Strings

🏆 Foundation Badge

NEXT WORLD
🧠 LOGIC
```

Animate the next world unlocking.

---

# 17. Onboarding

Screen 1:
> Welcome to CodeDo 👋
>
> Learn programming by playing.

Screen 2:
> What’s your experience?
- Complete beginner
- I know the basics
- I’m already coding

Screen 3:
> What do you want to learn?
- Kotlin

Screen 4:
> Your journey begins 🚀

Show World 1 and start the first lesson.

---

# 18. Profile

Profile should feel like a game character profile.

Show:

```text
Avatar
Name
LEAGUE
```

Then:
- Skill Mastery
- Statistics
- Completed worlds
- Projects

Statistics:
- Lessons completed
- Challenges solved
- Battle wins
- Projects completed
- Skills mastered

---

# 19. Motivation

Use contextual feedback rather than spam.

Examples:

Morning:
> Your next lesson is waiting. 🚀

After a mistake:
> Let’s strengthen that skill.

Daily goal complete:
> You’re done for today! See you tomorrow. 🔥

Avoid excessive notifications and pressure.

---

# 20. Sound

Continue using Web Audio API.

Reusable functions:

```text
playTap()
playCorrect()
playIncorrect()
playUnlock()
playComplete()
```

Sounds:
- Short
- Pleasant
- Tactile
- Modern

No external MP3 files.

Respect sound settings.

---

# 21. Animation

Use purposeful animations for:

- Button press
- Lesson selection
- Correct answer
- Incorrect answer
- Lesson completion
- Node unlock
- World completion
- Confetti

Animations must be fast and satisfying.

Never make users wait unnecessarily.

---

# 22. State Architecture

Centralize:

```text
Daily Progress
Lesson Progress
League
Weekly Score
Skill Mastery
Mistakes
Battle Results
Project Progress
Last Active Date
Settings
```

Conceptual repositories:

```text
UserRepository
LessonRepository
ProgressRepository
LeaderboardRepository
BattleRepository
PracticeRepository
ProjectRepository
```

The UI should not directly manipulate localStorage.

---

# 23. Local Persistence

Current prototype uses localStorage.

Persist:

```text
User
Daily Progress
Completed Lessons
Lesson Mastery
Mistakes
League
Weekly Score
Battle Results
Skill Progress
Last Active Date
Settings
Sound Preference
Theme Preference
Project Progress
```

Progress must survive refresh.

Architecture must remain compatible with a future API backend.

---

# 24. Data Separation

Never put large curriculum datasets inside UI components.

Recommended:

```text
data/
  curriculum/
    foundations/
    logic/
    loops/
    functions/
    collections/
    oop/
    mastery/
    coroutines/
    android/
    projects/
```

UI consumes typed data.

---

# 25. TypeScript Models

Maintain explicit models for:

```text
User
World
Lesson
Challenge
ChallengeResult
Skill
UserSkill
Battle
League
Project
ProjectChallenge
UserProgress
```

Avoid `any`.

---

# 25a. Mastery, Mistake & Personalization Data Model

(Salvaged from the now-retired `CODEDO_DATA_GATHERING.md` — this is app
data-architecture, not curriculum-authoring process, so it lives here.)

## Adaptive learning priority order

When deciding what to serve a user next, prioritize in this order:

```text
1. Repeated mistakes
2. Low mastery
3. Recently introduced Sub-Concepts
4. Due-for-review skills
5. Appropriate expertise level
6. Useful reinforcement
```

Do not repeat the exact same question indefinitely after a mistake — vary
code, values, wording, context, difficulty, challenge type, and mistake
pattern instead.

## Mastery data (per Sub-Concept / skill)

```text
subConceptId
masteryPercent
attempts
correctAttempts
incorrectAttempts
lastPracticedAt
lastMistakeAt
mistakeCount
masteredAt
```

Mastery must be based on actual performance — merely opening a lesson stage
must not automatically increase mastery.

## Mistake data

```text
questionId
subConceptId
mistakeCount
lastMistakeDate
```

Optional: `errorCategory`, `attemptsBeforeCorrect`, `reviewCount`,
`masteryBefore`, `masteryAfter`, `compilerError`.

Feeds: Mistake Review, Weak Skills, Adaptive Practice, Daily
recommendations. Incorrect answers should teach, not punish.

## Spaced repetition

```text
nextReviewAt
reviewInterval
reviewStrength
```

Reviews should strengthen weak or forgotten Sub-Concepts without blocking
the main learning path.

## Goal personalization

Goal tags may include: `android_developer`, `kotlin_job`,
`android_app_builder`, `kotlin_mastery`, `college`,
`beginner_programming`, `game_development`, `finance_app`,
`productivity_app`.

Do not duplicate the entire curriculum per goal — tag and reuse content.

## Content tagging model

Every content item needs enough metadata for the personalization engine to
decide what to serve:

```text
difficulty
expertiseLevels[]
prerequisites[]
relatedSubConcepts[]
tags[]
```

For questions/challenges specifically: `difficulty`, `expertiseLevels[]`,
`skillTags[]`, `misconceptionTags[]`.

## Stable ID convention

Every entity needs a stable ID, e.g.:

```text
language.kotlin
world.functions
concept.functions
subconcept.functions.parameters
lesson.functions.parameters

learn.functions.parameters
explore.functions.parameters.example01
predict.functions.parameters.q01
write.functions.parameters.c01
mastered.functions.parameters
```

IDs must not change after user progress depends on them, unless a migration
exists.

## Duplicate content detection (authoring QA rule)

Before adding content, check for: same question, same code, same correct
answer, same objective, near-identical wording, same challenge with only
trivial value changes.

Intentional variants are fine when they meaningfully change: values,
context, code structure, challenge type, misconception, difficulty, or
expertise level.

---

# 26. Development Priority

Build in this order:

1. Learning path
2. Lesson engine
3. Daily progression
4. Practice
5. Leaderboard
6. Daily Battle
7. Profile
8. Projects
9. Advanced polish

Do not attempt every future feature at once.

---

# 27. Outstanding Product Work

Genuine open product items (not curriculum content — see
`data_gathering_progress.md` for that). Two items previously tracked here
(a Daily Quests engine, an Achievements system) have been dropped: those
systems are no longer part of the product plan.

- [ ] "Today's Goal Complete" celebratory card when the 3 daily core lessons are finished
- [ ] Fine-grained Skill Mastery percentage tracking (influenced by attempts, difficulty, recency)
- [ ] Battle completion summary with percentile ranking vs. simulated field
- [ ] Weekly League promotion/relegation timer & dynamic user movement
- [ ] Project prerequisite skill-gate checks (once project content exists)

---

# 28. Feature Completion Standard

A feature is complete only when:

- UI works
- State works
- Persistence works where applicable
- Loading state exists
- Empty state exists
- Error state exists
- Animations/feedback work
- Mobile spacing is correct
- Dark mode works
- Existing features still work
- No console errors
- No TypeScript errors
- No obvious UX dead ends

---

# 29. Development Workflow

Before implementing:

1. Inspect the existing code.
2. Identify reusable components.
3. Identify existing state/data structures.
4. Implement the smallest coherent change.
5. Test it.
6. Check existing features.
7. Update documentation if behavior/architecture changed.

When resuming:

1. Read this file.
2. Inspect the current code.
3. Determine what already exists.
4. Do not recreate existing functionality.
5. Find the next incomplete feature.
6. Implement it.
7. Test it.
8. Fix regressions.
9. Update status/logs.

Never assume the project is at the beginning.

---

# 30. Documentation Files

Maintain:

```text
CODEDO_MASTER_PLAN.md
CODEDO_PROJECT_PLAN.md
data_gathering_progress.md
PITFALLS.md
```

`CODEDO_MASTER_PLAN.md` is the single source of truth for the curriculum itself — worlds, topics, the six-step lesson structure (including which stages are optional per topic), boss fights. Curriculum structure and authoring methodology both belong there, not in this file.

`CODEDO_PROJECT_PLAN.md` (this file) defines the long-term *product* and development roadmap — architecture, UI, competitive/gamification elements still in scope (Daily Battle, Leagues), outstanding product work (§27), and the app's mastery/mistake/personalization data model (§25a) — everything around the curriculum, not the curriculum content itself.

`data_gathering_progress.md` tracks the actual current status of curriculum authoring — which worlds have real content vs. not, against `CODEDO_MASTER_PLAN.md`'s real world list — plus the resume protocol and session log for authoring sessions.

There is no separate `CODEDO_DATA_GATHERING.md` — it was almost entirely redundant with `CODEDO_MASTER_PLAN.md` (both described curriculum-authoring methodology independently and had drifted apart before); its handful of genuinely unique sections (data model, resume protocol) were salvaged into the two files above before it was removed.

There is no separate `TODO.md` — product tasks live in §27 above, and curriculum-authoring status lives in `data_gathering_progress.md`. The topic-aware activity-selection rule lives in `CODEDO_MASTER_PLAN.md` (the pedagogy) and §9 above (the engineering implementation).

`PITFALLS.md` (auto-loaded via `CLAUDE.md`) logs bugs already found once, their root cause, and the fix/rule to stop them recurring — engine/rendering gotchas, not product or curriculum planning.

---

# 31. Data Quality Principles

Educational content must prioritize:

1. Correct Kotlin syntax
2. Correct output
3. Correct explanation
4. Appropriate difficulty
5. Clear wording
6. One unambiguous answer
7. Meaningful distractors
8. Real learning value
9. Progressive difficulty
10. No accidental duplicate questions

Do not generate large quantities of low-quality filler content just to increase lesson count.

---

# 32. Product North Star

Every design and engineering decision should support:

> **“I’m not studying programming. I’m playing my way toward becoming a developer.”**

The final experience should feel:

```text
Fast
Friendly
Rewarding
Tactile
Clear
Playful
Premium
```
