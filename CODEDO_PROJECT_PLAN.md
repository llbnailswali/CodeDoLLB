# CodeDo — 90-Day Product & Development Plan

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

### Initial learning promise

The product is designed around a **90-day Kotlin journey**.

Recommended positioning:

> **CodeDo — Your 90-Day Kotlin Journey**
>
> Learn. Practice. Build. Level up every day.

Do not make the product dependent on a “finish Kotlin in 30 days” promise. Thirty days can be a milestone, but the initial product should support approximately 90 days of structured progression.

---

# 2. Product Goals

## Primary goals

1. Give users a reason to open CodeDo every day.
2. Make programming education feel like a game.
3. Create visible, satisfying progression.
4. Build real Kotlin understanding rather than memorization.
5. Turn mistakes into personalized practice.
6. Gradually move the user from beginner Kotlin to practical Kotlin/Android development.
7. Support at least 2–3 months of meaningful daily use.
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
EARN XP
    ↓
COMPLETE LESSON
    ↓
GET REWARD
    ↓
PRACTICE WEAK SKILLS
    ↓
DAILY QUEST / BATTLE
    ↓
MAINTAIN STREAK
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
- Achievement badges

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
- XP indicator

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
- XP preview

Users may scroll through locked content but cannot start it.

When a locked node is tapped:

> 🔒 Complete today’s lessons to unlock this.

---

# 6. Daily Progression Rule

Default:

## 3 new learning lessons per day

This rule controls the core learning path.

Important clarification for the 90-day product:

**The 3/day rule applies to new core lessons, not to the total amount of activity available each day.**

Users may additionally complete:
- Practice
- Mistake review
- Daily quests
- Daily Battle
- Speed challenges
- Mastery challenges
- Project activities
- Achievements

This prevents the core curriculum from being exhausted too quickly while still allowing users to spend more time in the app.

### Daily reset

At a new calendar day:

1. Unlock the next core lessons.
2. Reset daily lesson count.
3. Generate daily quests.
4. Generate daily battle.
5. Update streak status.
6. Refresh daily recommendations.

For development, an internal test mechanism may simulate a new day. Never expose development controls in normal production UI.

---

# 7. 90-Day Curriculum Strategy

The original 36 lessons remain the foundation, but they are no longer considered the complete curriculum.

The 90-day curriculum should be organized into approximately 10 worlds.

## World 1 — Kotlin Foundations

Approx. Days 1–10

Core topics:
1. Welcome to Kotlin
2. Variables
3. val vs var
4. Data Types
5. Operators
6. Strings
7. String Templates
8. Null Safety

Additional reinforcement:
- Type recognition
- Mutability decisions
- Basic expressions
- Reading simple Kotlin
- Output prediction
- Debugging beginner syntax

---

## World 2 — Logic

Approx. Days 11–18

Original topics:
9. Boolean Values
10. Comparisons
11. if / else
12. when
13. Logical Operators

Expansion:
- Nested conditions
- Range conditions
- Combining conditions
- Common logic mistakes
- Output prediction
- Debugging logic

End with:
### 🔥 Logic Boss

---

## World 3 — Loops

Approx. Days 19–27

Original topics:
14. for Loops
15. while Loops
16. Ranges
17. Nested Loops
18. Loop Control

Expansion:
- step
- downTo
- until
- break
- continue
- loop tracing
- nested loop reasoning
- debugging loops
- pattern problems

End with:
### 🔥 Loop Boss

---

## World 4 — Functions

Approx. Days 28–37

Original topics:
19. Functions
20. Parameters
21. Return Values
22. Default Arguments
23. Named Arguments
24. Lambdas

Expansion:
- Function design
- Single responsibility
- Expression bodies
- Higher-order functions
- Function references
- Lambda syntax
- Common function bugs

End with:
### 🔥 Function Boss

---

## World 5 — Collections

Approx. Days 38–48

Original topics:
25. Lists
26. Sets
27. Maps
28. map()
29. filter()
30. reduce()

Expansion:
- Mutable vs immutable collections
- Iteration
- contains
- find
- any/all/none
- sorted/sortedBy
- grouping
- chaining operations
- collection debugging
- practical data transformation

End with:
### 🔥 Collections Boss

---

## World 6 — Object-Oriented Kotlin

Approx. Days 49–58

Original topics:
31. Classes
32. Objects
33. Constructors
34. Properties
35. Inheritance
36. Interfaces

Expansion:
- Primary/secondary constructors
- Visibility
- Encapsulation
- Data classes
- Enum classes
- Abstract classes
- Interface implementation
- Composition vs inheritance

End with:
### 🔥 OOP Boss

---

## World 7 — Kotlin Mastery

Approx. Days 59–68

Topics:
- Scope functions: let/run/with/apply/also
- Extension functions
- Destructuring
- Smart casts
- Type checks
- Sealed classes
- Generics
- Delegation concepts
- Functional programming patterns
- Exception handling
- Advanced collection patterns

End with:
### 🏆 Kotlin Mastery Challenge

---

## World 8 — Coroutines & Async Kotlin

Approx. Days 69–75

Topics:
- Why asynchronous programming exists
- suspend
- Coroutine basics
- Dispatchers
- launch
- async/await
- Structured concurrency
- Cancellation
- Exception handling
- Flow fundamentals

End with:
### ⚡ Async Boss

---

## World 9 — Android Development Foundations

Approx. Days 76–84

Topics:
- Android app structure
- Activity/lifecycle concepts
- State
- ViewModel
- UI state
- Jetpack Compose fundamentals
- Composables
- Layouts
- Lists
- Navigation
- Basic architecture
- Repository concept
- Networking basics
- JSON
- Room/Firebase concepts

This world begins transitioning from “learn Kotlin” to “use Kotlin to build Android apps.”

---

## World 10 — Real Projects

Approx. Days 85–90 and then expandable indefinitely.

Initial project ladder:

1. Number Guessing Game
2. Quiz Game
3. To-Do App
4. Notes App
5. Expense Tracker
6. Weather App
7. Movie/Content App
8. Chat App
9. Larger Android project

Projects should unlock based on prerequisite skills.

The 90-day journey is the initial product horizon, not the end of CodeDo.

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

### 4. Daily Quest
Progress toward 3 contextual goals.

### 5. Daily Battle
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
xp
hint
difficulty
skill
```

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

# 14. Daily Quests

Generate three contextual daily quests.

Examples:

```text
✓ Complete 2 lessons
✓ Answer 10 questions
○ Fix 2 bugs
```

Reward:

`+100–150 XP`

Optional gem reward.

Quest progress updates immediately.

When all are complete:

> 🎉 DAILY QUEST COMPLETE!
>
> +XP
> +Gems

Quest generation should use the user's current unlocked content and activity history.

---

# 15. Daily Battle

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

# 16. Weekly League

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
- XP
- Promotion zone
- Current user
- Time remaining

Top 3 receive stronger visual treatment.

Current user should always be easy to find.

Prototype leaderboard data can be simulated, but never falsely present simulated users as real people.

---

# 17. XP

Suggested baseline:

```text
Correct challenge      +10 XP
Lesson completion      +30 XP
Perfect lesson         +20 bonus XP
Daily quest            +100–150 XP
Daily battle           +50–200 XP
World completion       +300 XP
Achievement            +50–500 XP
```

XP should animate with:
- Count-up
- Floating +XP
- Subtle sound

Avoid excessive XP inflation.

---

# 18. Levels

Use cumulative XP.

Example:

```text
Level 1    0 XP
Level 2    100 XP
Level 3    250 XP
```

Exact progression can evolve.

When leveling up:

```text
🎉 LEVEL UP!
LEVEL 9
+100 💎
```

Trigger:
- Confetti
- Sound
- XP animation
- Progress transition

---

# 19. Gems

Gems are soft currency.

Earn from:
- Lessons
- Quests
- Achievements
- Streak milestones
- Level ups
- Perfect lessons

Potential uses:
- Hints
- Streak Freeze
- Cosmetic items
- Optional retries

**Basic learning must never require gems.**

---

# 20. Streak

A day counts when the required daily goal is completed.

Milestones:

```text
7 days
30 days
100 days
365 days
```

Missing a day normally breaks the streak.

A Streak Freeze can protect it.

Do not use manipulative or excessive notifications.

---

# 21. Achievements

Initial achievements:

### Hello World
Complete first lesson.

### Bug Hunter
Fix 50 bugs.

### Speed Coder
Complete a speed challenge.

### Perfect
Get 100% in a lesson.

### Week One
Maintain 7-day streak.

### Code Warrior
Maintain 30-day streak.

### 100 Days
Maintain 100-day streak.

Add additional achievements for:
- World completion
- Skill mastery
- Battle wins
- Projects
- Practice volume
- Perfect runs

Every achievement supports:
- Locked state
- Unlocked state
- Progress
- Unlock animation

---

# 22. World Completion

When a world finishes:

```text
🎉 WORLD COMPLETE!

KOTLIN FOUNDATIONS

✓ Variables
✓ Data Types
✓ Operators
✓ Strings

🏆 Foundation Badge

+300 XP

NEXT WORLD
🧠 LOGIC
```

Animate the next world unlocking.

---

# 23. Onboarding

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
> Choose your daily goal
- Casual — 5 min
- Regular — 10 min
- Serious — 15 min

Default:
**Regular**

Screen 5:
> Your journey begins 🚀

Show World 1 and start the first lesson.

---

# 24. Profile

Profile should feel like a game character profile.

Show:

```text
Avatar
Name
CODE LEVEL
XP
STREAK
LEAGUE
```

Then:
- Skill Mastery
- Statistics
- Achievements
- Completed worlds
- Projects

Statistics:
- Lessons completed
- Challenges solved
- Battle wins
- Current streak
- Longest streak
- Projects completed
- Skills mastered

---

# 25. Motivation

Use contextual feedback rather than spam.

Examples:

Morning:
> Your next lesson is waiting. 🚀

After a mistake:
> Let’s strengthen that skill.

Daily goal complete:
> You’re done for today! See you tomorrow. 🔥

Streak warning:
> Complete today’s goal to keep your streak alive.

Avoid excessive notifications and pressure.

---

# 26. Sound

Continue using Web Audio API.

Reusable functions:

```text
playTap()
playCorrect()
playIncorrect()
playXP()
playLevelUp()
playAchievement()
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

# 27. Animation

Use purposeful animations for:

- Button press
- Lesson selection
- Correct answer
- Incorrect answer
- XP gain
- Level up
- Achievement unlock
- Lesson completion
- Node unlock
- World completion
- Confetti

Animations must be fast and satisfying.

Never make users wait unnecessarily.

---

# 28. State Architecture

Centralize:

```text
XP
Level
Gems
Streak
Daily Progress
Lesson Progress
Achievements
League
Weekly XP
Skill Mastery
Mistakes
Quests
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
AchievementRepository
LeaderboardRepository
QuestRepository
BattleRepository
PracticeRepository
ProjectRepository
```

The UI should not directly manipulate localStorage.

---

# 29. Local Persistence

Current prototype uses localStorage.

Persist:

```text
User
XP
Level
Gems
Streak
Streak Freeze
Daily Progress
Completed Lessons
Lesson Mastery
Mistakes
Achievements
League
Weekly XP
Battle Results
Skill Progress
Daily Quests
Last Active Date
Settings
Sound Preference
Theme Preference
Project Progress
```

Progress must survive refresh.

Architecture must remain compatible with a future API backend.

---

# 30. Data Separation

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

# 31. TypeScript Models

Maintain explicit models for:

```text
User
World
Lesson
Challenge
ChallengeResult
Skill
UserSkill
Achievement
DailyQuest
Battle
League
Project
ProjectChallenge
UserProgress
```

Avoid `any`.

---

# 32. Development Priority

Build in this order:

1. Learning path
2. Lesson engine
3. Daily progression
4. XP
5. Streak
6. Practice
7. Achievements
8. Daily quests
9. Leaderboard
10. Daily Battle
11. Profile
12. Projects
13. Advanced polish

Do not attempt every future feature at once.

---

# 33. 90-Day Delivery Roadmap

## Phase 0 — Foundation
- Preserve existing design
- Confirm data/state architecture
- Separate curriculum data
- Confirm daily progression engine

## Phase 1 — Core Learning
- Expand Worlds 1–6
- Lesson engine
- Challenge engine
- XP
- Streak
- Daily reset
- Snake path

## Phase 2 — Retention
- Mastery
- Mistakes
- Practice
- Daily quests
- Achievements

## Phase 3 — Competition
- Daily Battle
- Weekly leagues
- Better battle scoring
- Leaderboard polish

## Phase 4 — Advanced Kotlin
- World 7
- World 8
- More difficult challenges
- Boss challenges

## Phase 5 — Android
- World 9
- Kotlin-to-Android transition
- Compose
- Architecture
- Practical coding

## Phase 6 — Projects
- World 10
- Project unlock system
- Project challenges
- Completion badges

## Phase 7 — Polish
- UX refinement
- Animation refinement
- Sound refinement
- Performance
- Accessibility
- Empty/error/loading states
- Mobile spacing audit

---

# 34. Feature Completion Standard

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

# 35. Development Workflow

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

# 36. Documentation Files

Maintain:

```text
CODEDO_PROJECT_PLAN.md
CODEDO_DATA_GATHERING.md
DEVELOPMENT_LOG.md
TODO.md
```

`CODEDO_PROJECT_PLAN.md` defines the long-term product and development roadmap.

`CODEDO_DATA_GATHERING.md` defines how curriculum/challenge data is created, validated, tracked, and resumed.

`DEVELOPMENT_LOG.md` records implementation history.

`TODO.md` tracks actionable work.

---

# 37. Data Quality Principles

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

# 38. Product North Star

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
