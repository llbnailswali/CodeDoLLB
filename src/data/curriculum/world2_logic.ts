import { LessonQuestion } from '../../types';

export const WORLD_2_QUESTIONS: LessonQuestion[] = [
  // =========================================================================
  // LESSON 1: Boolean Values & Truth Reasoning
  // =========================================================================
  {
    id: 'w2-l1-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-2',
    lessonId: 'booleans',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Booleans • Literal Type',
    skill: 'booleans',
    difficulty: 1,
    xpReward: 15,
    question: 'In Kotlin, can an integer (like 0 or 1) be directly evaluated as a condition in an if statement?',
    codeFileName: 'Truthiness.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val active = 1',
      '// if (active) { ... } // What happens in Kotlin?'
    ],
    options: [
      { id: 'A', title: 'No, Kotlin requires an explicit Boolean expression', subtitle: 'Type mismatch: inferred Int but expected Boolean', isCorrect: true },
      { id: 'B', title: 'Yes, 1 is truthy like in C and JavaScript', subtitle: 'Kotlin has no truthy/falsy coercion', isCorrect: false },
      { id: 'C', title: 'Yes, but only for 0 and 1', subtitle: 'No numeric type is truthy in Kotlin', isCorrect: false },
      { id: 'D', title: 'Only if declared with "var"', subtitle: 'Type safety applies to both val and var', isCorrect: false }
    ],
    hint: 'Kotlin is strictly type-safe. Only Boolean expressions (evaluating to true or false) can be placed in conditional statements.',
    explanation: {
      title: 'No Implicit "Truthy" Values',
      text: 'Unlike JavaScript or C, Kotlin does not coerce numbers or objects to booleans. You must write `if (active == 1)` explicitly.',
      highlights: ['No truthy coercion', 'explicit Boolean', 'if (active == 1)']
    }
  },
  {
    id: 'w2-l1-c2',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'booleans',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Booleans • Logical NOT (!)',
    skill: 'booleans',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by applying the negation operator (!) twice?',
    codeFileName: 'DoubleNegation.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val isLocked = false',
      'println(!!isLocked)'
    ],
    options: [
      { id: 'A', title: 'false', subtitle: '!false is true, then !true returns false', isCorrect: true },
      { id: 'B', title: 'true', subtitle: 'Double negation toggles twice', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: '! operator cannot be chained', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Not a nullable operation', isCorrect: false }
    ],
    hint: 'Tracing: !false is true, then !true returns back to false.',
    explanation: {
      title: 'Negation Evaluation',
      text: 'The `!` operator inverts a Boolean. Negating `false` twice yields `false`.',
      highlights: ['!false = true', '!true = false', 'negation']
    }
  },
  {
    id: 'w2-l1-c3',
    challengeType: 'code-completion',
    worldId: 'world-2',
    lessonId: 'booleans',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Booleans • Boolean Expression',
    skill: 'booleans',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the condition to test if health is greater than 0:',
    codeFileName: 'HealthCheck.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val health = 75',
      'val isAlive: Boolean = health _____ 0',
      'println(isAlive)'
    ],
    options: [
      { id: 'A', title: '>', subtitle: 'Greater than comparison operator', isCorrect: true },
      { id: 'B', title: '=>', subtitle: 'Not a valid operator in Kotlin', isCorrect: false },
      { id: 'C', title: 'gt', subtitle: 'Template engine syntax', isCorrect: false },
      { id: 'D', title: 'is', subtitle: 'Type checking keyword', isCorrect: false }
    ],
    hint: 'Use the standard mathematical greater-than symbol (>).',
    explanation: {
      title: 'Comparison Producing Boolean',
      text: '`health > 0` compares the integer to 0 and evaluates to the Boolean value `true`.',
      highlights: ['>', 'health > 0', 'Boolean result']
    }
  },
  {
    id: 'w2-l1-c4',
    challengeType: 'bug-fix',
    worldId: 'world-2',
    lessonId: 'booleans',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Bug Hunter • Assignment in Condition',
    skill: 'booleans',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Why does Line 2 fail compilation in Kotlin?',
    codeFileName: 'AssignConditionBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var ready = false',
      'if (ready = true) { // Line 2',
      '    println("Ready!")',
      '}'
    ],
    options: [
      { id: 'A', title: 'Line 2 uses assignment (=) instead of comparison (==)', subtitle: 'Assignments do not return a value in Kotlin', isCorrect: true },
      { id: 'B', title: 'Line 1: var ready cannot be false', subtitle: 'Valid declaration', isCorrect: false },
      { id: 'C', title: 'Line 3: println inside if is forbidden', subtitle: 'Standard valid statement', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Assignment is permitted in condition', isCorrect: false }
    ],
    hint: 'In Kotlin, "=" is solely an assignment statement and cannot be evaluated as an expression.',
    explanation: {
      title: 'Assignments Have No Return Value',
      text: 'Unlike C or Java, Kotlin prevents accidental assignments inside `if` statements. You must write `if (ready == true)` or simply `if (ready)`.',
      highlights: ['Line 2', 'ready == true', 'prevents bug']
    }
  },
  {
    id: 'w2-l1-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-2',
    lessonId: 'booleans',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Clean Code • Idiomatic Booleans',
    skill: 'booleans',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the idiomatic Kotlin way to write a conditional check for a Boolean variable?',
    codeFileName: 'Idiomatic.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val hasPermission = true',
      '// Which is the preferred Kotlin style?'
    ],
    options: [
      { id: 'A', title: 'if (hasPermission)', subtitle: 'Clean, direct, and self-documenting', isCorrect: true },
      { id: 'B', title: 'if (hasPermission == true)', subtitle: 'Redundant comparison', isCorrect: false },
      { id: 'C', title: 'if (hasPermission.equals(true))', subtitle: 'Overly verbose method call', isCorrect: false },
      { id: 'D', title: 'if (true == hasPermission)', subtitle: 'Yoda condition (unnecessary in Kotlin)', isCorrect: false }
    ],
    hint: 'Since hasPermission is already a Boolean, comparing it to true is redundant.',
    explanation: {
      title: 'Idiomatic Boolean Checks',
      text: 'Always write `if (hasPermission)` directly. Avoid redundant `== true` comparisons.',
      highlights: ['if (hasPermission)', 'idiomatic', 'redundant == true']
    }
  },

  // =========================================================================
  // LESSON 2: Comparisons & Equality (== vs ===)
  // =========================================================================
  {
    id: 'w2-l2-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-2',
    lessonId: 'comparisons',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Comparisons • Structural Equality',
    skill: 'comparisons',
    difficulty: 2,
    xpReward: 20,
    question: 'In Kotlin, what does the double-equals (==) operator check?',
    codeFileName: 'Equality.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val str1 = "CodeDo"',
      'val str2 = "CodeDo"',
      'println(str1 == str2)'
    ],
    options: [
      { id: 'A', title: 'Structural equality (calls .equals() safely behind the scenes)', subtitle: 'Checks if contents are equivalent', isCorrect: true },
      { id: 'B', title: 'Referential equality only (checks memory pointers)', subtitle: 'That is the === operator', isCorrect: false },
      { id: 'C', title: 'Strict type comparison', subtitle: 'Type is checked at compile time', isCorrect: false },
      { id: 'D', title: 'String length comparison', subtitle: 'Does not compare length only', isCorrect: false }
    ],
    hint: 'In Kotlin, == translates to equals() with null safety built in.',
    explanation: {
      title: 'Structural Equality (==)',
      text: 'In Kotlin, `a == b` checks structural equality (content equivalence) and automatically handles null checks safely without crashing.',
      highlights: ['==', 'structural equality', 'calls equals()']
    }
  },
  {
    id: 'w2-l2-c2',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'comparisons',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Comparisons • String Equality',
    skill: 'comparisons',
    difficulty: 1,
    xpReward: 20,
    question: 'What is printed by this string comparison?',
    codeFileName: 'StrCompare.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val greeting1 = "Hello" + ""',
      'val greeting2 = "Hello"',
      'println(greeting1 == greeting2)'
    ],
    options: [
      { id: 'A', title: 'true', subtitle: 'Both strings have identical characters', isCorrect: true },
      { id: 'B', title: 'false', subtitle: 'Different instances in memory', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Strings cannot be compared with ==', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Comparison returns Boolean', isCorrect: false }
    ],
    hint: 'Unlike Java where == compares pointers, Kotlin\'s == compares character contents.',
    explanation: {
      title: 'Content Comparison on Strings',
      text: 'Because `greeting1` and `greeting2` have identical content ("Hello"), `==` evaluates to `true`.',
      highlights: ['greeting1 == greeting2', 'true', 'content comparison']
    }
  },
  {
    id: 'w2-l2-c3',
    challengeType: 'code-completion',
    worldId: 'world-2',
    lessonId: 'comparisons',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Comparisons • Referential Equality (===)',
    skill: 'comparisons',
    difficulty: 2,
    xpReward: 25,
    question: 'Which operator checks referential equality (whether two references point to the exact same memory instance)?',
    codeFileName: 'RefEquality.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val objA = Any()',
      'val objB = objA',
      'println(objA _____ objB)'
    ],
    options: [
      { id: 'A', title: '===', subtitle: 'Triple-equals checks referential memory identity', isCorrect: true },
      { id: 'B', title: '==', subtitle: 'Checks structural equality', isCorrect: false },
      { id: 'C', title: 'eq', subtitle: 'SQL/DSL function', isCorrect: false },
      { id: 'D', title: 'is', subtitle: 'Type check operator', isCorrect: false }
    ],
    hint: 'Triple-equals (===) checks whether both references point to the exact same memory address.',
    explanation: {
      title: 'Referential Equality (===)',
      text: '`===` checks referential identity. It evaluates to `true` only if both operands point to the exact same object instance.',
      highlights: ['===', 'referential identity', 'same memory instance']
    }
  },
  {
    id: 'w2-l2-c4',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'comparisons',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Comparisons • Relational Inequality (!=)',
    skill: 'comparisons',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the output of the inequality check (!=)?',
    codeFileName: 'NotEqual.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val attempts = 3',
      'val maxAttempts = 3',
      'println(attempts != maxAttempts)'
    ],
    options: [
      { id: 'A', title: 'false', subtitle: '3 is equal to 3, so inequality is false', isCorrect: true },
      { id: 'B', title: 'true', subtitle: 'Inequality would require different values', isCorrect: false },
      { id: 'C', title: '0', subtitle: 'Returns Boolean', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'Invalid operator', isCorrect: false }
    ],
    hint: '!= means "is NOT equal to". Since both are 3, they ARE equal, so != returns false.',
    explanation: {
      title: 'Inequality Operator (!=)',
      text: '`attempts != maxAttempts` checks if `3` is not equal to `3`. Since they are equal, the result is `false`.',
      highlights: ['!=', '3 != 3 is false', 'inequality']
    }
  },
  {
    id: 'w2-l2-c5',
    challengeType: 'bug-fix',
    worldId: 'world-2',
    lessonId: 'comparisons',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Bug Hunter • Incompatible Comparison',
    skill: 'comparisons',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Which line fails compilation due to comparing completely unrelated types?',
    codeFileName: 'TypeCompareBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val count: Int = 10',
      'val isValid = (count == "10") // Line 2',
      'println(isValid)'
    ],
    options: [
      { id: 'A', title: 'Line 2: comparing Int with String', subtitle: 'Operator == cannot be applied to Int and String in Kotlin', isCorrect: true },
      { id: 'B', title: 'Line 1: val count: Int = 10', subtitle: 'Valid declaration', isCorrect: false },
      { id: 'C', title: 'Line 3: println(isValid)', subtitle: 'Valid print statement', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Kotlin auto-converts string to integer', isCorrect: false }
    ],
    hint: 'In Kotlin, the compiler forbids comparing an Int with a String using == because they can never be equal.',
    explanation: {
      title: 'Compile-Time Type Comparison Safety',
      text: 'Kotlin prevents comparing incompatible types at compile time. Line 2 fails because `Int` and `String` have no common equality relationship.',
      highlights: ['Line 2', 'Incompatible types', 'Int vs String']
    }
  },

  // =========================================================================
  // LESSON 3: if / else as an Expression
  // =========================================================================
  {
    id: 'w2-l3-c1',
    challengeType: 'multiple-choice',
    worldId: 'world-2',
    lessonId: 'if-else-expression',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Conditionals • Expression Return',
    skill: 'conditionals',
    difficulty: 1,
    xpReward: 20,
    question: 'Why does Kotlin NOT have a ternary operator (condition ? a : b) like Java and C?',
    codeFileName: 'NoTernary.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      '// In Kotlin:',
      'val max = if (a > b) a else b'
    ],
    options: [
      { id: 'A', title: 'Because if is an expression that directly returns a value', subtitle: '"if (...) a else b" completely replaces the ternary operator', isCorrect: true },
      { id: 'B', title: 'Kotlin removed it to save memory during compilation', subtitle: 'Incorrect architectural reason', isCorrect: false },
      { id: 'C', title: 'Because Kotlin only supports when expressions', subtitle: 'if/else is fully supported', isCorrect: false },
      { id: 'D', title: 'Ternary operator is planned for Kotlin 2.0', subtitle: 'It was intentionally excluded by design', isCorrect: false }
    ],
    hint: 'In Kotlin, "if" statements are expressions that evaluate to a value.',
    explanation: {
      title: 'if is an Expression',
      text: 'Because `if` has a return value, `if (a > b) a else b` accomplishes the exact same goal as a ternary operator with greater readability.',
      highlights: ['if is an expression', 'replaces ternary', 'returns a value']
    }
  },
  {
    id: 'w2-l3-c2',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'if-else-expression',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Conditionals • Expression Value',
    skill: 'conditionals',
    difficulty: 2,
    xpReward: 20,
    question: 'What is assigned to the variable "greeting"?',
    codeFileName: 'TimeGreeting.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val hour = 14',
      'val greeting = if (hour < 12) {',
      '    "Good morning"',
      '} else {',
      '    "Good afternoon"',
      '}',
      'println(greeting)'
    ],
    options: [
      { id: 'A', title: '"Good afternoon"', subtitle: 'hour (14) is not < 12, so else branch executes', isCorrect: true },
      { id: 'B', title: '"Good morning"', subtitle: 'hour is after 12', isCorrect: false },
      { id: 'C', title: 'Unit', subtitle: 'Blocks return their final evaluated expression', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Braces cannot return strings', isCorrect: false }
    ],
    hint: 'In Kotlin, the last expression of each block in an if-expression is the value returned by that branch.',
    explanation: {
      title: 'Last Expression in Block is Returned',
      text: 'Since 14 is not less than 12, the else block executes. Its last line `"Good afternoon"` is returned and assigned to `greeting`.',
      highlights: ['"Good afternoon"', 'last expression', 'branch return']
    }
  },
  {
    id: 'w2-l3-c3',
    challengeType: 'code-completion',
    worldId: 'world-2',
    lessonId: 'if-else-expression',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Conditionals • Single Line Expression',
    skill: 'conditionals',
    difficulty: 1,
    xpReward: 20,
    question: 'Complete the single-line if-else expression:',
    codeFileName: 'AccessLevel.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val isAdmin = false',
      'val badge = if (isAdmin) "Gold" _____ "Silver"',
      'println(badge)'
    ],
    options: [
      { id: 'A', title: 'else', subtitle: 'Else branch is mandatory when using if as an expression', isCorrect: true },
      { id: 'B', title: ':', subtitle: 'Java ternary colon (invalid in Kotlin)', isCorrect: false },
      { id: 'C', title: 'otherwise', subtitle: 'Not a Kotlin keyword', isCorrect: false },
      { id: 'D', title: 'default', subtitle: 'Switch keyword', isCorrect: false }
    ],
    hint: 'When if is used as an expression (assigning to a variable), the "else" branch is mandatory so all cases return a value.',
    explanation: {
      title: 'Mandatory else in if Expressions',
      text: 'If `if` is used to assign a value, an `else` branch is required so the variable is guaranteed to receive a value in every branch.',
      highlights: ['else', 'mandatory else', 'if expression']
    }
  },
  {
    id: 'w2-l3-c4',
    challengeType: 'bug-fix',
    worldId: 'world-2',
    lessonId: 'if-else-expression',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Bug Hunter • Missing Else Branch',
    skill: 'conditionals',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Why does Line 2 fail compilation?',
    codeFileName: 'MissingElseBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val isVip = true',
      'val discount = if (isVip) 20 // Line 2',
      'println(discount)'
    ],
    options: [
      { id: 'A', title: 'Line 2: \'if\' must have both main and \'else\' branches if used as an expression', subtitle: 'Compiler error: missing else branch', isCorrect: true },
      { id: 'B', title: 'Line 1: val isVip cannot be boolean', subtitle: 'Valid declaration', isCorrect: false },
      { id: 'C', title: 'Line 3: cannot print discount', subtitle: 'Valid statement', isCorrect: false },
      { id: 'D', title: 'No bug: discount defaults to 0 if false', subtitle: 'Kotlin does not invent default numbers', isCorrect: false }
    ],
    hint: 'What value would discount hold if isVip were false? The compiler requires an else branch.',
    explanation: {
      title: '\'if\' Must Have Both Branches as Expression',
      text: 'Line 2 fails compilation. When an `if` expression returns a value, it must provide an `else` branch to cover all possible conditions.',
      highlights: ['Line 2', 'must have both branches', 'missing else']
    }
  },
  {
    id: 'w2-l3-c5',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'if-else-expression',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Conditionals • Chained else-if',
    skill: 'conditionals',
    difficulty: 2,
    xpReward: 25,
    question: 'What tier is awarded for a score of 85?',
    codeFileName: 'ScoreTier.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val score = 85',
      'val tier = if (score >= 90) "S"',
      '           else if (score >= 80) "A"',
      '           else "B"',
      'println(tier)'
    ],
    options: [
      { id: 'A', title: '"A"', subtitle: '85 satisfies >= 80 branch', isCorrect: true },
      { id: 'B', title: '"S"', subtitle: 'Requires score >= 90', isCorrect: false },
      { id: 'C', title: '"B"', subtitle: 'Fallback branch', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Chained else if is invalid as expression', isCorrect: false }
    ],
    hint: '85 is not >= 90, so it checks the second branch: 85 >= 80 is true.',
    explanation: {
      title: 'Chained else-if Expressions',
      text: 'The first branch fails (85 < 90). The second branch succeeds (85 >= 80), returning `"A"`.',
      highlights: ['"A"', 'else if (score >= 80)', 'branching']
    }
  },

  // =========================================================================
  // LESSON 4: when Expressions & Pattern Matching
  // =========================================================================
  {
    id: 'w2-l4-c1',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'when-expression',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'when • Multiple Arguments Branch',
    skill: 'when',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed by this "when" expression with grouped conditions?',
    codeFileName: 'DayCheck.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val day = 6',
      'val type = when (day) {',
      '    1, 2, 3, 4, 5 -> "Weekday"',
      '    6, 7 -> "Weekend"',
      '    else -> "Invalid"',
      '}',
      'println(type)'
    ],
    options: [
      { id: 'A', title: '"Weekend"', subtitle: 'day 6 matches the comma-separated branch 6, 7', isCorrect: true },
      { id: 'B', title: '"Weekday"', subtitle: 'First branch did not match 6', isCorrect: false },
      { id: 'C', title: '"Invalid"', subtitle: 'Else fallback not triggered', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'Commas are invalid in when', isCorrect: false }
    ],
    hint: 'In Kotlin when expressions, comma separates multiple values that share the same branch.',
    explanation: {
      title: 'Comma-Separated Branch Conditions',
      text: 'In `when`, writing `6, 7 ->` checks if the value is 6 OR 7. Since `day == 6`, `"Weekend"` is returned.',
      highlights: ['6, 7 -> "Weekend"', 'comma separation', 'when expression']
    }
  },
  {
    id: 'w2-l4-c2',
    challengeType: 'code-completion',
    worldId: 'world-2',
    lessonId: 'when-expression',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'when • Range Checking in when',
    skill: 'when',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the when branch to test if x falls inside the range 1 to 10:',
    codeFileName: 'RangeWhen.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val x = 5',
      'val label = when (x) {',
      '    _____ 1..10 -> "Small"',
      '    else -> "Large"',
      '}'
    ],
    options: [
      { id: 'A', title: 'in', subtitle: 'Keyword to test containment in range', isCorrect: true },
      { id: 'B', title: 'is', subtitle: 'Keyword for type checking', isCorrect: false },
      { id: 'C', title: 'within', subtitle: 'Not a Kotlin keyword', isCorrect: false },
      { id: 'D', title: 'has', subtitle: 'Collection property (not keyword)', isCorrect: false }
    ],
    hint: 'Use the "in" keyword: in 1..10 checks if x is between 1 and 10 inclusive.',
    explanation: {
      title: 'Range Containment with in',
      text: 'The `in` keyword checks if an element belongs to a range or collection: `in 1..10 -> "Small"`.',
      highlights: ['in 1..10', 'range check', 'when branch']
    }
  },
  {
    id: 'w2-l4-c3',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'when-expression',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'when • Argumentless when',
    skill: 'when',
    difficulty: 2,
    xpReward: 25,
    question: 'What is printed when "when" is used without an argument as an if-else chain?',
    codeFileName: 'ArgumentlessWhen.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val count = 12',
      'val result = when {',
      '    count % 2 != 0 -> "Odd"',
      '    count > 10 -> "Big Even"',
      '    else -> "Small Even"',
      '}',
      'println(result)'
    ],
    options: [
      { id: 'A', title: '"Big Even"', subtitle: '12 % 2 is 0 (first branch false), and 12 > 10 is true', isCorrect: true },
      { id: 'B', title: '"Odd"', subtitle: '12 is even', isCorrect: false },
      { id: 'C', title: '"Small Even"', subtitle: 'Else not reached', isCorrect: false },
      { id: 'D', title: 'Compilation Error', subtitle: 'when requires an argument in parentheses', isCorrect: false }
    ],
    hint: 'An argumentless when evaluates each branch condition until one returns true.',
    explanation: {
      title: 'Argumentless when',
      text: 'When `when` has no argument, branch conditions are simply boolean expressions. `12 > 10` is the first true branch.',
      highlights: ['"Big Even"', 'argumentless when', 'boolean branches']
    }
  },
  {
    id: 'w2-l4-c4',
    challengeType: 'bug-fix',
    worldId: 'world-2',
    lessonId: 'when-expression',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Bug Hunter • Arrow Syntax',
    skill: 'when',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 2,
    question: 'Find the bug! Which line has invalid syntax for a Kotlin when branch?',
    codeFileName: 'WhenSyntaxBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val code = 200',
      'val status = when (code) {',
      '    200: "OK"     // Line 3',
      '    else -> "Error"',
      '}'
    ],
    options: [
      { id: 'A', title: 'Line 3 uses colon (:) instead of arrow (->)', subtitle: 'Kotlin when branches require ->', isCorrect: true },
      { id: 'B', title: 'Line 1: val code = 200', subtitle: 'Valid declaration', isCorrect: false },
      { id: 'C', title: 'Line 4: else -> "Error"', subtitle: 'Valid else branch', isCorrect: false },
      { id: 'D', title: 'No bug exists', subtitle: 'Java switch syntax is valid in when', isCorrect: false }
    ],
    hint: 'Kotlin when branches use the arrow (->) operator to separate condition from code, not a colon (:).',
    explanation: {
      title: 'Arrow Syntax in when',
      text: 'Kotlin uses `condition -> result`. Colons are used in Java switch statements, but invalid in Kotlin `when`. Line 3 must be `200 -> "OK"`.',
      highlights: ['Line 3', '-> arrow required', 'not colon']
    }
  },
  {
    id: 'w2-l4-c5',
    challengeType: 'multiple-choice',
    worldId: 'world-2',
    lessonId: 'when-expression',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'when • Fall-Through Behavior',
    skill: 'when',
    difficulty: 1,
    xpReward: 20,
    question: 'Do Kotlin when branches require a "break" statement to prevent fall-through?',
    codeFileName: 'NoFallthrough.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'when (x) {',
      '    1 -> println("One")',
      '    2 -> println("Two")',
      '}'
    ],
    options: [
      { id: 'A', title: 'No, only the first matching branch executes; no break is needed', subtitle: 'Prevents accidental fall-through bugs', isCorrect: true },
      { id: 'B', title: 'Yes, without break all subsequent branches will execute', subtitle: 'That was the flaw in Java switch', isCorrect: false },
      { id: 'C', title: 'Only if x is a String', subtitle: 'Applies to all types', isCorrect: false },
      { id: 'D', title: 'break is required only in the else branch', subtitle: 'break is never required in when', isCorrect: false }
    ],
    hint: 'Kotlin eliminated switch fall-through completely. Once a branch matches, execution exits the when expression.',
    explanation: {
      title: 'No Accidental Fall-Through',
      text: 'Kotlin `when` does not have fall-through. Exactly one matching branch executes, eliminating the need for `break` statements.',
      highlights: ['No break needed', 'no fall-through', 'safe branching']
    }
  },

  // =========================================================================
  // LESSON 5: Logical Operators (&&, ||, !) & Short-Circuiting
  // =========================================================================
  {
    id: 'w2-l5-c1',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'logical-operators',
    stepNumber: 1,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Logic • AND (&&) Evaluation',
    skill: 'logical_operators',
    difficulty: 1,
    xpReward: 20,
    question: 'What is the evaluated output of this compound AND expression?',
    codeFileName: 'AndDemo.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val hasKey = true',
      'val level = 5',
      'println(hasKey && level >= 10)'
    ],
    options: [
      { id: 'A', title: 'false', subtitle: 'true && false evaluates to false', isCorrect: true },
      { id: 'B', title: 'true', subtitle: 'Both conditions must be true for &&', isCorrect: false },
      { id: 'C', title: '1', subtitle: 'Returns Boolean', isCorrect: false },
      { id: 'D', title: 'Error', subtitle: 'Comparison inside && is invalid', isCorrect: false }
    ],
    hint: 'Logical AND (&&) requires BOTH operands to be true. Since level (5) >= 10 is false, the result is false.',
    explanation: {
      title: 'Logical AND (&&)',
      text: '`true && false` evaluates to `false`. Both conditions must be satisfied for `&&` to return `true`.',
      highlights: ['true && false = false', '&& operator', 'both must be true']
    }
  },
  {
    id: 'w2-l5-c2',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'logical-operators',
    stepNumber: 2,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Logic • Short-Circuit Evaluation',
    skill: 'logical_operators',
    difficulty: 2,
    xpReward: 25,
    question: 'In short-circuit evaluation, does the right side get evaluated if the left side of || is true?',
    codeFileName: 'ShortCircuit.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'var checked = false',
      'fun test(): Boolean { checked = true; return true }',
      'val result = true || test()',
      'println(checked)'
    ],
    options: [
      { id: 'A', title: 'false', subtitle: 'test() is never called because the left operand was already true', isCorrect: true },
      { id: 'B', title: 'true', subtitle: 'test() was executed', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Side effects in conditions forbidden', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Boolean variable', isCorrect: false }
    ],
    hint: 'In Kotlin, logical OR (||) short-circuits: if the first operand is true, the second operand is never evaluated.',
    explanation: {
      title: 'Short-Circuiting in Logical OR',
      text: 'Because `true || ...` is guaranteed to be `true`, Kotlin skips executing `test()`, so `checked` remains `false`.',
      highlights: ['checked remains false', 'short-circuit', 'performance & safety']
    }
  },
  {
    id: 'w2-l5-c3',
    challengeType: 'code-completion',
    worldId: 'world-2',
    lessonId: 'logical-operators',
    stepNumber: 3,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Logic • Safe Null Guard with &&',
    skill: 'logical_operators',
    difficulty: 2,
    xpReward: 25,
    question: 'Complete the short-circuit condition to safely check that token is not null before checking length:',
    codeFileName: 'TokenGuard.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val token: String? = "abc123xyz"',
      'if (token != null _____ token.length > 5) {',
      '    println("Valid token")',
      '}'
    ],
    options: [
      { id: 'A', title: '&&', subtitle: 'Guarantees smart cast and avoids NullPointerException', isCorrect: true },
      { id: 'B', title: '||', subtitle: 'If null, it would still attempt to call .length', isCorrect: false },
      { id: 'C', title: '&', subtitle: 'Bitwise AND without short-circuiting', isCorrect: false },
      { id: 'D', title: 'and', subtitle: 'Infix bitwise operator', isCorrect: false }
    ],
    hint: 'Logical AND (&&) ensures that if token is null, evaluation stops immediately, protecting the second check.',
    explanation: {
      title: 'Short-Circuit Null Guard',
      text: 'Using `&&` guards against null dereferencing. If `token != null` is false, Kotlin never evaluates `token.length > 5`. Furthermore, Kotlin smart casts `token` to non-null `String`!',
      highlights: ['&&', 'smart cast', 'null guard']
    }
  },
  {
    id: 'w2-l5-c4',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'logical-operators',
    stepNumber: 4,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Logic • De Morgan\'s Law',
    skill: 'logical_operators',
    difficulty: 3,
    xpReward: 25,
    question: 'What is printed by this negated compound condition?',
    codeFileName: 'DeMorgan.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val isWeekend = false',
      'val isHoliday = false',
      'println(!(isWeekend || isHoliday))'
    ],
    options: [
      { id: 'A', title: 'true', subtitle: '!(false || false) = !(false) = true', isCorrect: true },
      { id: 'B', title: 'false', subtitle: 'Negation turns false into true', isCorrect: false },
      { id: 'C', title: 'Compilation Error', subtitle: 'Invalid parentheses', isCorrect: false },
      { id: 'D', title: 'null', subtitle: 'Evaluates to boolean', isCorrect: false }
    ],
    hint: 'Step 1: isWeekend || isHoliday is false || false = false. Step 2: !false is true.',
    explanation: {
      title: 'Evaluating Negated Groups',
      text: '`false || false` is `false`. The outer negation `!` inverts it to `true`. By De Morgan\'s law, `!(A || B)` is equivalent to `!A && !B`.',
      highlights: ['true', '!(false || false)', 'De Morgan']
    }
  },
  {
    id: 'w2-l5-c5',
    challengeType: 'bug-fix',
    worldId: 'world-2',
    lessonId: 'logical-operators',
    stepNumber: 5,
    totalSteps: 5,
    worldName: 'Logic & Branches',
    topicTag: 'Bug Hunter • Operator Precedence in Logic',
    skill: 'logical_operators',
    difficulty: 2,
    xpReward: 25,
    buggyLineIndex: 1,
    question: 'Find the bug! Why does Line 2 evaluate unexpectedly without parentheses?',
    codeFileName: 'PrecedenceBug.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val hasPass = false; val isVip = true; val isOpen = false',
      'val canEnter = hasPass || isVip && isOpen // Line 2',
      'println(canEnter)'
    ],
    options: [
      { id: 'A', title: '&& has higher precedence than ||, so (isVip && isOpen) evaluated first as false', subtitle: 'canEnter evaluates to false instead of (hasPass || isVip) && isOpen', isCorrect: true },
      { id: 'B', title: 'Line 2 has a syntax error', subtitle: 'Valid syntax but unintended precedence', isCorrect: false },
      { id: 'C', title: 'Multiple declarations on Line 1 are invalid', subtitle: 'Semicolons allow multiple statements', isCorrect: false },
      { id: 'D', title: 'canEnter evaluates to true', subtitle: 'false || (true && false) is false', isCorrect: false }
    ],
    hint: 'Logical AND (&&) binds tighter than logical OR (||). Use parentheses to make your intent explicit!',
    explanation: {
      title: '&& Precedence Over ||',
      text: '`&&` binds tighter than `||`. `hasPass || isVip && isOpen` is parsed as `hasPass || (isVip && isOpen)`, yielding `false || false = false`. Always group with parentheses!',
      highlights: ['&& binds tighter than ||', 'parentheses', 'Line 2']
    }
  },

  // =========================================================================
  // WORLD 2 BOSS: Logic Boss Milestone
  // =========================================================================
  {
    id: 'w2-boss',
    challengeType: 'output-prediction',
    worldId: 'world-2',
    lessonId: 'logic-boss',
    stepNumber: 1,
    totalSteps: 1,
    worldName: 'Logic & Branches',
    topicTag: 'WORLD BOSS • Multi-Branch Logic Matrix',
    skill: 'logic-boss',
    difficulty: 3,
    xpReward: 50,
    isBoss: true,
    question: 'BOSS CHALLENGE: Trace this full security classification matrix. What is printed?',
    codeFileName: 'GatekeeperBoss.kt',
    languageVersion: 'Kotlin 1.9',
    codeSnippet: [
      'val clearance = 3',
      'val isOverride = false',
      'val role = "operator"',
      '',
      'val access = when {',
      '    isOverride -> "OVERRIDE_GRANTED"',
      '    clearance >= 4 || (clearance == 3 && role == "admin") -> "TIER_A"',
      '    clearance in 2..3 && role != "guest" -> "TIER_B"',
      '    else -> "DENIED"',
      '}',
      'println(access)'
    ],
    options: [
      { id: 'A', title: '"TIER_B"', subtitle: 'clearance 3 is in 2..3 and role ("operator") != "guest"', isCorrect: true },
      { id: 'B', title: '"TIER_A"', subtitle: 'clearance == 3, but role is "operator" not "admin"', isCorrect: false },
      { id: 'C', title: '"OVERRIDE_GRANTED"', subtitle: 'isOverride is false', isCorrect: false },
      { id: 'D', title: '"DENIED"', subtitle: 'Branch 3 matched successfully', isCorrect: false }
    ],
    hint: 'Check branch 2: clearance is 3, but role is "operator" (not "admin"). Then check branch 3: clearance is in 2..3, and role != "guest".',
    explanation: {
      title: 'BOSS DEFEATED! Master of Logic',
      text: '1. `isOverride` is false.\n2. Branch 2: `clearance >= 4` is false, and `(3 == 3 && "operator" == "admin")` is false.\n3. Branch 3: `3 in 2..3` is TRUE, and `"operator" != "guest"` is TRUE.\nTherefore `"TIER_B"` is returned!',
      highlights: ['"TIER_B"', 'in 2..3', 'compound logic', 'Boss Defeated']
    }
  }
];
