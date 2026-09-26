import type { DetailedTutorialData } from '../detailedTutorialsData';

// Regenerated Detailed Tutorial content for World 2, produced lesson-by-lesson
// from each lesson's real five-stage source, following the same process as
// world1DetailedTutorials.ts (see the CodeDo_Tab_Names_Review workflow).
//
// World 2: seven source-grounded Detailed Tutorial objects in curriculum order.
export const WORLD_2_DETAILED_TUTORIALS: DetailedTutorialData[] = [
  {
    "lessonId": "world-2-arithmetic-operators",
    "aliasKeys": [],
    "worldNumber": 2,
    "lessonNumber": 1,
    "title": "Arithmetic Operators",
    "subtitle": "Doing Math in Kotlin",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Kotlin gives you five arithmetic operators: +, -, *, /, and %. Most behave exactly as you'd expect, but integer division has a surprising rule -- dividing two Ints always produces a whole-number Int, truncating any decimal part.",
    "toc": [
      {
        "id": "five-operators",
        "label": "Five Arithmetic Operators"
      },
      {
        "id": "integer-division",
        "label": "Integer Division Discards the Fraction"
      },
      {
        "id": "remainder",
        "label": "Find Leftovers With %"
      },
      {
        "id": "double-division",
        "label": "A Double Operand Preserves a Fraction"
      },
      {
        "id": "share",
        "label": "Write & Run: Divide Coins"
      },
      {
        "id": "multiply-cost",
        "label": "Debug: Cost of Several Items"
      },
      {
        "id": "gotchas",
        "label": "Gotchas"
      },
      {
        "id": "cheatsheet",
        "label": "Cheatsheet"
      },
      {
        "id": "quiz",
        "label": "Quiz"
      }
    ],
    "sections": [
      {
        "id": "five-operators",
        "title": "Five Arithmetic Operators",
        "paragraphs": [
          "Kotlin uses + for addition, - for subtraction, * for multiplication, / for division, and % for the remainder. These symbols act on numeric values, but / changes behavior according to operand types.",
          "The Explore example uses a = 10 and b = 3. Their sum is 13, their difference is 7, and their product is 30. Subtraction keeps the order of operands: a - b takes b away from a.",
          "Multiplication here represents repeated groups. If one item costs a certain amount and a quantity counts the items, multiply those two values to get the total rather than adding the quantity to the price.",
          "Trace what each operator means before predicting output. The symbols do different jobs even when all operands are Int values."
        ],
        "codeSnippet": {
          "title": "Basic arithmetic",
          "language": "Kotlin",
          "code": [
            "val a = 10",
            "val b = 3",
            "println(a + b)",
            "println(a - b)",
            "println(a * b)"
          ],
          "explanation": "Established the three most familiar arithmetic operators.",
          "output": "13\n7\n30"
        }
      },
      {
        "id": "integer-division",
        "title": "Integer Division Discards the Fraction",
        "paragraphs": [
          "When both operands are Int, / yields a whole-number Int. In the lesson’s 7 / 2 example, two fits into seven three full times, so the printed result is 3. The remaining half is not rounded up.",
          "The introductory example similarly calculates 5 / 2 as 2. This is truncation of the fractional portion. A learner expecting 2.5 is using ordinary decimal division rather than the two-Int rule taught here.",
          "Check both operands before you divide. If neither operand is a decimal value, the result does not preserve a fractional part.",
          "This matters for the coin-sharing challenge: equal whole-coin shares require exactly this kind of division."
        ],
        "codeSnippet": {
          "title": "Integer division truncates",
          "language": "Kotlin",
          "code": [
            "val a = 7",
            "val b = 2",
            "println(a / b)"
          ],
          "explanation": "Revealed that Int / Int never produces a fractional result.",
          "output": "3"
        }
      },
      {
        "id": "remainder",
        "title": "Find Leftovers With %",
        "paragraphs": [
          "The % operator gives the remainder after division. For 17 % 5, five fits into seventeen three times, accounting for fifteen, and two remains.",
          "% answers a different question from /. Integer division tells you the number of complete groups; remainder tells you how many are left after making those groups.",
          "The two operations complement each other when splitting items evenly. Keep the divisor consistent across the quotient and remainder calculations.",
          "In the Explore card the remainder alone prints 2, not the count of full groups."
        ],
        "codeSnippet": {
          "title": "The modulo operator",
          "language": "Kotlin",
          "code": [
            "val a = 17",
            "val b = 5",
            "println(a % b)"
          ],
          "explanation": "Introduced % to recover what integer division throws away.",
          "output": "2"
        }
      },
      {
        "id": "double-division",
        "title": "A Double Operand Preserves a Fraction",
        "paragraphs": [
          "The source contrasts dividing two Int variables with dividing an Int by the Double literal 2.0. The first result is 2, and the second is 2.5.",
          "Only one operand needs to be Double to use the floating-point behavior in this example. Writing 5.0 / 2 produces 2.5 as well.",
          "The point is to choose the numeric form for the required result. If an exact fractional share is important, Int / Int will discard that part before the result can be printed.",
          "The same lesson briefly shows multiplication before addition in 2 + 3 * 4; the full hierarchy of mixed operators is taught in the later Operator Precedence lesson."
        ],
        "codeSnippet": {
          "title": "Mixing Int and Double promotes the result",
          "language": "Kotlin",
          "code": [
            "val a = 5",
            "val b = 2",
            "println(a / b)",
            "println(a / 2.0)"
          ],
          "explanation": "Showed that a single Double operand is enough to avoid truncation.",
          "output": "2\n2.5"
        }
      },
      {
        "id": "share",
        "title": "Write & Run: Divide Coins",
        "paragraphs": [
          "Declare coins = 47 and players = 5. Calculate share with coins / players and leftover with coins % players.",
          "Five players each receive 9 whole coins, using 45 coins in all. Two coins remain. The quotient and remainder come from the same pair of values.",
          "The source solution inserts both results into the exact required sentence: Each player gets 9 coins, with 2 left over.",
          "Check the numbers and punctuation together: the challenge tests arithmetic and the final printed message."
        ],
        "codeSnippet": {
          "title": "Split the Loot",
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val coins = 47",
            "    val players = 5",
            "    val share = coins / players",
            "    val leftover = coins % players",
            "    println(\"Each player gets $share coins, with $leftover left over\")",
            "}"
          ],
          "explanation": "This follows the challenge requirements in the five-stage lesson.",
          "output": "Each player gets 9 coins, with 2 left over"
        }
      },
      {
        "id": "multiply-cost",
        "title": "Debug: Cost of Several Items",
        "paragraphs": [
          "The broken program adds pricePerItem = 8 to quantity = 6. That yields 14, which is neither six items’ total cost nor an equivalent calculation.",
          "Change the arithmetic operator from + to *. Six items costing eight each total 48, so the corrected message says Total cost: 48.",
          "This debugging task is about choosing the right operation, not changing the values or the String template.",
          "Reason from the quantities: a price for each item must be applied to every item counted."
        ],
        "comparison": {
          "leftTitle": "Broken program",
          "leftCode": [
            "fun main() {",
            "    val pricePerItem = 8",
            "    val quantity = 6",
            "    // BUG: adding gives the price plus the quantity, not the true total cost!",
            "    val totalCost = pricePerItem + quantity",
            "    println(\"Total cost: $totalCost\")",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired program",
          "rightCode": [
            "fun main() {",
            "    val pricePerItem = 8",
            "    val quantity = 6",
            "    val totalCost = pricePerItem * quantity",
            "    println(\"Total cost: $totalCost\")",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "pricePerItem + quantity only adds 6 to 8, giving 14 -- it never accounts for buying 6 items at 8 each. Replacing + with * correctly multiplies 8 by 6, producing the real total: 48."
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Using integer division when a fractional measurement is needed",
        "whyItFails": "With two Int operands, the fractional portion disappears before a later assignment or print.",
        "correction": "Use a Double operand for the fractional calculation.",
        "badCode": [
          "val average = 11 / 2"
        ],
        "fixedCode": [
          "val average = 11.0 / 2"
        ]
      },
      {
        "mistake": "Confusing the remainder with the number of complete groups",
        "whyItFails": "In 14 divided by 4, there are three complete groups and two left; % selects the leftover two.",
        "correction": "Use / for complete groups and % for what remains.",
        "badCode": [
          "val groups = 14 % 4"
        ],
        "fixedCode": [
          "val groups = 14 / 4"
        ]
      },
      {
        "mistake": "Changing the divisor between share and leftover",
        "whyItFails": "A quotient and its remainder must come from the same divisor to describe one split.",
        "correction": "Use the same group count in both calculations.",
        "badCode": [
          "val share = 19 / 3",
          "val leftover = 19 % 4"
        ],
        "fixedCode": [
          "val share = 19 / 3",
          "val leftover = 19 % 3"
        ]
      },
      {
        "mistake": "Adding a unit amount to a quantity",
        "whyItFails": "Adding unlike roles does not account for all units in a total.",
        "correction": "Multiply the amount per unit by the number of units.",
        "badCode": [
          "val total = 7 * 1 + 4"
        ],
        "fixedCode": [
          "val total = 7 * 4"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Add",
        "syntax": "a + b",
        "description": "Sum of two numeric values."
      },
      {
        "term": "Subtract",
        "syntax": "a - b",
        "description": "Difference, in operand order."
      },
      {
        "term": "Multiply",
        "syntax": "a * b",
        "description": "Product of two numbers."
      },
      {
        "term": "Integer divide",
        "syntax": "7 / 2",
        "description": "Two Int operands produce 3, discarding the fraction."
      },
      {
        "term": "Remainder",
        "syntax": "17 % 5",
        "description": "Produces 2 left after complete groups."
      },
      {
        "term": "Decimal divide",
        "syntax": "5 / 2.0",
        "description": "A Double operand retains the fractional result 2.5."
      }
    ],
    "quiz": [
      {
        "id": "world2-tutorial-1-1",
        "question": "What is 13 / 4 when both values are Int?",
        "options": [
          "3",
          "3.25",
          "1",
          "4"
        ],
        "correctIndex": 0,
        "explanation": "Integer division discards the fractional part, leaving three complete groups."
      },
      {
        "id": "world2-tutorial-1-2",
        "question": "What does 13 % 4 produce?",
        "options": [
          "3",
          "1",
          "4",
          "0"
        ],
        "correctIndex": 1,
        "explanation": "Four fits into thirteen three times with one remaining."
      },
      {
        "id": "world2-tutorial-1-3",
        "question": "What is 6 / 4.0?",
        "options": [
          "1",
          "1.5",
          "2",
          "0"
        ],
        "correctIndex": 1,
        "explanation": "The Double operand makes this floating-point division."
      },
      {
        "id": "world2-tutorial-1-4",
        "question": "Which operation computes the cost of five items at 9 each?",
        "options": [
          "9 + 5",
          "9 % 5",
          "9 * 5",
          "9 / 5"
        ],
        "correctIndex": 2,
        "explanation": "Unit price multiplied by item count gives the total cost."
      }
    ]
  },
  {
    "lessonId": "world-2-comparison-operators",
    "aliasKeys": [],
    "worldNumber": 2,
    "lessonNumber": 2,
    "title": "Comparison Operators",
    "subtitle": "Comparing Values: == != < > <= >=",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Kotlin's comparison operators let you compare two values and get back a Boolean result. == checks structural equality (are the contents equal?), != checks inequality, and <, >, <=, >= compare ordering between numbers.",
    "toc": [
      {
        "id": "equality",
        "label": "Compare Values With == and !="
      },
      {
        "id": "strict",
        "label": "Strict Ordering With < and >"
      },
      {
        "id": "inclusive",
        "label": "Inclusive Boundaries With <= and >="
      },
      {
        "id": "strings",
        "label": "Ordering Strings"
      },
      {
        "id": "eligible",
        "label": "Write & Run: Minimum Age"
      },
      {
        "id": "boundary",
        "label": "Debug: Include the Exact Minimum"
      },
      {
        "id": "gotchas",
        "label": "Gotchas"
      },
      {
        "id": "cheatsheet",
        "label": "Cheatsheet"
      },
      {
        "id": "quiz",
        "label": "Quiz"
      }
    ],
    "sections": [
      {
        "id": "equality",
        "title": "Compare Values With == and !=",
        "paragraphs": [
          "Comparisons return Boolean values. == checks structural equality of content or values, while != asks whether the two compared values differ.",
          "Two Strings containing CodeDo compare equal with == because their contents match. The lesson specifically distinguishes this from asking whether the objects occupy the same memory location.",
          "If attempts and maxAttempts are both 3, attempts != maxAttempts is false: equal values do not satisfy an inequality test.",
          "Use == when equality is intended. Plain = assigns a value and is not the equality comparison demonstrated here."
        ],
        "codeSnippet": {
          "title": "Structural equality with ==",
          "language": "Kotlin",
          "code": [
            "val str1 = \"CodeDo\"",
            "val str2 = \"CodeDo\"",
            "println(str1 == str2)"
          ],
          "explanation": "Kotlin's == checked the content of both strings, not whether they are the same object in memory.",
          "output": "true"
        }
      },
      {
        "id": "strict",
        "title": "Strict Ordering With < and >",
        "paragraphs": [
          "< checks whether the left value is smaller than the right; > checks whether it is larger. The order of operands affects the result.",
          "The Explore budget is 40 and the price is 45, so budget < price is true. Wins = 12 compared with losses = 15 using > is false.",
          "These are strict comparisons: equal numbers satisfy neither < nor >. That distinction matters whenever an exact boundary should count.",
          "The output is a Boolean word, not either of the compared numeric values."
        ],
        "codeSnippet": {
          "title": "Strictly less than <",
          "language": "Kotlin",
          "code": [
            "val budget = 40",
            "val price = 45",
            "println(budget < price)"
          ],
          "explanation": "Used < to check whether a value falls strictly below another.",
          "output": "true"
        }
      },
      {
        "id": "inclusive",
        "title": "Inclusive Boundaries With <= and >=",
        "paragraphs": [
          "<= accepts smaller or equal values; >= accepts greater or equal values. The extra equality case is the key difference from the strict versions.",
          "The source checks whether a score of 72 reaches a pass mark of 60, so score >= passMark is true. Equal numbers would also pass >=.",
          "When a minimum requirement includes someone exactly at the minimum, the inclusive operator is appropriate. Think explicitly about the boundary before choosing > or >=.",
          "As with every comparison in this lesson, the expression produces true or false for storage or printing."
        ],
        "codeSnippet": {
          "title": "Relational comparisons with >=",
          "language": "Kotlin",
          "code": [
            "val score = 72",
            "val passMark = 60",
            "println(score >= passMark)"
          ],
          "explanation": "A relational comparison produced a Boolean we can use to decide pass/fail.",
          "output": "true"
        }
      },
      {
        "id": "strings",
        "title": "Ordering Strings",
        "paragraphs": [
          "The source also compares Strings with the relational operators. In its apple and banana example, apple < banana evaluates to true.",
          "The Predict stage compares cat with car: the initial letters match and t comes after r, so cat > car is true in the demonstrated ordering.",
          "This is still a Boolean comparison, not String concatenation or a comparison of word lengths.",
          "Keep the scope to the alphabetic examples actually supplied by the lesson; the important observation is that relational operators also work on these Strings."
        ],
        "codeSnippet": {
          "title": "Relational operators also order Strings",
          "language": "Kotlin",
          "code": [
            "val a = \"apple\"",
            "val b = \"banana\"",
            "println(a < b)"
          ],
          "explanation": "Showed that <, >, <=, and >= work on Strings too, not just numbers.",
          "output": "true"
        }
      },
      {
        "id": "eligible",
        "title": "Write & Run: Minimum Age",
        "paragraphs": [
          "Declare age = 20 and minAge = 18 as required. Compare age >= minAge and print the resulting Boolean.",
          "Since 20 meets or exceeds 18, the expression prints true. There is no need to introduce an if statement; the comparison itself is the value to print.",
          "Use the source’s specified >= operator rather than replacing it with another comparison that happens to work for this one pair of numbers.",
          "The intended rule includes ages exactly equal to the minimum as well as ages above it."
        ],
        "codeSnippet": {
          "title": "Check Age Eligibility",
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val age = 20",
            "    val minAge = 18",
            "    println(age >= minAge)",
            "}"
          ],
          "explanation": "This follows the challenge requirements in the five-stage lesson.",
          "output": "true"
        }
      },
      {
        "id": "boundary",
        "title": "Debug: Include the Exact Minimum",
        "paragraphs": [
          "The broken program compares age > minAge with both values set to 18. Strict > rejects the exact minimum, producing false.",
          "The requirement says someone exactly at minAge is eligible. Change the operator to >= so equality also gives true.",
          "The repaired expression evaluates 18 >= 18 to true. The issue lies in the boundary rule, not the declarations.",
          "Use strict versus inclusive comparisons according to the intended meaning, not only according to cases above the threshold."
        ],
        "comparison": {
          "leftTitle": "Broken program",
          "leftCode": [
            "fun main() {",
            "    val age = 18",
            "    val minAge = 18",
            "    // BUG: users who are EXACTLY minAge should still be eligible!",
            "    val isEligible = age > minAge",
            "    println(isEligible)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired program",
          "rightCode": [
            "fun main() {",
            "    val age = 18",
            "    val minAge = 18",
            "    val isEligible = age >= minAge",
            "    println(isEligible)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "age > minAge only evaluates to true when age is strictly greater than minAge, so an 18-year-old checked against a minimum age of 18 is wrongly rejected (18 > 18 is false). Using >= includes the equal case, so 18 >= 18 correctly evaluates to true."
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Using = to ask whether two values match",
        "whyItFails": "= assigns to a mutable variable; == performs the equality test.",
        "correction": "Write == for a comparison.",
        "badCode": [
          "var entered = 4",
          "entered = 4"
        ],
        "fixedCode": [
          "val entered = 4",
          "println(entered == 4)"
        ]
      },
      {
        "mistake": "Assuming matching text cannot compare equal unless it is one object",
        "whyItFails": "The equality operator compares the String contents in the example, not only object identity.",
        "correction": "Compare values with == when equal content is the question.",
        "badCode": [
          "val first = \"Blue\"",
          "val second = \"Blue\"",
          "// Incorrect expectation: first == second is false"
        ],
        "fixedCode": [
          "val first = \"Blue\"",
          "val second = \"Blue\"",
          "println(first == second) // true"
        ]
      },
      {
        "mistake": "Excluding a limit that should be allowed",
        "whyItFails": "A strict < excludes the equal case at a maximum boundary.",
        "correction": "Choose <= when a value equal to the maximum remains acceptable.",
        "badCode": [
          "val seats = 30",
          "val capacity = 30",
          "println(seats < capacity)"
        ],
        "fixedCode": [
          "val seats = 30",
          "val capacity = 30",
          "println(seats <= capacity)"
        ]
      },
      {
        "mistake": "Reversing the operands in a strict order check",
        "whyItFails": "Small < large and large < small answer different questions.",
        "correction": "Read the comparison aloud from left to right.",
        "badCode": [
          "val stock = 2",
          "val needed = 5",
          "println(needed < stock)"
        ],
        "fixedCode": [
          "val stock = 2",
          "val needed = 5",
          "println(stock < needed)"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Equal content",
        "syntax": "a == b",
        "description": "True when compared values are equal."
      },
      {
        "term": "Different values",
        "syntax": "a != b",
        "description": "True when values differ."
      },
      {
        "term": "Strict lower",
        "syntax": "a < b",
        "description": "Does not include equality."
      },
      {
        "term": "Strict higher",
        "syntax": "a > b",
        "description": "Does not include equality."
      },
      {
        "term": "At most",
        "syntax": "a <= b",
        "description": "Includes smaller and equal."
      },
      {
        "term": "At least",
        "syntax": "a >= b",
        "description": "Includes greater and equal."
      },
      {
        "term": "String order",
        "syntax": "\"apple\" < \"banana\"",
        "description": "Returns a Boolean for the source’s alphabetic ordering."
      }
    ],
    "quiz": [
      {
        "id": "world2-tutorial-2-1",
        "question": "What is 12 != 13?",
        "options": [
          "true",
          "false",
          "12",
          "13"
        ],
        "correctIndex": 0,
        "explanation": "The values differ, so inequality is true."
      },
      {
        "id": "world2-tutorial-2-2",
        "question": "Which condition includes a score exactly equal to a minimum?",
        "options": [
          "score > minimum",
          "score >= minimum",
          "score < minimum",
          "score != minimum"
        ],
        "correctIndex": 1,
        "explanation": ">= includes the equal case."
      },
      {
        "id": "world2-tutorial-2-3",
        "question": "What does \"dog\" == \"dog\" evaluate to?",
        "options": [
          "false",
          "true",
          "dog",
          "An error"
        ],
        "correctIndex": 1,
        "explanation": "Matching String contents compare equal."
      },
      {
        "id": "world2-tutorial-2-4",
        "question": "What is 7 < 7?",
        "options": [
          "true",
          "false",
          "7",
          "An error"
        ],
        "correctIndex": 1,
        "explanation": "A strict less-than comparison excludes equality."
      }
    ]
  },
  {
    "lessonId": "world-2-logical-operators",
    "aliasKeys": [],
    "worldNumber": 2,
    "lessonNumber": 3,
    "title": "Logical Operators",
    "subtitle": "Combining Conditions: Logical Operators",
    "badge": "BEGINNER",
    "readTime": "5 min",
    "overviewSummary": "&& (AND) and || (OR) let you combine multiple Boolean expressions into a single condition. && is true only when BOTH sides are true; || is true when AT LEAST ONE side is true.",
    "toc": [
      {
        "id": "and",
        "label": "AND Requires Both Conditions"
      },
      {
        "id": "or",
        "label": "OR Accepts Either Side"
      },
      {
        "id": "not",
        "label": "NOT Inverts a Boolean"
      },
      {
        "id": "grouping",
        "label": "Group AND and OR Intentionally"
      },
      {
        "id": "short-circuit",
        "label": "Skip a Right Side Already Decided"
      },
      {
        "id": "admin",
        "label": "Write & Run: Admin Without a Ban"
      },
      {
        "id": "entrance",
        "label": "Debug: Closed Venue"
      },
      {
        "id": "gotchas",
        "label": "Gotchas"
      },
      {
        "id": "cheatsheet",
        "label": "Cheatsheet"
      },
      {
        "id": "quiz",
        "label": "Quiz"
      }
    ],
    "sections": [
      {
        "id": "and",
        "title": "AND Requires Both Conditions",
        "paragraphs": [
          "&& combines two Boolean expressions and produces true only when both sides are true. A single false side is enough to make the whole expression false.",
          "In Explore, hasKey is true and hasCode is false. hasKey && hasCode therefore prints false. The Learn example combines a key flag with level >= 10; level 5 fails that check, so the AND result is false.",
          "First evaluate any comparisons, then check both Boolean values. The && operator is useful when two requirements must both hold.",
          "If a learner reads && as “either,” the outcome changes. Reserve “either condition can be enough” for ||."
        ],
        "codeSnippet": {
          "title": "AND (&&) requires both",
          "language": "Kotlin",
          "code": [
            "val hasKey = true",
            "val hasCode = false",
            "println(hasKey && hasCode)"
          ],
          "explanation": "Combined two conditions; the result is false because hasCode is false.",
          "output": "false"
        }
      },
      {
        "id": "or",
        "title": "OR Accepts Either Side",
        "paragraphs": [
          "|| produces true when at least one side is true; it becomes false only when both sides are false.",
          "The Explore card uses the same true key and false code as the AND card. With ||, the result switches to true because the key condition already satisfies the OR.",
          "In the lesson’s weekend or holiday prediction, both flags are false. Their OR is false before any surrounding negation is considered.",
          "Write out the two truth values when reasoning: true || false is true, whereas false || false is false."
        ],
        "codeSnippet": {
          "title": "OR (||) requires just one",
          "language": "Kotlin",
          "code": [
            "val hasKey = true",
            "val hasCode = false",
            "println(hasKey || hasCode)"
          ],
          "explanation": "Combined the same two conditions with OR; the result flips to true.",
          "output": "true"
        }
      },
      {
        "id": "not",
        "title": "NOT Inverts a Boolean",
        "paragraphs": [
          "! reverses a Boolean. The Explore example starts with isRaining = false, so !isRaining is true.",
          "With !(isWeekend || isHoliday), evaluate the expression inside parentheses first. Both flags false make the OR false; ! then reverses that result to true.",
          "The lesson also uses ! to require that someone is not banned. This negation changes the Boolean supplied to the surrounding AND.",
          "The operator applies to a Boolean value or expression, not to the visible letters of the word true or false."
        ],
        "codeSnippet": {
          "title": "NOT (!) negates a Boolean",
          "language": "Kotlin",
          "code": [
            "val isRaining = false",
            "println(!isRaining)"
          ],
          "explanation": "Introduced ! as the third logical operator, alongside && and ||.",
          "output": "true"
        }
      },
      {
        "id": "grouping",
        "title": "Group AND and OR Intentionally",
        "paragraphs": [
          "For the logical operators in this lesson, && binds tighter than ||. The expression a || b && c is read as a || (b && c).",
          "The hasPass, isVip, and isOpen example shows the default grouping. Parentheses can change the intended rule: (hasTicket || isVip) && !isBanned requires one credential and no ban.",
          "When a rule says one of two credentials is required AND the venue must be open, put parentheses around the credential alternatives. Otherwise a true left-hand OR branch may bypass the open condition.",
          "This lesson teaches the logical grouping it actually exercises. The following Operator Precedence lesson assembles the full ordering across arithmetic, comparison, and logical operators."
        ],
        "codeSnippet": {
          "title": "Combining AND, OR, and NOT",
          "language": "Kotlin",
          "code": [
            "val hasTicket = true",
            "val isVip = false",
            "val isBanned = true",
            "val canEnter = (hasTicket || isVip) && !isBanned",
            "println(canEnter)"
          ],
          "explanation": "Combined all three logical operators -- &&, ||, and ! -- in a single, clearly grouped expression.",
          "output": "false"
        }
      },
      {
        "id": "short-circuit",
        "title": "Skip a Right Side Already Decided",
        "paragraphs": [
          "&& short-circuits when its left side is false. Since no right-side value can make false && anything true, Kotlin does not evaluate that right expression.",
          "The Explore program sets hasKey = false and puts a printing function call on the right. The function does not run, so Checked! does not appear; only the final false is printed.",
          "This behavior affects execution as well as the Boolean result. Predicting console output requires noticing whether a right-hand call executes at all.",
          "The source demonstrates this specifically for &&. No additional short-circuit cases are needed to understand this lesson."
        ],
        "codeSnippet": {
          "title": "Short-circuit evaluation with &&",
          "language": "Kotlin",
          "code": [
            "fun expensiveCheck(): Boolean {",
            "    println(\"Checked!\")",
            "    return true",
            "}",
            "val hasKey = false",
            "val result = hasKey && expensiveCheck()",
            "println(result)"
          ],
          "explanation": "Showed that && does not just evaluate to false -- it actively skips the right side once the left side already decides the answer.",
          "output": "false"
        }
      },
      {
        "id": "admin",
        "title": "Write & Run: Admin Without a Ban",
        "paragraphs": [
          "Declare isAdmin = true and isBanned = false. The requested expression is isAdmin && !isBanned.",
          "Negate false to obtain true, then combine true && true. The final result printed by the program is true.",
          "The task combines an eligibility requirement with an exclusion. Applying ! to the banned flag is essential; using the flag directly would reverse the intended meaning.",
          "Print the Boolean expression itself, as the lesson requests, rather than introducing conditional statements."
        ],
        "codeSnippet": {
          "title": "Grant Dashboard Access",
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val isAdmin = true",
            "    val isBanned = false",
            "    println(isAdmin && !isBanned)",
            "}"
          ],
          "explanation": "This follows the challenge requirements in the five-stage lesson.",
          "output": "true"
        }
      },
      {
        "id": "entrance",
        "title": "Debug: Closed Venue",
        "paragraphs": [
          "The broken rule is hasPass || isVip && isOpen. Default precedence groups isVip && isOpen together, so a true hasPass can make the entire OR true even if isOpen is false.",
          "The intended rule is (hasPass || isVip) && isOpen. The parentheses form the credential check first, then require the venue to be open.",
          "With hasPass true, isVip false, and isOpen false, the repaired program prints false.",
          "The bug is the logical grouping rather than the flags’ values. Change the parentheses to express the actual entry rule."
        ],
        "comparison": {
          "leftTitle": "Broken program",
          "leftCode": [
            "fun main() {",
            "    val hasPass = true",
            "    val isVip = false",
            "    val isOpen = false",
            "    // BUG: entry should require the venue to be OPEN, plus a pass or VIP status",
            "    val canEnter = hasPass || isVip && isOpen",
            "    println(canEnter)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired program",
          "rightCode": [
            "fun main() {",
            "    val hasPass = true",
            "    val isVip = false",
            "    val isOpen = false",
            "    val canEnter = (hasPass || isVip) && isOpen",
            "    println(canEnter)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "hasPass || isVip && isOpen parses as hasPass || (isVip && isOpen) because && has higher precedence than ||, so with isVip false the isOpen check is skipped entirely and canEnter comes out true even though the venue is closed. Wrapping the OR in parentheses -- (hasPass || isVip) && isOpen -- forces isOpen to be checked against the combined pass/VIP result, correctly producing false when the venue is closed."
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Using AND for a choice between two accepted credentials",
        "whyItFails": "&& requires both, so it rejects someone who has only one valid credential.",
        "correction": "Use || when either one is sufficient.",
        "badCode": [
          "val hasCard = true",
          "val hasCode = false",
          "val admitted = hasCard && hasCode"
        ],
        "fixedCode": [
          "val hasCard = true",
          "val hasCode = false",
          "val admitted = hasCard || hasCode"
        ]
      },
      {
        "mistake": "Negating only one alternative when the whole choice should be inverted",
        "whyItFails": "! binds to its immediate Boolean expression; without parentheses it does not reverse the complete OR result.",
        "correction": "Wrap the OR before applying !.",
        "badCode": [
          "val onLeave = false",
          "val sick = true",
          "val available = !onLeave || sick"
        ],
        "fixedCode": [
          "val onLeave = false",
          "val sick = true",
          "val available = !(onLeave || sick)"
        ]
      },
      {
        "mistake": "Letting an OR alternative bypass a common requirement",
        "whyItFails": "Without grouping, && binds tighter than || and may apply the requirement only to the second alternative.",
        "correction": "Group the alternatives before the shared requirement.",
        "badCode": [
          "val hasBadge = true",
          "val hasInvite = false",
          "val eventOpen = false",
          "val allowed = hasBadge || hasInvite && eventOpen"
        ],
        "fixedCode": [
          "val hasBadge = true",
          "val hasInvite = false",
          "val eventOpen = false",
          "val allowed = (hasBadge || hasInvite) && eventOpen"
        ]
      },
      {
        "mistake": "Expecting a right-hand check to run after false &&",
        "whyItFails": "The left side already determines the AND result, so Kotlin skips the right expression.",
        "correction": "Do not rely on that right call executing; reason about whether it is reached.",
        "badCode": [
          "val ready = false",
          "val valid = ready && checkAccess()"
        ],
        "fixedCode": [
          "val ready = false",
          "// checkAccess() is skipped by ready && checkAccess()"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "AND",
        "syntax": "a && b",
        "description": "True only if both sides are true."
      },
      {
        "term": "OR",
        "syntax": "a || b",
        "description": "True if at least one side is true."
      },
      {
        "term": "NOT",
        "syntax": "!a",
        "description": "Reverses the Boolean value."
      },
      {
        "term": "Logical grouping",
        "syntax": "(a || b) && c",
        "description": "Requires c after either a or b."
      },
      {
        "term": "Default grouping",
        "syntax": "a || b && c",
        "description": "Read as a || (b && c)."
      },
      {
        "term": "Short-circuit AND",
        "syntax": "false && check()",
        "description": "The right call is skipped."
      }
    ],
    "quiz": [
      {
        "id": "world2-tutorial-3-1",
        "question": "What is false || true?",
        "options": [
          "false",
          "true",
          "null",
          "An error"
        ],
        "correctIndex": 1,
        "explanation": "OR needs at least one true side."
      },
      {
        "id": "world2-tutorial-3-2",
        "question": "What is true && false?",
        "options": [
          "true",
          "false",
          "null",
          "An error"
        ],
        "correctIndex": 1,
        "explanation": "Both AND operands must be true."
      },
      {
        "id": "world2-tutorial-3-3",
        "question": "What is !(true && true)?",
        "options": [
          "true",
          "false",
          "null",
          "An error"
        ],
        "correctIndex": 1,
        "explanation": "The AND is true, which NOT reverses to false."
      },
      {
        "id": "world2-tutorial-3-4",
        "question": "With ready = false, does ready && verify() call verify()?",
        "options": [
          "Always",
          "Only if verify returns true",
          "No",
          "It throws"
        ],
        "correctIndex": 2,
        "explanation": "A false left operand short-circuits &&."
      }
    ]
  },
  {
    "lessonId": "world-2-assignment-operators",
    "aliasKeys": [],
    "worldNumber": 2,
    "lessonNumber": 4,
    "title": "Assignment Operators",
    "subtitle": "Assignment Operators",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "The plain = operator assigns a value to a variable. Kotlin also offers compound assignment operators -- +=, -=, *=, /=, and %= -- which update a variable based on its own current value in a single, shorter step.",
    "toc": [
      {
        "id": "assign",
        "label": "Plain Assignment Replaces a Value"
      },
      {
        "id": "add-subtract",
        "label": "Add or Subtract and Store"
      },
      {
        "id": "multiply-divide",
        "label": "Multiply or Divide and Store"
      },
      {
        "id": "remainder-string",
        "label": "Remainder Updates and String +="
      },
      {
        "id": "mutable",
        "label": "Compound Assignment Needs var"
      },
      {
        "id": "wallet",
        "label": "Write & Run: Wallet Balance"
      },
      {
        "id": "mutable-total",
        "label": "Debug: Read-Only Total"
      },
      {
        "id": "gotchas",
        "label": "Gotchas"
      },
      {
        "id": "cheatsheet",
        "label": "Cheatsheet"
      },
      {
        "id": "quiz",
        "label": "Quiz"
      }
    ],
    "sections": [
      {
        "id": "assign",
        "title": "Plain Assignment Replaces a Value",
        "paragraphs": [
          "With a mutable var, = assigns a value. A later assignment replaces the old value without adding to it.",
          "In the Explore example, temperature begins at 20 and is assigned 25. The printed value is 25, not 45.",
          "The declaration supplies the initial value, and the following assignment writes a new one to the same variable. A val would not permit that later reassignment.",
          "Compare = with compound assignment: the latter explicitly uses the prior value in a calculation before storing the result."
        ],
        "codeSnippet": {
          "title": "Plain assignment with =",
          "language": "Kotlin",
          "code": [
            "var temperature = 20",
            "temperature = 25",
            "println(temperature)"
          ],
          "explanation": "The variable now holds 25, with no reference to its old value.",
          "output": "25"
        }
      },
      {
        "id": "add-subtract",
        "title": "Add or Subtract and Store",
        "paragraphs": [
          "+= adds the right operand to the current value and stores the result; -= subtracts it and stores the result.",
          "With coins starting at 100, coins += 50 makes 150. Health starting at 80 becomes 50 after health -= 30.",
          "Each operation is shorthand: x += y has the same intended update as x = x + y in this lesson. The variable therefore needs to be a var.",
          "Follow multiple updates in order. Each line begins with the value left by the preceding line."
        ],
        "codeSnippet": {
          "title": "Adding with +=",
          "language": "Kotlin",
          "code": [
            "var coins = 100",
            "coins += 50",
            "println(coins)"
          ],
          "explanation": "coins went from 100 to 150 in a single compact step.",
          "output": "150"
        }
      },
      {
        "id": "multiply-divide",
        "title": "Multiply or Divide and Store",
        "paragraphs": [
          "*= and /= update a variable using multiplication or division respectively. The examples turn multiplier 3 into 12 with *= 4, and pool 20 into 5 with /= 4.",
          "These forms are shorter than writing the variable name on both sides of =. Their numeric meaning comes from the arithmetic operator before the equals sign.",
          "The source also multiplies a Double total 10.0 by 1.5 with *=, producing 15.0. Compound assignment is not restricted to Int in this lesson.",
          "Use the current stored value as the left side of each calculation, then store the calculated result back."
        ],
        "codeSnippet": {
          "title": "Multiplying with *=",
          "language": "Kotlin",
          "code": [
            "var multiplier = 3",
            "multiplier *= 4",
            "println(multiplier)"
          ],
          "explanation": "multiplier grew from 3 to 12.",
          "output": "12"
        }
      },
      {
        "id": "remainder-string",
        "title": "Remainder Updates and String +=",
        "paragraphs": [
          "%= replaces a numeric value with its remainder on division by the right operand. The Explore example turns 17 into 2 with remainder %= 5.",
          "The same section of source shows += joining Strings. Starting from \"Hello\", message += \", World!\" builds \"Hello, World!\".",
          "The operator’s effect depends on the values it is applied to: += can add numbers or append text in the examples. Both update the existing var.",
          "Check whether the value is numeric or a String before describing the result."
        ],
        "codeSnippet": {
          "title": "+= on a String",
          "language": "Kotlin",
          "code": [
            "var message = \"Hello\"",
            "message += \", World!\"",
            "println(message)"
          ],
          "explanation": "Used += to build up a String, one of the most common real-world uses of compound assignment.",
          "output": "Hello, World!"
        }
      },
      {
        "id": "mutable",
        "title": "Compound Assignment Needs var",
        "paragraphs": [
          "Every compound update reassigns the variable. That means a declaration with val cannot be the target of +=, -=, *=, /=, or %=.",
          "Choosing val is appropriate for a fixed value, but the wallet challenge calls for successive changes and therefore declares var.",
          "When the compiler says a val cannot be reassigned, inspect whether a compound operator later tries to change it.",
          "This lesson concentrates on updates of arbitrary amounts; the next lesson treats the special one-step ++ and -- forms."
        ],
        "codeSnippet": {
          "title": "Subtracting with -=",
          "language": "Kotlin",
          "code": [
            "var health = 80",
            "health -= 30",
            "println(health)"
          ],
          "explanation": "health went from 80 down to 50.",
          "output": "50"
        }
      },
      {
        "id": "wallet",
        "title": "Write & Run: Wallet Balance",
        "paragraphs": [
          "Start with var wallet = 200. Apply wallet += 75 to reach 275, then wallet -= 50 to reach 225.",
          "Print wallet after both updates. The expected output is 225.",
          "Using = 75 would replace the entire balance, so it would not mean “add 75.” The task specifically requires the compound forms.",
          "Keep wallet mutable and trace each update in the order the program executes."
        ],
        "codeSnippet": {
          "title": "Update a Wallet Balance",
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    var wallet = 200",
            "    wallet += 75",
            "    wallet -= 50",
            "    println(wallet)",
            "}"
          ],
          "explanation": "This follows the challenge requirements in the five-stage lesson.",
          "output": "225"
        }
      },
      {
        "id": "mutable-total",
        "title": "Debug: Read-Only Total",
        "paragraphs": [
          "The broken program declares val total = 100 and then uses total -= 20. A compound assignment updates total and therefore requires a mutable declaration.",
          "Change val to var while keeping the subtraction. The program can now print 80.",
          "This is a compilation failure rather than a mistaken arithmetic answer. Changing the result alone would not make the reassignment legal.",
          "The repaired code expresses the intended update with the same -= operator."
        ],
        "comparison": {
          "leftTitle": "Broken program",
          "leftCode": [
            "fun main() {",
            "    val total = 100",
            "    total -= 20",
            "    println(total)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired program",
          "rightCode": [
            "fun main() {",
            "    var total = 100",
            "    total -= 20",
            "    println(total)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "total -= 20 is shorthand for total = total - 20, which reassigns total. Since total was declared with val, it must be changed to var before the compound assignment is legal."
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Using = when the old numeric value must be retained",
        "whyItFails": "= replaces the value instead of adding to it.",
        "correction": "Use += for an increase relative to the current amount.",
        "badCode": [
          "var credits = 30",
          "credits = 10"
        ],
        "fixedCode": [
          "var credits = 30",
          "credits += 10"
        ]
      },
      {
        "mistake": "Applying two updates as though both use the original value",
        "whyItFails": "Each compound assignment changes the stored value used by the next line.",
        "correction": "Trace updates one at a time from the current result.",
        "badCode": [
          "var points = 6",
          "points *= 2",
          "points += 3",
          "// Incorrect expectation: 6 + 3"
        ],
        "fixedCode": [
          "var points = 6",
          "points *= 2",
          "points += 3",
          "println(points) // 15"
        ]
      },
      {
        "mistake": "Treating %= as an ordinary percentage calculation",
        "whyItFails": "It stores the remainder of division, not a percent of a total.",
        "correction": "Read %= as value = value % divisor.",
        "badCode": [
          "var tokens = 22",
          "tokens %= 6",
          "// Incorrect expectation: 22% of 6"
        ],
        "fixedCode": [
          "var tokens = 22",
          "tokens %= 6",
          "println(tokens) // 4"
        ]
      },
      {
        "mistake": "Trying to append text to a val with +=",
        "whyItFails": "Appending with += reassigns the String variable just as numeric += does.",
        "correction": "Declare the changing message as var.",
        "badCode": [
          "val greeting = \"Hi\"",
          "greeting += \" there\""
        ],
        "fixedCode": [
          "var greeting = \"Hi\"",
          "greeting += \" there\""
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Assign",
        "syntax": "x = y",
        "description": "Replace a mutable variable’s value."
      },
      {
        "term": "Increase",
        "syntax": "x += y",
        "description": "Store x + y."
      },
      {
        "term": "Decrease",
        "syntax": "x -= y",
        "description": "Store x - y."
      },
      {
        "term": "Multiply update",
        "syntax": "x *= y",
        "description": "Store x * y."
      },
      {
        "term": "Divide update",
        "syntax": "x /= y",
        "description": "Store x / y."
      },
      {
        "term": "Remainder update",
        "syntax": "x %= y",
        "description": "Store x % y."
      },
      {
        "term": "String append",
        "syntax": "message += \"!\"",
        "description": "Append text to a mutable String variable."
      }
    ],
    "quiz": [
      {
        "id": "world2-tutorial-4-1",
        "question": "If var gems = 8 and gems += 4, what is gems?",
        "options": [
          "4",
          "8",
          "12",
          "32"
        ],
        "correctIndex": 2,
        "explanation": "+= adds four to the existing eight."
      },
      {
        "id": "world2-tutorial-4-2",
        "question": "If var fuel = 18 and fuel /= 3, what is printed?",
        "options": [
          "6",
          "15",
          "21",
          "54"
        ],
        "correctIndex": 0,
        "explanation": "/= divides the stored value and saves six."
      },
      {
        "id": "world2-tutorial-4-3",
        "question": "What does var n = 14; n %= 5 leave in n?",
        "options": [
          "2",
          "4",
          "5",
          "14"
        ],
        "correctIndex": 1,
        "explanation": "Four remains after dividing fourteen by five."
      },
      {
        "id": "world2-tutorial-4-4",
        "question": "Can a val be updated with *=?",
        "options": [
          "Yes, always",
          "Only for Double",
          "No, it reassigns",
          "Only for String"
        ],
        "correctIndex": 2,
        "explanation": "Every compound assignment changes the variable."
      }
    ]
  },
  {
    "lessonId": "world-2-increment-decrement",
    "aliasKeys": [],
    "worldNumber": 2,
    "lessonNumber": 5,
    "title": "Increment & Decrement",
    "subtitle": "Increment and Decrement Operators",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Kotlin gives you two shorthand operators for adjusting a variable by exactly 1: ++ (increment) and -- (decrement).\nBoth come in a prefix form (++x) and a postfix form (x++).\nBoth only work on a mutable var, never on a read-only val.",
    "toc": [
      {
        "id": "one-step",
        "label": "++ and -- Change a var by One"
      },
      {
        "id": "repeated",
        "label": "Trace Repeated Updates in Sequence"
      },
      {
        "id": "standalone",
        "label": "Prefix and Postfix as Statements"
      },
      {
        "id": "captured-postfix",
        "label": "Postfix Produces the Old Expression Value"
      },
      {
        "id": "captured-prefix",
        "label": "Prefix Produces the New Expression Value"
      },
      {
        "id": "lives-counter",
        "label": "Write & Run: Track Lives"
      },
      {
        "id": "locked-counter",
        "label": "Debug: Incrementing val"
      },
      {
        "id": "gotchas",
        "label": "Gotchas"
      },
      {
        "id": "cheatsheet",
        "label": "Cheatsheet"
      },
      {
        "id": "quiz",
        "label": "Quiz"
      }
    ],
    "sections": [
      {
        "id": "one-step",
        "title": "++ and -- Change a var by One",
        "paragraphs": [
          "++ increments its variable by exactly one and -- decrements it by exactly one. The operators are concise forms for repeated one-step changes.",
          "In the source’s count example, count begins at 5 and count++ makes it 6. In the lives example, lives begins at 3 and lives-- makes it 2.",
          "These operators change stored state. Use a mutable var; the lesson explicitly rejects applying either operator to a val.",
          "For an update by a larger amount, the previous assignment lesson covers operators such as +=. This lesson concentrates on one-step increments and decrements."
        ],
        "codeSnippet": {
          "title": "Postfix increment",
          "language": "Kotlin",
          "code": [
            "var count = 5",
            "count++",
            "println(count)"
          ],
          "explanation": "We used the shorthand ++ instead of writing count = count + 1.",
          "output": "6"
        }
      },
      {
        "id": "repeated",
        "title": "Trace Repeated Updates in Sequence",
        "paragraphs": [
          "Several ++ and -- statements apply in written order, each starting from the value left by the preceding statement.",
          "The Explore example starts attempts at zero, increments twice to two, then decrements once to one.",
          "Keep a running value when predicting output. A pair of increments followed by one decrement has a net effect of adding one, but tracing each step makes errors less likely.",
          "The Write & Run challenge applies the same pattern to lives and asks for a formatted final output."
        ],
        "codeSnippet": {
          "title": "Repeated increments",
          "language": "Kotlin",
          "code": [
            "var attempts = 0",
            "attempts++",
            "attempts++",
            "attempts--",
            "println(attempts)"
          ],
          "explanation": "Chained several increment/decrement steps to track changing state.",
          "output": "1"
        }
      },
      {
        "id": "standalone",
        "title": "Prefix and Postfix as Statements",
        "paragraphs": [
          "Both count++ and ++count change count by one. When either is used as its own statement, a later println sees the same final variable value.",
          "The source demonstrates ++score on a separate line: score begins at 10 and later prints 11. The placement of ++ does not change that final stored result.",
          "The distinction matters only when the ++ or -- expression itself supplies a value to another expression or declaration.",
          "Do not infer that prefix adds more than one or postfix waits until the end of the entire program. Both update the variable."
        ],
        "codeSnippet": {
          "title": "Prefix increment",
          "language": "Kotlin",
          "code": [
            "var score = 10",
            "++score",
            "println(score)"
          ],
          "explanation": "Moved ++ before the variable name -- as its own statement, the effect is identical.",
          "output": "11"
        }
      },
      {
        "id": "captured-postfix",
        "title": "Postfix Produces the Old Expression Value",
        "paragraphs": [
          "When a postfix expression is captured, it yields the value before the increment while the variable still changes.",
          "The source sets count = 5 and stores val old = count++. The old variable receives 5, and a later read of count gives 6.",
          "This separates two values that are easy to conflate: the result of the postfix expression and the updated value held by the mutable variable.",
          "Write them on separate lines when tracing: first the captured old value, then the new variable value."
        ],
        "codeSnippet": {
          "title": "Prefix vs postfix as an expression value",
          "language": "Kotlin",
          "code": [
            "var count = 5",
            "val old = count++",
            "println(old)",
            "println(count)"
          ],
          "explanation": "Captured the value a postfix ++ returns, which is the OLD value -- unlike the variable itself, which still ends up incremented.",
          "output": "5\n6"
        }
      },
      {
        "id": "captured-prefix",
        "title": "Prefix Produces the New Expression Value",
        "paragraphs": [
          "With prefix ++count, Kotlin increments the variable before the expression yields its value. Capturing it stores the updated number.",
          "In the source, count starts at 5 and val fresh = ++count makes both fresh and count equal to 6.",
          "Compare this with the preceding postfix section: the final mutable count becomes six in both examples, but the separately captured value differs.",
          "Use the location of ++ relative to the name to decide which value the expression contributes."
        ],
        "codeSnippet": {
          "title": "Prefix as an expression value",
          "language": "Kotlin",
          "code": [
            "var count = 5",
            "val fresh = ++count",
            "println(fresh)",
            "println(count)"
          ],
          "explanation": "Showed the real reason prefix vs postfix matters: only when the ++/-- expression's own result is captured, not when it's used as its own standalone statement.",
          "output": "6\n6"
        }
      },
      {
        "id": "lives-counter",
        "title": "Write & Run: Track Lives",
        "paragraphs": [
          "Declare var lives = 3, increment twice, and decrement once. The sequence goes 3 → 4 → 5 → 4.",
          "Print the final number in the requested String template. The visible result is Lives: 4.",
          "All three operators update the same mutable variable; do not create a fresh declaration for every step.",
          "Because the operator calls are standalone statements here, prefix versus postfix would not change the final stored value, though the source solution uses postfix."
        ],
        "codeSnippet": {
          "title": "Track a Lives Counter",
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    var lives = 3",
            "    lives++",
            "    lives++",
            "    lives--",
            "    println(\"Lives: $lives\")",
            "}"
          ],
          "explanation": "This follows the challenge requirements in the five-stage lesson.",
          "output": "Lives: 4"
        }
      },
      {
        "id": "locked-counter",
        "title": "Debug: Incrementing val",
        "paragraphs": [
          "The broken code declares lives with val and later tries lives++. The increment is a reassignment, which the read-only declaration forbids.",
          "Change only that declaration to var so the one-step update is allowed. The repaired program prints Lives: 4.",
          "The error is caught by the compiler. The ++ operation itself is otherwise the intended action.",
          "This repeats the mutability rule in the specific context of increment and decrement."
        ],
        "comparison": {
          "leftTitle": "Broken program",
          "leftCode": [
            "fun main() {",
            "    // BUG: lives is declared with val, but incremented below!",
            "    val lives = 3",
            "    lives++",
            "    println(\"Lives: $lives\")",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired program",
          "rightCode": [
            "fun main() {",
            "    var lives = 3",
            "    lives++",
            "    println(\"Lives: $lives\")",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "The ++ operator increments a variable by reassigning it, just like lives = lives + 1 would.\n\nSince lives was declared with val, this reassignment produces a compile error: \"Val cannot be reassigned\".\n\nChanging val to var allows lives++ to run, taking lives from 3 to 4."
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Expecting two ++ statements to count as only one update",
        "whyItFails": "Each statement changes the variable separately.",
        "correction": "Trace each one-step change in source order.",
        "badCode": [
          "var rounds = 1",
          "rounds++",
          "rounds++",
          "// Incorrect expectation: 2"
        ],
        "fixedCode": [
          "var rounds = 1",
          "rounds++",
          "rounds++",
          "println(rounds) // 3"
        ]
      },
      {
        "mistake": "Thinking prefix and postfix leave different final values when standalone",
        "whyItFails": "Both forms increment the stored var once; only the expression result differs when captured.",
        "correction": "Compare their later variable values separately from captured expression results.",
        "badCode": [
          "var a = 7",
          "a++",
          "var b = 7",
          "++b",
          "// Incorrect expectation: a != b"
        ],
        "fixedCode": [
          "var a = 7",
          "a++",
          "var b = 7",
          "++b",
          "println(a == b) // true"
        ]
      },
      {
        "mistake": "Using the updated value when capturing a postfix expression",
        "whyItFails": "Postfix yields the previous value to the new variable, although the original var updates.",
        "correction": "Track the captured result and the mutable variable as two separate values.",
        "badCode": [
          "var badges = 9",
          "val before = badges++",
          "// Incorrect expectation: before is 10"
        ],
        "fixedCode": [
          "var badges = 9",
          "val before = badges++",
          "println(before) // 9",
          "println(badges) // 10"
        ]
      },
      {
        "mistake": "Attempting -- on a read-only value",
        "whyItFails": "Decrement updates the variable and therefore requires var.",
        "correction": "Make the counter mutable if it must change.",
        "badCode": [
          "val retries = 4",
          "retries--"
        ],
        "fixedCode": [
          "var retries = 4",
          "retries--"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Increment",
        "syntax": "x++",
        "description": "Add one to a mutable x."
      },
      {
        "term": "Decrement",
        "syntax": "x--",
        "description": "Subtract one from a mutable x."
      },
      {
        "term": "Prefix increment",
        "syntax": "++x",
        "description": "Increment first; the expression yields the new value."
      },
      {
        "term": "Postfix increment",
        "syntax": "x++",
        "description": "The expression yields the old value, then x has the new value."
      },
      {
        "term": "Mutable requirement",
        "syntax": "var x = 1",
        "description": "++ and -- reassign the variable."
      }
    ],
    "quiz": [
      {
        "id": "world2-tutorial-5-1",
        "question": "Starting at 4, what follows two standalone increments?",
        "options": [
          "4",
          "5",
          "6",
          "8"
        ],
        "correctIndex": 2,
        "explanation": "Each increment adds exactly one."
      },
      {
        "id": "world2-tutorial-5-2",
        "question": "If var n = 8; val earlier = n++; what is earlier?",
        "options": [
          "8",
          "9",
          "7",
          "An error"
        ],
        "correctIndex": 0,
        "explanation": "Postfix yields the previous value to the captured expression."
      },
      {
        "id": "world2-tutorial-5-3",
        "question": "If var n = 8; val later = ++n; what is later?",
        "options": [
          "7",
          "8",
          "9",
          "An error"
        ],
        "correctIndex": 2,
        "explanation": "Prefix yields the updated value."
      },
      {
        "id": "world2-tutorial-5-4",
        "question": "Can -- update a val?",
        "options": [
          "Yes",
          "Only if positive",
          "No",
          "Only as a statement"
        ],
        "correctIndex": 2,
        "explanation": "Decrement is a reassignment and needs var."
      }
    ]
  },
  {
    "lessonId": "world-2-operator-precedence",
    "aliasKeys": [],
    "worldNumber": 2,
    "lessonNumber": 6,
    "title": "Operator Precedence",
    "subtitle": "Operator Precedence",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "When an expression mixes several kinds of operators, Kotlin does not evaluate them left-to-right -- it follows a fixed order: * / % run first, then + -, then comparisons (== != < > <= >=), then &&, and finally ||. Parentheses always override this default order.",
    "toc": [
      {
        "id": "arithmetic",
        "label": "Arithmetic Levels of Precedence"
      },
      {
        "id": "compare",
        "label": "Arithmetic, Then Comparison"
      },
      {
        "id": "logical",
        "label": "AND Before OR"
      },
      {
        "id": "parentheses",
        "label": "Parentheses Set a Different Grouping"
      },
      {
        "id": "calculate-and-qualify",
        "label": "Write & Run: Total and Qualification"
      },
      {
        "id": "alarm-group",
        "label": "Debug: Alarm Needs an Armed System"
      },
      {
        "id": "gotchas",
        "label": "Gotchas"
      },
      {
        "id": "cheatsheet",
        "label": "Cheatsheet"
      },
      {
        "id": "quiz",
        "label": "Quiz"
      }
    ],
    "sections": [
      {
        "id": "arithmetic",
        "title": "Arithmetic Levels of Precedence",
        "paragraphs": [
          "When operators mix in one expression, Kotlin uses a defined ordering rather than blindly evaluating every symbol from left to right. Among the arithmetic forms here, * / and % bind before + and -.",
          "In 2 + 3 * 4, multiplication makes twelve first and addition then makes fourteen. Reading the expression as (2 + 3) * 4 would yield twenty, which is a different expression.",
          "This hierarchy matters whenever a formula mixes operators. A prior lesson briefly showed multiplication before addition; this lesson brings the whole operator order together.",
          "Identify the highest-priority operations, calculate them, and then move to the lower-priority operations."
        ],
        "codeSnippet": {
          "title": "Multiplication before addition",
          "language": "Kotlin",
          "code": [
            "val total = 2 + 3 * 4",
            "println(total)"
          ],
          "explanation": "Reading left-to-right would wrongly suggest (2 + 3) * 4 = 20 -- the real result is 14.",
          "output": "14"
        }
      },
      {
        "id": "compare",
        "title": "Arithmetic, Then Comparison",
        "paragraphs": [
          "After arithmetic is evaluated, comparison operators such as >, <, ==, !=, <=, and >= yield Boolean results.",
          "The Learn example calculates score = 5 + 3 * 2 as 11; score > 10 is then true. A later && can combine that comparison with another Boolean.",
          "In the source’s x > 5 && y + 2 == 5 example, first find y + 2, then evaluate both comparisons, then combine the Boolean values.",
          "Keep numeric intermediate results separate from Boolean comparison results. Comparisons do not return the operands themselves."
        ],
        "codeSnippet": {
          "title": "Comparisons before &&",
          "language": "Kotlin",
          "code": [
            "val ok = 5 > 3 && 2 < 1",
            "println(ok)"
          ],
          "explanation": "Both comparisons finish before && ever runs, so the expression is really (5 > 3) && (2 < 1).",
          "output": "false"
        }
      },
      {
        "id": "logical",
        "title": "AND Before OR",
        "paragraphs": [
          "After comparisons, && groups before ||. The expression a || b && c means a || (b && c) under the default order.",
          "The Explore access example uses hasPass = false, isVip = true, and isOpen = false; the grouped AND is false, then the OR is false.",
          "This relationship appeared within the Logical Operators lesson. Here it is one part of the broader precedence ladder that also includes arithmetic and comparisons.",
          "Do not assume OR takes a whole left-hand credential group unless parentheses explicitly put that group together."
        ],
        "codeSnippet": {
          "title": "&& before ||",
          "language": "Kotlin",
          "code": [
            "val hasPass = false",
            "val isVip = true",
            "val isOpen = false",
            "val canEnter = hasPass || isVip && isOpen",
            "println(canEnter)"
          ],
          "explanation": "The expression is really hasPass || (isVip && isOpen), not (hasPass || isVip) && isOpen.",
          "output": "false"
        }
      },
      {
        "id": "parentheses",
        "title": "Parentheses Set a Different Grouping",
        "paragraphs": [
          "Parentheses override default precedence for the grouped portion. The source compares 2 + 3 * 4 with (2 + 3) * 4.",
          "The first prints 14; the second prints 20. The numbers and operators are identical, but the parentheses change the order in which their operations are applied.",
          "Parentheses also express logical requirements clearly: (doorOpen || windowOpen) && isArmed first checks whether any entrance is open, then requires an armed system.",
          "Add parentheses when the intended rule differs from the default grouping; they make the exact operation order visible to a reader."
        ],
        "codeSnippet": {
          "title": "Parentheses override the default",
          "language": "Kotlin",
          "code": [
            "val withoutParens = 2 + 3 * 4",
            "val withParens = (2 + 3) * 4",
            "println(withoutParens)",
            "println(withParens)"
          ],
          "explanation": "The same two numbers and operators produce a different result -- 14 vs 20 -- purely because of parentheses.",
          "output": "14\n20"
        }
      },
      {
        "id": "calculate-and-qualify",
        "title": "Write & Run: Total and Qualification",
        "paragraphs": [
          "Set itemPrice = 25, itemCount = 4, hasCoupon = true, and isMember = false as in the challenge.",
          "Multiply itemPrice * itemCount to obtain total = 100. Print this number first.",
          "Next evaluate itemCount > 3 && hasCoupon || isMember. The comparison is true, the AND remains true, and the final OR with false stays true.",
          "The expected two output lines are 100 and true. They exercise arithmetic, comparison, and logical operators in sequence."
        ],
        "codeSnippet": {
          "title": "Checkout Totals",
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val itemPrice = 25",
            "    val itemCount = 4",
            "    val hasCoupon = true",
            "    val isMember = false",
            "    val total = itemPrice * itemCount",
            "    println(total)",
            "    val qualifies = itemCount > 3 && hasCoupon || isMember",
            "    println(qualifies)",
            "}"
          ],
          "explanation": "This follows the challenge requirements in the five-stage lesson.",
          "output": "100\ntrue"
        }
      },
      {
        "id": "alarm-group",
        "title": "Debug: Alarm Needs an Armed System",
        "paragraphs": [
          "The broken rule doorOpen || windowOpen && isArmed groups && first. A true doorOpen can therefore make the OR true despite isArmed being false.",
          "The requirement instead says that the alarm rings only if either opening is open AND the system is armed. Write (doorOpen || windowOpen) && isArmed.",
          "With the source’s true door, false window, and false armed flag, the repaired result prints false.",
          "The flags themselves are not mistaken. Change how the expression groups the two opening conditions with the armed requirement."
        ],
        "comparison": {
          "leftTitle": "Broken program",
          "leftCode": [
            "fun main() {",
            "    val doorOpen = true",
            "    val windowOpen = false",
            "    val isArmed = false",
            "    // BUG: alarm should ring only if (a door or window is open) AND the system is armed",
            "    val alarmShouldRing = doorOpen || windowOpen && isArmed",
            "    println(alarmShouldRing)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired program",
          "rightCode": [
            "fun main() {",
            "    val doorOpen = true",
            "    val windowOpen = false",
            "    val isArmed = false",
            "    val alarmShouldRing = (doorOpen || windowOpen) && isArmed",
            "    println(alarmShouldRing)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "Without parentheses, doorOpen || windowOpen && isArmed is parsed as doorOpen || (windowOpen && isArmed) because && outranks ||. With doorOpen = true, windowOpen = false, isArmed = false, that becomes true || (false && false) = true || false = true -- the alarm rings even though the system is disarmed. Adding parentheses to force (doorOpen || windowOpen) && isArmed changes the grouping: (true || false) && false = true && false = false, correctly keeping the alarm silent whenever isArmed is false."
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Reading an arithmetic expression strictly left to right",
        "whyItFails": "Multiplication and division group before addition and subtraction unless parentheses intervene.",
        "correction": "Evaluate higher-priority arithmetic first.",
        "badCode": [
          "val result = 6 + 2 * 5",
          "// Incorrect expectation: 40"
        ],
        "fixedCode": [
          "val result = 6 + 2 * 5",
          "println(result) // 16"
        ]
      },
      {
        "mistake": "Combining numbers with a logical operator before comparing them",
        "whyItFails": "The arithmetic expression produces a number and comparisons produce the Boolean operands required by &&.",
        "correction": "Work through arithmetic, comparison, then the logical combination.",
        "badCode": [
          "val valid = 4 + 2 > 5 && 3 * 2 < 8",
          "// Incorrect expectation: 4 + 2 is directly an AND operand"
        ],
        "fixedCode": [
          "val valid = (4 + 2 > 5) && (3 * 2 < 8)",
          "println(valid) // true"
        ]
      },
      {
        "mistake": "Assuming OR groups before AND by default",
        "whyItFails": "&& has higher precedence, so an expression with both can group differently from the intended access rule.",
        "correction": "Add parentheses when the OR condition must be checked as a unit.",
        "badCode": [
          "val premium = true",
          "val trial = false",
          "val active = false",
          "val allowed = premium || trial && active"
        ],
        "fixedCode": [
          "val premium = true",
          "val trial = false",
          "val active = false",
          "val allowed = (premium || trial) && active"
        ]
      },
      {
        "mistake": "Adding parentheses without checking their effect",
        "whyItFails": "Parentheses actively change which calculation occurs first, sometimes changing the result.",
        "correction": "Compare the grouped formula with the required mathematical meaning.",
        "badCode": [
          "val price = (12 + 4) * 3 // 48"
        ],
        "fixedCode": [
          "val price = 12 + 4 * 3 // 24"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "First arithmetic tier",
        "syntax": "* / %",
        "description": "Evaluated before + and -."
      },
      {
        "term": "Second arithmetic tier",
        "syntax": "+ -",
        "description": "Evaluated after * / %."
      },
      {
        "term": "Then comparisons",
        "syntax": "== != < > <= >=",
        "description": "Produce Booleans before logical operators."
      },
      {
        "term": "Then AND",
        "syntax": "&&",
        "description": "Binds more tightly than ||."
      },
      {
        "term": "Finally OR",
        "syntax": "||",
        "description": "Binds after &&."
      },
      {
        "term": "Override",
        "syntax": "(...)",
        "description": "Parentheses force their group to be evaluated first."
      }
    ],
    "quiz": [
      {
        "id": "world2-tutorial-6-1",
        "question": "What is 7 + 2 * 3?",
        "options": [
          "27",
          "13",
          "21",
          "9"
        ],
        "correctIndex": 1,
        "explanation": "Multiply two by three first, then add seven."
      },
      {
        "id": "world2-tutorial-6-2",
        "question": "What is (7 + 2) * 3?",
        "options": [
          "13",
          "21",
          "27",
          "9"
        ],
        "correctIndex": 2,
        "explanation": "Parentheses make seven plus two happen before multiplication."
      },
      {
        "id": "world2-tutorial-6-3",
        "question": "What groups first in p || q && r?",
        "options": [
          "p || q",
          "q && r",
          "Both together",
          "No grouping"
        ],
        "correctIndex": 1,
        "explanation": "AND binds tighter than OR."
      },
      {
        "id": "world2-tutorial-6-4",
        "question": "Which operator tier comes immediately before logical AND?",
        "options": [
          "Comparisons",
          "OR",
          "Assignment",
          "Parentheses"
        ],
        "correctIndex": 0,
        "explanation": "After arithmetic, comparisons yield the Boolean operands combined by AND."
      }
    ]
  },
  {
    "lessonId": "world-2-boss",
    "aliasKeys": [],
    "worldNumber": 2,
    "lessonNumber": 7,
    "title": "Smart Calculator",
    "subtitle": "World 2 Boss: Smart Calculator",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Congratulations on reaching the World 2 Boss! You will now combine everything you learned in Operator Forge -- arithmetic, comparisons, logical conditions, assignment, increment/decrement, and precedence -- into a single working program.",
    "toc": [
      {
        "id": "integrate",
        "label": "Assemble the Operator Skills"
      },
      {
        "id": "running-total",
        "label": "Track a Running Total"
      },
      {
        "id": "eligibility",
        "label": "Turn Calculations Into Decisions"
      },
      {
        "id": "state-precedence",
        "label": "Precedence and a Countdown"
      },
      {
        "id": "smart-calculator",
        "label": "Write & Run: Smart Calculator"
      },
      {
        "id": "bonus-rule",
        "label": "Debug: Bonus Requires Both Parts"
      },
      {
        "id": "gotchas",
        "label": "Gotchas"
      },
      {
        "id": "cheatsheet",
        "label": "Cheatsheet"
      },
      {
        "id": "quiz",
        "label": "Quiz"
      }
    ],
    "sections": [
      {
        "id": "integrate",
        "title": "Assemble the Operator Skills",
        "paragraphs": [
          "The boss lesson combines arithmetic, comparison, logical operations, assignment, increment or decrement, and precedence in one program. Each operation has already been taught separately in this world.",
          "The introductory example updates a mutable balance, multiplies price by quantity for a total, and checks whether the balance can afford a positive total.",
          "Observe how the calculation feeds the later decision: the Boolean comparison depends on the numeric value produced earlier.",
          "This lesson assesses whether you can carry values through several stages rather than memorize one isolated operator."
        ],
        "callout": {
          "type": "key",
          "title": "Integration",
          "message": "Follow state updates, calculate totals, then evaluate conditions using the final values."
        }
      },
      {
        "id": "running-total",
        "title": "Track a Running Total",
        "paragraphs": [
          "The Explore cart starts at zero, adds 25, then adds 40. Both += updates affect the same mutable variable, leaving cart at 65.",
          "The boss example also updates a balance upward and downward before comparing it against a purchase total. Reading the initial value alone would give the wrong eligibility decision.",
          "For multiple updates, record the value after each line rather than treating every operation as though it starts from the declaration.",
          "The final challenge likewise builds total from two separate additions before computing its budget comparison."
        ],
        "codeSnippet": {
          "title": "Tracking a running total",
          "language": "Kotlin",
          "code": [
            "var cart = 0",
            "cart += 25",
            "cart += 40",
            "println(cart)"
          ],
          "explanation": "Used += repeatedly to build up a total instead of one single assignment.",
          "output": "65"
        }
      },
      {
        "id": "eligibility",
        "title": "Turn Calculations Into Decisions",
        "paragraphs": [
          "The source combines age >= 18 with hasId using &&. Both requirements hold for age 20 and hasId true, so canBuy is true.",
          "Another example calculates price * quantity before checking total <= budget. The comparison produces a Boolean, not the numeric total itself.",
          "Follow the dependency order: first determine numeric amounts, then apply thresholds, then combine any Boolean requirements.",
          "The capstone’s Smart Calculator exercises these steps in a small, readable console program."
        ],
        "codeSnippet": {
          "title": "Deciding eligibility with comparison + logical",
          "language": "Kotlin",
          "code": [
            "val age = 20",
            "val hasId = true",
            "val canBuy = age >= 18 && hasId",
            "println(canBuy)"
          ],
          "explanation": "Combined a relational comparison with a logical AND to produce one eligibility decision.",
          "output": "true"
        }
      },
      {
        "id": "state-precedence",
        "title": "Precedence and a Countdown",
        "paragraphs": [
          "The Explore score uses base + bonus * multiplier. Multiplication happens before addition, making 50 + 10 * 2 equal 70.",
          "A separate attempt counter begins at three and uses -- twice, leaving one attempt. Each decrement changes a mutable state value.",
          "These examples mix two skills from earlier lessons: work out operator grouping for the score, then follow sequential updates for the counter.",
          "When several skills occur together, solve each local expression and state change before predicting the final printed text."
        ],
        "codeSnippet": {
          "title": "Precedence in a real formula",
          "language": "Kotlin",
          "code": [
            "val base = 50",
            "val bonus = 10",
            "val multiplier = 2",
            "val score = base + bonus * multiplier",
            "println(score)"
          ],
          "explanation": "Applied precedence rules inside a realistic scoring formula.",
          "output": "70"
        }
      },
      {
        "id": "smart-calculator",
        "title": "Write & Run: Smart Calculator",
        "paragraphs": [
          "Declare total = 0 as a var, then apply += 45 and += 30. The updated total is 75.",
          "Compare that total against budget = 100 with total <= budget. The withinBudget Boolean is true. Declare attempts = 0 as var and increment once to one.",
          "The program prints each value on its own line: Total: 75, Within budget: true, and Attempts: 1.",
          "The sequence matters because the budget check uses the final total. The output formatting uses the same String template pattern the source supplies."
        ],
        "codeSnippet": {
          "title": "Build the Smart Calculator",
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    var total = 0",
            "    total += 45",
            "    total += 30",
            "    val budget = 100",
            "    val withinBudget = total <= budget",
            "    var attempts = 0",
            "    attempts++",
            "    println(\"Total: $total\")",
            "    println(\"Within budget: $withinBudget\")",
            "    println(\"Attempts: $attempts\")",
            "}"
          ],
          "explanation": "This follows the challenge requirements in the five-stage lesson.",
          "output": "Total: 75\nWithin budget: true\nAttempts: 1"
        }
      },
      {
        "id": "bonus-rule",
        "title": "Debug: Bonus Requires Both Parts",
        "paragraphs": [
          "The broken expression is score >= 80 && isVip || bigSpender. Default precedence reads it as (score >= 80 && isVip) || bigSpender.",
          "Because bigSpender is true, this incorrectly grants a bonus even when the score is only 60. The intended rule requires a high score AND one of the two statuses.",
          "Change the expression to score >= 80 && (isVip || bigSpender). Since 60 does not meet 80, the corrected output is false.",
          "The repair uses parentheses to encode the actual business rule. Changing the sample score or flags would hide the faulty grouping rather than fix it."
        ],
        "comparison": {
          "leftTitle": "Broken program",
          "leftCode": [
            "fun main() {",
            "    val score = 60",
            "    val isVip = false",
            "    val bigSpender = true",
            "    // BUG: bonus requires a high score AND (being VIP or a big spender)",
            "    val bonusEligible = score >= 80 && isVip || bigSpender",
            "    println(bonusEligible)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired program",
          "rightCode": [
            "fun main() {",
            "    val score = 60",
            "    val isVip = false",
            "    val bigSpender = true",
            "    val bonusEligible = score >= 80 && (isVip || bigSpender)",
            "    println(bonusEligible)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "Without parentheses, score >= 80 && isVip || bigSpender parses as (score >= 80 && isVip) || bigSpender. With score = 60, isVip = false, bigSpender = true, that becomes (false && false) || true = false || true = true -- a bonus is wrongly granted even though the score is far below 80. Adding parentheses to force score >= 80 && (isVip || bigSpender) changes the grouping to false && (false || true) = false && true = false, correctly withholding the bonus until the score requirement is met."
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Checking affordability before finishing balance updates",
        "whyItFails": "The decision would use an earlier balance instead of the amount available after transactions.",
        "correction": "Update balance first, then compare against the purchase cost.",
        "badCode": [
          "var balance = 50",
          "val canPay = balance >= 65",
          "balance += 20"
        ],
        "fixedCode": [
          "var balance = 50",
          "balance += 20",
          "val canPay = balance >= 65"
        ]
      },
      {
        "mistake": "Treating a repeated unit price as a flat fee",
        "whyItFails": "The numeric total must include the quantity before the budget comparison.",
        "correction": "Calculate unit price times quantity, then compare that total.",
        "badCode": [
          "val unitPrice = 12",
          "val count = 3",
          "val enough = 30 >= unitPrice"
        ],
        "fixedCode": [
          "val unitPrice = 12",
          "val count = 3",
          "val enough = 30 >= unitPrice * count"
        ]
      },
      {
        "mistake": "Ignoring a decrement before printing an attempt count",
        "whyItFails": "The latest stored counter value reflects every preceding -- statement.",
        "correction": "Trace each decrement in source order before formatting the report.",
        "badCode": [
          "var tries = 4",
          "tries--",
          "tries--",
          "// Incorrect expectation: 3"
        ],
        "fixedCode": [
          "var tries = 4",
          "tries--",
          "tries--",
          "println(tries) // 2"
        ]
      },
      {
        "mistake": "Letting an optional status override a mandatory threshold",
        "whyItFails": "Without grouping, || can permit one status regardless of the required numeric check.",
        "correction": "Group the status alternatives after the threshold AND.",
        "badCode": [
          "val points = 4",
          "val premium = false",
          "val invited = true",
          "val eligible = points >= 10 && premium || invited"
        ],
        "fixedCode": [
          "val points = 4",
          "val premium = false",
          "val invited = true",
          "val eligible = points >= 10 && (premium || invited)"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Running balance",
        "syntax": "balance += amount",
        "description": "Apply a deposit to current balance."
      },
      {
        "term": "Item total",
        "syntax": "price * quantity",
        "description": "Calculate total before comparison."
      },
      {
        "term": "Affordability",
        "syntax": "balance >= total",
        "description": "A Boolean threshold check."
      },
      {
        "term": "Two requirements",
        "syntax": "balance >= total && total > 0",
        "description": "Both checks must hold."
      },
      {
        "term": "Attempts",
        "syntax": "attempts--",
        "description": "Count down one step."
      },
      {
        "term": "Grouped alternatives",
        "syntax": "threshold && (a || b)",
        "description": "Require threshold plus either status."
      }
    ],
    "quiz": [
      {
        "id": "world2-tutorial-7-1",
        "question": "If cart starts at 10 and receives += 7 then += 3, what is it?",
        "options": [
          "10",
          "17",
          "20",
          "21"
        ],
        "correctIndex": 2,
        "explanation": "Both updates use the value left by the preceding line."
      },
      {
        "id": "world2-tutorial-7-2",
        "question": "A product costs 11 each and there are three items. Is a budget of 30 sufficient?",
        "options": [
          "Yes, total is 11",
          "Yes, total is 30",
          "No, total is 33",
          "No, total is 44"
        ],
        "correctIndex": 2,
        "explanation": "Eleven times three is thirty-three, above the budget."
      },
      {
        "id": "world2-tutorial-7-3",
        "question": "If attempts starts at 3 and attempts-- runs once, what is printed?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correctIndex": 1,
        "explanation": "One decrement changes three to two."
      },
      {
        "id": "world2-tutorial-7-4",
        "question": "What does a false threshold AND (true OR false) produce?",
        "options": [
          "true",
          "false",
          "null",
          "An error"
        ],
        "correctIndex": 1,
        "explanation": "The grouped OR is true, but the mandatory threshold is false."
      }
    ]
  }
];
