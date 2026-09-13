# CODEDO — DATA GATHERING & CURRICULUM PLAN

**Version:** 4.1  
**Status:** Active Source of Truth  
**Purpose:** Define how CodeDo gathers, structures, validates, personalizes, and maintains programming-learning content.

---

# 1. PRODUCT MODEL

CodeDo is a **data-driven programming-learning system**.

The UI is a reusable learning engine. We do **not** create a different screen design for Functions, Loops, Variables, Classes, or any other concept.

The same components render different content from structured data.

The canonical hierarchy is:

```text
Language
  ↓
World
  ↓
Concept
  ↓
Sub-Concept
  ↓
Lesson Package
  ├── Step 1 — Learn
  ├── Step 2 — Explore
  ├── Step 3 — Predict
  ├── Step 4 — Write & Run
  └── Step 5 — Mastered
```

The Home screen presents Concepts and Sub-Concepts as a visual learning journey / snake path.

Selecting a Sub-Concept opens its five-step lesson.

---

# 2. CORE DESIGN PRINCIPLE

## One UI template + different data

```text
Universal Screen Component
          +
      Lesson Data
          ↓
Rendered Screen
```

Examples:

```text
Functions → Parameters
Functions → Return Types
Functions → Named Arguments

Loops → For Loops
Loops → Ranges
Loops → Break / Continue

Variables → Declaration
Variables → Type Inference
Variables → Mutability
```

All use the same five-step screen architecture.

### Non-negotiable rule

**Never introduce a new screen layout merely because the programming concept is different.**

A new component is justified only when the learning interaction itself cannot be represented by the existing universal template.

---

# 3. THREE-PHASE DATA GATHERING STRATEGY

Data gathering happens in exactly three major phases.

```text
PHASE 1
Complete Concept Inventory
        ↓
PHASE 2
Concept → Sub-Concept Decomposition
        ↓
PHASE 3
Five-Step Lesson Content
```

Do not begin large-scale Step 3 or Step 4 content generation before the Concept and Sub-Concept inventory is stable.

---

# 4. EXISTING CODEDO DATA BASELINE

CodeDo already has a substantial validated content base. The new five-step learning architecture must **reuse, classify, and migrate this existing data** rather than discard it and regenerate everything.

## Current curriculum baseline

```text
Curriculum Completion
10 of 10 Worlds (100%)

Core lesson units
57 core lessons
+
9 boss fights
=
66 total lesson units

Active Kotlin question bank
304 validated MCQ challenges
├── 294 curriculum questions
└── 10 daily sprint battle questions
```

These numbers represent the **existing content inventory at the time this document was updated**.

## Important distinction

The existing 304-item bank is primarily **MCQ/question-bank content**.

The new five-step lesson architecture requires several different content types:

```text
Existing MCQ bank
      ↓
Reuse where appropriate
      ↓
Map to Concept / Sub-Concept
      ↓
Map compatible questions to Step 3 — Predict
      ↓
Identify reusable explanations / examples
      ↓
Create only the missing Step 1 / Step 2 / Step 4 content
```

Do **not** assume that every existing MCQ can or should be converted directly into a Step 4 coding challenge.

### Existing content must be preserved

Existing validated questions should remain available as reusable content unless they are explicitly deprecated.

Use stable IDs and maintain a migration mapping:

```text
legacyQuestionId
        ↓
conceptId
        ↓
subConceptId
        ↓
newActivityType
        ↓
newStep
```

If an existing question cannot be confidently mapped, mark it for review instead of forcing a mapping.

## Existing boss fights

The **9 boss fights** are existing lesson/activity units and should remain part of the broader curriculum.

They are **not automatically one of the five standard Sub-Concept screens**.

Boss fights should be treated as a higher-level assessment/reinforcement layer that can consume skills from multiple Sub-Concepts.

```text
World
 ├── Concepts
 │    └── Sub-Concepts
 │         └── 5-step lessons
 │
 └── Boss Fight
      └── assesses multiple mastered skills
```

## Existing daily sprint questions

The **10 daily sprint battle questions** should remain separate from the core curriculum progression.

They can reuse the same underlying question records, but must retain their sprint/battle classification so they do not incorrectly appear as required lesson content.

```text
Question
├── curriculum
└── daily_sprint_battle
```

## Migration principle

**Reuse first → map second → gap-fill third → regenerate only when necessary.**

The purpose of Phase 3 is therefore not:

> "Create hundreds of new questions from scratch."

It is:

> "Transform the existing validated content into a structured, reusable learning system and create the missing content required by the five-step experience."

---

# 4. PHASE 1 — COMPLETE KOTLIN CONCEPT INVENTORY

## Objective

Create a comprehensive inventory of Kotlin knowledge from **beginner → intermediate → advanced**.

The question Phase 1 must answer is:

> What are all the Kotlin concepts a learner may reasonably need to learn?

This phase is about **curriculum discovery and organization**, not lesson writing.

## Phase 1 output

A canonical list of Kotlin Concepts organized into Worlds / curriculum areas.

Example:

```text
World 1 — Programming Foundations
  ├── Variables
  ├── Values
  ├── Data Types
  ├── Operators
  └── Basic Input / Output

World 2 — Control Flow
  ├── Boolean Logic
  ├── Conditions
  ├── When
  └── Expressions

World 3 — Loops
  ├── Loop Fundamentals
  ├── For Loops
  ├── Ranges
  ├── While Loops
  └── Loop Control

World 4 — Functions
  ├── Functions
  ├── Parameters
  ├── Return Values
  └── Function Calls

World 5 — Collections
  ├── Lists
  ├── Sets
  ├── Maps
  ├── Iteration
  └── Collection Operations

...
```

This is an **inventory**, not yet the final Home screen.

## Concept data

Every Concept must have:

```text
conceptId
languageId
worldId
name
shortDescription
description
order
difficulty
expertiseLevels[]
prerequisiteConceptIds[]
relatedConceptIds[]
```

## Difficulty

Difficulty describes the intrinsic complexity of the Concept.

Use:

```text
beginner
easy
medium
hard
advanced
```

Difficulty is **not** the same thing as learner expertise.

## Expertise levels

Use exactly:

```text
beginner
intermediate
advanced
```

These indicate which learner profiles should encounter the Concept in a personalized curriculum.

Example:

```text
concept:
  id: kotlin.functions
  difficulty: medium
  expertiseLevels:
    - beginner
    - intermediate
    - advanced
```

Another concept may be:

```text
concept:
  id: kotlin.coroutines
  difficulty: advanced
  expertiseLevels:
    - intermediate
    - advanced
```

Do not create three copies of the curriculum.

---

# 5. PHASE 1 — KOTLIN INVENTORY RESEARCH RULES

The inventory must progress from beginner to advanced.

Research should cover, where applicable:

```text
Programming foundations
Variables and values
Types
Operators
Expressions
Conditions
When
Loops
Functions
Parameters
Return values
Collections
Strings
Null safety
Classes
Objects
Constructors
Properties
Inheritance
Interfaces
Generics
Extensions
Lambdas
Higher-order functions
Function references
Scope functions
Delegation
Sealed types
Data classes
Enums
Exceptions
Coroutines
Flow
Concurrency
DSL concepts
Reflection
Advanced type-system features
JVM interoperability
Android-relevant Kotlin
```

This list is a **research checklist**, not a final closed curriculum.

The final inventory must be based on Kotlin relevance, prerequisite structure, learner value, and the intended CodeDo curriculum.

## Phase 1 completion criteria

Before moving to Phase 2:

- [ ] Major Kotlin areas have been researched.
- [ ] Concepts are not duplicated.
- [ ] Every Concept has a stable ID.
- [ ] Every Concept belongs to a World.
- [ ] Ordering is logical.
- [ ] Prerequisites are identified.
- [ ] Difficulty is assigned.
- [ ] Expertise levels are assigned.
- [ ] Concepts are meaningful enough to support one or more Sub-Concepts.
- [ ] Existing curriculum data has been inspected before replacing anything.

---

# 6. PHASE 2 — CONCEPT → SUB-CONCEPT DECOMPOSITION

## Objective

Break every major Concept into **small, teachable Sub-Concepts**.

Sub-Concepts are the actual learning nodes shown on the Home journey / snake path.

```text
Concept
  ├── Sub-Concept
  ├── Sub-Concept
  ├── Sub-Concept
  └── Sub-Concept
```

Example:

```text
Functions
  ├── Function Basics
  ├── Function Names
  ├── Parameters
  ├── Parameter Types
  ├── Return Types
  ├── Return Values
  ├── Function Calls
  ├── Default Arguments
  ├── Named Arguments
  ├── Expression Functions
  ├── Lambdas
  ├── Higher-Order Functions
  └── Function References
```

Example:

```text
Loops
  ├── Loop Basics
  ├── For Loops
  ├── Range Iteration
  ├── While Loops
  ├── Do-While Loops
  ├── Loop Variables
  ├── Conditions Inside Loops
  ├── Break
  ├── Continue
  ├── Nested Loops
  ├── Collections + Loops
  └── Loop-Based Accumulation
```

The exact inventory must be determined during Phase 2 research.

---

# 7. SUB-CONCEPT GRANULARITY

A Sub-Concept must satisfy all three conditions:

```text
Meaningful skill
      +
Can be taught in one five-step lesson
      +
Can appear as one Home journey node
```

Do not split a concept merely to create more nodes.

Do not combine unrelated skills merely to reduce data gathering.

### Good

```text
Functions
  → Parameters
```

### Too small

```text
Functions
  → Colon Before Parameter Type
```

### Too broad

```text
Functions
  → Everything About Functions
```

---

# 8. PHASE 2 SUB-CONCEPT DATA

Every Sub-Concept must have:

```text
subConceptId
languageId
worldId
conceptId
name
shortDescription
order
difficulty
expertiseLevels[]
prerequisiteSubConceptIds[]
relatedSubConceptIds[]
learningObjectives[]
```

Optional:

```text
estimatedMinutes
tags[]
```

---

# 9. HOME JOURNEY DATA MODEL

The Home screen must be generated from the curriculum data.

```text
World
  ↓
Concept
  ↓
Sub-Concept nodes
  ↓
Learner progress
```

Example:

```text
WORLD 4 — FUNCTIONS

✓ What is a Function?
✓ Parameters
✓ Return Values
▶ Functions in Action
🔒 Default Arguments
🔒 Named Arguments
🔒 Expression Functions
🔒 Lambdas
```

The snake path is only a **visual representation**.

### Critical rule

The UI must never become the source of truth.

The data defines:

- node order
- prerequisites
- locked/unlocked state
- title
- description
- progress
- completion
- expertise eligibility

The UI only renders those values.

---

# 10. PHASE 3 — FIVE-STEP LESSON CONTENT

For **every Sub-Concept**, gather a complete five-step lesson.

```text
Sub-Concept
    ↓
Step 1 — Learn
    ↓
Step 2 — Explore
    ↓
Step 3 — Predict
    ↓
Step 4 — Write & Run
    ↓
Step 5 — Mastered
```

All five steps together form one:

```text
LessonPackage
```

Example:

```text
Functions
  └── Parameters
       └── LessonPackage
            ├── Learn
            ├── Explore
            ├── Predict
            ├── Write & Run
            └── Mastered
```

---

# 11. STEP 1 — LEARN

## Purpose

Explain the Sub-Concept before asking the learner to solve problems.

The screen should answer:

> What is this, why does it exist, and what should I understand before moving forward?

## Step 1 content

```text
stepId
stepType = learn
title
shortDescription
explanation
keyPoints[]
exampleCode
exampleExplanation
keyTakeaway
estimatedMinutes
```

## Content rules

Step 1 should:

- Start with intuition.
- Explain the concept in simple language.
- Introduce terminology gradually.
- Use a small relevant code example.
- Explain important code parts.
- Avoid unnecessary theory.
- End with a clear takeaway.

Step 1 must be concise enough for a mobile screen.

---

# 12. STEP 2 — EXPLORE

## Purpose

Show progressive examples that allow the learner to understand the **parts and anatomy** of the Sub-Concept.

This is the screen where the learner moves from simple usage toward the more complete form.

## Example — Functions

```text
1. Simple function
2. Function with a parameter
3. Parameter with a type
4. Multiple parameters
5. Returning a value
```

Example:

```kotlin
fun sum(param1: Int, param2: Int): Int {
    return param1 + param2
}
```

The content must explain:

```text
sum
→ function name

param1: Int
→ parameter + parameter type

param2: Int
→ parameter + parameter type

: Int
→ return type

return
→ sends a value back

param1 + param2
→ returned expression
```

## Step 2 data

```text
stepId
stepType = explore
title
intro
examples[]
keyTakeaway
```

Each example:

```text
exampleId
title
code
explanation
annotations[]
difficulty
expertiseLevels[]
```

Each annotation:

```text
codeToken
meaning
```

The same structure must support Loops, Variables, Collections, Classes, etc.

---

# 13. STEP 2 — EXAMPLE PROGRESSION RULE

Examples should normally progress from:

```text
Simple
  ↓
Basic variation
  ↓
Add one important part
  ↓
Combine important parts
  ↓
Complete practical form
```

Do not make five examples that differ only by variable names or numbers.

Each example should teach a new structural idea.

---

# 23. STEP 3 — PREDICT

## Purpose

Train the learner to mentally execute code before seeing the result.

Standard interaction:

```text
Show code
   ↓
Ask what will happen / print
   ↓
Learner selects answer
   ↓
Explain answer
   ↓
Next question
```

## First-pass lesson

Target:

```text
5 prediction questions
```

Maintain a larger reusable question pool for:

- personalization
- practice
- mistake remediation
- spaced repetition
- future lessons

## Question data

```text
questionId
subConceptId
type
question
code
options[]
correctAnswer
explanation
hint
difficulty
expertiseLevels[]
source
sourceQuestionId
```

For migrated questions:

```text
source = existing_mcq_bank
sourceQuestionId = original validated question ID
```

This preserves traceability between the old MCQ bank and the new lesson system.

## Existing 304-question MCQ bank migration

The existing bank is a **primary source for Step 3 — Predict**.

Migration workflow:

```text
304 validated MCQs
      ↓
Classify
      ↓
Map to Concept
      ↓
Map to Sub-Concept
      ↓
Assign difficulty
      ↓
Assign beginner / intermediate / advanced suitability
      ↓
Validate code + answer + explanation
      ↓
Add to Step 3 reusable question pool
```

Break the inventory into:

```text
294 curriculum MCQs
    → map into the relevant Concept / Sub-Concept

10 daily sprint battle MCQs
    → retain as sprint/battle content
    → optionally reference the underlying skill/sub-concept
    → do not count them as required Step 3 lesson questions unless explicitly reused
```

### Do not duplicate migrated questions

If an existing MCQ already satisfies the Step 3 requirements for a Sub-Concept, reuse it.

Only create a new question when:

- the Sub-Concept has insufficient coverage,
- the existing question is too difficult/easy for the intended audience,
- the question tests the wrong skill,
- the explanation is inadequate,
- the question is duplicated,
- the code is invalid/outdated,
- or a different reasoning pattern is required.

### Step 3 first-pass target

The five-question lesson shown on the screen is a **curated selection**, not necessarily five newly authored questions.

```text
Reusable Step 3 pool
        ↓
Filter by Sub-Concept
        ↓
Filter by expertise level
        ↓
Filter by prerequisite/mastery state
        ↓
Select appropriate 5
        ↓
Render Step 3
```

This allows the existing 294 curriculum questions to become useful immediately while still supporting future expansion.

## Prediction progression

Within a Sub-Concept:

```text
Basic recognition
      ↓
Simple execution
      ↓
Value / parameter changes
      ↓
Multiple relevant parts
      ↓
Misconception / edge case
```

The five questions must test different reasoning patterns.

---

# 15. STEP 4 — WRITE & RUN

## Purpose

This is the primary hands-on coding step.

The learner must actually write code, run it, see the real output, and verify the result.

```text
Read problem
   ↓
Understand requirements
   ↓
Write code
   ↓
Run code
   ↓
See actual output
   ↓
Compare with expected result
   ↓
Fix if necessary
```

## First-pass lesson

Target:

```text
5 coding challenges
```

for substantial Sub-Concepts.

Smaller Sub-Concepts may use fewer challenges when five would be artificial.

Maintain a larger reusable pool for personalization and practice.

## Challenge data

```text
challengeId
subConceptId
type = write_code
title
problemStatement
requirements[]
starterCode
solutionCode
expectedOutput
testCases[]
hints[]
explanation
difficulty
expertiseLevels[]
compilerEnabled
imports[]
timeLimit
```

## Test case

```text
testCaseId
input
expectedOutput
explanation
hidden
```

---

# 16. STEP 4 — EXECUTION REQUIREMENT

When execution is part of the challenge, the system must support:

```text
Code Editor
   ↓
Run
   ↓
Actual Output
   ↓
Test Results
```

The learner must not simply compare their answer with a static expected answer.

### Validation

For executable challenges:

1. Verify syntax.
2. Verify imports and execution context.
3. Compile/run where possible.
4. Verify actual output.
5. Verify test cases.
6. Test important edge cases.
7. Verify the explanation.
8. Verify the starter code does not reveal the full solution.

Never guess executable output when execution is available.

---

# 17. STEP 5 — MASTERED

## Purpose

Celebrate completion and summarize what the learner accomplished.

Step 5 is primarily a **completion / verification screen**, not another learning question bank.

The screen should be generated from:

```text
Sub-Concept metadata
+
Learner Step 1–4 completion state
+
Actual performance
```

## Static data

```text
stepId
stepType = mastered
masteryTitle
masteryDescription
masteryChecklist[]
completionTakeaway
```

## Dynamic data

```text
xpEarned
accuracy
challengesCompleted
predictionsCorrect
streak
```

Example checklist:

```text
✓ Concept understood
✓ Examples explored
✓ Predictions completed
✓ Code written and executed
```

Mastery must reflect actual completion/performance.

Opening the screen must not itself award mastery.

---

# 18. CANONICAL LESSON PACKAGE

Every Sub-Concept resolves to:

```text
LessonPackage
{
    id
    languageId
    worldId
    conceptId
    subConceptId

    step1Learn
    step2Explore
    step3Predict
    step4WriteRun
    step5Mastered

    difficulty
    expertiseLevels[]

    prerequisiteSubConceptIds[]

    estimatedMinutes
    xp
}
```

The physical storage may be JSON, database documents, Kotlin models, or another format.

The logical structure must remain stable.

---

# 19. EXPERTISE PERSONALIZATION

CodeDo must support three learner expertise levels:

```text
beginner
intermediate
advanced
```

These tags are used to customize the learning path and the difficulty of activities.

## Important distinction

```text
Concept difficulty
```

describes the concept itself.

```text
Learner expertise
```

describes the learner.

They must never be treated as the same field.

---

# 20. TAGGING REQUIREMENT

Every relevant curriculum/content entity should carry expertise metadata.

At minimum:

```text
Concept
Sub-Concept
LessonPackage
Step 1
Step 2 examples
Step 3 questions
Step 4 challenges
```

Use:

```text
expertiseLevels[]
```

Example:

```text
expertiseLevels:
  - beginner
  - intermediate
```

or:

```text
expertiseLevels:
  - intermediate
  - advanced
```

Do not duplicate the entire curriculum for each expertise level.

---

# 21. EXPERTISE ADAPTATION RULES

The same Sub-Concept can provide different activity difficulty through tagged content.

### Beginner

```text
More explicit explanations
Simple examples
More starter code
Simple values
Stronger hints
Straightforward predictions
```

### Intermediate

```text
Less starter code
More variations
Reduced hints
Combination of concepts
More realistic examples
```

### Advanced

```text
Minimal starter code
Realistic constraints
Complex cases
Hidden tests
Debugging
Optimization
Subtle misconceptions
```

The learning objective should remain consistent unless the expertise level genuinely requires a different objective.

---

# 22. CONTENT TAGGING MODEL

Every content item should support enough metadata for the personalization engine to make a decision.

Recommended:

```text
difficulty
expertiseLevels[]
prerequisites[]
relatedSubConcepts[]
tags[]
```

For questions/challenges:

```text
difficulty
expertiseLevels[]
skillTags[]
misconceptionTags[]
```

Example:

```text
question:
  id: predict.functions.parameters.q03
  difficulty: medium
  expertiseLevels:
    - beginner
    - intermediate
  misconceptionTags:
    - parameter_vs_argument
```

---

# 23. LANGUAGE-AGNOSTIC ARCHITECTURE

The same learning engine must eventually support:

```text
Kotlin
Python
Java
JavaScript
Swift
...
```

The architecture is:

```text
Language
   ↓
Curriculum
   ↓
Concept
   ↓
Sub-Concept
   ↓
Five-Step Lesson
```

Example:

```text
Kotlin → Functions → Parameters
Python → Functions → Parameters
Java → Methods → Parameters
JavaScript → Functions → Parameters
```

The UI remains the same.

Language-specific differences belong in data:

```text
syntax
code
terminology
examples
compiler/runtime
explanation
```

The **core learning objective** can be shared where appropriate.

---

# 24. STABLE IDS

Every entity must have a stable ID.

Recommended pattern:

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

IDs must not change after user progress depends on them unless a migration exists.

---

# 25. EXAMPLE — FUNCTIONS → PARAMETERS

```text
World
└── Functions
    └── Parameters
        └── LessonPackage
            ├── Step 1 — Learn
            │   └── Explain what parameters are and why functions use them
            │
            ├── Step 2 — Explore
            │   ├── Function without parameters
            │   ├── One parameter
            │   ├── Typed parameter
            │   ├── Multiple parameters
            │   └── Parameters + return value
            │
            ├── Step 3 — Predict
            │   └── 5 prediction questions
            │
            ├── Step 4 — Write & Run
            │   └── 5 coding challenges
            │
            └── Step 5 — Mastered
                └── Completion / mastery summary
```

---

# 26. EXAMPLE — LOOPS → FOR LOOPS

```text
World
└── Loops
    └── For Loops
        └── LessonPackage
            ├── Step 1 — Learn
            │   └── Explain repetition and for-loop structure
            │
            ├── Step 2 — Explore
            │   ├── Basic for loop
            │   ├── Range
            │   ├── Changing range
            │   ├── Collection iteration
            │   └── Condition inside loop
            │
            ├── Step 3 — Predict
            │   └── 5 execution/output questions
            │
            ├── Step 4 — Write & Run
            │   └── 5 progressive coding challenges
            │
            └── Step 5 — Mastered
                └── Completion / mastery summary
```

The component architecture is identical.

Only the data changes.

---

# 27. CONTENT POOL STRATEGY

The five-step lesson is the **first-pass learning experience**.

The existing **304 validated MCQ bank is part of the reusable content pool**, with 294 curriculum questions and 10 daily sprint battle questions. The new architecture should consume this bank before authoring replacement questions.

It is not the entire content database.

For substantial Sub-Concepts, target:

```text
Step 2 — Explore
≈ 5 examples

Step 3 — Predict
≈ 8–10 reusable questions

Step 4 — Write & Run
≈ 8–10 reusable challenges
```

The default first lesson exposes:

```text
Step 2 → ≈ 5 examples
Step 3 → ≈ 5 questions
Step 4 → ≈ 5 challenges
```

The larger pool supports:

```text
adaptive learning
repeated practice
mistake remediation
expertise personalization
spaced repetition
future lessons
```

Do not force the entire pool into one lesson.

---

# 28. CONTENT VARIETY

Across the wider CodeDo system, supported activity types may include:

```text
multiple_choice
true_false
fill_blank
code_completion
output_prediction
find_bug
code_ordering
match_concept
tap_correct_line
write_code
compiler_challenge
experiment
boss
```

However, the five-step lesson has fixed responsibilities:

```text
Step 1 → explanation
Step 2 → progressive examples + anatomy
Step 3 → prediction
Step 4 → writing + execution
Step 5 → mastery confirmation
```

Do not turn every step into a generic question bank.

---

# 29. EXISTING MCQ BANK → FIVE-STEP MIGRATION

The migration should happen before large-scale new question generation.

## Required audit

For each of the **294 curriculum MCQs**:

- [ ] Existing question ID captured.
- [ ] World identified.
- [ ] Concept identified.
- [ ] Sub-Concept identified.
- [ ] Step 3 suitability confirmed.
- [ ] Difficulty assigned.
- [ ] Beginner / intermediate / advanced suitability assigned.
- [ ] Code syntax verified.
- [ ] Correct answer verified.
- [ ] Explanation verified.
- [ ] Duplicate check completed.
- [ ] Source retained.

For each of the **10 daily sprint battle MCQs**:

- [ ] Sprint/battle classification retained.
- [ ] Underlying Concept/Sub-Concept identified where possible.
- [ ] Difficulty tagged.
- [ ] Expertise suitability tagged.
- [ ] Kept separate from required curriculum progression.

## Migration output

Create a mapping table:

```text
legacyQuestionId
        |
        +--> worldId
        |
        +--> conceptId
        |
        +--> subConceptId
        |
        +--> step = predict
        |
        +--> difficulty
        |
        +--> expertiseLevels[]
        |
        +--> source = existing_mcq_bank
```

## Coverage report

After migration, generate a report:

```text
Sub-Concept
  ├── Existing Step 3 questions
  ├── Missing Step 3 questions
  ├── Beginner coverage
  ├── Intermediate coverage
  └── Advanced coverage
```

This report determines exactly what new Step 3 content needs to be gathered.

Only after this audit should we decide how many new prediction questions must be authored.

---

# 29. EXISTING CURRICULUM MIGRATION

Existing CodeDo data must be reused wherever possible.

Do not blindly regenerate existing curriculum.

Migration process:

```text
Existing World / Module / Lesson
          ↓
Inspect existing content
          ↓
Map to Concept
          ↓
Map to Sub-Concept
          ↓
Reuse compatible content
          ↓
Map to Step 1 / Step 2 / Step 3 / Step 4
          ↓
Generate Step 5 from completion state
          ↓
Identify missing expertise tags
          ↓
Gap-fill only missing content
```

If content cannot be mapped confidently, flag the mismatch.

Do not silently force content into an incorrect Sub-Concept.

---

# 30. DATA GATHERING WORKFLOW

For every new curriculum area:

```text
1. Read CODEDO_PROJECT_PLAN.md
2. Read CODEDO_DATA_GATHERING.md
3. Inspect existing curriculum
4. Complete Phase 1 inventory
5. Validate Concept hierarchy
6. Complete Phase 2 decomposition
7. Validate Sub-Concept hierarchy
8. Confirm prerequisites
9. Assign difficulty
10. Assign expertise levels
11. Audit and map existing MCQ content
12. Define learning objectives
13. Gather Step 1 content
13. Gather Step 2 examples
14. Gather Step 3 prediction pool
15. Gather Step 4 coding pool
16. Define Step 5 mastery data
17. Validate executable code
18. Validate educational quality
19. Detect duplicates
20. Verify IDs and relationships
21. Update progress tracker
22. Update cursor
23. Add session log
```

Never generate a large quantity of content before knowing exactly where it belongs.

---

# 31. PHASE-SPECIFIC QUALITY CHECKLIST

## Phase 1 — Concept Inventory

- [ ] Major Kotlin area is covered.
- [ ] Concept belongs to the correct World.
- [ ] Stable Concept ID exists.
- [ ] Ordering is logical.
- [ ] Prerequisites are identified.
- [ ] Difficulty is assigned.
- [ ] Expertise levels are assigned.
- [ ] Duplicate concepts are removed.

## Phase 2 — Sub-Concept

- [ ] Sub-Concept represents one meaningful skill.
- [ ] Parent Concept is correct.
- [ ] Home journey title is concise.
- [ ] Ordering is logical.
- [ ] Prerequisites are correct.
- [ ] Difficulty is assigned.
- [ ] Expertise levels are assigned.
- [ ] Learning objectives are defined.
- [ ] It fits naturally into one five-step lesson.

## Step 1 — Learn

- [ ] Explanation is technically correct.
- [ ] Explanation is understandable at the intended expertise level.
- [ ] Example code is valid.
- [ ] Important terminology is explained.
- [ ] Content is concise.
- [ ] Takeaway is clear.

## Step 2 — Explore

- [ ] Examples progress logically.
- [ ] Code is valid.
- [ ] Important code tokens are explained.
- [ ] Examples are meaningfully different.
- [ ] Anatomy/annotations are accurate.
- [ ] Difficulty progression is appropriate.

## Step 3 — Predict

- [ ] Code is valid.
- [ ] Correct answer is unambiguous.
- [ ] Distractors represent realistic misconceptions.
- [ ] Explanation teaches the reasoning.
- [ ] Questions vary in reasoning pattern.
- [ ] Difficulty matches expertise.

## Step 4 — Write & Run

- [ ] Problem is clear.
- [ ] Requirements are testable.
- [ ] Starter code does not reveal the full solution.
- [ ] Solution compiles.
- [ ] Actual output is verified.
- [ ] Test cases are correct.
- [ ] Hidden tests are used where useful.
- [ ] Edge cases are considered.
- [ ] Difficulty matches expertise.

## Step 5 — Mastered

- [ ] Completion state reflects real learner progress.
- [ ] Checklist is accurate.
- [ ] XP is based on actual completion.
- [ ] Accuracy is based on actual performance.
- [ ] Mastery is not awarded merely by opening the screen.

---

# 32. DUPLICATE DETECTION

Before adding content, check for:

```text
Same question
Same code
Same correct answer
Same objective
Near-identical wording
Same challenge with trivial value changes
```

Intentional variants are allowed when they meaningfully change:

```text
values
context
code structure
challenge type
misconception
difficulty
expertise level
```

---

# 33. ADAPTIVE LEARNING

The personalization engine should prioritize:

```text
1. Repeated mistakes
2. Low mastery
3. Recently introduced Sub-Concepts
4. Due-for-review skills
5. Appropriate expertise level
6. Useful reinforcement
```

Do not repeat the exact same question indefinitely after a mistake.

Instead vary:

```text
code
values
wording
context
difficulty
challenge type
mistake pattern
```

---

# 34. MASTERY DATA

Track mastery at the Sub-Concept / skill level:

```text
subConceptId
masteryPercent
attempts
correctAttempts
incorrectAttempts
lastPracticedAt
lastMistakeAt
mistakeCount
step1Completed
step2Completed
step3Completed
step4Completed
masteredAt
```

Mastery must be based on actual performance.

Opening Step 1 or Step 5 must not automatically increase mastery.

---

# 35. MISTAKE DATA

Required:

```text
questionId
subConceptId
mistakeCount
lastMistakeDate
```

Optional:

```text
errorCategory
attemptsBeforeCorrect
reviewCount
masteryBefore
masteryAfter
compilerError
```

Mistakes can feed:

```text
Mistake Review
Weak Skills
Adaptive Practice
Daily Recommendations
```

Incorrect answers should teach, not punish.

---

# 36. SPACED REPETITION

Support:

```text
nextReviewAt
reviewInterval
reviewStrength
```

Reviews should strengthen weak or forgotten Sub-Concepts without blocking the main learning path.

---

# 37. GOAL PERSONALIZATION

Goal tags may include:

```text
android_developer
kotlin_job
android_app_builder
kotlin_mastery
college
beginner_programming
game_development
finance_app
productivity_app
```

Do not duplicate the entire curriculum for every goal.

Tag and reuse content wherever possible.

---

# 38. DATA STORAGE

Prototype structure may be:

```text
data/
  curriculum/
    kotlin/
      foundations/
      control-flow/
      loops/
      functions/
      collections/
      oop/
      null-safety/
      coroutines/
      mastery/
      android/
      projects/
```

Keep curriculum data outside UI components.

Production architecture may use:

```text
Bundled / Downloaded Curriculum
          +
      Local Cache
          +
      Backend API
          ↓
       Database
```

Static curriculum should be cacheable locally.

Dynamic user state belongs to the user/progress layer:

```text
progress
mastery
mistakes
streak
XP
quests
battles
diagnostic results
personalized journey state
```

---

# 39. RESUME PROTOCOL

At the beginning of every data-gathering session:

1. Read `CODEDO_PROJECT_PLAN.md`.
2. Read `CODEDO_DATA_GATHERING.md`.
3. Inspect existing curriculum.
4. Determine completed Phase 1 items.
5. Determine completed Phase 2 items.
6. Determine completed Phase 3 items.
7. Read the progress tracker.
8. Read the current content cursor.
9. Identify the first incomplete item.
10. Continue from that exact location.
11. Validate new content.
12. Update the tracker.
13. Update the cursor.
14. Add a session log.

Never assume work starts from World 1.

---

# 40. PROGRESS TRACKER

The tracker must separate all three phases.

```text
PHASE 1 — CONCEPT INVENTORY

World 1 — Foundations        [ ]
World 2 — Control Flow       [ ]
World 3 — Loops              [ ]
World 4 — Functions          [ ]
World 5 — Collections        [ ]
World 6 — OOP                [ ]
World 7 — Kotlin Mastery     [ ]
World 8 — Coroutines         [ ]
World 9 — Android            [ ]
World 10 — Projects          [ ]

Concepts identified: 0 / 0
Concepts validated: 0 / 0


PHASE 2 — SUB-CONCEPT MAP

Concepts mapped: 0 / 0
Sub-Concepts mapped: 0 / 0
Sub-Concepts validated: 0 / 0


PHASE 3 — FIVE-STEP CONTENT

Step 1 — Learn:        0 / 0
Step 2 — Explore:      0 / 0
Step 3 — Predict:      0 / 0
Step 4 — Write & Run:  0 / 0
Step 5 — Mastered:     0 / 0


PERSONALIZATION

Expertise tags completed: 0 / 0


VALIDATION

Technical:       [ ]
Educational:     [ ]
Personalization: [ ]
Duplicates:      [ ]
```

Counts must be updated as the inventory becomes known.

---

# 41. CURRENT CONTENT CURSOR

Update after every meaningful data session.

```text
Current Phase:
Current Language:
Current World:
Current Concept:
Current Sub-Concept:
Current Step:
Last Completed Item:
Next Item:
```

Never leave the cursor stale.

---

# 42. SESSION LOG

Append after every meaningful session:

```text
## YYYY-MM-DD

Phase:
Language:
World:
Concept:
Sub-Concept:

Completed:
- ...

Added:
- ...

Reused:
- ...

Gap-filled:
- ...

Validated:
- ...

Issues:
- ...

Next:
- ...
```

---

# 43. LONG-TERM LANGUAGE EXPANSION

After Kotlin, the same architecture should support other languages.

```text
Kotlin
  ↓
Python
  ↓
Java
  ↓
JavaScript
  ↓
Swift
  ↓
...
```

The engine remains:

```text
Language
  ↓
World
  ↓
Concept
  ↓
Sub-Concept
  ↓
5-Step Lesson
```

Only language-specific data changes.

The architecture must support adding a new language without changing the five-screen lesson engine.

---

# 44. FINAL NON-NEGOTIABLE RULES

1. **Phase 1 comes first:** build the complete Concept inventory.
2. **Phase 2 comes second:** decompose Concepts into meaningful Sub-Concepts.
3. **Phase 3 comes third:** create five-step content for every Sub-Concept.
4. The Home snake path is driven by Concept/Sub-Concept data.
5. The snake-path UI is never the source of truth.
6. Every Sub-Concept maps to one five-step LessonPackage.
7. Step 1 teaches the concept.
8. Step 2 demonstrates progressive examples and explains anatomy.
9. Step 3 develops prediction and execution reasoning.
10. Step 4 requires real code writing and execution.
11. Step 5 confirms completion and mastery.
12. Functions, Loops, Variables, Collections, Classes, etc. use the same screen templates.
13. Data changes; the UI architecture does not.
14. Difficulty and learner expertise are separate.
15. Use exactly three expertise levels: beginner, intermediate, advanced.
16. Do not duplicate the curriculum for expertise levels.
17. Tag Concepts, Sub-Concepts, lessons, questions, and challenges appropriately.
18. Reuse existing curriculum data wherever possible.
19. Reuse and migrate the existing 294 curriculum MCQs before creating replacement Step 3 questions.
20. Keep the 10 daily sprint battle MCQs separate from required curriculum progression.
21. Maintain stable IDs.
22. Validate executable code.
23. Verify actual output whenever execution is available.
24. Detect duplicate or low-value content.
25. Maintain reusable pools beyond the first-pass lesson.
26. Keep curriculum data outside UI components.
27. The architecture must remain language-agnostic.
28. Update the progress tracker, cursor, and session log after meaningful work.
29. Never generate large quantities of content without knowing exactly where each item belongs.

---

# 45. DATA NORTH STAR

CodeDo should make the learner feel:

> **“I understood the concept, explored how it works, predicted what the code does, wrote and ran real code, and mastered the skill.”**

The curriculum should be:

```text
Complete
   +
Structured
   +
Reusable
   +
Personalized
   +
Executable
   +
Language-agnostic
```
