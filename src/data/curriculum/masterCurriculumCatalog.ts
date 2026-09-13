import { CurriculumLevel, LessonMeta } from '../../types';

/**
 * Authoritative 22-world Kotlin curriculum catalog, derived from
 * CODEDO_MASTER_PLAN.md (world names, chapter grouping, per-world topic
 * scope, and World Boss projects). This is the single source of truth for
 * world identity -- Home's snake path and Listing's per-world lesson list
 * should both read from this instead of maintaining their own copies.
 *
 * IMPORTANT: lesson entries here are placeholders. Each lesson's title
 * reflects one or more real topics from the master plan, but the
 * description/xpReward/questionsCount are not yet real five-stage lesson
 * content -- that still needs to be authored (see CODEDO_DATA_GATHERING.md).
 */
export interface MasterWorldEntry {
  id: string;
  order: number;
  title: string;
  level: CurriculumLevel;
  levelTitle: string;
  subtitle: string;
  badge: string;
  bossTitle: string;
  bossDescription: string;
  lessons: LessonMeta[];
}

export const CODEDO_MASTER_WORLDS: MasterWorldEntry[] = [
  {
    "id": "world-1",
    "order": 1,
    "title": "Kotlin Awakening",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Kotlin Fundamentals",
    "badge": "BEGINNER \u2022 W1",
    "bossTitle": "Personal Profile Program",
    "bossDescription": "Build a small standalone Kotlin program that declares different variables, uses appropriate data types, prints values, and uses string templates.",
    "lessons": [
      {
        "id": "world-1-what-is-kotlin",
        "title": "What is Kotlin?",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 2,
        "xpReward": 20,
        "description": "What Kotlin is, who created it, and where it runs -- pure theory, no code yet.",
        "questionsCount": 3,
        "fiveStageLessonKey": "what-is-kotlin"
      },
      {
        "id": "world-1-kotlin-syntax",
        "title": "Kotlin Syntax & main()",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "How a Kotlin program starts at main() and how statements run in order.",
        "questionsCount": 3,
        "fiveStageLessonKey": "kotlin-syntax"
      },
      {
        "id": "world-1-comments",
        "title": "Comments",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-print-println",
        "title": "print() and println()",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-val-vs-var",
        "title": "val vs var",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-variables-type-inference",
        "title": "Variables & Type Inference",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-int-long",
        "title": "Int & Long",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-float-double",
        "title": "Float & Double",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-boolean",
        "title": "Boolean",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-char",
        "title": "Char",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-string",
        "title": "Strings",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-string-templates",
        "title": "String Templates",
        "worldId": "world-1",
        "skill": "kotlin-fundamentals",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-1-boss",
        "title": "Personal Profile Program",
        "worldId": "world-1",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a small standalone Kotlin program that declares different variables, uses appropriate data types, prints values, and uses string templates.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-2",
    "order": 2,
    "title": "Operator Forge",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Operators",
    "badge": "BEGINNER \u2022 W2",
    "bossTitle": "Smart Calculator",
    "bossDescription": "Build a calculator/decision program that combines arithmetic, comparisons, logical conditions, assignments, increment/decrement, and precedence.",
    "lessons": [
      {
        "id": "world-2-arithmetic-operators",
        "title": "Arithmetic operators",
        "worldId": "world-2",
        "skill": "operators",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-2-comparison-operators",
        "title": "Comparison operators",
        "worldId": "world-2",
        "skill": "operators",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-2-logical-operators",
        "title": "Logical operators",
        "worldId": "world-2",
        "skill": "operators",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-2-assignment-operators",
        "title": "Assignment operators",
        "worldId": "world-2",
        "skill": "operators",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-2-increment-decrement",
        "title": "Increment / decrement",
        "worldId": "world-2",
        "skill": "operators",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-2-operator-precedence",
        "title": "Operator precedence",
        "worldId": "world-2",
        "skill": "operators",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-2-boss",
        "title": "Smart Calculator",
        "worldId": "world-2",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a calculator/decision program that combines arithmetic, comparisons, logical conditions, assignments, increment/decrement, and precedence.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-3",
    "order": 3,
    "title": "Decision Maker",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Conditions",
    "badge": "BEGINNER \u2022 W3",
    "bossTitle": "Grade & Eligibility System",
    "bossDescription": "Build a program that evaluates multiple conditions and produces decisions/results.",
    "lessons": [
      {
        "id": "world-3-if",
        "title": "if",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-if-else",
        "title": "if-else",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-else-if",
        "title": "else-if",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-when",
        "title": "when",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-when-with-ranges",
        "title": "when with ranges",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-when-as-an-expression",
        "title": "when as an expression",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-multiple-conditions-and-nested-condition",
        "title": "Multiple conditions and nested conditions",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-type-checks-with-is-where-appropriate",
        "title": "Type checks with is where appropriate",
        "worldId": "world-3",
        "skill": "conditions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-3-boss",
        "title": "Grade & Eligibility System",
        "worldId": "world-3",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a program that evaluates multiple conditions and produces decisions/results.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-4",
    "order": 4,
    "title": "Loop Master",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Loops, Ranges & Progressions",
    "badge": "BEGINNER \u2022 W4",
    "bossTitle": "Pattern & Number Analyzer",
    "bossDescription": "Build a program that processes a range of values using multiple loop constructs and control statements.",
    "lessons": [
      {
        "id": "world-4-for",
        "title": "for",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-while",
        "title": "while",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-do-while",
        "title": "do-while",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-ranges",
        "title": "Ranges",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-progressions",
        "title": "Progressions",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-downto",
        "title": "downTo",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-step",
        "title": "step",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-break",
        "title": "break",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-continue",
        "title": "continue",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-nested-loops",
        "title": "Nested loops",
        "worldId": "world-4",
        "skill": "loops-ranges-progressions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-4-boss",
        "title": "Pattern & Number Analyzer",
        "worldId": "world-4",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a program that processes a range of values using multiple loop constructs and control statements.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-5",
    "order": 5,
    "title": "Function Forge",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Functions",
    "badge": "BEGINNER \u2022 W5",
    "bossTitle": "Utility Toolkit",
    "bossDescription": "Build a reusable collection of functions that perform several related operations.",
    "lessons": [
      {
        "id": "world-5-defining-functions",
        "title": "Defining functions",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-function-parameters",
        "title": "Function parameters",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-return-values",
        "title": "Return values",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-default-parameters",
        "title": "Default parameters",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-named-arguments",
        "title": "Named arguments",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-single-expression-functions",
        "title": "Single-expression functions",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-local-functions",
        "title": "Local functions",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-vararg",
        "title": "vararg",
        "worldId": "world-5",
        "skill": "functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-5-boss",
        "title": "Utility Toolkit",
        "worldId": "world-5",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a reusable collection of functions that perform several related operations.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-6",
    "order": 6,
    "title": "Collection Valley",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Collections",
    "badge": "BEGINNER \u2022 W6",
    "bossTitle": "Student Records",
    "bossDescription": "Build a small student-record system using multiple collection types.",
    "lessons": [
      {
        "id": "world-6-arrays",
        "title": "Arrays",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-lists",
        "title": "Lists",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-sets",
        "title": "Sets",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-maps",
        "title": "Maps",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-mutable-vs-read-only-collections",
        "title": "Mutable vs read-only collections",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-creating-and-accessing-collections",
        "title": "Creating and accessing collections",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-adding-removing-updating-mutable-element",
        "title": "Adding/removing/updating mutable elements",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-iterating-over-collections",
        "title": "Iterating over collections",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-basic-collection-operations",
        "title": "Basic collection operations",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-choosing-the-right-collection-type",
        "title": "Choosing the right collection type",
        "worldId": "world-6",
        "skill": "collections",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-6-boss",
        "title": "Student Records",
        "worldId": "world-6",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a small student-record system using multiple collection types.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-7",
    "order": 7,
    "title": "Null Safety Shield",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Null Safety",
    "badge": "BEGINNER \u2022 W7",
    "bossTitle": "Safe Data Processor",
    "bossDescription": "Build a program that safely processes incomplete/missing data without unnecessary crashes.",
    "lessons": [
      {
        "id": "world-7-nullable-types",
        "title": "Nullable types",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-nullable-variables",
        "title": "Nullable variables",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-safe-call",
        "title": "Safe call ?.",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-elvis-operator",
        "title": "Elvis operator ?:",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-non-null-assertion",
        "title": "Non-null assertion !!",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-null-checks",
        "title": "Null checks",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-smart-casts",
        "title": "Smart casts",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-safe-casts-as",
        "title": "Safe casts as?",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-nullable-collections-and-collection-valu",
        "title": "Nullable collections and collection values",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-chaining-nullable-operations",
        "title": "Chaining nullable operations",
        "worldId": "world-7",
        "skill": "null-safety",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-7-boss",
        "title": "Safe Data Processor",
        "worldId": "world-7",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a program that safely processes incomplete/missing data without unnecessary crashes.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-8",
    "order": 8,
    "title": "Object Kingdom",
    "level": "beginner",
    "levelTitle": "Beginner",
    "subtitle": "Basic OOP",
    "badge": "BEGINNER CAPSTONE",
    "bossTitle": "Student Grade Manager",
    "bossDescription": "Build a small application that stores students, calculates grades, uses collections, functions, conditions, loops, classes, and null safety.",
    "lessons": [
      {
        "id": "world-8-classes",
        "title": "Classes",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-objects",
        "title": "Objects",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-properties",
        "title": "Properties",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-methods",
        "title": "Methods",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-constructors",
        "title": "Constructors",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-primary-constructors",
        "title": "Primary constructors",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-init",
        "title": "init",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-visibility-modifiers",
        "title": "Visibility modifiers",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-data-classes",
        "title": "Data classes",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-enums",
        "title": "Enums",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-basic-inheritance",
        "title": "Basic inheritance",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-interfaces",
        "title": "Interfaces",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-overriding-members",
        "title": "Overriding members",
        "worldId": "world-8",
        "skill": "basic-oop",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-8-boss",
        "title": "Student Grade Manager",
        "worldId": "world-8",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a small application that stores students, calculates grades, uses collections, functions, conditions, loops, classes, and null safety.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-9",
    "order": 9,
    "title": "Lambda Lab",
    "level": "intermediate",
    "levelTitle": "Intermediate",
    "subtitle": "Advanced Functions",
    "badge": "INTERMEDIATE \u2022 W9",
    "bossTitle": "Functional Utility Engine",
    "bossDescription": "Build reusable operations using higher-order functions and function types.",
    "lessons": [
      {
        "id": "world-9-lambda-expressions",
        "title": "Lambda expressions",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-anonymous-functions",
        "title": "Anonymous functions",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-function-types",
        "title": "Function types",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-higher-order-functions",
        "title": "Higher-order functions",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-it",
        "title": "it",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-function-references",
        "title": "Function references",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-returning-from-lambdas",
        "title": "Returning from lambdas",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-local-returns",
        "title": "Local returns",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-inline-functions",
        "title": "Inline functions",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-noinline",
        "title": "noinline",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-crossinline",
        "title": "crossinline",
        "worldId": "world-9",
        "skill": "advanced-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-9-boss",
        "title": "Functional Utility Engine",
        "worldId": "world-9",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build reusable operations using higher-order functions and function types.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-10",
    "order": 10,
    "title": "Collection Wizardry",
    "level": "intermediate",
    "levelTitle": "Intermediate",
    "subtitle": "Functional Collection Operations",
    "badge": "INTERMEDIATE \u2022 W10",
    "bossTitle": "Data Transformation Engine",
    "bossDescription": "Transform and analyze a realistic dataset using multiple collection operations.",
    "lessons": [
      {
        "id": "world-10-map-mapnotnull-filter",
        "title": "map & mapNotNull & filter",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-filternot-filterisinstance-flatmap",
        "title": "filterNot & filterIsInstance & flatMap",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-flatten-reduce-fold",
        "title": "flatten & reduce & fold",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-groupby-associate-partition",
        "title": "groupBy & associate & partition",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-zip-chunked-windowed",
        "title": "zip & chunked & windowed",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-distinct-sorted",
        "title": "distinct & sorted",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-sortedby-min-max",
        "title": "sortedBy & min / max",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-sum-average-any-all-none",
        "title": "sum / average & any / all / none",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-first-find-collection-pipelines-and-chai",
        "title": "first / find & Collection pipelines and chaining",
        "worldId": "world-10",
        "skill": "functional-collection-operations",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-10-boss",
        "title": "Data Transformation Engine",
        "worldId": "world-10",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Transform and analyze a realistic dataset using multiple collection operations.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-11",
    "order": 11,
    "title": "OOP Evolution",
    "level": "intermediate",
    "levelTitle": "Intermediate",
    "subtitle": "Advanced OOP & Kotlin Types",
    "badge": "INTERMEDIATE \u2022 W11",
    "bossTitle": "Domain Model Engine",
    "bossDescription": "Design a maintainable domain model using Kotlin's OOP and type-system features.",
    "lessons": [
      {
        "id": "world-11-inheritance-abstract-classes",
        "title": "Inheritance & Abstract classes",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-interfaces-multiple-interface-implementa",
        "title": "Interfaces & Multiple interface implementation",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-sealed-classes-sealed-interfaces",
        "title": "Sealed classes & Sealed interfaces",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-data-classes-in-domain-modeling-enum-cla",
        "title": "Data classes in domain modeling & Enum classes",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-nested-classes",
        "title": "Nested classes",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-inner-classes",
        "title": "Inner classes",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-object-declarations",
        "title": "Object declarations",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-companion-objects",
        "title": "Companion objects",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-extension-functions",
        "title": "Extension functions",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-extension-properties",
        "title": "Extension properties",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-delegation",
        "title": "Delegation",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-delegated-properties",
        "title": "Delegated properties",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-visibility-and-api-design",
        "title": "Visibility and API design",
        "worldId": "world-11",
        "skill": "advanced-oop-kotlin-types",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-11-boss",
        "title": "Domain Model Engine",
        "worldId": "world-11",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Design a maintainable domain model using Kotlin's OOP and type-system features.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-12",
    "order": 12,
    "title": "Generic Realm",
    "level": "intermediate",
    "levelTitle": "Intermediate",
    "subtitle": "Generics & Type System",
    "badge": "INTERMEDIATE \u2022 W12",
    "bossTitle": "Generic Data Toolkit",
    "bossDescription": "Build reusable generic components that work safely across multiple data types.",
    "lessons": [
      {
        "id": "world-12-generic-classes",
        "title": "Generic classes",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-generic-functions",
        "title": "Generic functions",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-type-parameters",
        "title": "Type parameters",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-generic-constraints",
        "title": "Generic constraints",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-multiple-constraints",
        "title": "Multiple constraints",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-in-variance",
        "title": "in variance",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-out-variance",
        "title": "out variance",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-invariance",
        "title": "Invariance",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-declaration-site-variance",
        "title": "Declaration-site variance",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-use-site-variance",
        "title": "Use-site variance",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-star-projections",
        "title": "Star projections",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-reified-type-parameters",
        "title": "Reified type parameters",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-type-aliases",
        "title": "Type aliases",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-type-safe-generic-apis",
        "title": "Type-safe generic APIs",
        "worldId": "world-12",
        "skill": "generics-type-system",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-12-boss",
        "title": "Generic Data Toolkit",
        "worldId": "world-12",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build reusable generic components that work safely across multiple data types.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-13",
    "order": 13,
    "title": "Scope Masters",
    "level": "intermediate",
    "levelTitle": "Intermediate",
    "subtitle": "Scope Functions",
    "badge": "INTERMEDIATE \u2022 W13",
    "bossTitle": "Configuration Builder",
    "bossDescription": "Refactor and construct objects using scope functions appropriately.",
    "lessons": [
      {
        "id": "world-13-let-run",
        "title": "let & run",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-apply",
        "title": "apply",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-also",
        "title": "also",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-with",
        "title": "with",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-this-vs-it",
        "title": "this vs it",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-return-values-of-scope-functions",
        "title": "Return values of scope functions",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-choosing-the-appropriate-scope-function",
        "title": "Choosing the appropriate scope function",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-scope-function-chaining",
        "title": "Scope-function chaining",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-avoiding-overuse-and-nesting",
        "title": "Avoiding overuse and nesting",
        "worldId": "world-13",
        "skill": "scope-functions",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-13-boss",
        "title": "Configuration Builder",
        "worldId": "world-13",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Refactor and construct objects using scope functions appropriately.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-14",
    "order": 14,
    "title": "Sequence Dimension",
    "level": "intermediate",
    "levelTitle": "Intermediate",
    "subtitle": "Sequences & Lazy Processing",
    "badge": "INTERMEDIATE \u2022 W14",
    "bossTitle": "Large Dataset Processor",
    "bossDescription": "Compare and implement efficient data-processing pipelines.",
    "lessons": [
      {
        "id": "world-14-what-sequences-are",
        "title": "What sequences are",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-eager-collection-processing",
        "title": "Eager collection processing",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-lazy-processing",
        "title": "Lazy processing",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-creating-sequences",
        "title": "Creating sequences",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-assequence",
        "title": "asSequence()",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-intermediate-operations",
        "title": "Intermediate operations",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-terminal-operations",
        "title": "Terminal operations",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-sequence-evaluation-order",
        "title": "Sequence evaluation order",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-short-circuiting",
        "title": "Short-circuiting",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-sequences-vs-collections",
        "title": "Sequences vs collections",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-performance-trade-offs",
        "title": "Performance trade-offs",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-when-sequences-should-and-should-not-be-",
        "title": "When sequences should and should not be used",
        "worldId": "world-14",
        "skill": "sequences-lazy-processing",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-14-boss",
        "title": "Large Dataset Processor",
        "worldId": "world-14",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Compare and implement efficient data-processing pipelines.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-15",
    "order": 15,
    "title": "Error Fortress",
    "level": "intermediate",
    "levelTitle": "Intermediate",
    "subtitle": "Exceptions & Error Handling",
    "badge": "INTERMEDIATE CAPSTONE",
    "bossTitle": "Reliable Order Engine",
    "bossDescription": "Build an application that handles invalid input and failures predictably.",
    "lessons": [
      {
        "id": "world-15-exceptions-try",
        "title": "Exceptions & try",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-catch",
        "title": "catch",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-finally",
        "title": "finally",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-throw",
        "title": "throw",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-multiple-catch-blocks",
        "title": "Multiple catch blocks",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-try-as-an-expression",
        "title": "try as an expression",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-custom-exceptions",
        "title": "Custom exceptions",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-checked-vs-unchecked-exception-model",
        "title": "Checked vs unchecked exception model",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-result",
        "title": "Result",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-runcatching",
        "title": "runCatching",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-success-failure-handling",
        "title": "Success/failure handling",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-error-handling-patterns",
        "title": "Error-handling patterns",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-avoiding-swallowed-errors",
        "title": "Avoiding swallowed errors",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-designing-meaningful-failure-paths",
        "title": "Designing meaningful failure paths",
        "worldId": "world-15",
        "skill": "exceptions-error-handling",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-15-boss",
        "title": "Reliable Order Engine",
        "worldId": "world-15",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build an application that handles invalid input and failures predictably.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-16",
    "order": 16,
    "title": "Coroutine Academy",
    "level": "experienced",
    "levelTitle": "Experienced",
    "subtitle": "Coroutines",
    "badge": "EXPERIENCED \u2022 W16",
    "bossTitle": "Concurrent Task Runner",
    "bossDescription": "Build a concurrent application with cancellation and structured concurrency.",
    "lessons": [
      {
        "id": "world-16-coroutine-fundamentals-coroutine-builder",
        "title": "Coroutine fundamentals & Coroutine builders",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-launch-async",
        "title": "launch & async",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-await-suspending-functions",
        "title": "await & Suspending functions",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-suspend-coroutine-context",
        "title": "suspend & Coroutine context",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-dispatchers-jobs",
        "title": "Dispatchers & Jobs",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-cancellation-cooperative-cancellation",
        "title": "Cancellation & Cooperative cancellation",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-structured-concurrency",
        "title": "Structured concurrency",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-coroutinescope",
        "title": "coroutineScope",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-supervisorscope",
        "title": "supervisorScope",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-exception-handling-in-coroutines",
        "title": "Exception handling in coroutines",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-coroutine-best-practices",
        "title": "Coroutine best practices",
        "worldId": "world-16",
        "skill": "coroutines",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-16-boss",
        "title": "Concurrent Task Runner",
        "worldId": "world-16",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a concurrent application with cancellation and structured concurrency.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-17",
    "order": 17,
    "title": "Flow Universe",
    "level": "experienced",
    "levelTitle": "Experienced",
    "subtitle": "Flow & Reactive Streams",
    "badge": "EXPERIENCED \u2022 W17",
    "bossTitle": "Live Data Pipeline",
    "bossDescription": "Build a reactive data pipeline that models state and events.",
    "lessons": [
      {
        "id": "world-17-flow-fundamentals-cold-flow",
        "title": "Flow fundamentals & Cold Flow",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-hot-streams-flow",
        "title": "Hot streams & flow",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-collect-intermediate-flow-operators",
        "title": "collect & Intermediate Flow operators",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-map-filter",
        "title": "map & filter",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-transform-catch",
        "title": "transform & catch",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-oneach-stateflow",
        "title": "onEach & StateFlow",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-sharedflow-state-vs-events",
        "title": "SharedFlow & State vs events",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-flow-cancellation-combining-flows",
        "title": "Flow cancellation & Combining flows",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-flow-lifecycle-backpressure-conflation-c",
        "title": "Flow lifecycle & Backpressure/conflation concepts where applicable",
        "worldId": "world-17",
        "skill": "flow-reactive-streams",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-17-boss",
        "title": "Live Data Pipeline",
        "worldId": "world-17",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a reactive data pipeline that models state and events.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-18",
    "order": 18,
    "title": "Concurrency Arena",
    "level": "experienced",
    "levelTitle": "Experienced",
    "subtitle": "Concurrency",
    "badge": "EXPERIENCED \u2022 W18",
    "bossTitle": "Concurrent Data Processor",
    "bossDescription": "Build a program that safely processes shared data concurrently and deliberately debug a race-condition bug.",
    "lessons": [
      {
        "id": "world-18-threads",
        "title": "Threads",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-shared-mutable-state",
        "title": "Shared mutable state",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-thread-safety",
        "title": "Thread safety",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-race-conditions",
        "title": "Race conditions",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-synchronization",
        "title": "Synchronization",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-mutex",
        "title": "Mutex",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-atomic-operations",
        "title": "Atomic operations",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-thread-confinement",
        "title": "Thread confinement",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-coroutine-concurrency",
        "title": "Coroutine concurrency",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-concurrent-access-patterns",
        "title": "Concurrent access patterns",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-deadlock-concepts",
        "title": "Deadlock concepts",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-avoiding-shared-mutable-state",
        "title": "Avoiding shared mutable state",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-structured-concurrency-vs-uncontrolled-c",
        "title": "Structured concurrency vs uncontrolled concurrency",
        "worldId": "world-18",
        "skill": "concurrency",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-18-boss",
        "title": "Concurrent Data Processor",
        "worldId": "world-18",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a program that safely processes shared data concurrently and deliberately debug a race-condition bug.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-19",
    "order": 19,
    "title": "Kotlin Blacksmith",
    "level": "experienced",
    "levelTitle": "Experienced",
    "subtitle": "Advanced Kotlin Language Features",
    "badge": "EXPERIENCED \u2022 W19",
    "bossTitle": "Mini DSL",
    "bossDescription": "Design a small type-safe DSL that demonstrates advanced Kotlin language capabilities.",
    "lessons": [
      {
        "id": "world-19-delegation-delegated-properties",
        "title": "Delegation & Delegated properties",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-custom-delegates",
        "title": "Custom delegates",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-dsl-design",
        "title": "DSL design",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-type-safe-builders",
        "title": "Type-safe builders",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-value-classes",
        "title": "Value classes",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-inline-classes-value-class-concepts",
        "title": "Inline classes / value-class concepts",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-contracts",
        "title": "Contracts",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-contract-limitations-and-use-cases",
        "title": "Contract limitations and use cases",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-advanced-extension-design",
        "title": "Advanced extension design",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-operator-overloading",
        "title": "Operator overloading",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-infix-functions",
        "title": "Infix functions",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-destructuring",
        "title": "Destructuring",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-advanced-sealed-data-modeling",
        "title": "Advanced sealed/data modeling",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-advanced-language-idioms",
        "title": "Advanced language idioms",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-advanced-standard-library-patterns",
        "title": "Advanced standard-library patterns",
        "worldId": "world-19",
        "skill": "advanced-kotlin-language-features",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-19-boss",
        "title": "Mini DSL",
        "worldId": "world-19",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Design a small type-safe DSL that demonstrates advanced Kotlin language capabilities.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-20",
    "order": 20,
    "title": "JVM Bridge",
    "level": "experienced",
    "levelTitle": "Experienced",
    "subtitle": "JVM & Java Interoperability",
    "badge": "EXPERIENCED \u2022 W20",
    "bossTitle": "Java/Kotlin Integration Module",
    "bossDescription": "Build a small module that interoperates cleanly between Java and Kotlin.",
    "lessons": [
      {
        "id": "world-20-java-interoperability-calling-java-from-",
        "title": "Java interoperability & Calling Java from Kotlin",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-calling-kotlin-from-java-platform-types",
        "title": "Calling Kotlin from Java & Platform types",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-nullability-across-the-java-boundary-jvm",
        "title": "Nullability across the Java boundary & JVM annotations",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-jvmstatic-jvmoverloads",
        "title": "@JvmStatic & @JvmOverloads",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-jvmfield-java-kotlin-collection-interope",
        "title": "@JvmField & Java/Kotlin collection interoperability",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-sam-conversions",
        "title": "SAM conversions",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-jvm-method-property-mapping",
        "title": "JVM method/property mapping",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-checked-exception-interoperability-consi",
        "title": "Checked-exception interoperability considerations",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-jvm-metadata-concepts",
        "title": "JVM metadata concepts",
        "worldId": "world-20",
        "skill": "jvm-java-interoperability",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-20-boss",
        "title": "Java/Kotlin Integration Module",
        "worldId": "world-20",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a small module that interoperates cleanly between Java and Kotlin.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-21",
    "order": 21,
    "title": "Performance Lab",
    "level": "experienced",
    "levelTitle": "Experienced",
    "subtitle": "Kotlin Performance",
    "badge": "EXPERIENCED \u2022 W21",
    "bossTitle": "Performance Optimization Challenge",
    "bossDescription": "Profile and improve a deliberately inefficient Kotlin program.",
    "lessons": [
      {
        "id": "world-21-allocation-object-creation-costs",
        "title": "Allocation & Object creation costs",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-collections-and-allocation",
        "title": "Collections and allocation",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-eager-vs-lazy-processing",
        "title": "Eager vs lazy processing",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-sequences",
        "title": "Sequences",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-inline-functions",
        "title": "Inline functions",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-boxing-unboxing-considerations",
        "title": "Boxing/unboxing considerations",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-value-classes-and-representation",
        "title": "Value classes and representation",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-string-building-considerations",
        "title": "String-building considerations",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-coroutine-performance",
        "title": "Coroutine performance",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-dispatchers-and-scheduling-overhead",
        "title": "Dispatchers and scheduling overhead",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-measuring-performance",
        "title": "Measuring performance",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-benchmarking-concepts",
        "title": "Benchmarking concepts",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-avoiding-premature-optimization",
        "title": "Avoiding premature optimization",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-performance-oriented-api-design",
        "title": "Performance-oriented API design",
        "worldId": "world-21",
        "skill": "kotlin-performance",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-21-boss",
        "title": "Performance Optimization Challenge",
        "worldId": "world-21",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Profile and improve a deliberately inefficient Kotlin program.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  },
  {
    "id": "world-22",
    "order": 22,
    "title": "Production Kotlin",
    "level": "experienced",
    "levelTitle": "Experienced",
    "subtitle": "Kotlin Ecosystem & Production Engineering",
    "badge": "GRANDMASTER CAPSTONE",
    "bossTitle": "Production Kotlin Project / Kotlin Grandmaster",
    "bossDescription": "Build a small production-style project with organized code, dependencies, serialization/I/O, tests, documentation, and a reliable build -- capped by a comprehensive Grandmaster challenge combining the full curriculum, including at least one deliberately broken component to diagnose and fix.",
    "lessons": [
      {
        "id": "world-22-kotlin-standard-library-packages",
        "title": "Kotlin Standard Library & Packages",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-imports",
        "title": "Imports",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-code-organization",
        "title": "Code organization",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-gradle-basics",
        "title": "Gradle basics",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-kotlin-gradle-configuration",
        "title": "Kotlin Gradle configuration",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-dependencies",
        "title": "Dependencies",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-library-management",
        "title": "Library management",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-serialization",
        "title": "Serialization",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-json-data-serialization-concepts",
        "title": "JSON/data serialization concepts",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-file-i-o",
        "title": "File I/O",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-data-time-apis",
        "title": "Data/time APIs",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-testing-fundamentals",
        "title": "Testing fundamentals",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-unit-testing",
        "title": "Unit testing",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-test-organization",
        "title": "Test organization",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-kdoc",
        "title": "KDoc",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-dokka",
        "title": "Dokka",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-build-tools",
        "title": "Build tools",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-ci-cd-concepts",
        "title": "CI/CD concepts",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-production-code-quality",
        "title": "Production code quality",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-kotlin-best-practices",
        "title": "Kotlin best practices",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-maintainability-and-api-design",
        "title": "Maintainability and API design",
        "worldId": "world-22",
        "skill": "kotlin-ecosystem-production-engineering",
        "durationMinutes": 3,
        "xpReward": 20,
        "description": "Placeholder -- lesson content not yet authored. See CODEDO_MASTER_PLAN.md for the intended topic scope.",
        "questionsCount": 0
      },
      {
        "id": "world-22-boss",
        "title": "Production Kotlin Project / Kotlin Grandmaster",
        "worldId": "world-22",
        "skill": "boss",
        "durationMinutes": 10,
        "xpReward": 50,
        "description": "Build a small production-style project with organized code, dependencies, serialization/I/O, tests, documentation, and a reliable build -- capped by a comprehensive Grandmaster challenge combining the full curriculum, including at least one deliberately broken component to diagnose and fix.",
        "questionsCount": 0,
        "isBoss": true
      }
    ]
  }
];
