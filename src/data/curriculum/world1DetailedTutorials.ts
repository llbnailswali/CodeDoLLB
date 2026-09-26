import type { DetailedTutorialData } from '../detailedTutorialsData';

// Regenerated Detailed Tutorial content for World 1, produced lesson-by-lesson
// from each lesson's real five-stage source (see TAB_NAME_GENERATION rules in
// the CodeDo_Tab_Names_Review workflow). Replaces the hand-drafted, scope-
// overlapping tutorials previously authored directly in detailedTutorialsData.ts
// for the lessons present here.
//
// Complete World 1 detailed tutorials (all 13 lessons). Word counts exclude code, headings, and overview.
export const WORLD_1_DETAILED_TUTORIALS: DetailedTutorialData[] = [
  {
    "lessonId": "world-1-what-is-kotlin",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 1,
    "title": "What is Kotlin?",
    "subtitle": "Meet Kotlin, its origins, uses, and defining characteristics.",
    "badge": "BEGINNER",
    "readTime": "3 min",
    "overviewSummary": "Kotlin is a modern language created by JetBrains. This lesson identifies its Android milestone, other platforms, static typing, null safety, and Java interoperability. Its sample program is a preview; execution syntax comes next.",
    "toc": [
      {
        "id": "origins",
        "label": "Kotlin and Its Origins"
      },
      {
        "id": "android",
        "label": "Official Android Support"
      },
      {
        "id": "platforms",
        "label": "Where Kotlin Runs"
      },
      {
        "id": "characteristics",
        "label": "Typing, Safety, and Java"
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
        "id": "origins",
        "title": "Kotlin and Its Origins",
        "paragraphs": [
          "Kotlin is a programming language created by JetBrains, the company behind IntelliJ IDEA and other developer tools. JetBrains first released Kotlin in 2011.",
          "Two organizations appear in Kotlin’s history, so keep their roles distinct. JetBrains created the language. Google later gave it official support for Android development. Google did not create Kotlin.",
          "The short program below is only a visual preview of Kotlin source code. Notice its compact layout and the greeting it displays. You do not need to decode fun, main(), or println() here: the next lesson introduces the entry point and visible output.",
          "For now, the aim is to recognize what Kotlin is and where developers use it. Reading a preview does not require you to learn function syntax."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    println(\"Hello, Kotlin!\")",
            "}"
          ],
          "explanation": "A small Kotlin program shown as a preview; its structure is explained in the next lesson.",
          "output": "Hello, Kotlin!"
        }
      },
      {
        "id": "android",
        "title": "Official Android Support",
        "paragraphs": [
          "In 2017, Google declared Kotlin an officially supported language for Android. Android applications are one major use of Kotlin, and Google recommends it as a preferred choice for Android development.",
          "The dates refer to different milestones. The language first appeared in 2011 through JetBrains; official Android support came in 2017 through Google. If asked who created Kotlin, answer JetBrains even though Google supports its Android use.",
          "Being officially supported for Android also does not mean that Android is the only place Kotlin runs. The next section maps the other targets named by this lesson."
        ],
        "callout": {
          "type": "key",
          "title": "Two milestones",
          "message": "JetBrains created Kotlin and first released it in 2011. Google officially supported Kotlin for Android in 2017."
        }
      },
      {
        "id": "platforms",
        "title": "Where Kotlin Runs",
        "paragraphs": [
          "Kotlin reaches beyond Android. It runs on the JVM for backend and server code; it can compile to JavaScript; and it can target native platforms through Kotlin Multiplatform.",
          "The lesson also mentions desktop applications and iOS applications through Kotlin Multiplatform. These are examples of its versatility, not a request to learn how each platform compiles or runs.",
          "When a question offers “only Android” alongside “Android, backend, and more,” choose the broader answer. Android is an important use case, but the language supports several targets."
        ],
        "bulletPoints": [
          {
            "title": "Android",
            "desc": "Officially supported for application development."
          },
          {
            "title": "JVM/backend",
            "desc": "Used for server and backend code."
          },
          {
            "title": "JavaScript",
            "desc": "Can compile to JavaScript."
          },
          {
            "title": "Native/Multiplatform",
            "desc": "Can target native platforms, including the iOS use mentioned here."
          }
        ]
      },
      {
        "id": "characteristics",
        "title": "Typing, Safety, and Java",
        "paragraphs": [
          "Kotlin is statically typed: the types of values are checked before the program runs. This is the level of detail needed for the lesson’s type-system question. Specific Kotlin types and their syntax belong to later lessons.",
          "Its type system is also designed to catch accidental null-related problems early. Here, null safety is a characteristic to recognize; the lesson does not introduce the syntax for nullable values.",
          "Kotlin works with Java in both directions: Kotlin code can call Java code, and Java code can call Kotlin code. This interoperability helped existing Java and Android projects adopt Kotlin gradually.",
          "Taken together, these points explain why the lesson calls Kotlin modern, safe, and versatile. Remember each characteristic without turning this introduction into a lesson on types, null syntax, or calling Java."
        ]
      }
    ],
    "gotchas": [
      {
        "mistake": "Crediting the Android announcement with Kotlin’s first release",
        "whyItFails": "The Android milestone occurred in 2017, years after JetBrains first released Kotlin in 2011.",
        "correction": "Keep the two dates tied to their distinct events: release in 2011, Android support in 2017."
      },
      {
        "mistake": "Omitting Kotlin’s non-mobile targets when describing its uses",
        "whyItFails": "The source explicitly includes JVM server code, JavaScript, and native targets; a mobile-only description misses those uses.",
        "correction": "Describe Android as one use and name at least one of the other source-listed targets."
      },
      {
        "mistake": "Equating inferred types with dynamic typing",
        "whyItFails": "Static checking still happens before execution even when a programmer does not spell out every type.",
        "correction": "Remember that Kotlin is statically typed; leave the syntax of inference for Lesson 6."
      },
      {
        "mistake": "The sample teaches full function syntax",
        "whyItFails": "Its source explicitly calls it a taste of Kotlin.",
        "correction": "Wait for the next lesson to learn the program entry point."
      }
    ],
    "cheatsheet": [
      {
        "term": "Creator",
        "syntax": "JetBrains",
        "description": "Created Kotlin; first released it in 2011."
      },
      {
        "term": "Android milestone",
        "syntax": "Google, 2017",
        "description": "Official Android support."
      },
      {
        "term": "Targets",
        "syntax": "Android, JVM, JavaScript, native",
        "description": "Several application platforms."
      },
      {
        "term": "Typing",
        "syntax": "Statically typed",
        "description": "Types checked before execution."
      },
      {
        "term": "Null safety",
        "syntax": "Null-safe type system",
        "description": "Designed to catch accidental null problems early."
      },
      {
        "term": "Java",
        "syntax": "Kotlin ↔ Java",
        "description": "Code can call across both languages."
      }
    ],
    "quiz": [
      {
        "id": "tutorial-1-1",
        "question": "Who created Kotlin?",
        "options": [
          "Google",
          "JetBrains",
          "Oracle",
          "Microsoft"
        ],
        "correctIndex": 1,
        "explanation": "JetBrains created Kotlin; Google later supported it for Android."
      },
      {
        "id": "tutorial-1-2",
        "question": "When did Google officially support Kotlin for Android?",
        "options": [
          "2011",
          "2017",
          "Never",
          "Only after 2020"
        ],
        "correctIndex": 1,
        "explanation": "Official Android support dates to 2017."
      },
      {
        "id": "tutorial-1-3",
        "question": "Where can Kotlin be used?",
        "options": [
          "Android only",
          "Server only",
          "Android, backend, and other platforms",
          "iOS only"
        ],
        "correctIndex": 2,
        "explanation": "The lesson names Android, JVM backend, JavaScript, and native targets."
      },
      {
        "id": "tutorial-1-4",
        "question": "How is Kotlin typed?",
        "options": [
          "Dynamically",
          "Statically",
          "Not typed",
          "Only typed on Android"
        ],
        "correctIndex": 1,
        "explanation": "Kotlin checks types before the program runs."
      }
    ]
  },
  {
    "lessonId": "world-1-kotlin-syntax",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 2,
    "title": "Kotlin Syntax & main()",
    "subtitle": "Start a program, follow its statements, print a message, and repair a missing quote.",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "A Kotlin program begins executing inside main(). Its braces enclose a body whose statements run top to bottom. This lesson adds println() for visible output, a precise welcome-message exercise, and a missing-quote debugging exercise.",
    "toc": [
      {
        "id": "entry",
        "label": "main() Is the Entry Point"
      },
      {
        "id": "body",
        "label": "Curly Braces Mark the Body"
      },
      {
        "id": "order",
        "label": "Statements Run in Order"
      },
      {
        "id": "output",
        "label": "Quoted Text and println()"
      },
      {
        "id": "write",
        "label": "Write & Run: Welcome Message"
      },
      {
        "id": "debug",
        "label": "Debug: Close the String"
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
        "id": "entry",
        "title": "main() Is the Entry Point",
        "paragraphs": [
          "A Kotlin program needs a place to begin. In this lesson, that place is main(). When you run the program, execution starts inside main() rather than at an arbitrary line.",
          "The smallest example shown has an empty body. It is a valid program and runs successfully, but you see no output. There is no statement in its body to print anything.",
          "The source describes main as the special name Kotlin looks for at program start, and the parentheses as required syntax after the entry-point name. For this lesson, remember main() as the entry point. Parameters, return types, and general function mechanics belong to the later Functions world.",
          "A silent program can therefore be correct. Distinguish “it did not print” from “it failed to run”; the empty example illustrates the former."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "",
            "}"
          ],
          "explanation": "The main body contains no statement; the program runs without visible output.",
          "output": ""
        }
      },
      {
        "id": "body",
        "title": "Curly Braces Mark the Body",
        "paragraphs": [
          "The opening { and closing } mark the boundaries of main()’s body. The statements placed between them are the statements that execute when main() runs.",
          "In the empty example there is nothing between the braces. Place println(\"Hello, Kotlin!\") inside, and the program now has a statement that produces visible output.",
          "Read the braces as a boundary around this program body. This lesson does not require studying other uses of curly braces or broader function declarations.",
          "When checking a first program, identify main(), find the two braces, and look inside them for the work the program performs."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    println(\"Hello, Kotlin!\")",
            "}"
          ],
          "explanation": "The println statement inside the braces runs when execution begins in main().",
          "output": "Hello, Kotlin!"
        }
      },
      {
        "id": "order",
        "title": "Statements Run in Order",
        "paragraphs": [
          "Multiple statements inside main() execute sequentially from top to bottom. To predict the output, read the first statement, then the second, and continue downward.",
          "The three-line example prints First, then Second, then Third. Each println call creates a separate line of output. The ordering comes from the order of the statements in the body.",
          "The prediction activity uses the same reasoning with A followed by B. A prints first because its statement appears first. No rearrangement or simultaneous printing is involved.",
          "This tracing habit is useful even in tiny examples: begin inside main() and follow the next statement in written order."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    println(\"First\")",
            "    println(\"Second\")",
            "    println(\"Third\")",
            "}"
          ],
          "explanation": "The three statements execute in the order shown.",
          "output": "First\nSecond\nThird"
        }
      },
      {
        "id": "output",
        "title": "Quoted Text and println()",
        "paragraphs": [
          "println(...) prints text to the console and then moves to a new line. The text supplied in this lesson is a String literal: characters wrapped in double quotes.",
          "For println(\"Kotlin\"), the visible text is Kotlin. The quotation marks tell Kotlin where the text starts and ends in the source code; the marks are not included in the output.",
          "This is enough String knowledge to complete the lesson. Later material can examine Strings in more detail; here the focus is reading a basic printing statement accurately.",
          "Check both the argument inside the parentheses and the quotation marks when predicting what a statement will print."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    println(\"Kotlin\")",
            "}"
          ],
          "explanation": "The quotes delimit the String literal; only its contents appear.",
          "output": "Kotlin"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Welcome Message",
        "paragraphs": [
          "The exercise asks for one exact console message: Welcome to Kotlin! Place a println statement inside main() containing precisely those words and punctuation.",
          "Execution enters main(), reaches its statement, and displays the message. Since there is one printing statement, it produces one visible message.",
          "Exact output includes capitalization, the space between words, and the exclamation mark. Compare your quoted text against the expected output before running the code.",
          "The exercise’s goal is to assemble the known entry point, body, and output statement into a working program."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    println(\"Welcome to Kotlin!\")",
            "}"
          ],
          "explanation": "One statement in the main body prints the required message.",
          "output": "Welcome to Kotlin!"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Close the String",
        "paragraphs": [
          "The debugging example does not compile because the message starts with a double quote but never closes it. The broken line is println(\"Hello, Kotlin!)",
          "A String literal needs both an opening and a closing double quote. Without the closing mark, the compiler cannot determine where the text ends.",
          "Insert the missing double quote immediately after the exclamation mark. Then println receives a complete String and the program prints Hello, Kotlin!.",
          "When a similar line fails, inspect the boundaries around the quoted message before changing the surrounding main() structure."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "println(\"Hello, Kotlin!)"
          ],
          "rightTitle": "Fixed",
          "rightCode": [
            "println(\"Hello, Kotlin!\")"
          ],
          "verdict": "The fixed line closes the String before the parenthesis."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    println(\"Hello, Kotlin!\")",
            "}"
          ],
          "explanation": "Closing the String resolves the syntax error.",
          "output": "Hello, Kotlin!"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Adding a println call to a program expected to run silently",
        "whyItFails": "A main body without printing statements runs successfully without console text; an added output statement changes its behavior.",
        "correction": "When the intended output is empty, leave the body without a printing statement.",
        "badCode": [
          "fun main() {",
          "    println(\"Starting\")",
          "}"
        ],
        "fixedCode": [
          "fun main() {",
          "}"
        ]
      },
      {
        "mistake": "Putting visible quotation marks inside the printed message",
        "whyItFails": "Quotation marks delimiting a String are not output, but quote characters embedded as text would change the visible message.",
        "correction": "Compare the content between the delimiters with the requested output.",
        "badCode": [
          "println(\"\\\"Welcome\\\"\")"
        ],
        "fixedCode": [
          "println(\"Welcome\")"
        ]
      },
      {
        "mistake": "Swapping two status messages while expecting the original sequence",
        "whyItFails": "A program prints each statement when it reaches it; changing their positions changes the resulting order.",
        "correction": "Place messages in the same order you want them to appear.",
        "badCode": [
          "println(\"Ready\")",
          "println(\"Loading\")"
        ],
        "fixedCode": [
          "println(\"Loading\")",
          "println(\"Ready\")"
        ]
      },
      {
        "mistake": "Assuming a missing opening quote is harmless",
        "whyItFails": "The same boundary rule applies to both ends of quoted text; without the opening quote the statement is invalid.",
        "correction": "Put both quotes around the entire message.",
        "badCode": [
          "println(Hello\")"
        ],
        "fixedCode": [
          "println(\"Hello\")"
        ]
      },
      {
        "mistake": "main() teaches all function mechanics",
        "whyItFails": "The source reserves parameters and return types for a later world.",
        "correction": "Learn main() here only as the entry point."
      }
    ],
    "cheatsheet": [
      {
        "term": "Entry point",
        "syntax": "main()",
        "description": "The program starts executing here."
      },
      {
        "term": "Body",
        "syntax": "{ ... }",
        "description": "Braces surround statements inside main()."
      },
      {
        "term": "Empty body",
        "syntax": "fun main() { }",
        "description": "Valid program with no visible output."
      },
      {
        "term": "Order",
        "syntax": "top to bottom",
        "description": "Statements run in written sequence."
      },
      {
        "term": "Print line",
        "syntax": "println(\"Kotlin\")",
        "description": "Displays Kotlin followed by a newline."
      },
      {
        "term": "Quoted text",
        "syntax": "\"Kotlin\"",
        "description": "A String literal; quote marks are not printed."
      },
      {
        "term": "String boundary",
        "syntax": "\"...\"",
        "description": "Opening and closing quotes are required."
      }
    ],
    "quiz": [
      {
        "id": "tutorial-2-1",
        "question": "Where does program execution begin?",
        "options": [
          "println()",
          "main()",
          "The last line",
          "Every line simultaneously"
        ],
        "correctIndex": 1,
        "explanation": "Execution starts inside main()."
      },
      {
        "id": "tutorial-2-2",
        "question": "What does an empty main() print?",
        "options": [
          "A blank line",
          "Nothing",
          "main",
          "An error"
        ],
        "correctIndex": 1,
        "explanation": "It runs but contains no statement that prints."
      },
      {
        "id": "tutorial-2-3",
        "question": "What prints first if A appears above B?",
        "options": [
          "B",
          "A",
          "Both together",
          "Neither"
        ],
        "correctIndex": 1,
        "explanation": "Statements execute top to bottom."
      },
      {
        "id": "tutorial-2-4",
        "question": "What is the output of println(\"Kotlin\")?",
        "options": [
          "\"Kotlin\"",
          "println",
          "Kotlin",
          "Nothing"
        ],
        "correctIndex": 2,
        "explanation": "The quote marks delimit the String but do not print."
      },
      {
        "id": "tutorial-2-5",
        "question": "Why is println(\"Hello, Kotlin!) invalid?",
        "options": [
          "Wrong program name",
          "Missing closing quote",
          "Too many words",
          "Wrong braces"
        ],
        "correctIndex": 1,
        "explanation": "The String has no closing double quote."
      }
    ]
  },
  {
    "lessonId": "world-1-comments",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 3,
    "title": "Comments",
    "subtitle": "Write notes, skip code, recognize quoted slashes, and close block comments.",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Comments are notes the compiler ignores. This lesson covers // and /* ... */, inline comments, temporarily disabling code, literal slashes inside quoted text, and the error caused by an unclosed block comment.",
    "toc": [
      {
        "id": "purpose",
        "label": "Comments Are Skipped"
      },
      {
        "id": "single",
        "label": "Single-Line and Inline //"
      },
      {
        "id": "block",
        "label": "Block Comments: /* and */"
      },
      {
        "id": "disable",
        "label": "Write & Run: Disable a Line"
      },
      {
        "id": "quoted",
        "label": "// Inside a String"
      },
      {
        "id": "repair",
        "label": "Debug: Close the Block"
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
        "id": "purpose",
        "title": "Comments Are Skipped",
        "paragraphs": [
          "Comments are notes in source code for people reading it. They may explain a nearby statement or temporarily disable one. When the program runs, Kotlin ignores the comment text.",
          "A comment does not print merely because words appear in it. The lesson describes comments as having no effect on output, speed, or memory. To find visible output in an example, identify the active statements outside comments.",
          "The introductory example puts a whole-line // note and an inline // note near code, then surrounds a longer note with /* and */. Both forms remain readable in the source while being skipped during execution.",
          "The core distinction is between text for readers and statements that Kotlin actually executes."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "// This is a single-line comment",
            "val hero = \"Kotlin\" // Note at the end of a line",
            "/*",
            "  This is a multi-line comment.",
            "  Everything inside is skipped by the compiler.",
            "*/",
            "println(hero)"
          ],
          "explanation": "The comments are skipped; the final active statement prints the value of hero.",
          "output": "Kotlin"
        }
      },
      {
        "id": "single",
        "title": "Single-Line and Inline //",
        "paragraphs": [
          "Outside quoted text, // starts a comment that continues to the end of its current line. It can stand at the start of a line to turn the whole line into a note.",
          "It can also follow active code. In println(\"B\") // println(\"C\"), the first println appears before // and executes. The text after // is a comment, even though it resembles a printing statement.",
          "A preceding line // println(\"A\") does not execute either. Reading both lines together leaves only println(\"B\") active, so the result is B.",
          "Locate the // marker on each line, then separate the active portion before it from the ignored portion after it."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    // println(\"A\")",
            "    println(\"B\") // println(\"C\")",
            "}"
          ],
          "explanation": "A and C are inside comments; B is the only active output.",
          "output": "B"
        }
      },
      {
        "id": "block",
        "title": "Block Comments: /* and */",
        "paragraphs": [
          "A block comment starts at /* and ends at */. It can span multiple lines, allowing a longer note without adding // to each line.",
          "The lesson’s prediction activity places statements printing One and Two between the markers. Kotlin skips both. The statement printing Three comes after the closing marker, so it executes.",
          "To read this example, locate the opening marker first, then its closing marker. Ignore everything between them, and resume with the code after */.",
          "The opening and closing delimiters matter even when the text inside looks like valid Kotlin code; code inside the comment stays inactive."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    /* println(\"One\")",
            "       println(\"Two\") */",
            "    println(\"Three\")",
            "}"
          ],
          "explanation": "Only the statement after */ remains active.",
          "output": "Three"
        }
      },
      {
        "id": "disable",
        "title": "Write & Run: Disable a Line",
        "paragraphs": [
          "Comments can temporarily disable a statement without deleting it. Prefix the unwanted statement with //; the line stays visible in the file but no longer runs.",
          "The exercise starts with an unwanted message followed by Mission Ready!. The required result is only Mission Ready!, and the task specifically asks you to comment out the extra statement.",
          "Do not merely change the expected message or erase the first line. Put // before that first println, leaving the second println active.",
          "After the change, Kotlin skips the commented line and prints the exact required message once."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    // println(\"Not part of the final output\")",
            "    println(\"Mission Ready!\")",
            "}"
          ],
          "explanation": "The first line remains in the source but does not execute.",
          "output": "Mission Ready!"
        }
      },
      {
        "id": "quoted",
        "title": "// Inside a String",
        "paragraphs": [
          "A pair of slash characters is not always a comment marker. If // appears between the double quotes of a String, it is ordinary text.",
          "The lesson shows a web address containing http:// and a println call with \"// Not a comment\". In both examples, the slash characters belong to the quoted text.",
          "For println(\"// Not a comment\"), the visible output includes both slashes. Compare it with // println(\"Hello\"), where the slashes are outside quotes and the statement is skipped.",
          "When predicting output, check whether the marker appears inside or outside the quotation marks."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    println(\"// Not a comment\")",
            "}"
          ],
          "explanation": "The // characters are inside the quoted String, so they print.",
          "output": "// Not a comment"
        }
      },
      {
        "id": "repair",
        "title": "Debug: Close the Block",
        "paragraphs": [
          "The debugging challenge opens a block comment with /* but omits the closing */. Without that boundary, the compiler treats the remaining source as part of the unclosed comment and the program fails to parse.",
          "Add */ after the note and before println(\"Welcome to CodeDo!\"). This makes the note a complete comment and leaves the println statement active.",
          "The repaired program displays Welcome to CodeDo!. This activity tests a different skill from commenting out code: find the broken boundary, then put the closing delimiter in the correct place.",
          "Whenever you encounter /*, look for its matching */ before deciding which later statements will execute."
        ],
        "comparison": {
          "leftTitle": "Unclosed",
          "leftCode": [
            "/* Set up user greeting",
            "println(\"Welcome to CodeDo!\")"
          ],
          "rightTitle": "Closed",
          "rightCode": [
            "/* Set up user greeting */",
            "println(\"Welcome to CodeDo!\")"
          ],
          "verdict": "Closing the block before println allows that statement to execute."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    /* Set up user greeting */",
            "    println(\"Welcome to CodeDo!\")",
            "}"
          ],
          "explanation": "The note is ignored, and the active greeting prints.",
          "output": "Welcome to CodeDo!"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "A comment prints its text",
        "whyItFails": "Kotlin ignores comments during execution.",
        "correction": "Find an active println for visible output."
      },
      {
        "mistake": "An inline // disables the whole line",
        "whyItFails": "Code before // can still execute.",
        "correction": "Only text from // through the line’s end is ignored."
      },
      {
        "mistake": "Closing a block comment after code that should execute",
        "whyItFails": "Even with a closing marker, everything before */ remains commented out, including an intended active statement.",
        "correction": "Move */ before the statement you want Kotlin to run.",
        "badCode": [
          "/* setup note",
          "println(\"Ready\")",
          "*/"
        ],
        "fixedCode": [
          "/* setup note */",
          "println(\"Ready\")"
        ]
      },
      {
        "mistake": "// inside quotes starts a comment",
        "whyItFails": "Quoted slash characters are String content.",
        "correction": "Expect them to appear in the printed text."
      },
      {
        "mistake": "Deleting the unwanted statement",
        "whyItFails": "The exercise requires commenting it out.",
        "correction": "Keep the line and prefix it with //."
      }
    ],
    "cheatsheet": [
      {
        "term": "Whole-line note",
        "syntax": "// note",
        "description": "Ignored through the end of that line."
      },
      {
        "term": "Inline note",
        "syntax": "code // note",
        "description": "Code before the marker stays active."
      },
      {
        "term": "Block comment",
        "syntax": "/* note */",
        "description": "All enclosed content is ignored."
      },
      {
        "term": "Temporary disable",
        "syntax": "// println(\"A\")",
        "description": "Keeps code in the file but prevents execution."
      },
      {
        "term": "Literal slashes",
        "syntax": "\"// Not a comment\"",
        "description": "Inside quotes the slashes are text."
      },
      {
        "term": "Close block",
        "syntax": "*/",
        "description": "Ends an earlier /* comment."
      }
    ],
    "quiz": [
      {
        "id": "tutorial-3-1",
        "question": "What does // do outside a String?",
        "options": [
          "Starts a line comment",
          "Prints a slash",
          "Starts a block",
          "Ends the program"
        ],
        "correctIndex": 0,
        "explanation": "It comments out the remainder of the line."
      },
      {
        "id": "tutorial-3-2",
        "question": "Which markers surround a block comment?",
        "options": [
          "// and //",
          "/* and */",
          "Quotes",
          "Braces"
        ],
        "correctIndex": 1,
        "explanation": "/* opens and */ closes the block."
      },
      {
        "id": "tutorial-3-3",
        "question": "What prints when // println(\"A\") precedes println(\"B\")?",
        "options": [
          "A",
          "B",
          "Both",
          "Nothing"
        ],
        "correctIndex": 1,
        "explanation": "The first line is commented out."
      },
      {
        "id": "tutorial-3-4",
        "question": "What does println(\"B\") // println(\"C\") print?",
        "options": [
          "B",
          "C",
          "Both",
          "Nothing"
        ],
        "correctIndex": 0,
        "explanation": "Only the code before // executes."
      },
      {
        "id": "tutorial-3-5",
        "question": "What prints from println(\"// Not a comment\")?",
        "options": [
          "Nothing",
          "An error",
          "// Not a comment",
          "Not a comment"
        ],
        "correctIndex": 2,
        "explanation": "The slashes are quoted String text."
      },
      {
        "id": "tutorial-3-6",
        "question": "What is wrong with /* without */?",
        "options": [
          "It prints the comment",
          "It is unclosed",
          "It is a line comment",
          "Nothing"
        ],
        "correctIndex": 1,
        "explanation": "A block comment must have its closing delimiter."
      }
    ]
  },
  {
    "lessonId": "world-1-print-println",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 4,
    "title": "print() and println()",
    "subtitle": "Writing to the Console",
    "badge": "BEGINNER",
    "readTime": "5 min",
    "overviewSummary": "Kotlin provides two primary functions for printing text to the console: print() and println(). The difference is simple: print() stays on the same line, while println() drops down to a new line after printing.",
    "toc": [
      {
        "id": "same-line",
        "label": "print() Keeps the Line Open"
      },
      {
        "id": "new-line",
        "label": "println() Ends the Line"
      },
      {
        "id": "blank",
        "label": "An Empty println() Adds a Blank Line"
      },
      {
        "id": "write",
        "label": "Write & Run: Status Banner"
      },
      {
        "id": "debug",
        "label": "Debug: The Score Line"
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
        "id": "same-line",
        "title": "print() Keeps the Line Open",
        "paragraphs": [
          "print() writes its argument without appending a line break. The next print or println call therefore continues immediately after the characters already written.",
          "In the lesson’s three-call example, print(\"A\"), print(\"B\"), and print(\"C\") yield ABC on one line. No spaces appear unless the printed text includes them.",
          "The mixed Count example prints a label with a trailing space, then println(42) puts 42 after that space on the same line. The newline happens after 42.",
          "To forecast the display, track where the current line ends after each call. A print call leaves it open for the next output."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "print(\"A\")",
            "print(\"B\")",
            "print(\"C\")"
          ],
          "explanation": "All three calls output on the exact same line.",
          "output": "ABC"
        }
      },
      {
        "id": "new-line",
        "title": "println() Ends the Line",
        "paragraphs": [
          "println() writes its argument and then advances to a fresh line. Two consecutive calls printing Hello and World display those words on separate lines.",
          "If println(\"First\") is followed by print(\"Second\"), Second begins on the line below First because the first call already advanced the output position.",
          "When print(\"Kotlin \") comes before println(\"Awakening\"), the two pieces join as Kotlin Awakening on one line. The space is part of the first quoted text.",
          "The difference depends on what happens after each call, not just on the words it prints. This is the central distinction in the lesson."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "println(\"Hello\")",
            "println(\"World\")"
          ],
          "explanation": "Produces two distinct lines in the console.",
          "output": "Hello\nWorld"
        }
      },
      {
        "id": "blank",
        "title": "An Empty println() Adds a Blank Line",
        "paragraphs": [
          "Calling println() without an argument advances to the next line without printing visible text. It is useful when the lesson asks for an empty line between messages.",
          "After println(\"Hi\"), the cursor is already on the next line. A further empty println() leaves that line blank and moves down again; println(\"Bye\") then appears below the blank line.",
          "The empty call is valid and does have an observable layout effect. It does not print the word null or cause an error.",
          "Compare the exact line layout rather than only the visible words when solving the prediction question."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "println(\"Hi\")",
            "println()",
            "println(\"Bye\")"
          ],
          "explanation": "Inserted a visible blank line by calling println() with no arguments.",
          "output": "Hi\n\nBye"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Status Banner",
        "paragraphs": [
          "The task requires Status:ACTIVE on a single line. First call print(\"Status:\") so the output position stays directly after the colon.",
          "Then call println(\"ACTIVE\"). The second call adds ACTIVE at that position and ends the line. There is no space because the required label has none.",
          "Two println calls would split the label and value across lines, missing the required output even though both pieces are present.",
          "Check the exact result against Status:ACTIVE: both the capitalization and the lack of a gap matter."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    print(\"Status:\")",
            "    println(\"ACTIVE\")",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "Status:ACTIVE"
        }
      },
      {
        "id": "debug",
        "title": "Debug: The Score Line",
        "paragraphs": [
          "The broken program calls println(\"Score:\") before print(95). The first call ends its line, so 95 appears below the label.",
          "Change the label’s call to print(\"Score:\") and the score’s call to println(95). Now the first call leaves the line open and the second completes it.",
          "The corrected output is Score:95. This is a layout bug, not a missing value: both pieces printed before the fix, but their line positions were wrong.",
          "When diagnosing a similar output mismatch, identify the earliest println that advances before the next piece should join it."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    // BUG: println() starts a new line before the score can join it!",
            "    println(\"Score:\")",
            "    print(95)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    print(\"Score:\")",
            "    println(95)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "println() always ends the current line with a newline, while print() leaves the line open for whatever prints next. Because the label used println(), the score was pushed to its own line no matter what printed it. Swapping to print(\"Score:\") followed by println(95) keeps both values on the same line: Score:95."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    print(\"Score:\")",
            "    println(95)",
            "}"
          ],
          "explanation": "println() always ends the current line with a newline, while print() leaves the line open for whatever prints next. Because the label used println(), the score was pushed to its own line no matter what printed it. Swapping to print(\"Score:\") followed by println(95) keeps both values on the same line: Score:95.",
          "output": "Score:95"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Expecting print() to separate adjacent words automatically",
        "whyItFails": "print() appends no newline or space; two text fragments run together if neither contains a separator.",
        "correction": "Include the needed space in one fragment or use a newline when separate lines are intended.",
        "badCode": [
          "print(\"Good\")",
          "print(\"Morning\")"
        ],
        "fixedCode": [
          "print(\"Good \")",
          "print(\"Morning\")"
        ]
      },
      {
        "mistake": "Using println() for the first half of a one-line label",
        "whyItFails": "The newline after the label forces the next value onto a different line.",
        "correction": "Use print() for the label and println() for the final value.",
        "badCode": [
          "println(\"Lives: \")",
          "println(3)"
        ],
        "fixedCode": [
          "print(\"Lives: \")",
          "println(3)"
        ]
      },
      {
        "mistake": "Expecting an empty println() to leave the current line untouched",
        "whyItFails": "Even without an argument, println() advances the console to another line.",
        "correction": "Remove the empty call if no blank line is wanted.",
        "badCode": [
          "println(\"Top\")",
          "println()",
          "println(\"Bottom\")"
        ],
        "fixedCode": [
          "println(\"Top\")",
          "println(\"Bottom\")"
        ]
      },
      {
        "mistake": "Leaving out the space before an appended value",
        "whyItFails": "print() preserves exactly the text supplied, including whether its label ends with a space.",
        "correction": "Put the space into the label when the desired output includes one.",
        "badCode": [
          "print(\"Count:\")",
          "println(8)"
        ],
        "fixedCode": [
          "print(\"Count: \")",
          "println(8)"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "print() stays on the line",
        "syntax": "print()",
        "description": "Subsequent calls continue right after the last character."
      },
      {
        "term": "println() adds a newline",
        "syntax": "println()",
        "description": "Outputs the text and then moves the cursor to the beginning of the next line."
      },
      {
        "term": "println() with no arguments",
        "syntax": "println()",
        "description": "Calling println() alone just prints a blank line."
      },
      {
        "term": "Sequential println calls",
        "syntax": "Line 1",
        "description": "Outputs \"Hello\" and moves down"
      },
      {
        "term": "Sequential print calls",
        "syntax": "Single line",
        "description": "Outputs \"ABC\" with no line breaks between them"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-4-1",
        "question": "How will this appear in the console?",
        "options": [
          "Kotlin Awakening (on 1 line)",
          "Kotlin\\nAwakening (on 2 lines)",
          "\"Kotlin Awakening\"",
          "Awakening Kotlin"
        ],
        "correctIndex": 0,
        "explanation": "print() does not append a newline, so \"Awakening\" from println joins right next to it."
      },
      {
        "id": "tutorial-4-2",
        "question": "Where does \"Second\" appear?",
        "options": [
          "On the line below \"First\"",
          "Directly attached to \"First\"",
          "Replaces \"First\"",
          "Never prints"
        ],
        "correctIndex": 0,
        "explanation": "println(\"First\") moves the cursor to the next line, so \"Second\" starts on a fresh line."
      },
      {
        "id": "tutorial-4-3",
        "question": "What does the empty println() do?",
        "options": [
          "Inserts an empty blank line between Hi and Bye",
          "Causes a compiler error",
          "Prints the text \"null\"",
          "Does nothing at all"
        ],
        "correctIndex": 0,
        "explanation": "Calling println() without arguments outputs a blank newline."
      },
      {
        "id": "tutorial-4-4",
        "question": "What is the exact expected output of ‘Format a Status Banner’?",
        "options": [
          "Status:ACTIVE",
          "Status:ACTIVE!",
          "Status:ACTIVE ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly 'Status:ACTIVE'."
      }
    ]
  },
  {
    "lessonId": "world-1-val-vs-var",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 5,
    "title": "val vs var",
    "subtitle": "Immutable val vs Mutable var",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "In Kotlin, every variable is declared with either val or var. Use val for values that never change (read-only), and var for values that need to be reassigned later. Idiomatic Kotlin favors val by default for safety.",
    "toc": [
      {
        "id": "read-only",
        "label": "val Holds a Read-Only Reference"
      },
      {
        "id": "mutable",
        "label": "var Allows Reassignment"
      },
      {
        "id": "choose",
        "label": "Choose the Declaration"
      },
      {
        "id": "write",
        "label": "Write & Run: Update a Score"
      },
      {
        "id": "debug",
        "label": "Debug: Reassigning counter"
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
        "id": "read-only",
        "title": "val Holds a Read-Only Reference",
        "paragraphs": [
          "Use val when the named value should stay assigned as it was. After val pi = 3.14159, the example prints pi without ever changing its assignment.",
          "A line that assigns a new value to a val is rejected by the compiler. The lesson’s level example assigns 1, then tries level = 2; it cannot run to print either result.",
          "This restriction helps prevent accidental changes to a value you intended to keep. It is why the lesson recommends choosing val by default.",
          "Focus on reassignment of the declared name. The lesson is distinguishing whether the variable can be assigned again, not teaching deeper object mutability."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val pi = 3.14159",
            "println(pi)"
          ],
          "explanation": "We established a safe, unmodifiable reference.",
          "output": "3.14159"
        }
      },
      {
        "id": "mutable",
        "title": "var Allows Reassignment",
        "paragraphs": [
          "Use var when the value needs to change later. The coins example begins with 10, assigns 15 to coins, and prints 15.",
          "Reassignment uses the existing name without another var. The old assigned value is replaced for later reads, so a following println sees the newer value.",
          "The score prediction starts at 10 and then sets score = 20. Because score is a var, this compiles and prints 20 rather than 10.",
          "Declare a variable mutable for an actual update requirement. If the value never changes, the lesson’s advice is to use val."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "var coins = 10",
            "coins = 15",
            "println(coins)"
          ],
          "explanation": "The variable smoothly accepted a new value.",
          "output": "15"
        }
      },
      {
        "id": "choose",
        "title": "Choose the Declaration",
        "paragraphs": [
          "A birth year shown as fixed uses val in the introductory example, while an age that is updated uses var. The declaration conveys what changes are permitted afterward.",
          "Kotlin does not treat var as obsolete. The lesson explicitly needs var for cases such as a running game score or counter.",
          "The default-to-val guideline is about making unintended reassignment less likely. Switching to var is appropriate when the exercise requires a new assignment.",
          "Ask whether a later statement must put a different value into the same name. If yes, choose var; otherwise choose val for this lesson’s examples."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val id = 101",
            "// id = 102  <-- Val cannot be reassigned",
            "println(id)"
          ],
          "explanation": "Kotlin guarantees that val variables cannot be corrupted.",
          "output": "101"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Update a Score",
        "paragraphs": [
          "Declare var score = 50 because the challenge requires a later update. Set score to 75, which adds the requested 25 to its starting value.",
          "Then print score. The printed result is 75 because the second assignment has already replaced the original 50.",
          "The source also allows adding 25 directly instead of setting 75; both satisfy its stated update requirement. The supplied solution uses score = 75.",
          "Changing val to var is essential here. With val, the update line would be rejected before the program could print."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    var score = 50",
            "    score = 75",
            "    println(score)",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "75"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Reassigning counter",
        "paragraphs": [
          "The broken program declares val counter = 0 and then assigns counter = 1. That second assignment conflicts with val’s read-only rule.",
          "Repair the declaration to var counter = 0 while leaving the subsequent assignment in place. The program can then print 1.",
          "Do not remove the update simply to silence the compiler: the example intends the counter to change. The declaration is the mistaken part.",
          "This compile-time error is a direct signal that a declared val is being reassigned."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val counter = 0",
            "    counter = 1",
            "    println(counter)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    var counter = 0",
            "    counter = 1",
            "    println(counter)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "Because counter is reassigned to 1 on the next line, it must be declared with `var` instead of `val`."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    var counter = 0",
            "    counter = 1",
            "    println(counter)",
            "}"
          ],
          "explanation": "Because counter is reassigned to 1 on the next line, it must be declared with `var` instead of `val`.",
          "output": "1"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Redeclaring a var when the intention is to update it",
        "whyItFails": "A later assignment should use the existing name; a second declaration is not the operation the exercise practices.",
        "correction": "Declare once, then assign a new value without var.",
        "badCode": [
          "var lives = 3",
          "var lives = 2"
        ],
        "fixedCode": [
          "var lives = 3",
          "lives = 2"
        ]
      },
      {
        "mistake": "Choosing val for a balance that must be updated",
        "whyItFails": "A val cannot receive a second assignment, even when the new amount is otherwise valid.",
        "correction": "Use var when a later statement needs to replace the balance.",
        "badCode": [
          "val balance = 40",
          "balance = 55"
        ],
        "fixedCode": [
          "var balance = 40",
          "balance = 55"
        ]
      },
      {
        "mistake": "Making every declaration var just in case",
        "whyItFails": "Permitting reassignment on values that never change removes the protection the lesson recommends.",
        "correction": "Default to val for a value with no planned update.",
        "badCode": [
          "var launchYear = 2011",
          "println(launchYear)"
        ],
        "fixedCode": [
          "val launchYear = 2011",
          "println(launchYear)"
        ]
      },
      {
        "mistake": "Changing a fixed identifier just to silence an unrelated update error",
        "whyItFails": "An immutable identifier should remain val; the actual mutable state must be identified separately.",
        "correction": "Inspect which name is assigned again and make only that declaration var.",
        "badCode": [
          "val playerName = \"Ari\"",
          "val attempts = 1",
          "attempts = 2"
        ],
        "fixedCode": [
          "val playerName = \"Ari\"",
          "var attempts = 1",
          "attempts = 2"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "val is read-only (immutable)",
        "syntax": "val",
        "description": "Assigned once and locked forever. Safe from accidental changes."
      },
      {
        "term": "var is mutable",
        "syntax": "var",
        "description": "Can be reassigned new values as the program runs."
      },
      {
        "term": "Default to val",
        "syntax": "Default",
        "description": "Idiomatic Kotlin code favors val by default, switching to var only when reassignment is genuinely required."
      },
      {
        "term": "Declaring with val",
        "syntax": "val",
        "description": "Locks the identifier \"pi\""
      },
      {
        "term": "Reassigning a var",
        "syntax": "var coins",
        "description": "Declared as mutable with initial value 10"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-5-1",
        "question": "What does this code print?",
        "options": [
          "10",
          "20",
          "30",
          "Compiler error"
        ],
        "correctIndex": 1,
        "explanation": "Since score was declared with var, reassigning it to 20 is completely legal, and 20 is printed."
      },
      {
        "id": "tutorial-5-2",
        "question": "What happens when this runs?",
        "options": [
          "Prints 2",
          "Compile error: Val cannot be reassigned",
          "Prints 1",
          "Runtime exception"
        ],
        "correctIndex": 1,
        "explanation": "Variables declared with `val` cannot be reassigned. The Kotlin compiler rejects this code before it can run."
      },
      {
        "id": "tutorial-5-3",
        "question": "Why does Kotlin encourage using val over var whenever possible?",
        "options": [
          "It makes code safer and prevents accidental mutations",
          "var is deprecated in modern Kotlin",
          "val uses less CPU time on Android",
          "val variables don't need a type"
        ],
        "correctIndex": 0,
        "explanation": "Immutability prevents unexpected state bugs and makes programs much easier to reason about and debug."
      },
      {
        "id": "tutorial-5-4",
        "question": "What is the exact expected output of ‘Update a Game Score’?",
        "options": [
          "75",
          "75!",
          "75 ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly '75'."
      }
    ]
  },
  {
    "lessonId": "world-1-variables-type-inference",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 6,
    "title": "Variables & Type Inference",
    "subtitle": "Type Inference & Explicit Types",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Kotlin is statically typed, but you don't have to write the type on every line. The compiler automatically infers the type from the value on the right side. You can also explicitly declare the type using a colon : Type.",
    "toc": [
      {
        "id": "infer",
        "label": "Infer a Type From the Initial Value"
      },
      {
        "id": "annotate",
        "label": "Write an Explicit : Type Annotation"
      },
      {
        "id": "fixed-type",
        "label": "A var Can Change Value, Not Type"
      },
      {
        "id": "write",
        "label": "Write & Run: Two Declaration Styles"
      },
      {
        "id": "debug",
        "label": "Debug: Int Versus Quoted Text"
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
        "id": "infer",
        "title": "Infer a Type From the Initial Value",
        "paragraphs": [
          "Kotlin is statically typed, yet a declaration does not always need to spell out its type. The compiler can infer it from the value assigned at declaration.",
          "In val count = 42, count is inferred as Int. In val name = \"Alex\", name is inferred as String. These are the examples the lesson asks you to read.",
          "Inference does not mean the variable is dynamically typed. Kotlin establishes a type at compile time even when no type annotation is visible.",
          "When asked about val message = \"CodeDo\", examine the initial quoted value and answer String."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val count = 42",
            "val name = \"Alex\"",
            "println(name)"
          ],
          "explanation": "No boilerplate type declarations needed.",
          "output": "Alex"
        }
      },
      {
        "id": "annotate",
        "title": "Write an Explicit : Type Annotation",
        "paragraphs": [
          "You may state the type between the variable name and the equals sign. The lesson writes val score: Int = 100 and val greeting: String = \"Hello\".",
          "The colon belongs after the name: name: Type. This makes the intended type visible to a reader while still assigning an initial value.",
          "Both inferred and explicit declarations appear in the exercise. The explicit annotation is a choice when it helps clarity, not a requirement on every line.",
          "For the syntax question, val points: Int = 100 matches the form introduced in the source."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val greeting: String = \"Hello\"",
            "val level: Int = 5",
            "println(greeting)"
          ],
          "explanation": "The type is explicitly stated for readability.",
          "output": "Hello"
        }
      },
      {
        "id": "fixed-type",
        "title": "A var Can Change Value, Not Type",
        "paragraphs": [
          "A var can receive a new value, but its established type remains fixed. The example var items = 10 has type Int; assigning the String \"Ten\" would be a mismatch.",
          "The prediction uses var count = 5 followed by count = \"five\". Kotlin rejects the second assignment at compile time rather than converting the variable into a String.",
          "Distinguish mutability from typing: var controls whether the assigned value can change; inference or annotation determines what type may be assigned.",
          "This is the concrete type-safety behavior the lesson demonstrates."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "var items = 10",
            "// items = \"Ten\"  <-- Error: Type mismatch",
            "println(items)"
          ],
          "explanation": "Kotlin guarantees type stability even for mutable var.",
          "output": "10"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Two Declaration Styles",
        "paragraphs": [
          "Declare val username = \"Alex\" with its String type inferred from the quoted initial value. Declare val level: Int = 10 with an explicit Int annotation.",
          "Print username first and level second. The two println statements produce Alex and 10 on separate lines.",
          "The exercise deliberately puts inference and annotation side by side. Check which declaration has the colon and confirm both initial values agree with their types.",
          "Output order follows the statements: the name appears before the numeric level."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val username = \"Alex\"",
            "    val level: Int = 10",
            "    println(username)",
            "    println(level)",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "Alex\n10"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Int Versus Quoted Text",
        "paragraphs": [
          "The broken line is val xp: Int = \"500\". The type annotation says Int while the double quotes make the initial value a String.",
          "Remove the quotes so the value is the whole-number literal 500. The corrected declaration is val xp: Int = 500, and printing xp yields 500.",
          "Changing only the printed output would not fix the declaration’s type mismatch. Repair the value used in the assignment.",
          "When a typed declaration fails, compare its annotation with the actual kind of literal on the right."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val xp: Int = \"500\"",
            "    println(xp)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val xp: Int = 500",
            "    println(xp)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "`Int` represents whole numbers. Putting quotes around 500 makes it a `String`, causing a type mismatch. Removing the quotes fixes the error."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val xp: Int = 500",
            "    println(xp)",
            "}"
          ],
          "explanation": "`Int` represents whole numbers. Putting quotes around 500 makes it a `String`, causing a type mismatch. Removing the quotes fixes the error.",
          "output": "500"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Reading a single-quoted symbol as a String",
        "whyItFails": "A one-character literal in single quotes is Char, while String text uses double quotes.",
        "correction": "Use double quotes when a String value is intended.",
        "badCode": [
          "val marker = 'Q'"
        ],
        "fixedCode": [
          "val marker = \"Q\""
        ]
      },
      {
        "mistake": "Assuming var allows a later value of a different type",
        "whyItFails": "Mutability permits reassignment but does not change the type inferred from the first value.",
        "correction": "Keep replacements compatible with the established type.",
        "badCode": [
          "var stage = 2",
          "stage = \"three\""
        ],
        "fixedCode": [
          "var stage = 2",
          "stage = 3"
        ]
      },
      {
        "mistake": "Putting the type before the variable name",
        "whyItFails": "The explicit annotation in this lesson follows the name after a colon.",
        "correction": "Use name: Type after val or var.",
        "badCode": [
          "val String nickname = \"Neo\""
        ],
        "fixedCode": [
          "val nickname: String = \"Neo\""
        ]
      },
      {
        "mistake": "Fixing a typed Int mismatch by changing only the print statement",
        "whyItFails": "A type mismatch exists in the declaration, before any printing can run.",
        "correction": "Make the assigned literal match the declared type.",
        "badCode": [
          "val tickets: Int = \"12\"",
          "println(tickets)"
        ],
        "fixedCode": [
          "val tickets: Int = 12",
          "println(tickets)"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Type Inference",
        "syntax": "Type",
        "description": "Kotlin figures out the data type from the initial assigned value."
      },
      {
        "term": "Explicit Annotation (: Type)",
        "syntax": "Explicit",
        "description": "You can optionally specify `: String`, `: Int`, etc., after the variable name."
      },
      {
        "term": "Type Safety",
        "syntax": "Type",
        "description": "A variable's type is permanently fixed at compile time."
      },
      {
        "term": "Inferred Int and String",
        "syntax": "count",
        "description": "Inferred as Int from 42"
      },
      {
        "term": "Explicit type annotation",
        "syntax": ": String",
        "description": "Guarantees the variable holds text"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-6-1",
        "question": "What type does Kotlin infer for `message`?",
        "options": [
          "String",
          "Char",
          "Any",
          "Text"
        ],
        "correctIndex": 0,
        "explanation": "Text in double quotes is automatically inferred as `String` in Kotlin."
      },
      {
        "id": "tutorial-6-2",
        "question": "What happens when this program is compiled?",
        "options": [
          "Compile error: Type mismatch (String cannot be assigned to Int)",
          "Prints five",
          "Prints 5",
          "Runs and converts 5 to five dynamically"
        ],
        "correctIndex": 0,
        "explanation": "Kotlin is statically typed. Even though count is a `var`, its type is fixed as `Int`, so assigning a `String` is illegal."
      },
      {
        "id": "tutorial-6-3",
        "question": "Which syntax correctly declares an explicit Int variable in Kotlin?",
        "options": [
          "val points: Int = 100",
          "Int points = 100;",
          "val points = Int(100)",
          "val Int: points = 100"
        ],
        "correctIndex": 0,
        "explanation": "Kotlin uses Pascal-style type annotations: the identifier is followed by a colon and the type name (`name: Type`)."
      },
      {
        "id": "tutorial-6-4",
        "question": "What is the exact expected output of ‘Declare Explicit and Inferred Variables’?",
        "options": [
          "Alex\n10",
          "Alex\n10!",
          "Alex\n10 ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly 'Alex\\n10'."
      }
    ]
  },
  {
    "lessonId": "world-1-int-long",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 7,
    "title": "Int & Long",
    "subtitle": "Whole Numbers: Int vs Long",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Kotlin represents whole numbers primarily using two types: Int (32-bit, up to ~2.1 billion) and Long (64-bit, up to ~9 quintillion). If a number exceeds 2 billion, use a Long and suffix it with a capital L.",
    "toc": [
      {
        "id": "ranges",
        "label": "Int and Long for Whole Numbers"
      },
      {
        "id": "literal",
        "label": "The L Suffix and Readable Digits"
      },
      {
        "id": "convert",
        "label": "Convert Int to Long Explicitly"
      },
      {
        "id": "write",
        "label": "Write & Run: Yearly Visitors"
      },
      {
        "id": "debug",
        "label": "Debug: Batches Need Multiplication"
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
        "id": "ranges",
        "title": "Int and Long for Whole Numbers",
        "paragraphs": [
          "Int holds whole numbers from −2,147,483,648 through 2,147,483,647. An ordinary small whole-number literal such as 500 is inferred as Int.",
          "Long holds larger whole numbers, up to roughly nine quintillion in the positive direction. The introductory example uses 8000000000L for a world population beyond Int’s range.",
          "The distinction matters when a count could exceed roughly 2.1 billion. The lesson suggests Int for everyday counts and Long for much larger counts such as large file sizes or timestamps.",
          "Both types represent whole numbers; neither is a decimal type."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val a = 20",
            "val b = 10",
            "println(a + b)"
          ],
          "explanation": "Basic math with default Int types.",
          "output": "30"
        }
      },
      {
        "id": "literal",
        "title": "The L Suffix and Readable Digits",
        "paragraphs": [
          "Appending a capital L to a whole-number literal explicitly makes it a Long, as in 500L or 100_000_000_000L.",
          "The source notes that Kotlin would infer Long for a literal already exceeding Int’s range even without the suffix. The L still makes the intention explicit.",
          "Underscores can separate groups of digits for humans. They do not appear in the printed number: 1_000_000 displays as 1000000.",
          "In the prediction questions, distinguish a numeric suffix, which affects the type, from underscores, which affect readability only."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val stars = 100_000_000_000L",
            "println(stars)"
          ],
          "explanation": "Safely represented a number far beyond Int capacity.",
          "output": "100000000000"
        }
      },
      {
        "id": "convert",
        "title": "Convert Int to Long Explicitly",
        "paragraphs": [
          "Kotlin does not implicitly widen an Int variable to Long. The source shows val small = 100 followed by val big: Long = small.toLong().",
          ".toLong() creates the Long value used in a Long-typed declaration. The explicit conversion makes the intended change in numeric type visible.",
          "In the visitor challenge, dailyVisitors begins as an Int while days is Long. Convert dailyVisitors using .toLong() before using it in the required yearly-total calculation.",
          "This conversion is about the type of the value; it does not change the numeric count of visitors."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val small = 100",
            "val big: Long = small.toLong()",
            "println(big)"
          ],
          "explanation": "Converted an Int to a Long safely.",
          "output": "100"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Yearly Visitors",
        "paragraphs": [
          "Start with val dailyVisitors = 50_000 and val days = 365L. The former is Int and the latter Long.",
          "Convert the daily count with dailyVisitors.toLong(), multiply the converted count by days, and print yearlyVisitors.",
          "50,000 × 365 equals 18,250,000. The expected output is 18250000 without grouping underscores.",
          "The exercise tests both the explicit numeric conversion and the operator needed to scale a daily amount across many days."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val dailyVisitors = 50_000",
            "    val days = 365L",
            "    val dailyVisitorsLong = dailyVisitors.toLong()",
            "    val yearlyVisitors = dailyVisitorsLong * days",
            "    println(yearlyVisitors)",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "18250000"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Batches Need Multiplication",
        "paragraphs": [
          "The broken program adds satellitesPerBatch = 4_000L to totalBatches = 25L. Addition produces 4025, not the total across 25 batches.",
          "Replace + with * so the calculation uses 4,000 satellites for each of 25 batches. The corrected output is 100000.",
          "The literals retain their Long type and readable underscores. The error is the arithmetic operator, so changing types will not solve the count.",
          "Use the meaning of each variable to choose the operation: amount per batch multiplied by number of batches."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val satellitesPerBatch = 4_000L",
            "    val totalBatches = 25L",
            "    // BUG: adding gives one batch plus a leftover count, not the true total!",
            "    val totalSatellites = satellitesPerBatch + totalBatches",
            "    println(totalSatellites)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val satellitesPerBatch = 4_000L",
            "    val totalBatches = 25L",
            "    val totalSatellites = satellitesPerBatch * totalBatches",
            "    println(totalSatellites)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "satellitesPerBatch + totalBatches only adds 25 to 4,000, giving 4,025 -- it never accounts for having 25 separate batches of 4,000 each. Replacing + with * correctly multiplies 4,000 by 25, producing the real total: 100000. Both values are declared as Long (with underscore-formatted literals and no suffix needed beyond the L) since a satellite constellation count like this is exactly the kind of large, growing value Long is meant for."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val satellitesPerBatch = 4_000L",
            "    val totalBatches = 25L",
            "    val totalSatellites = satellitesPerBatch * totalBatches",
            "    println(totalSatellites)",
            "}"
          ],
          "explanation": "satellitesPerBatch + totalBatches only adds 25 to 4,000, giving 4,025 -- it never accounts for having 25 separate batches of 4,000 each. Replacing + with * correctly multiplies 4,000 by 25, producing the real total: 100000. Both values are declared as Long (with underscore-formatted literals and no suffix needed beyond the L) since a satellite constellation count like this is exactly the kind of large, growing value Long is meant for.",
          "output": "100000"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Forcing a large count into an Int declaration",
        "whyItFails": "A whole number beyond Int’s positive limit needs a larger type.",
        "correction": "Declare it as Long with an appropriate literal.",
        "badCode": [
          "val distance: Int = 3_000_000_000L"
        ],
        "fixedCode": [
          "val distance: Long = 3_000_000_000L"
        ]
      },
      {
        "mistake": "Reading the L suffix as part of the printed digits",
        "whyItFails": "L marks the source literal’s Long type; it is not a digit or output character.",
        "correction": "Expect just the numeric value when printing a Long.",
        "badCode": [
          "val total = 750L",
          "// Incorrect expectation: 750L"
        ],
        "fixedCode": [
          "val total = 750L",
          "println(total) // 750"
        ]
      },
      {
        "mistake": "Treating underscore grouping as a change in numeric value",
        "whyItFails": "Underscores only improve readability; they do not scale or modify the number.",
        "correction": "Calculate using the digits as one whole number.",
        "badCode": [
          "val seats = 12_500",
          "// Incorrect expectation: 12 or 12_500 as text"
        ],
        "fixedCode": [
          "val seats = 12_500",
          "println(seats) // 12500"
        ]
      },
      {
        "mistake": "Assigning an Int variable directly to a Long-typed variable",
        "whyItFails": "Kotlin does not implicitly widen a value held in an Int variable.",
        "correction": "Call .toLong() explicitly for that variable.",
        "badCode": [
          "val units = 12",
          "val total: Long = units"
        ],
        "fixedCode": [
          "val units = 12",
          "val total: Long = units.toLong()"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Int range",
        "syntax": "Int",
        "description": "Stores numbers from -2,147,483,648 to +2,147,483,647."
      },
      {
        "term": "Long range (with L)",
        "syntax": "Long",
        "description": "Stores massive numbers up to ~9 x 10^18. Suffix with capital L."
      },
      {
        "term": "Underscores for readability",
        "syntax": "Underscores",
        "description": "You can write 1_000_000 for 1 million -- underscores are ignored by Kotlin."
      },
      {
        "term": "Standard Int arithmetic",
        "syntax": "a + b",
        "description": "Performs integer addition yielding 30"
      },
      {
        "term": "Long literal with L",
        "syntax": "L suffix",
        "description": "Makes the Long type explicit for readability -- this literal already exceeds Int's range, so Kotlin would infer Long even without it"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-7-1",
        "question": "What type is `count` by default?",
        "options": [
          "Int",
          "Long",
          "Short",
          "Number"
        ],
        "correctIndex": 0,
        "explanation": "Whole numbers without a suffix default to Int in Kotlin."
      },
      {
        "id": "tutorial-7-2",
        "question": "What does appending `L` do?",
        "options": [
          "Forces the type to Long",
          "Multiplies by 1000",
          "Creates a List",
          "Marks it as a Local variable"
        ],
        "correctIndex": 0,
        "explanation": "The L suffix indicates a 64-bit Long literal."
      },
      {
        "id": "tutorial-7-3",
        "question": "What is printed to the console?",
        "options": [
          "1000000",
          "1_000_000",
          "1",
          "Error"
        ],
        "correctIndex": 0,
        "explanation": "Underscores in numeric literals are purely visual for readability and are discarded by the compiler."
      },
      {
        "id": "tutorial-7-4",
        "question": "What is the exact expected output of ‘Convert Daily Visitors to a Yearly Long Total’?",
        "options": [
          "18250000",
          "18250000!",
          "18250000 ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly '18250000'."
      }
    ]
  },
  {
    "lessonId": "world-1-float-double",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 8,
    "title": "Float & Double",
    "subtitle": "Decimal Numbers: Float vs Double",
    "badge": "BEGINNER",
    "readTime": "5 min",
    "overviewSummary": "Kotlin provides two floating-point types for decimals: Double (64-bit, default, ~15-17 digits precision) and Float (32-bit, ~6-7 digits precision). Any decimal without a suffix is a Double. To make a Float, append f or F.",
    "toc": [
      {
        "id": "default",
        "label": "Double Is the Decimal Default"
      },
      {
        "id": "float",
        "label": "Mark Float With f or F"
      },
      {
        "id": "conversion",
        "label": "Convert Between Decimal Types"
      },
      {
        "id": "write",
        "label": "Write & Run: Convert a Subtotal"
      },
      {
        "id": "debug",
        "label": "Debug: Total Price Uses Multiplication"
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
        "id": "default",
        "title": "Double Is the Decimal Default",
        "paragraphs": [
          "A decimal literal without a suffix is Double in Kotlin. The lesson’s pi and rate examples are therefore inferred as Double.",
          "Double uses 64 bits and the source describes roughly 15–17 digits of precision. It is the default choice the lesson recommends for decimal values.",
          "Multiplying the Double examples 2.5 and 4.0 produces 10.0. The decimal point remains visible in that output.",
          "When a prediction asks about val temperature = 98.6, choose Double: the literal has no f suffix."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val rate = 2.5",
            "val hours = 4.0",
            "println(rate * hours)"
          ],
          "explanation": "Calculated with 64-bit precision.",
          "output": "10.0"
        }
      },
      {
        "id": "float",
        "title": "Mark Float With f or F",
        "paragraphs": [
          "Float is the 32-bit decimal type, described here as roughly 6–7 digits of precision. A literal such as 68.5f uses the f suffix to make a Float.",
          "The source accepts lowercase f or uppercase F. A bare 55.0 is Double, so val speed: Float = 55.0 is a type mismatch.",
          "Correct that form with a Float literal such as 55.0f. Kotlin does not silently downgrade the Double literal to Float.",
          "Use the suffix when the exercise requires Float; otherwise the lesson’s guidance is to default to Double."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val weight: Float = 68.5f",
            "println(weight)"
          ],
          "explanation": "Allocated a 32-bit floating point value.",
          "output": "68.5"
        }
      },
      {
        "id": "conversion",
        "title": "Convert Between Decimal Types",
        "paragraphs": [
          "A Float variable can be converted to Double explicitly with .toDouble(). The example uses a 68.5f value and prints 68.5 after conversion.",
          "Likewise, a calculated Double can be converted to Float using .toFloat(). The lesson’s purchase exercise explicitly calls for that conversion.",
          "The existence of a conversion method matters because Kotlin does not implicitly widen Float to Double or silently assign Double to Float in these declarations.",
          "Read the declared target type, source value, and conversion call together when predicting whether the code compiles."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "// val x: Float = 3.14  <-- Error: Type mismatch (Double != Float)",
            "val x: Float = 3.14f",
            "println(x)"
          ],
          "explanation": "Learned the mandatory f suffix for Float.",
          "output": "68.5"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Convert a Subtotal",
        "paragraphs": [
          "Declare pricePerItem = 12.50 and quantity = 4.0 as Double literals. Their product is subtotal = 50.0.",
          "Call subtotal.toFloat() and store it as val subtotalAsFloat: Float. Print that value to obtain 50.0.",
          "The challenge combines Double arithmetic with an explicit Float conversion. The literal types and the declared result type are all part of its requirements.",
          "Check the order: calculate the subtotal, convert the result, then print the converted value."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val pricePerItem = 12.50",
            "    val quantity = 4.0",
            "    val subtotal = pricePerItem * quantity",
            "    val subtotalAsFloat: Float = subtotal.toFloat()",
            "    println(subtotalAsFloat)",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "50.0"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Total Price Uses Multiplication",
        "paragraphs": [
          "The broken total adds 2.5 and 3.0, yielding 5.5. But one item costs 2.5 and the quantity is 3.0, so addition does not compute the order total.",
          "Change the operator to *. The corrected calculation is 2.5 × 3.0 = 7.5, matching the expected output.",
          "Both literals default to Double because neither has an f suffix. The type is already appropriate; the arithmetic operation is wrong.",
          "Use the labels pricePerItem and quantity to reason about the intended calculation."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val pricePerItem = 2.5",
            "    val quantity = 3.0",
            "    // BUG: adding gives one item's price plus the quantity, not the total cost!",
            "    val total = pricePerItem + quantity",
            "    println(total)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val pricePerItem = 2.5",
            "    val quantity = 3.0",
            "    val total = pricePerItem * quantity",
            "    println(total)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "pricePerItem + quantity only adds 3.0 to 2.5, giving 5.5 -- it never accounts for buying 3 units at $2.5 each. Replacing + with * correctly multiplies 2.5 by 3.0, producing the real total: 7.5. Both values default to Double since neither literal has an f suffix, which is exactly the default behavior this lesson teaches."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val pricePerItem = 2.5",
            "    val quantity = 3.0",
            "    val total = pricePerItem * quantity",
            "    println(total)",
            "}"
          ],
          "explanation": "pricePerItem + quantity only adds 3.0 to 2.5, giving 5.5 -- it never accounts for buying 3 units at $2.5 each. Replacing + with * correctly multiplies 2.5 by 3.0, producing the real total: 7.5. Both values default to Double since neither literal has an f suffix, which is exactly the default behavior this lesson teaches.",
          "output": "7.5"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Assuming a trailing decimal point makes a Float",
        "whyItFails": "A decimal without f or F is Double, regardless of how short its number looks.",
        "correction": "Add f when the actual required type is Float.",
        "badCode": [
          "val tax: Float = 2.0"
        ],
        "fixedCode": [
          "val tax: Float = 2.0f"
        ]
      },
      {
        "mistake": "Expecting f to alter the decimal amount",
        "whyItFails": "The suffix selects Float rather than multiplying or changing the displayed numeric quantity.",
        "correction": "Interpret f as a type marker.",
        "badCode": [
          "val width = 4.5f",
          "// Incorrect expectation: 45.0"
        ],
        "fixedCode": [
          "val width = 4.5f",
          "println(width) // 4.5"
        ]
      },
      {
        "mistake": "Assigning a calculated Double subtotal directly to Float",
        "whyItFails": "A Double result needs an explicit .toFloat() conversion for a Float-typed destination.",
        "correction": "Convert the completed calculation, then assign it.",
        "badCode": [
          "val subtotal = 6.0 * 2.0",
          "val compact: Float = subtotal"
        ],
        "fixedCode": [
          "val subtotal = 6.0 * 2.0",
          "val compact: Float = subtotal.toFloat()"
        ]
      },
      {
        "mistake": "Adding a per-unit decimal price to a unit count",
        "whyItFails": "The sum is not the total for several items; multiply price by quantity.",
        "correction": "Choose * when calculating repeated unit costs.",
        "badCode": [
          "val unitPrice = 1.25",
          "val units = 4.0",
          "val bill = unitPrice + units"
        ],
        "fixedCode": [
          "val unitPrice = 1.25",
          "val units = 4.0",
          "val bill = unitPrice * units"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Double is the default",
        "syntax": "Double",
        "description": "Writing 3.14 creates a Double with 64 bits of precision."
      },
      {
        "term": "Float requires f or F",
        "syntax": "Float",
        "description": "Writing 3.14f creates a Float with 32 bits of precision."
      },
      {
        "term": "High precision",
        "syntax": "High",
        "description": "Double has more than twice the decimal precision of Float."
      },
      {
        "term": "Double by default",
        "syntax": "2.5 * 4.0",
        "description": "Multiplies two Doubles, producing 10.0"
      },
      {
        "term": "Float literal with f",
        "syntax": "68.5f",
        "description": "The f suffix marks it as Float"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-8-1",
        "question": "What type is `temperature`?",
        "options": [
          "Double",
          "Float",
          "Decimal",
          "Int"
        ],
        "correctIndex": 0,
        "explanation": "Decimals without a suffix are always inferred as Double in Kotlin."
      },
      {
        "id": "tutorial-8-2",
        "question": "What type is `factor`?",
        "options": [
          "Float",
          "Double",
          "String",
          "Function"
        ],
        "correctIndex": 0,
        "explanation": "The f suffix explicitly tells the compiler to construct a 32-bit Float."
      },
      {
        "id": "tutorial-8-3",
        "question": "What will happen with this declaration?",
        "options": [
          "Compile error: Type mismatch (Double assigned to Float)",
          "Automatically converts to Float",
          "Warning only",
          "Compiles with no issues"
        ],
        "correctIndex": 0,
        "explanation": "55.0 is a Double. In Kotlin, assigning a Double to a variable typed as Float is a compile error without the trailing f."
      },
      {
        "id": "tutorial-8-4",
        "question": "What does this program print?",
        "options": [
          "68.5",
          "Compile error: Type mismatch",
          "68",
          "68.5f"
        ],
        "correctIndex": 0,
        "explanation": "Kotlin never implicitly widens a Float to a Double, but .toDouble() converts it explicitly, safely producing 68.5 as a Double."
      },
      {
        "id": "tutorial-8-5",
        "question": "What is the exact expected output of ‘Convert a Double Subtotal to Float’?",
        "options": [
          "50.0",
          "50.0!",
          "50.0 ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly '50.0'."
      }
    ]
  },
  {
    "lessonId": "world-1-boolean",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 9,
    "title": "Boolean",
    "subtitle": "True or False: The Boolean Type",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "A Boolean represents a binary truth value: it can only ever be true or false. Booleans are the core foundation of program logic, decision making, conditional branches, and state flags.",
    "toc": [
      {
        "id": "values",
        "label": "Boolean Has Two Literal Values"
      },
      {
        "id": "comparison",
        "label": "Comparisons Produce Booleans"
      },
      {
        "id": "not",
        "label": "Logical NOT Reverses the Value"
      },
      {
        "id": "write",
        "label": "Write & Run: Negate Premium Status"
      },
      {
        "id": "debug",
        "label": "Debug: Sound Is Opposite to Muted"
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
        "id": "values",
        "title": "Boolean Has Two Literal Values",
        "paragraphs": [
          "A Boolean is either true or false. Kotlin does not use numbers such as 0 or 1 as substitute Boolean values in this lesson.",
          "The example assigns true to isLoggedIn and false to hasCompletedTutorial. These unquoted words are Boolean literals.",
          "If you write \"true\" between double quotes, Kotlin treats it as a String instead. The prediction question asks you to notice exactly that distinction.",
          "A Boolean is useful for a flag such as whether a feature is active or a user is logged in."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val active = true",
            "val muted = false",
            "println(active)"
          ],
          "explanation": "Created two clear binary flags.",
          "output": "true"
        }
      },
      {
        "id": "comparison",
        "title": "Comparisons Produce Booleans",
        "paragraphs": [
          "The Explore example evaluates score >= 50 for a score of 85. Since 85 meets the threshold, passed is true.",
          "The prediction compares a = 10 and b = 20 with a > b. Ten is not greater than twenty, so the expression prints false.",
          "These examples introduce comparison results as Boolean values. They do not teach branching syntax; here the result is stored or printed.",
          "To solve a comparison question, evaluate the numeric relation and then report true or false, not the number itself."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val score = 85",
            "val passed = score >= 50",
            "println(passed)"
          ],
          "explanation": "Generated a boolean from a comparison.",
          "output": "true"
        }
      },
      {
        "id": "not",
        "title": "Logical NOT Reverses the Value",
        "paragraphs": [
          "The ! operator negates a Boolean: !true is false and !false is true. The source demonstrates both directions.",
          "For isDark = true, assigning isLight = !isDark makes isLight false. For isReady = false, println(!isReady) prints true.",
          "The exclamation mark belongs immediately before the Boolean expression it reverses. It does not print as a visible character in the output.",
          "When interpreting a flag with an opposite meaning, check whether the assignment needs this reversal."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val isDark = true",
            "val isLight = !isDark",
            "println(isLight)"
          ],
          "explanation": "Toggled state using the NOT operator.",
          "output": "false"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Negate Premium Status",
        "paragraphs": [
          "Declare val isPremium = false. The task asks you to print the negated value, so write println(!isPremium).",
          "Negation turns false into true. The console prints the Boolean word true.",
          "The original variable remains false; this example evaluates its opposite for printing rather than reassigning the val.",
          "The output should not include the exclamation mark, quotation marks, or the variable name."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val isPremium = false",
            "    println(!isPremium)",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "true"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Sound Is Opposite to Muted",
        "paragraphs": [
          "The broken code assigns soundEnabled = isMuted while isMuted is true. Copying it makes soundEnabled true too, which contradicts the intended opposite meaning.",
          "Assign soundEnabled = !isMuted. Negating true produces false, which is the expected printed value.",
          "This is a logic bug: the original code compiles, but its Boolean relationship is wrong.",
          "Read the meaning of each flag before copying it; opposite meanings require the ! operator in this exercise."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val isMuted = true",
            "    // BUG: soundEnabled should be the OPPOSITE of isMuted, not a copy of it!",
            "    val soundEnabled = isMuted",
            "    println(soundEnabled)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val isMuted = true",
            "    val soundEnabled = !isMuted",
            "    println(soundEnabled)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "Copying isMuted directly means soundEnabled ends up true whenever the device is muted -- exactly backwards. Adding the ! negation operator flips true to false, so soundEnabled = !isMuted correctly evaluates to false while isMuted is true."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val isMuted = true",
            "    val soundEnabled = !isMuted",
            "    println(soundEnabled)",
            "}"
          ],
          "explanation": "Copying isMuted directly means soundEnabled ends up true whenever the device is muted -- exactly backwards. Adding the ! negation operator flips true to false, so soundEnabled = !isMuted correctly evaluates to false while isMuted is true.",
          "output": "false"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Negating the printed word instead of a Boolean expression",
        "whyItFails": "The ! operator works on Boolean values; quoted text is a String.",
        "correction": "Apply ! to the unquoted Boolean variable.",
        "badCode": [
          "val online = false",
          "println(!\"online\")"
        ],
        "fixedCode": [
          "val online = false",
          "println(!online)"
        ]
      },
      {
        "mistake": "Using a quoted truth word as a feature flag",
        "whyItFails": "\"false\" is text, not the Boolean false, despite its spelling.",
        "correction": "Remove the quotes when the value should be a Boolean.",
        "badCode": [
          "val enabled: Boolean = \"false\""
        ],
        "fixedCode": [
          "val enabled: Boolean = false"
        ]
      },
      {
        "mistake": "Treating a threshold comparison as the number being tested",
        "whyItFails": "A comparison such as points >= 10 evaluates to true or false, not to the points value.",
        "correction": "Store or print its Boolean result.",
        "badCode": [
          "val points = 12",
          "val qualified = points >= 10",
          "// Incorrect expectation: qualified is 12"
        ],
        "fixedCode": [
          "val points = 12",
          "val qualified = points >= 10",
          "println(qualified) // true"
        ]
      },
      {
        "mistake": "Copying an opposite-status flag unchanged",
        "whyItFails": "If one flag means the reverse of another, direct assignment keeps the same truth value.",
        "correction": "Negate the source when computing the opposite state.",
        "badCode": [
          "val doorOpen = false",
          "val doorClosed = doorOpen"
        ],
        "fixedCode": [
          "val doorOpen = false",
          "val doorClosed = !doorOpen"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Only two values",
        "syntax": "Only",
        "description": "A Boolean can only be true or false (no numbers like 0 or 1 in Kotlin)."
      },
      {
        "term": "Strict boolean type",
        "syntax": "Strict",
        "description": "Kotlin does not treat truthy/falsy values as booleans -- it requires real Booleans."
      },
      {
        "term": "Logical NOT (!)",
        "syntax": "Logical",
        "description": "Inverts a boolean value (!true becomes false)."
      },
      {
        "term": "Direct boolean values",
        "syntax": "true / false",
        "description": "Kotlin reserved keywords for boolean literals"
      },
      {
        "term": "Comparison results in Boolean",
        "syntax": "score >= 50",
        "description": "Evaluates to true because 85 is greater than or equal to 50"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-9-1",
        "question": "What is printed?",
        "options": [
          "true",
          "false",
          "!false",
          "null"
        ],
        "correctIndex": 0,
        "explanation": "! negates false to true."
      },
      {
        "id": "tutorial-9-2",
        "question": "What type is `flag`?",
        "options": [
          "String",
          "Boolean",
          "Char",
          "Bool"
        ],
        "correctIndex": 0,
        "explanation": "\"true\" in quotes is a String literal. A real Boolean must be written without quotes: `val flag = true`."
      },
      {
        "id": "tutorial-9-3",
        "question": "What does `a > b` evaluate to?",
        "options": [
          "false",
          "true",
          "10",
          "20"
        ],
        "correctIndex": 0,
        "explanation": "10 is not greater than 20, so the expression evaluates to the boolean false."
      },
      {
        "id": "tutorial-9-4",
        "question": "What is the exact expected output of ‘Toggle a Feature Flag’?",
        "options": [
          "true",
          "true!",
          "true ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly 'true'."
      }
    ]
  },
  {
    "lessonId": "world-1-char",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 10,
    "title": "Char",
    "subtitle": "Single Characters: The Char Type",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "The Char type represents a single character and is ALWAYS enclosed in single quotes 'A'. This is strictly distinguished from String, which represents sequences of characters and is enclosed in double quotes \"A\".",
    "toc": [
      {
        "id": "single",
        "label": "A Char Is One Quoted Character"
      },
      {
        "id": "quotes",
        "label": "Char Versus String Quotes"
      },
      {
        "id": "escapes",
        "label": "Escaped Characters"
      },
      {
        "id": "write",
        "label": "Write & Run: First Initial"
      },
      {
        "id": "debug",
        "label": "Debug: A Tab Is Not t"
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
        "id": "single",
        "title": "A Char Is One Quoted Character",
        "paragraphs": [
          "Char represents a single character enclosed in single quotes. The examples include the letter 'K', the digit '7', and the symbol '$'.",
          "The digit Char '7' represents a character rather than the whole number 7. Printing a Char displays its visible glyph without its source-code quotes.",
          "A declaration with 'AB' in single quotes fails because it contains more than one character. The prediction question checks this exact restriction.",
          "Use a Char for a single letter, digit character, symbol, or one escaped character taught here."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val letter = 'K'",
            "val digit = '7'",
            "println(letter)"
          ],
          "explanation": "Stored distinct characters safely.",
          "output": "K"
        }
      },
      {
        "id": "quotes",
        "title": "Char Versus String Quotes",
        "paragraphs": [
          "The source contrasts val c: Char = 'A' with val s: String = \"A\". Both display A when printed, but their literal types differ.",
          "Single quotation marks identify the one-character Char. Double quotation marks identify a String, even if it holds only one character.",
          "The valid-literal question therefore chooses 'Z'. The alternatives with double quotes or multiple characters do not fit a Char literal.",
          "Check both the number of characters and the kind of quotation marks before assigning to an explicitly typed Char."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val c: Char = 'A'",
            "val s: String = \"A\"",
            "println(c)"
          ],
          "explanation": "Clarified the distinction between Char and String.",
          "output": "A"
        }
      },
      {
        "id": "escapes",
        "title": "Escaped Characters",
        "paragraphs": [
          "The lesson introduces '\\n' for a newline, '\\t' for a horizontal tab, and '\\\\' for a backslash. Each is represented as one Char despite its escaped spelling in source code.",
          "Putting the newline Char between \"Line1\" and \"Line2\" makes the latter appear on a second line. The backslash-n sequence creates a line break rather than printing its two source characters.",
          "Similarly, a tab Char separates A and B horizontally in the lesson’s example. A plain 't' remains the visible letter t.",
          "The backslash is the part that distinguishes the escape from an ordinary letter."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val newline = '\\n'",
            "println(\"Line1\" + newline + \"Line2\")"
          ],
          "explanation": "Used a different escape character to control line breaks, not just spacing.",
          "output": "Line1\nLine2"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: First Initial",
        "paragraphs": [
          "Declare val initial: Char = 'K' and print initial. The visible output is K.",
          "The exercise uses an explicit Char annotation and a valid single-quoted, one-character literal.",
          "Kotlin does not display the single quotes around the printed letter. They belong to the declaration’s syntax.",
          "Keep the exact uppercase initial requested by the exercise."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val initial: Char = 'K'",
            "    println(initial)",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "K"
        }
      },
      {
        "id": "debug",
        "title": "Debug: A Tab Is Not t",
        "paragraphs": [
          "The broken program declares separator: Char = 't'. That is the letter t, so the output would place a t between Name: and Score.",
          "Change the literal to '\\t'. This escaped Char represents a tab, producing the expected separation between the labels.",
          "The variable is already a Char and the surrounding concatenation is appropriate. Only the literal needs the missing backslash.",
          "When an output separator appears as a letter, inspect whether the source intended an escape sequence."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    // BUG: this should be a tab escape, not the plain letter t!",
            "    val separator: Char = 't'",
            "    println(\"Name:\" + separator + \"Score\")",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val separator: Char = '\\t'",
            "    println(\"Name:\" + separator + \"Score\")",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "'t' is a single Char holding the letter t -- Kotlin has no way to know you meant \"tab\" without the backslash. '\\t' is the escape sequence for an actual tab character. Since separator was declared as a single Char, only one escape sequence (or one literal character) can go inside the quotes; adding the backslash fixes the value without changing anything else."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val separator: Char = '\\t'",
            "    println(\"Name:\" + separator + \"Score\")",
            "}"
          ],
          "explanation": "'t' is a single Char holding the letter t -- Kotlin has no way to know you meant \"tab\" without the backslash. '\\t' is the escape sequence for an actual tab character. Since separator was declared as a single Char, only one escape sequence (or one literal character) can go inside the quotes; adding the backslash fixes the value without changing anything else.",
          "output": "Name:\tScore"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Assigning a double-quoted one-letter value to Char",
        "whyItFails": "Length alone does not determine the literal type; double quotes make a String.",
        "correction": "Use single quotes for a Char.",
        "badCode": [
          "val rank: Char = \"B\""
        ],
        "fixedCode": [
          "val rank: Char = 'B'"
        ]
      },
      {
        "mistake": "Putting two visible symbols into a single Char",
        "whyItFails": "A Char literal holds exactly one character, not a short text label.",
        "correction": "Use a String for multiple symbols.",
        "badCode": [
          "val badge = '++'"
        ],
        "fixedCode": [
          "val badge = \"++\""
        ]
      },
      {
        "mistake": "Expecting println to display the Char delimiter quotes",
        "whyItFails": "Single quotes mark the Char in source code and are not part of its printed glyph.",
        "correction": "Expect the character itself; add literal quotes separately only if the output requires them.",
        "badCode": [
          "val grade = 'B'",
          "// Incorrect expectation: 'B'"
        ],
        "fixedCode": [
          "val grade = 'B'",
          "println(grade) // B"
        ]
      },
      {
        "mistake": "Using the letter n when a line break is needed",
        "whyItFails": "The plain Char n is visible text; the escaped Char \\n produces the newline.",
        "correction": "Put the backslash into the escaped Char literal.",
        "badCode": [
          "val separator: Char = 'n'",
          "println(\"Top\" + separator + \"Bottom\")"
        ],
        "fixedCode": [
          "val separator: Char = '\\n'",
          "println(\"Top\" + separator + \"Bottom\")"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Single quotes only",
        "syntax": "Single",
        "description": "Char literals must be enclosed in single quotes: 'X'."
      },
      {
        "term": "Exactly one character",
        "syntax": "Exactly",
        "description": "Single quotes cannot contain multiple characters (e.g. 'AB' is illegal)."
      },
      {
        "term": "Special escape characters",
        "syntax": "Special",
        "description": "'\\n' (newline), '\\t' (tab), and '\\\\' (backslash) are valid single characters."
      },
      {
        "term": "Letters, digits, and symbols",
        "syntax": "'K'",
        "description": "The uppercase letter K as a Char"
      },
      {
        "term": "Char vs String comparison",
        "syntax": "'A'",
        "description": "A single 16-bit Unicode character"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-10-1",
        "question": "Which of the following is a valid Char literal in Kotlin?",
        "options": [
          "'Z'",
          "\"Z\"",
          "'Kotlin'",
          "`Z`"
        ],
        "correctIndex": 0,
        "explanation": "Char literals require single quotation marks around exactly one character."
      },
      {
        "id": "tutorial-10-2",
        "question": "What happens when compiling this line?",
        "options": [
          "Compile error: too many characters in a character literal",
          "Inferred as String",
          "Takes only the first character 'A'",
          "Creates an array of characters"
        ],
        "correctIndex": 0,
        "explanation": "Single quotes can only ever hold a single character. For multiple characters, use double quotes (\"AB\")."
      },
      {
        "id": "tutorial-10-3",
        "question": "What is printed?",
        "options": [
          "5",
          "'5'",
          "53 (ASCII code)",
          "Error"
        ],
        "correctIndex": 0,
        "explanation": "println outputs the character glyph '5' without the surrounding single quotes."
      },
      {
        "id": "tutorial-10-4",
        "question": "What does this print?",
        "options": [
          "Line1 and Line2 on two separate lines",
          "Line1\\nLine2 (with the literal backslash-n visible)",
          "Line1Line2 (joined with no separator)",
          "Compile error"
        ],
        "correctIndex": 0,
        "explanation": "The escape sequence \\n represents an actual line-break character, not the two visible characters \"\\\" and \"n\". Concatenating it between the two strings forces Line2 onto its own line."
      },
      {
        "id": "tutorial-10-5",
        "question": "What is the exact expected output of ‘Print a First Initial’?",
        "options": [
          "K",
          "K!",
          "K ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly 'K'."
      }
    ]
  },
  {
    "lessonId": "world-1-string",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 11,
    "title": "Strings",
    "subtitle": "Working with Text: Strings",
    "badge": "BEGINNER",
    "readTime": "3 min",
    "overviewSummary": "In Kotlin, text is represented by the String type. Strings are enclosed in double quotes \"...\". You can check a string's character count using .length, combine strings with +, and create multi-line strings with triple quotes \"\"\"...\"\"\".",
    "toc": [
      {
        "id": "text",
        "label": "String Text and Length"
      },
      {
        "id": "combine",
        "label": "Combine Strings With +"
      },
      {
        "id": "raw",
        "label": "Triple-Quoted Multiline Strings"
      },
      {
        "id": "write",
        "label": "Write & Run: Combined Title"
      },
      {
        "id": "debug",
        "label": "Debug: Close the Single-Line String"
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
        "id": "text",
        "title": "String Text and Length",
        "paragraphs": [
          "A String holds text between double quotes. The lesson first shows val greeting = \"Hello\" and reads its .length property.",
          ".length gives the number of characters: \"Kotlin\" has length 6, and \"Hi!\" has length 3 because punctuation counts.",
          "The empty String \"\" has length 0. Its two quote marks delimit the value but are not characters inside it.",
          "For the length questions, count the actual characters between the quotes rather than the source-code quotation marks."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val word = \"Kotlin\"",
            "println(word.length)"
          ],
          "explanation": "Measured text length directly.",
          "output": "6"
        }
      },
      {
        "id": "combine",
        "title": "Combine Strings With +",
        "paragraphs": [
          "The + operator joins Strings. The Explore example combines \"Code\" and \"Do\" to produce CodeDo, with no automatic space.",
          "To create Hello World or Kotlin Awakening, place a separate \" \" between the two pieces. That quoted space supplies the gap in the final output.",
          "The prediction also joins a String with the Int 5: \"Level \" + 5 prints Level 5 because the number becomes text in that combination.",
          "Keep this lesson’s focus on concatenation. The following lesson teaches String templates as a different way to insert values."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val first = \"Code\"",
            "val second = \"Do\"",
            "println(first + second)"
          ],
          "explanation": "Combined two strings together.",
          "output": "CodeDo"
        }
      },
      {
        "id": "raw",
        "title": "Triple-Quoted Multiline Strings",
        "paragraphs": [
          "Triple quotes start and end the raw multiline String shown in Explore. Text can occupy more than one line within those markers.",
          "The example puts LINE 1 and LINE 2 in a banner and then calls .trimIndent() before printing it.",
          "The source explains that trimIndent removes common leading whitespace and the leading or trailing blank lines that the written raw String would otherwise retain.",
          "This is the scope of raw Strings here: recognize the triple-quote form and why the example trims indentation. No other raw-string behavior is needed for the exercise."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val banner = \"\"\"",
            "  LINE 1",
            "  LINE 2",
            "\"\"\".trimIndent()",
            "println(banner)"
          ],
          "explanation": "Wrote multiple lines of text without \\n, then trimmed the indentation raw strings preserve by default.",
          "output": "LINE 1\nLINE 2"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Combined Title",
        "paragraphs": [
          "Declare prefix = \"Kotlin\" and suffix = \"Awakening\". Print prefix + \" \" + suffix.",
          "The inserted String containing one space is essential; joining only prefix + suffix would display KotlinAwakening.",
          "The expected output is exactly Kotlin Awakening, with the space and capitalization shown.",
          "The exercise practices joining known text pieces rather than using the templates that the next lesson covers."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val prefix = \"Kotlin\"",
            "    val suffix = \"Awakening\"",
            "    println(prefix + \" \" + suffix)",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "Kotlin Awakening"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Close the Single-Line String",
        "paragraphs": [
          "The broken motto begins with a double quote before Learn Kotlin but lacks the closing double quote on that line.",
          "Add the quote after Kotlin, producing val motto = \"Learn Kotlin\". Printing it then yields Learn Kotlin.",
          "The lesson’s debugging explanation specifies that this single-line String must open and close on the same line.",
          "Distinguish the corrected ordinary String from the triple-quoted multiline String discussed in Explore."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val motto = \"Learn Kotlin",
            "    println(motto)",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val motto = \"Learn Kotlin\"",
            "    println(motto)",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "Single-line strings must begin and end with double quotes on the same line."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val motto = \"Learn Kotlin\"",
            "    println(motto)",
            "}"
          ],
          "explanation": "Single-line strings must begin and end with double quotes on the same line.",
          "output": "Learn Kotlin"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Counting the source quotation marks in String length",
        "whyItFails": "Delimiters are outside the String content and do not contribute to .length.",
        "correction": "Count only characters between the quotes.",
        "badCode": [
          "val label = \"Go\"",
          "// Incorrect expectation: length is 4"
        ],
        "fixedCode": [
          "val label = \"Go\"",
          "println(label.length) // 2"
        ]
      },
      {
        "mistake": "Expecting + to insert a word separator",
        "whyItFails": "String concatenation joins the actual content of both sides with no automatic space.",
        "correction": "Include \" \" explicitly where the output needs a gap.",
        "badCode": [
          "println(\"Good\" + \"Day\")"
        ],
        "fixedCode": [
          "println(\"Good\" + \" \" + \"Day\")"
        ]
      },
      {
        "mistake": "Treating a String with one space as empty",
        "whyItFails": "\" \" contains one space character; it differs from \"\", which has zero characters.",
        "correction": "Inspect what appears between the quotes before predicting length.",
        "badCode": [
          "val gap = \" \"",
          "// Incorrect expectation: gap.length is 0"
        ],
        "fixedCode": [
          "val gap = \" \"",
          "println(gap.length) // 1"
        ]
      },
      {
        "mistake": "Using ordinary double quotes for a multiline banner",
        "whyItFails": "The lesson’s multiline example uses triple quotes and trims its indentation.",
        "correction": "Use the triple-quoted form shown in the source for text spanning lines.",
        "badCode": [
          "val banner = \"TOP",
          "BOTTOM\""
        ],
        "fixedCode": [
          "val banner = \"\"\"",
          "TOP",
          "BOTTOM",
          "\"\"\".trimIndent()"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Double quotes",
        "syntax": "Double",
        "description": "Strings are wrapped in double quotes: \"Hello\"."
      },
      {
        "term": ".length property",
        "syntax": ".length",
        "description": "Returns the exact number of characters in the string."
      },
      {
        "term": "Multi-line strings (\"\"\")",
        "syntax": "Multi-line",
        "description": "Triple quotes create multiline raw strings without escape characters."
      },
      {
        "term": "String length",
        "syntax": "word.length",
        "description": "Returns 6 (the number of letters in \"Kotlin\")"
      },
      {
        "term": "String concatenation with +",
        "syntax": "first + second",
        "description": "Produces \"CodeDo\""
      }
    ],
    "quiz": [
      {
        "id": "tutorial-11-1",
        "question": "What does this code print?",
        "options": [
          "3",
          "2",
          "4",
          "Hi!"
        ],
        "correctIndex": 0,
        "explanation": "\"Hi!\" has 3 characters: 'H', 'i', and '!'."
      },
      {
        "id": "tutorial-11-2",
        "question": "What is printed?",
        "options": [
          "Level 5",
          "Level + 5",
          "Error",
          "Level"
        ],
        "correctIndex": 0,
        "explanation": "When concatenating a String with an Int, Kotlin automatically converts the number to text."
      },
      {
        "id": "tutorial-11-3",
        "question": "What is the length of an empty string `\"\"`?",
        "options": [
          "0",
          "1",
          "-1",
          "null"
        ],
        "correctIndex": 0,
        "explanation": "An empty string contains zero characters, so .length returns 0."
      },
      {
        "id": "tutorial-11-4",
        "question": "What is the exact expected output of ‘Print Combined Title’?",
        "options": [
          "Kotlin Awakening",
          "Kotlin Awakening!",
          "Kotlin Awakening ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly 'Kotlin Awakening'."
      }
    ]
  },
  {
    "lessonId": "world-1-string-templates",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 12,
    "title": "String Templates",
    "subtitle": "Clean Interpolation: String Templates",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Instead of clumsy + concatenation, Kotlin provides String Templates. Simply insert a $ followed by a variable name right inside the string: \"$name\". For expressions or math, wrap it in curly braces: \"${score + 10}\".",
    "toc": [
      {
        "id": "variable",
        "label": "Insert a Variable With $name"
      },
      {
        "id": "expression",
        "label": "Use ${...} for an Expression"
      },
      {
        "id": "dollar",
        "label": "Print a Literal Dollar Sign"
      },
      {
        "id": "write",
        "label": "Write & Run: User Summary"
      },
      {
        "id": "debug",
        "label": "Debug: Brace the Property Access"
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
        "id": "variable",
        "title": "Insert a Variable With $name",
        "paragraphs": [
          "Inside a double-quoted String, place $ immediately before a variable name to insert its value. With language = \"Kotlin\", \"We are learning $language!\" displays We are learning Kotlin!.",
          "The source also shows a player and level placed in one message. Both names are replaced with their assigned values when the String is built.",
          "In the city prediction, $city becomes Paris rather than remaining the literal characters $city. The surrounding welcome text stays as written.",
          "This section teaches simple variable insertion; the preceding Strings lesson already covered combining values with +."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val language = \"Kotlin\"",
            "println(\"We are learning $language!\")"
          ],
          "explanation": "Replaced string concatenation with a clean template.",
          "output": "We are learning Kotlin!"
        }
      },
      {
        "id": "expression",
        "title": "Use ${...} for an Expression",
        "paragraphs": [
          "Braces around a template expression cause Kotlin to evaluate the expression and insert its result. With count = 3 and price = 10, ${count * price} becomes 30.",
          "Compare \"$count + 1\" with \"${count + 1}\" when count is 5. The first prints 5 + 1 because only count is replaced; the second evaluates the addition and prints 6.",
          "Use ${name.length} to insert a property value. The lesson’s Sam example embeds the name with $name and its length with braces.",
          "The braces mark the full expression to evaluate. Without them, text following a simple variable name can remain ordinary String content."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val count = 3",
            "val price = 10",
            "println(\"Total: ${count * price}\")"
          ],
          "explanation": "Evaluated arithmetic right inside the text.",
          "output": "Total: 30"
        }
      },
      {
        "id": "dollar",
        "title": "Print a Literal Dollar Sign",
        "paragraphs": [
          "When a regular String should show a dollar sign rather than start interpolation, escape it as \\$ in Kotlin source.",
          "The source’s \"Price: \\$price\" displays Price: $price, not Price: 25. The backslash prevents $price from substituting the variable’s value.",
          "The Learn stage also mentions using ${'$'} in a raw String where backslash escapes do not work. Recognize this as the raw-String alternative named by the lesson.",
          "First decide whether you want the variable’s value or the literal dollar characters; then choose the appropriate form."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val price = 25",
            "println(\"Price: \\$price\")"
          ],
          "explanation": "Printed a literal $ sign instead of triggering interpolation.",
          "output": "Price: $price"
        }
      },
      {
        "id": "write",
        "title": "Write & Run: User Summary",
        "paragraphs": [
          "Given name = \"Kai\" and points = 95, place both values inside one quoted sentence with $name and $points.",
          "The solution prints \"$name scored $points points!\". After substitution, the exact output is Kai scored 95 points!.",
          "Keep the spaces, lowercase scored and points, and final exclamation mark inside the quoted String.",
          "This exercise uses simple variable templates because there is no calculation or property access in its message."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val name = \"Kai\"",
            "    val points = 95",
            "    println(\"$name scored $points points!\")",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "Kai scored 95 points!"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Brace the Property Access",
        "paragraphs": [
          "The broken output uses $item.length after item = \"CodeDo\". The intended result is the length of the item, which is 6.",
          "Wrap the property access as ${item.length}. The repaired statement prints Length: 6.",
          "The simple $item form replaces the variable value; the braces are needed here to evaluate the .length property as part of the template.",
          "This is a logic error in the constructed message. The repair changes the template expression, not the value stored in item."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val item = \"CodeDo\"",
            "    // Expects: \"Length: 6\"",
            "    println(\"Length: $item.length\")",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val item = \"CodeDo\"",
            "    println(\"Length: ${item.length}\")",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "To access properties or methods inside a string template, wrap the entire expression in curly braces `${item.length}`."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val item = \"CodeDo\"",
            "    println(\"Length: ${item.length}\")",
            "}"
          ],
          "explanation": "To access properties or methods inside a string template, wrap the entire expression in curly braces `${item.length}`.",
          "output": "Length: 6"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Leaving the dollar sign out of a variable template",
        "whyItFails": "Without $, the variable name is ordinary text in the String.",
        "correction": "Prefix the variable name with $ when its value should appear.",
        "badCode": [
          "val pet = \"Milo\"",
          "println(\"Hello, pet\")"
        ],
        "fixedCode": [
          "val pet = \"Milo\"",
          "println(\"Hello, $pet\")"
        ]
      },
      {
        "mistake": "Expecting arithmetic after a simple template to be evaluated",
        "whyItFails": "Only the variable following $ is inserted; surrounding operators remain text without ${...}.",
        "correction": "Wrap the entire calculation in braces.",
        "badCode": [
          "val lives = 3",
          "println(\"Remaining: $lives - 1\")"
        ],
        "fixedCode": [
          "val lives = 3",
          "println(\"Remaining: ${lives - 1}\")"
        ]
      },
      {
        "mistake": "Using expression braces without the dollar sign",
        "whyItFails": "Braces alone are ordinary characters within a String, so the expression is not interpolated.",
        "correction": "Put $ immediately before the opening brace.",
        "badCode": [
          "val items = 2",
          "println(\"Total: {items * 5}\")"
        ],
        "fixedCode": [
          "val items = 2",
          "println(\"Total: ${items * 5}\")"
        ]
      },
      {
        "mistake": "Escaping $ when a value should be inserted",
        "whyItFails": "\\$ prints the dollar sign literally rather than reading the following variable.",
        "correction": "Remove the backslash when interpolation is intended.",
        "badCode": [
          "val fee = 7",
          "println(\"Fee: \\$fee\")"
        ],
        "fixedCode": [
          "val fee = 7",
          "println(\"Fee: $fee\")"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Simple variable: $name",
        "syntax": "Simple",
        "description": "Drop $ directly before a variable name inside double quotes."
      },
      {
        "term": "Expression: ${a + b}",
        "syntax": "Expression:",
        "description": "Use curly braces ${...} to evaluate math, function calls, or property accesses."
      },
      {
        "term": "Escaping the dollar sign",
        "syntax": "Escaping",
        "description": "To print a literal $ sign, escape it as \\$ (or, inside a raw string where \\ escapes don't work, use ${'$'})."
      },
      {
        "term": "Embedding a variable",
        "syntax": "$language",
        "description": "Replaced with \"Kotlin\" yielding \"We are learning Kotlin!\""
      },
      {
        "term": "Expression template ${...}",
        "syntax": "${count * price}",
        "description": "Evaluates 3 * 10 = 30 and places 30 into the string"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-12-1",
        "question": "What does this program print?",
        "options": [
          "Welcome to Paris!",
          "Welcome to $city!",
          "Welcome to \"Paris\"!",
          "Error"
        ],
        "correctIndex": 0,
        "explanation": "$city is evaluated and replaced by its value: \"Paris\"."
      },
      {
        "id": "tutorial-12-2",
        "question": "What will this print without curly braces?",
        "options": [
          "5 + 1",
          "6",
          "$count + 1",
          "Error"
        ],
        "correctIndex": 0,
        "explanation": "Without curly braces, only $count is interpolated (yielding 5), and \" + 1\" is treated as literal text."
      },
      {
        "id": "tutorial-12-3",
        "question": "What does this print with `${count + 1}`?",
        "options": [
          "6",
          "5 + 1",
          "51",
          "${6}"
        ],
        "correctIndex": 0,
        "explanation": "The curly braces evaluate the expression count + 1 (5 + 1 = 6) before placing it in the string."
      },
      {
        "id": "tutorial-12-4",
        "question": "What does this print?",
        "options": [
          "Price: $price",
          "Price: 25",
          "Price: ${price}",
          "Compile error"
        ],
        "correctIndex": 0,
        "explanation": "The backslash escapes the dollar sign, so it prints as literal text -- \"$\" followed by the plain characters \"price\" -- instead of interpolating the price variable."
      },
      {
        "id": "tutorial-12-5",
        "question": "What is the exact expected output of ‘Format a User Summary’?",
        "options": [
          "Kai scored 95 points!",
          "Kai scored 95 points!!",
          "Kai scored 95 points! ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly 'Kai scored 95 points!'."
      }
    ]
  },
  {
    "lessonId": "world-1-boss",
    "aliasKeys": [],
    "worldNumber": 1,
    "lessonNumber": 13,
    "title": "Personal Profile Program",
    "subtitle": "World 1 Boss: Personal Profile Program",
    "badge": "BEGINNER",
    "readTime": "4 min",
    "overviewSummary": "Congratulations on reaching the World 1 Boss! You will now assemble everything you learned in Kotlin Awakening: val and var, data types (Int, Double, Boolean, Char, String), and string templates to construct a complete profile generator.",
    "toc": [
      {
        "id": "types",
        "label": "Bring the Types Together"
      },
      {
        "id": "state",
        "label": "Update a Mutable Value"
      },
      {
        "id": "format",
        "label": "Format a Console Profile"
      },
      {
        "id": "write",
        "label": "Write & Run: Personal Profile"
      },
      {
        "id": "debug",
        "label": "Debug: Two Literal Errors"
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
        "id": "types",
        "title": "Bring the Types Together",
        "paragraphs": [
          "This boss lesson combines the foundational values already taught: String, Int, Double, Boolean, and Char. Its introductory profile declares a name, level, rank, score, and active flag.",
          "A Char such as 'S' uses single quotes, while a String such as \"Dev\" uses double quotes. The score 98.5 is Double and the active status true is Boolean.",
          "The Explore example then places a String name, a Char badge, and an Int level in one template, yielding a compact display.",
          "This is integration of earlier lessons rather than a new deep dive into each type."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "val name = \"Kora\"",
            "val badge = '★'",
            "val level = 10",
            "println(\"$name $badge (Lvl $level)\")"
          ],
          "explanation": "Unified multiple distinct data types.",
          "output": "Kora ★ (Lvl 10)"
        }
      },
      {
        "id": "state",
        "title": "Update a Mutable Value",
        "paragraphs": [
          "The introduction declares a mutable level with var. The Explore activity starts xp at 1000 and applies xp += 250, then prints the updated XP.",
          "The prediction program begins at level 1, reassigns it to 2, and inserts the later value in @alex: Level 2.",
          "Use val for profile details that stay assigned as declared and var for a number that must change before the final summary.",
          "In the boss exercise, score is var because a bonus is added before checking whether the learner passed."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "var xp = 1000",
            "xp += 250",
            "println(\"XP: $xp\")"
          ],
          "explanation": "Demonstrated state mutation within a profile.",
          "output": "XP: 1250"
        }
      },
      {
        "id": "format",
        "title": "Format a Console Profile",
        "paragraphs": [
          "String templates place several values in a readable report. The introductory program prints a header and lines containing name, rank, level, score, and active status.",
          "The Explore report shows repeated equals signs around PROFILE COMPLETE. Each println produces its own line in that console banner.",
          "The prediction combines a Char @, a String user, and an updated numeric level in one template. No quotation marks from the declarations appear in the visible result.",
          "A separate score example evaluates 9.5 >= 5.0 as true before printing Passed: true (9.5/10). Track calculations before reading the final template."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "println(\"=================\")",
            "println(\"PROFILE COMPLETE\")",
            "println(\"=================\")"
          ],
          "explanation": "Crafted production-ready terminal output.",
          "output": "=================\nPROFILE COMPLETE\n================="
        }
      },
      {
        "id": "write",
        "title": "Write & Run: Personal Profile",
        "paragraphs": [
          "Declare name = \"CodeDo\", grade = 'A', score = 88 as var, and bonus = 12. Apply score += bonus so the score becomes 100.",
          "Then compute val passed: Boolean = score >= 90. Since 100 meets that threshold, passed is true.",
          "Insert all four final values into the required profile message using String templates. The output is User: CodeDo | Grade: A | Score: 100 | Passed: true.",
          "Work in execution order: update score before calculating passed, then construct the final line. Otherwise the printed score and pass flag would not reflect the bonus."
        ],
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val name = \"CodeDo\"",
            "    val grade = 'A'",
            "    var score = 88",
            "    val bonus = 12",
            "    score += bonus",
            "    val passed: Boolean = score >= 90",
            "    println(\"User: $name | Grade: $grade | Score: $score | Passed: $passed\")",
            "}"
          ],
          "explanation": "This implements the Write & Run task using the lesson’s required values and operations.",
          "output": "User: CodeDo | Grade: A | Score: 100 | Passed: true"
        }
      },
      {
        "id": "debug",
        "title": "Debug: Two Literal Errors",
        "paragraphs": [
          "The broken program has two independent mistakes. The String assigned to name starts with a double quote but has no closing double quote.",
          "It also assigns \"S\" to tier: Char. Double quotes produce a String, while this explicitly typed Char requires the single-quoted literal 'S'.",
          "Close the name as \"Hero\" and change the tier to 'S'. With both corrections, the template prints Name: Hero, Tier: S.",
          "Fix both the String syntax error and the Char type mismatch before expecting the capstone program to compile."
        ],
        "comparison": {
          "leftTitle": "Broken",
          "leftCode": [
            "fun main() {",
            "    val name: String = \"Hero",
            "    val tier: Char = \"S\"",
            "    println(\"Name: $name, Tier: $tier\")",
            "}"
          ],
          "leftTag": "BROKEN",
          "rightTitle": "Repaired",
          "rightCode": [
            "fun main() {",
            "    val name: String = \"Hero\"",
            "    val tier: Char = 'S'",
            "    println(\"Name: $name, Tier: $tier\")",
            "}"
          ],
          "rightTag": "FIXED",
          "verdict": "String literals require closing double quotes, and Char literals must be wrapped in single quotes."
        },
        "codeSnippet": {
          "language": "Kotlin",
          "code": [
            "fun main() {",
            "    val name: String = \"Hero\"",
            "    val tier: Char = 'S'",
            "    println(\"Name: $name, Tier: $tier\")",
            "}"
          ],
          "explanation": "String literals require closing double quotes, and Char literals must be wrapped in single quotes.",
          "output": "Name: Hero, Tier: S"
        }
      }
    ],
    "gotchas": [
      {
        "mistake": "Building the summary before updating a mutable field",
        "whyItFails": "The report will reflect the earlier value if the update has not happened before the printing statement.",
        "correction": "Apply the planned update first, then print the summary.",
        "badCode": [
          "var attempts = 1",
          "println(\"Attempts: $attempts\")",
          "attempts += 1"
        ],
        "fixedCode": [
          "var attempts = 1",
          "attempts += 1",
          "println(\"Attempts: $attempts\")"
        ]
      },
      {
        "mistake": "Computing a pass flag before a score bonus",
        "whyItFails": "A comparison uses the score at the moment it runs; an earlier flag is not automatically recalculated after a later score change.",
        "correction": "Apply the bonus before computing the Boolean flag.",
        "badCode": [
          "var marks = 75",
          "val passed = marks >= 80",
          "marks += 10"
        ],
        "fixedCode": [
          "var marks = 75",
          "marks += 10",
          "val passed = marks >= 80"
        ]
      },
      {
        "mistake": "Choosing val for a profile field that will be updated",
        "whyItFails": "A field that needs a new assignment, such as an experience total, must be declared var.",
        "correction": "Use val for fixed details and var for the one field you will update.",
        "badCode": [
          "val xp = 20",
          "xp += 5"
        ],
        "fixedCode": [
          "var xp = 20",
          "xp += 5"
        ]
      },
      {
        "mistake": "Combining type-correct fields into a line with missing separators",
        "whyItFails": "Even correct values make the wrong report when spaces or punctuation required by the output are omitted.",
        "correction": "Write the separators directly into the String template.",
        "badCode": [
          "val name = \"Rae\"",
          "val rank = 'A'",
          "println(\"Name:$name,Rank:$rank\")"
        ],
        "fixedCode": [
          "val name = \"Rae\"",
          "val rank = 'A'",
          "println(\"Name: $name, Rank: $rank\")"
        ]
      }
    ],
    "cheatsheet": [
      {
        "term": "Combine all fundamental types",
        "syntax": "Combine",
        "description": "String, Int, Double, Boolean, and Char working together in harmony."
      },
      {
        "term": "Clean template formatting",
        "syntax": "Clean",
        "description": "Use string templates to output complex multiline profile summaries."
      },
      {
        "term": "World 1 Mastery",
        "syntax": "World",
        "description": "Proves you can write standalone, syntactically correct Kotlin applications."
      },
      {
        "term": "Data types in harmony",
        "syntax": "String + Char + Int",
        "description": "Combined seamlessly via string templates"
      },
      {
        "term": "State updates",
        "syntax": "xp += 250",
        "description": "Updates mutable var state"
      }
    ],
    "quiz": [
      {
        "id": "tutorial-13-1",
        "question": "What will this profile program output?",
        "options": [
          "@alex: Level 2",
          "@alex: Level 1",
          "$tag$user: Level $level",
          "Compile error"
        ],
        "correctIndex": 0,
        "explanation": "tag ('@') and user (\"alex\") and the updated level (2) interpolate cleanly to \"@alex: Level 2\"."
      },
      {
        "id": "tutorial-13-2",
        "question": "What is printed?",
        "options": [
          "Passed: true (9.5/10)",
          "Passed: false (9.5/10)",
          "Passed: true (10/10)",
          "Passed: 9.5"
        ],
        "correctIndex": 0,
        "explanation": "9.5 is >= 5.0, so passed is true, printing \"Passed: true (9.5/10)\"."
      },
      {
        "id": "tutorial-13-3",
        "question": "In Kotlin, which statement best defines the difference between val and var?",
        "options": [
          "val cannot be reassigned once set; var can be reassigned",
          "val is for numbers; var is for text",
          "val is only used inside main(); var is used anywhere",
          "val variables require explicit types; var never does"
        ],
        "correctIndex": 0,
        "explanation": "val defines read-only references; var defines mutable variables that can be reassigned."
      },
      {
        "id": "tutorial-13-4",
        "question": "What is the exact expected output of ‘Build the Personal Profile Program’?",
        "options": [
          "User: CodeDo | Grade: A | Score: 100 | Passed: true",
          "User: CodeDo | Grade: A | Score: 100 | Passed: true!",
          "User: CodeDo | Grade: A | Score: 100 | Passed: true ",
          "No output"
        ],
        "correctIndex": 0,
        "explanation": "The lesson’s Write & Run solution produces exactly 'User: CodeDo | Grade: A | Score: 100 | Passed: true'."
      }
    ]
  }
];
