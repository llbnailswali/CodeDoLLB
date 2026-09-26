export interface Stage1LearnData {
  title: string;
  subtitle: string;
  exampleTag: string;
  exampleTitle: string;
  language: string;
  codeSnippet: string[];
  explanation: string;
  keyIdeas: Array<{
    number: number;
    title: string;
    description: string;
  }>;
  keyTakeaway: string;
}

export interface ExploreCard {
  id: string;
  number: string;
  title: string;
  language: string;
  subtitle: string;
  code: string[];
  whatItMeans: Array<{
    label: string;
    description: string;
  }>;
  whatChanged: string;
}

export interface Stage2ExploreData {
  title: string;
  subtitle: string;
  cards: ExploreCard[];
}

export interface PredictOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  isCorrect: boolean;
}

export interface PredictQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  topicMeta: string;
  title?: string;
  language: string;
  /** Omit for a pure comprehension/MCQ check (no code to predict output for) --
   * used e.g. for purely conceptual topics like "What is Kotlin?". */
  code?: string[];
  prompt: string;
  options: PredictOption[];
  explanation: {
    codeRef: string;
    detail: string;
  };
}

export interface Stage3PredictData {
  title: string;
  subtitle?: string;
  questions: PredictQuestion[];
}

export interface Stage4WriteRunData {
  challengeNumber: number;
  totalChallenges: number;
  xpReward: number;
  title: string;
  description: string;
  requirements: {
    name: string;
    params: string;
    returns: string;
  };
  fileName: string;
  initialCode: string;
  solutionCode: string;
  sampleInput: string;
  expectedOutput: string;
  testCase: {
    call: string;
    expected: string;
  };
}

export type DebugBugType = 'syntax' | 'logic' | 'runtime' | 'null-safety' | 'type' | 'collection';

export interface Stage5DebugData {
  title: string;
  subtitle: string;
  challengeNumber: number;
  totalChallenges: number;
  difficulty: 'easy' | 'medium' | 'hard';
  bugType: DebugBugType;
  bugLabel: string;
  brokenCode: string;
  fixedCode: string;
  expectedOutput: string;
  hints: [string, string, string]; // Hint 1: Conceptual clue, Hint 2: Narrow reasoning, Hint 3: Pinpointed direction
  explanation: string;
}

export interface Stage6MasteredData {
  topicTitle: string;
  summary: string;
  passedCount: string;
  verificationItems: Array<{
    title: string;
    subtitle: string;
  }>;
  xpEarned: number;
  streakDays: number;
  accuracy: string;
}

// Backward compatibility alias for Stage5MasteredData
export type Stage5MasteredData = Stage6MasteredData;

// Learn and Mastered are always required -- every topic needs a concept
// explanation and a completion confirmation. The other four are optional per
// CODEDO_MASTER_PLAN.md's "topic-aware activity selection": a simple/purely
// conceptual topic (e.g. "What is Kotlin?") should only use the activities
// that meaningfully prove understanding -- often just Learn -> MCQ (Predict)
// -> Mastered, skipping Explore/Write&Run/Debug entirely rather than forcing
// them onto content where they don't fit.
export interface FiveStageLesson {
  id: string;
  worldId: string;
  worldName: string;
  stageName: string;
  topicTitle: string;
  learn: Stage1LearnData;
  explore?: Stage2ExploreData;
  predict?: Stage3PredictData;
  writeRun?: Stage4WriteRunData;
  debug?: Stage5DebugData;
  mastered: Stage6MasteredData;
}

import {
  WHAT_IS_KOTLIN_LESSON,
  KOTLIN_SYNTAX_LESSON,
  COMMENTS_LESSON,
  PRINT_PRINTLN_LESSON,
  VAL_VS_VAR_LESSON,
  VARIABLES_TYPE_INFERENCE_LESSON,
  INT_LONG_LESSON,
  FLOAT_DOUBLE_LESSON,
  BOOLEAN_LESSON,
  CHAR_LESSON,
  STRING_LESSON,
  STRING_TEMPLATES_LESSON,
  WORLD_1_BOSS_LESSON,
} from './curriculum/world1LessonsData';

import {
  ARITHMETIC_OPERATORS_LESSON,
  COMPARISON_OPERATORS_LESSON,
  LOGICAL_OPERATORS_LESSON,
  ASSIGNMENT_OPERATORS_LESSON,
  INCREMENT_DECREMENT_LESSON,
  OPERATOR_PRECEDENCE_LESSON,
  WORLD_2_BOSS_LESSON,
} from './curriculum/world2LessonsData';

import {
  IF_LESSON,
  IF_ELSE_LESSON,
  ELSE_IF_LESSON,
  WHEN_LESSON,
  WHEN_WITH_RANGES_LESSON,
  WHEN_AS_EXPRESSION_LESSON,
  MULTIPLE_NESTED_CONDITIONS_LESSON,
  TYPE_CHECKS_IS_LESSON,
  WORLD_3_BOSS_LESSON,
} from './curriculum/world3LessonsData';

import {
  FOR_LESSON,
  WHILE_LESSON,
  DO_WHILE_LESSON,
  RANGES_LESSON,
  PROGRESSIONS_LESSON,
  DOWNTO_LESSON,
  STEP_LESSON,
  BREAK_LESSON,
  CONTINUE_LESSON,
  NESTED_LOOPS_LESSON,
  WORLD_4_BOSS_LESSON,
} from './curriculum/world4LessonsData';

import {
  DEFINING_FUNCTIONS_LESSON,
  FUNCTION_PARAMETERS_LESSON,
  RETURN_VALUES_LESSON,
  DEFAULT_PARAMETERS_LESSON,
  NAMED_ARGUMENTS_LESSON,
  SINGLE_EXPRESSION_FUNCTIONS_LESSON,
  LOCAL_FUNCTIONS_LESSON,
  VARARG_LESSON,
  WORLD_5_BOSS_LESSON,
} from './curriculum/world5LessonsData';

import { ARRAYS_LESSON, LISTS_LESSON, SETS_LESSON, MAPS_LESSON, MUTABLE_VS_READONLY_LESSON, CREATING_ACCESSING_COLLECTIONS_LESSON, ADDING_REMOVING_UPDATING_LESSON, ITERATING_COLLECTIONS_LESSON, BASIC_COLLECTION_OPERATIONS_LESSON, CHOOSING_COLLECTION_TYPE_LESSON, WORLD_6_BOSS_LESSON } from './curriculum/world6LessonsData';
import { NULLABLE_TYPES_LESSON, NULLABLE_VARIABLES_LESSON, SAFE_CALL_LESSON, ELVIS_OPERATOR_LESSON, NON_NULL_ASSERTION_LESSON, NULL_CHECKS_LESSON, SMART_CASTS_LESSON, SAFE_CASTS_LESSON, NULLABLE_COLLECTIONS_LESSON, CHAINING_NULLABLE_OPERATIONS_LESSON, WORLD_7_BOSS_LESSON } from './curriculum/world7LessonsData';
import { CLASSES_LESSON, OBJECTS_LESSON, PROPERTIES_LESSON, METHODS_LESSON, CONSTRUCTORS_LESSON, PRIMARY_CONSTRUCTORS_LESSON, INIT_LESSON, VISIBILITY_MODIFIERS_LESSON, DATA_CLASSES_LESSON, ENUMS_LESSON, BASIC_INHERITANCE_LESSON, INTERFACES_LESSON, OVERRIDING_MEMBERS_LESSON, WORLD_8_BOSS_LESSON } from './curriculum/world8LessonsData';
import { LAMBDA_EXPRESSIONS_LESSON, ANONYMOUS_FUNCTIONS_LESSON, FUNCTION_TYPES_LESSON, HIGHER_ORDER_FUNCTIONS_LESSON, IT_LESSON, FUNCTION_REFERENCES_LESSON, RETURNING_FROM_LAMBDAS_LESSON, LOCAL_RETURNS_LESSON, INLINE_FUNCTIONS_LESSON, NOINLINE_LESSON, CROSSINLINE_LESSON, WORLD_9_BOSS_LESSON } from './curriculum/world9LessonsData';
import { WORLD_10_LESSONS } from './curriculum/world10LessonsData';
import { WORLD_11_LESSONS } from './curriculum/world11LessonsData';
import { WORLD_12_LESSONS } from './curriculum/world12LessonsData';
import { WORLD_13_LESSONS } from './curriculum/world13LessonsData';
import { WORLD_14_LESSONS } from './curriculum/world14LessonsData';
import { WORLD_15_LESSONS } from './curriculum/world15LessonsData';
import { WORLD_16_LESSONS } from './curriculum/world16LessonsData';
import { WORLD_17_LESSONS } from './curriculum/world17LessonsData';

export const AVAILABLE_FIVE_STAGE_LESSONS: Record<string, FiveStageLesson> = {
  // World 1 - Kotlin Awakening (13 lessons)
  'what-is-kotlin': WHAT_IS_KOTLIN_LESSON,
  'world-1-what-is-kotlin': WHAT_IS_KOTLIN_LESSON,
  'kotlin-syntax': KOTLIN_SYNTAX_LESSON,
  'world-1-kotlin-syntax': KOTLIN_SYNTAX_LESSON,
  comments: COMMENTS_LESSON,
  'world-1-comments': COMMENTS_LESSON,
  'print-println': PRINT_PRINTLN_LESSON,
  'world-1-print-println': PRINT_PRINTLN_LESSON,
  'val-vs-var': VAL_VS_VAR_LESSON,
  'world-1-val-vs-var': VAL_VS_VAR_LESSON,
  'variables-type-inference': VARIABLES_TYPE_INFERENCE_LESSON,
  'world-1-variables-type-inference': VARIABLES_TYPE_INFERENCE_LESSON,
  'int-long': INT_LONG_LESSON,
  'world-1-int-long': INT_LONG_LESSON,
  'float-double': FLOAT_DOUBLE_LESSON,
  'world-1-float-double': FLOAT_DOUBLE_LESSON,
  boolean: BOOLEAN_LESSON,
  'world-1-boolean': BOOLEAN_LESSON,
  char: CHAR_LESSON,
  'world-1-char': CHAR_LESSON,
  string: STRING_LESSON,
  'world-1-string': STRING_LESSON,
  'string-templates': STRING_TEMPLATES_LESSON,
  'world-1-string-templates': STRING_TEMPLATES_LESSON,
  'world-1-boss': WORLD_1_BOSS_LESSON,
  // World 2 - Operator Forge (7 lessons)
  'arithmetic-operators': ARITHMETIC_OPERATORS_LESSON,
  'world-2-arithmetic-operators': ARITHMETIC_OPERATORS_LESSON,
  'comparison-operators': COMPARISON_OPERATORS_LESSON,
  'world-2-comparison-operators': COMPARISON_OPERATORS_LESSON,
  'logical-operators': LOGICAL_OPERATORS_LESSON,
  'world-2-logical-operators': LOGICAL_OPERATORS_LESSON,
  'assignment-operators': ASSIGNMENT_OPERATORS_LESSON,
  'world-2-assignment-operators': ASSIGNMENT_OPERATORS_LESSON,
  'increment-decrement': INCREMENT_DECREMENT_LESSON,
  'world-2-increment-decrement': INCREMENT_DECREMENT_LESSON,
  'operator-precedence': OPERATOR_PRECEDENCE_LESSON,
  'world-2-operator-precedence': OPERATOR_PRECEDENCE_LESSON,
  'world-2-boss': WORLD_2_BOSS_LESSON,
  // World 3 - Decision Maker (9 lessons)
  'world-3-if': IF_LESSON,
  'world-3-if-else': IF_ELSE_LESSON,
  'world-3-else-if': ELSE_IF_LESSON,
  'world-3-when': WHEN_LESSON,
  'world-3-when-with-ranges': WHEN_WITH_RANGES_LESSON,
  'world-3-when-as-an-expression': WHEN_AS_EXPRESSION_LESSON,
  'world-3-multiple-conditions-and-nested-condition': MULTIPLE_NESTED_CONDITIONS_LESSON,
  'world-3-type-checks-with-is-where-appropriate': TYPE_CHECKS_IS_LESSON,
  'world-3-boss': WORLD_3_BOSS_LESSON,
  // World 4 - Loop Master (11 lessons)
  'world-4-for': FOR_LESSON,
  'world-4-while': WHILE_LESSON,
  'world-4-do-while': DO_WHILE_LESSON,
  'world-4-ranges': RANGES_LESSON,
  'world-4-progressions': PROGRESSIONS_LESSON,
  'world-4-downto': DOWNTO_LESSON,
  'world-4-step': STEP_LESSON,
  'world-4-break': BREAK_LESSON,
  'world-4-continue': CONTINUE_LESSON,
  'world-4-nested-loops': NESTED_LOOPS_LESSON,
  'world-4-boss': WORLD_4_BOSS_LESSON,
  // World 5 - Function Forge (9 lessons)
  'world-5-defining-functions': DEFINING_FUNCTIONS_LESSON,
  'world-5-function-parameters': FUNCTION_PARAMETERS_LESSON,
  'world-5-return-values': RETURN_VALUES_LESSON,
  'world-5-default-parameters': DEFAULT_PARAMETERS_LESSON,
  'world-5-named-arguments': NAMED_ARGUMENTS_LESSON,
  'world-5-single-expression-functions': SINGLE_EXPRESSION_FUNCTIONS_LESSON,
  'world-5-local-functions': LOCAL_FUNCTIONS_LESSON,
  'world-5-vararg': VARARG_LESSON,
  'world-5-boss': WORLD_5_BOSS_LESSON,
  // World 6 - Collection Valley
  'world-6-arrays': ARRAYS_LESSON,
  'world-6-lists': LISTS_LESSON,
  'world-6-sets': SETS_LESSON,
  'world-6-maps': MAPS_LESSON,
  'world-6-mutable-vs-read-only-collections': MUTABLE_VS_READONLY_LESSON,
  'world-6-creating-and-accessing-collections': CREATING_ACCESSING_COLLECTIONS_LESSON,
  'world-6-adding-removing-updating-mutable-element': ADDING_REMOVING_UPDATING_LESSON,
  'world-6-iterating-over-collections': ITERATING_COLLECTIONS_LESSON,
  'world-6-basic-collection-operations': BASIC_COLLECTION_OPERATIONS_LESSON,
  'world-6-choosing-the-right-collection-type': CHOOSING_COLLECTION_TYPE_LESSON,
  'world-6-boss': WORLD_6_BOSS_LESSON,
  // World 7 - Null Safety Shield
  'world-7-nullable-types': NULLABLE_TYPES_LESSON,
  'world-7-nullable-variables': NULLABLE_VARIABLES_LESSON,
  'world-7-safe-call': SAFE_CALL_LESSON,
  'world-7-elvis-operator': ELVIS_OPERATOR_LESSON,
  'world-7-non-null-assertion': NON_NULL_ASSERTION_LESSON,
  'world-7-null-checks': NULL_CHECKS_LESSON,
  'world-7-smart-casts': SMART_CASTS_LESSON,
  'world-7-safe-casts-as': SAFE_CASTS_LESSON,
  'world-7-nullable-collections-and-collection-valu': NULLABLE_COLLECTIONS_LESSON,
  'world-7-chaining-nullable-operations': CHAINING_NULLABLE_OPERATIONS_LESSON,
  'world-7-boss': WORLD_7_BOSS_LESSON,
  // World 8 - Object Kingdom
  'world-8-classes': CLASSES_LESSON,
  'world-8-objects': OBJECTS_LESSON,
  'world-8-properties': PROPERTIES_LESSON,
  'world-8-methods': METHODS_LESSON,
  'world-8-constructors': CONSTRUCTORS_LESSON,
  'world-8-primary-constructors': PRIMARY_CONSTRUCTORS_LESSON,
  'world-8-init': INIT_LESSON,
  'world-8-visibility-modifiers': VISIBILITY_MODIFIERS_LESSON,
  'world-8-data-classes': DATA_CLASSES_LESSON,
  'world-8-enums': ENUMS_LESSON,
  'world-8-basic-inheritance': BASIC_INHERITANCE_LESSON,
  'world-8-interfaces': INTERFACES_LESSON,
  'world-8-overriding-members': OVERRIDING_MEMBERS_LESSON,
  'world-8-boss': WORLD_8_BOSS_LESSON,
  // World 9 - Lambda Lab
  'world-9-lambda-expressions': LAMBDA_EXPRESSIONS_LESSON,
  'world-9-anonymous-functions': ANONYMOUS_FUNCTIONS_LESSON,
  'world-9-function-types': FUNCTION_TYPES_LESSON,
  'world-9-higher-order-functions': HIGHER_ORDER_FUNCTIONS_LESSON,
  'world-9-it': IT_LESSON,
  'world-9-function-references': FUNCTION_REFERENCES_LESSON,
  'world-9-returning-from-lambdas': RETURNING_FROM_LAMBDAS_LESSON,
  'world-9-local-returns': LOCAL_RETURNS_LESSON,
  'world-9-inline-functions': INLINE_FUNCTIONS_LESSON,
  'world-9-noinline': NOINLINE_LESSON,
  'world-9-crossinline': CROSSINLINE_LESSON,
  'world-9-boss': WORLD_9_BOSS_LESSON,
  // World 10 - Collection Wizardry
  'world-10-map-mapnotnull-filter': WORLD_10_LESSONS[0],
  'world-10-filternot-filterisinstance-flatmap': WORLD_10_LESSONS[1],
  'world-10-flatten-reduce-fold': WORLD_10_LESSONS[2],
  'world-10-groupby-associate-partition': WORLD_10_LESSONS[3],
  'world-10-zip-chunked-windowed': WORLD_10_LESSONS[4],
  'world-10-distinct-sorted': WORLD_10_LESSONS[5],
  'world-10-sortedby-min-max': WORLD_10_LESSONS[6],
  'world-10-sum-average-any-all-none': WORLD_10_LESSONS[7],
  'world-10-first-find-collection-pipelines-and-chai': WORLD_10_LESSONS[8],
  'world-10-boss': WORLD_10_LESSONS[9],
  'world-11-inheritance-abstract-classes': WORLD_11_LESSONS[0],
  'world-11-interfaces-multiple-interface-implementa': WORLD_11_LESSONS[1],
  'world-11-sealed-classes-sealed-interfaces': WORLD_11_LESSONS[2],
  'world-11-data-classes-in-domain-modeling-enum-cla': WORLD_11_LESSONS[3],
  'world-11-nested-classes': WORLD_11_LESSONS[4], 'world-11-inner-classes': WORLD_11_LESSONS[5],
  'world-11-object-declarations': WORLD_11_LESSONS[6], 'world-11-companion-objects': WORLD_11_LESSONS[7],
  'world-11-extension-functions': WORLD_11_LESSONS[8], 'world-11-extension-properties': WORLD_11_LESSONS[9],
  'world-11-delegation': WORLD_11_LESSONS[10], 'world-11-delegated-properties': WORLD_11_LESSONS[11],
  'world-11-visibility-and-api-design': WORLD_11_LESSONS[12], 'world-11-boss': WORLD_11_LESSONS[13],
  'world-12-generic-classes': WORLD_12_LESSONS[0],
  'world-12-generic-functions': WORLD_12_LESSONS[1],
  'world-12-type-parameters': WORLD_12_LESSONS[2],
  'world-12-generic-constraints': WORLD_12_LESSONS[3],
  'world-12-multiple-constraints': WORLD_12_LESSONS[4],
  'world-12-in-variance': WORLD_12_LESSONS[5],
  'world-12-out-variance': WORLD_12_LESSONS[6],
  'world-12-invariance': WORLD_12_LESSONS[7],
  'world-12-declaration-site-variance': WORLD_12_LESSONS[8],
  'world-12-use-site-variance': WORLD_12_LESSONS[9],
  'world-12-star-projections': WORLD_12_LESSONS[10],
  'world-12-reified-type-parameters': WORLD_12_LESSONS[11],
  'world-12-type-aliases': WORLD_12_LESSONS[12],
  'world-12-type-safe-generic-apis': WORLD_12_LESSONS[13],
  'world-12-boss': WORLD_12_LESSONS[14],
  'world-12-generic-data-toolkit-boss': WORLD_12_LESSONS[14],
  'world-13-let-run': WORLD_13_LESSONS[0],
  'world-13-apply': WORLD_13_LESSONS[1],
  'world-13-also': WORLD_13_LESSONS[2],
  'world-13-with': WORLD_13_LESSONS[3],
  'world-13-this-vs-it': WORLD_13_LESSONS[4],
  'world-13-return-values-of-scope-functions': WORLD_13_LESSONS[5],
  'world-13-choosing-the-appropriate-scope-function': WORLD_13_LESSONS[6],
  'world-13-scope-function-chaining': WORLD_13_LESSONS[7],
  'world-13-avoiding-overuse-and-nesting': WORLD_13_LESSONS[8],
  'world-13-boss': WORLD_13_LESSONS[9],
  'world-14-what-sequences-are': WORLD_14_LESSONS[0],
  'world-14-eager-collection-processing': WORLD_14_LESSONS[1],
  'world-14-lazy-processing': WORLD_14_LESSONS[2],
  'world-14-creating-sequences': WORLD_14_LESSONS[3],
  'world-14-assequence': WORLD_14_LESSONS[4],
  'world-14-intermediate-operations': WORLD_14_LESSONS[5],
  'world-14-terminal-operations': WORLD_14_LESSONS[6],
  'world-14-sequence-evaluation-order': WORLD_14_LESSONS[7],
  'world-14-short-circuiting': WORLD_14_LESSONS[8],
  'world-14-sequences-vs-collections': WORLD_14_LESSONS[9],
  'world-14-performance-trade-offs': WORLD_14_LESSONS[10],
  'world-14-when-sequences-should-and-should-not-be-used': WORLD_14_LESSONS[11],
  'world-14-boss': WORLD_14_LESSONS[12],
  'world-15-exceptions-try': WORLD_15_LESSONS[0],
  'world-15-catch': WORLD_15_LESSONS[1],
  'world-15-finally': WORLD_15_LESSONS[2],
  'world-15-throw': WORLD_15_LESSONS[3],
  'world-15-multiple-catch-blocks': WORLD_15_LESSONS[4],
  'world-15-try-as-an-expression': WORLD_15_LESSONS[5],
  'world-15-custom-exceptions': WORLD_15_LESSONS[6],
  'world-15-checked-vs-unchecked-exception-model': WORLD_15_LESSONS[7],
  'world-15-result': WORLD_15_LESSONS[8],
  'world-15-runcatching': WORLD_15_LESSONS[9],
  'world-15-success-failure-handling': WORLD_15_LESSONS[10],
  'world-15-error-handling-patterns': WORLD_15_LESSONS[11],
  'world-15-avoiding-swallowed-errors': WORLD_15_LESSONS[12],
  'world-15-designing-meaningful-failure-paths': WORLD_15_LESSONS[13],
  'world-15-boss': WORLD_15_LESSONS[14],
  'world-16-coroutine-fundamentals-coroutine-builder': WORLD_16_LESSONS[0],
  'world-16-launch-async': WORLD_16_LESSONS[1],
  'world-16-await-suspending-functions': WORLD_16_LESSONS[2],
  'world-16-suspend-coroutine-context': WORLD_16_LESSONS[3],
  'world-16-dispatchers-jobs': WORLD_16_LESSONS[4],
  'world-16-cancellation-cooperative-cancellation': WORLD_16_LESSONS[5],
  'world-16-structured-concurrency': WORLD_16_LESSONS[6],
  'world-16-coroutinescope': WORLD_16_LESSONS[7],
  'world-16-supervisorscope': WORLD_16_LESSONS[8],
  'world-16-exception-handling-in-coroutines': WORLD_16_LESSONS[9],
  'world-16-coroutine-best-practices': WORLD_16_LESSONS[10],
  'world-16-boss': WORLD_16_LESSONS[11],
  'world-17-flow-fundamentals-cold-flow': WORLD_17_LESSONS[0],
  'world-17-hot-streams-flow': WORLD_17_LESSONS[1],
  'world-17-collect-intermediate-flow-operators': WORLD_17_LESSONS[2],
  'world-17-map-filter': WORLD_17_LESSONS[3],
  'world-17-transform-catch': WORLD_17_LESSONS[4],
  'world-17-oneach-stateflow': WORLD_17_LESSONS[5],
  'world-17-sharedflow-state-vs-events': WORLD_17_LESSONS[6],
  'world-17-flow-cancellation-combining-flows': WORLD_17_LESSONS[7],
  'world-17-flow-lifecycle-backpressure-conflation-c': WORLD_17_LESSONS[8],
  'world-17-boss': WORLD_17_LESSONS[9],
};
