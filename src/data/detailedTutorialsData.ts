import type { FiveStageLesson } from './lessonStagesData';

export interface TutorialSection {
  id: string;
  title: string;
  icon?: string;
  badge?: string;
  paragraphs: string[];
  codeSnippet?: {
    title?: string;
    language?: string;
    code: string[];
    explanation?: string;
    output?: string;
  };
  comparison?: {
    leftTitle: string;
    leftCode: string[];
    leftTag?: string;
    rightTitle: string;
    rightCode: string[];
    rightTag?: string;
    verdict?: string;
  };
  callout?: {
    type: 'tip' | 'warning' | 'info' | 'key';
    title: string;
    message: string;
  };
  bulletPoints?: {
    title: string;
    desc: string;
  }[];
  flowChart?: {
    variant?: 'if-else' | 'if-only' | 'compiler-filter' | 'while-loop';
    title?: string;
    subtitle?: string;
    conditionText?: string;
    trueLabel?: string;
    falseLabel?: string;
    ifBlockText?: string;
    elseBlockText?: string;
    startLabel?: string;
    endLabel?: string;
    sampleCode?: {
      condition: string;
      ifBody: string;
      elseBody?: string;
    };
  };
}

export interface TutorialGotcha {
  mistake: string;
  whyItFails: string;
  badCode?: string[];
  fixedCode?: string[];
  correction: string;
}

export interface TutorialCheatsheetItem {
  term: string;
  syntax: string;
  description: string;
}

export interface TutorialQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DetailedTutorialData {
  lessonId: string;
  aliasKeys: string[];
  worldNumber: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  readTime: string;
  overviewSummary: string;
  toc: { id: string; label: string }[];
  sections: TutorialSection[];
  gotchas: TutorialGotcha[];
  cheatsheet: TutorialCheatsheetItem[];
  quiz: TutorialQuizQuestion[];
}

export const DETAILED_TUTORIALS: Record<string, DetailedTutorialData> = {
  // =========================================================================
  // WORLD 1 -> LESSON 1: What is Kotlin?
  // =========================================================================
  'world-1-what-is-kotlin': {
    lessonId: 'world-1-what-is-kotlin',
    aliasKeys: ['what-is-kotlin', 'world-1-lesson-1'],
    worldNumber: 1,
    lessonNumber: 1,
    title: 'What is Kotlin?',
    subtitle: 'The Modern, Safe & Multiplatform Language for Android, Backend, and Beyond',
    badge: 'WORLD 1 · LESSON 1 DEEP DIVE',
    readTime: '4 min read',
    overviewSummary:
      'Kotlin is a concise, expressive, and type-safe programming language developed by JetBrains. Google named it an official Android language in 2017 and announced "Kotlin-First" in 2019. It runs on the Java Virtual Machine (JVM), compiles to native code via Kotlin Multiplatform (KMP), and delivers 100% interoperability with Java.',
    toc: [
      { id: 'origin', label: 'Origins & Vision' },
      { id: 'core-pillars', label: 'Four Pillars' },
      { id: 'how-it-runs', label: 'Compilation & JVM' },
      { id: 'kotlin-vs-java', label: 'Kotlin vs Java' },
      { id: 'ecosystem', label: 'Where It Runs' },
      { id: 'gotchas', label: 'Common Myths' },
      { id: 'cheatsheet', label: 'Quick Reference' },
      { id: 'quiz', label: 'Knowledge Check' }
    ],
    sections: [
      {
        id: 'origin',
        title: 'The Origin Story & Why JetBrains Built Kotlin',
        icon: 'history_edu',
        badge: 'BACKGROUND',
        paragraphs: [
          'In 2010, JetBrains (the Prague-based developer tools company behind IntelliJ IDEA, WebStorm, and Android Studio) hit a major productivity wall with Java. Java was rock-solid and mature, but required staggering amounts of repetitive boilerplate code. Modern language features like type inference, lambdas, and null-safety were either absent or clumsy.',
          'JetBrains surveyed existing JVM alternatives like Scala and Groovy, but found Scala\'s compilation times too slow and Groovy lacked the strict compile-time type safety required for massive enterprise codebases. So in 2011, they unveiled Project Kotlin — named after Kotlin Island near Saint Petersburg.',
          'Their core goal was pragmatic: create an industrial-strength, general-purpose language with lightning-fast compilation, uncompromising type safety, and seamless 100% two-way interoperability with Java.'
        ],
        callout: {
          type: 'key',
          title: 'Google\'s Historic Milestone',
          message:
            'At Google I/O in May 2017, Google made Kotlin an officially supported language on Android. In 2019, Google went further, announcing that Android development is Kotlin-First. Today, over 95% of the top 1,000 Android apps use Kotlin code.'
        }
      },
      {
        id: 'core-pillars',
        title: 'The Four Core Pillars of Kotlin',
        icon: 'diamond',
        badge: 'LANGUAGE DESIGN',
        paragraphs: [
          'Kotlin was engineered around four guiding philosophical tenets that distinguish it from legacy languages:'
        ],
        bulletPoints: [
          {
            title: '1. Conciseness & Signal-to-Noise',
            desc: 'Kotlin dramatically cuts boilerplate. No ceremonial public class wrappers for simple scripts, no manual getters/setters, and smart type inference lets the compiler figure out types so your code stays lean and readable.'
          },
          {
            title: '2. Safe by Default (Solving the Billion-Dollar Mistake)',
            desc: 'Sir Tony Hoare called the invention of the null pointer his "billion-dollar mistake". Kotlin eliminates NullPointerExceptions at compile time: variables cannot hold null unless you explicitly declare them with a ? (e.g. String vs String?).'
          },
          {
            title: '3. 100% Java Interoperability',
            desc: 'Kotlin and Java live in perfect harmony. You can call existing Java libraries (like Guava, Spring, Jackson, Android SDK) directly from Kotlin, and call Kotlin code from Java without wrappers or bridges.'
          },
          {
            title: '4. Tool-Friendly & Pragmatic',
            desc: 'Because JetBrains builds IDEs, Kotlin was co-designed alongside world-class refactoring tools, auto-complete, instant linting, and interactive scratchpads.'
          }
        ]
      },
      {
        id: 'how-it-runs',
        title: 'How Kotlin Code Runs Under the Hood',
        icon: 'memory',
        badge: 'COMPILATION PIPELINE',
        paragraphs: [
          'When you write Kotlin code in a .kt file, you are not interpreting plain text. The Kotlin Compiler (kotlinc) compiles your source code into Java bytecode (.class files) — the exact same format generated by javac!',
          'This means Kotlin applications run on any standard Java Virtual Machine (JVM 8, 11, 17, 21+), whether in server environments (Linux/Docker) or Android\'s ART (Android Runtime).'
        ],
        codeSnippet: {
          title: 'A Minimal Kotlin Program',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    val language = "Kotlin"',
            '    println("Welcome to $language!")',
            '}'
          ],
          output: 'Welcome to Kotlin!',
          explanation: 'This entire program is valid top-level Kotlin. No class definition is required!'
        },
        callout: {
          type: 'info',
          title: 'Did you know? Kotlin Multiplatform (KMP)',
          message:
            'Kotlin isn\'t limited to the JVM! Through Kotlin/Native, it compiles via LLVM to standalone native binaries for iOS, macOS, Windows, and Linux. Through Kotlin/Wasm and Kotlin/JS, it runs directly in modern web browsers.'
        }
      },
      {
        id: 'kotlin-vs-java',
        title: 'Kotlin vs. Java: The Boilerplate Reduction',
        icon: 'compare_arrows',
        badge: 'SIDE-BY-SIDE',
        paragraphs: [
          'Here is a direct real-world demonstration of how Kotlin reduces ceremonial code while retaining 100% runtime performance:'
        ],
        comparison: {
          leftTitle: 'Java (45+ lines for a simple data model)',
          leftTag: 'JAVA',
          leftCode: [
            'public final class User {',
            '    private final int id;',
            '    private final String name;',
            '    public User(int id, String name) {',
            '        this.id = id;',
            '        this.name = name;',
            '    }',
            '    public int getId() { return id; }',
            '    public String getName() { return name; }',
            '    @Override public boolean equals(Object o) { ... }',
            '    @Override public int hashCode() { ... }',
            '    @Override public String toString() { ... }',
            '}'
          ],
          rightTitle: 'Kotlin (1 single line with all methods generated)',
          rightTag: 'KOTLIN',
          rightCode: [
            '// Generates constructor, getters, equals,',
            '// hashCode, toString, and copy() automatically!',
            'data class User(val id: Int, val name: String)'
          ],
          verdict: 'Kotlin provides equal safety and feature parity with 95% less boilerplate code.'
        }
      },
      {
        id: 'ecosystem',
        title: 'Where Is Kotlin Used in 2026?',
        icon: 'devices',
        badge: 'INDUSTRY USE',
        paragraphs: [
          'Kotlin has evolved far beyond an Android-only language. It is actively deployed across three major engineering sectors:'
        ],
        bulletPoints: [
          {
            title: 'Mobile Development (Android & iOS)',
            desc: 'Google Jetpack Compose (modern declarative UI for Android) is 100% Kotlin. Kotlin Multiplatform allows sharing core data and business logic between Android and iOS apps (used by Netflix, Cash App, McDonald\'s).'
          },
          {
            title: 'Server-Side & Backend APIs',
            desc: 'Supported as a 1st-class citizen in Spring Boot (the world\'s most popular Java web framework) and Ktor (JetBrains\' lightweight asynchronous coroutine-powered web engine).'
          },
          {
            title: 'Data Science & Scripting',
            desc: 'Kotlin Notebooks, Jupyter support, and Kotlin DataFrame bring type-safe interactive analysis to developers without giving up static type checking.'
          }
        ]
      }
    ],
    gotchas: [
      {
        mistake: 'Assuming Kotlin is just "Google Android script"',
        whyItFails: 'Kotlin was designed by JetBrains for large-scale enterprise server systems long before Google endorsed it.',
        correction: 'Kotlin is a general-purpose language used extensively for backend APIs, microservices, desktop apps, and iOS logic.'
      },
      {
        mistake: 'Thinking Kotlin runs slower than Java',
        whyItFails: 'Kotlin compiles into the exact same JVM bytecode instructions as Java and runs with zero performance overhead.',
        correction: 'Kotlin features like inline functions can actually run faster than typical Java code by eliminating lambda object allocations.'
      },
      {
        mistake: 'Believing you must rewrite your entire Java codebase at once',
        whyItFails: 'Kotlin is 100% interoperable with Java. A Java class can instantiate a Kotlin object, and a Kotlin function can call Java code directly.',
        correction: 'You can introduce Kotlin one file at a time in existing Java projects without any architectural breakage.'
      }
    ],
    cheatsheet: [
      {
        term: 'JetBrains',
        syntax: 'Creator (2011)',
        description: 'Developer tooling company that designed Kotlin as an industrial-strength JVM language.'
      },
      {
        term: 'Null Safety',
        syntax: 'String vs String?',
        description: 'Strict distinction between non-null values and nullable values enforced at compile time.'
      },
      {
        term: 'kotlinc',
        syntax: 'CLI Compiler',
        description: 'Compiles Kotlin source (.kt) directly into JVM bytecode (.class).'
      },
      {
        term: 'Interoperability',
        syntax: '100% Two-Way',
        description: 'Call Java libraries from Kotlin and Kotlin classes from Java seamlessly.'
      },
      {
        term: 'KMP',
        syntax: 'Kotlin Multiplatform',
        description: 'Share common Kotlin logic across Android, iOS, Desktop, and Web.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which company created the Kotlin programming language?',
        options: ['Google', 'JetBrains', 'Oracle', 'Microsoft'],
        correctIndex: 1,
        explanation: 'JetBrains created Kotlin in 2011. Google later partnered with JetBrains in 2017 to make it the premier official language for Android.'
      },
      {
        id: 'q2',
        question: 'What does the standard Kotlin compiler (kotlinc) output when compiling Kotlin files for the JVM?',
        options: ['Machine assembly (.exe / .bin)', 'Java bytecode (.class files)', 'Raw JavaScript source', 'Python bytecode'],
        correctIndex: 1,
        explanation: 'The Kotlin compiler outputs standard JVM bytecode (.class files) that runs on any JVM, exactly like compiled Java code.'
      },
      {
        id: 'q3',
        question: 'How does Kotlin solve the "billion-dollar mistake" of NullPointerExceptions?',
        options: [
          'By banning the use of variables altogether',
          'By crashing the computer before execution starts',
          'By enforcing a compile-time type system that separates nullable and non-nullable types',
          'By converting all nulls to the string "null"'
        ],
        correctIndex: 2,
        explanation: 'Kotlin forces you to explicitly declare if a variable can be null (e.g. String?). If you declare String, the compiler guarantees it can never be null!'
      }
    ]
  },

  // =========================================================================
  // WORLD 1 -> LESSON 2: Kotlin Syntax & main()
  // =========================================================================
  'world-1-kotlin-syntax': {
    lessonId: 'world-1-kotlin-syntax',
    aliasKeys: ['kotlin-syntax', 'world-1-lesson-2'],
    worldNumber: 1,
    lessonNumber: 2,
    title: 'Kotlin Syntax & main()',
    subtitle: 'Anatomy of a Kotlin Program, Execution Flow, Top-Level Functions & Semicolon Rules',
    badge: 'WORLD 1 · LESSON 2 DEEP DIVE',
    readTime: '5 min read',
    overviewSummary:
      'Every Kotlin program begins execution inside fun main(). Unlike Java or C#, Kotlin supports top-level functions so you never have to wrap your code in a ceremonial class. Statements execute sequentially from top to bottom, and semicolons are completely optional.',
    toc: [
      { id: 'entry-point', label: 'The Entry Point' },
      { id: 'anatomy', label: 'Anatomy of fun main()' },
      { id: 'top-level', label: 'Top-Level Functions' },
      { id: 'execution-flow', label: 'Sequential Execution' },
      { id: 'semicolons', label: 'The Semicolon Rule' },
      { id: 'gotchas', label: 'Common Pitfalls' },
      { id: 'cheatsheet', label: 'Quick Reference' },
      { id: 'quiz', label: 'Knowledge Check' }
    ],
    sections: [
      {
        id: 'entry-point',
        title: 'Why Does Every Program Need a main() Function?',
        icon: 'start',
        badge: 'EXECUTION LAUNCHPAD',
        paragraphs: [
          'A computer program can contain hundreds of thousands of lines of code distributed across hundreds of files. When you click "Run" or execute a binary, the operating system and runtime need an unambiguous starting point.',
          'In Kotlin, this designated entry point is the function named main(). When the JVM boots up your program, it searches for main(), transfers control into its opening curly brace {, and begins executing the statements inside.',
          'When main() reaches its closing curly brace } (or returns), the program execution terminates.'
        ],
        callout: {
          type: 'key',
          title: 'The Golden Rule of Entry',
          message:
            'Without a main() function, a standalone Kotlin application cannot run on its own. It is the designated doorway through which the runtime enters.'
        }
      },
      {
        id: 'anatomy',
        title: 'Anatomy of fun main() Word-by-Word',
        icon: 'code',
        badge: 'SYNTAX BREAKDOWN',
        paragraphs: [
          'Let\'s dissect the exact syntax of the Kotlin entry point line by line:'
        ],
        codeSnippet: {
          title: 'Standard Kotlin Entry Point',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    println("Hello, Android Developer!")',
            '}'
          ],
          output: 'Hello, Android Developer!',
          explanation: 'fun declares the function, main is the name, () is the parameter list, and { } holds the statements.'
        },
        bulletPoints: [
          {
            title: 'fun (Function Keyword)',
            desc: 'Short for "function". In Kotlin, all subroutines, methods, and procedures are introduced with the fun keyword (not def, fn, or function).'
          },
          {
            title: 'main (Identifier)',
            desc: 'The specific name reserved by convention for the program entry point. Note that it must be all lowercase (main, NOT Main).'
          },
          {
            title: '() (Parameter List)',
            desc: 'Parentheses hold input arguments. Since Kotlin 1.3, parameterless main() is fully supported for clean simplicity. If command-line arguments are needed, you can write fun main(args: Array<String>).'
          },
          {
            title: '{ ... } (Body Block)',
            desc: 'Curly braces enclose the statements that will run. Everything inside { and } belongs to the body of the function.'
          }
        ]
      },
      {
        id: 'top-level',
        title: 'Top-Level Functions: No Ceremonial Class Required',
        icon: 'splitscreen',
        badge: 'KOTLIN VS JAVA',
        paragraphs: [
          'If you come from Java or C#, you might remember having to declare a class before writing a single line of runnable code:',
          'In Kotlin, functions and variables can live at the top level of a file — directly out in the open!'
        ],
        comparison: {
          leftTitle: 'Java (Heavy boilerplate class wrapper)',
          leftTag: 'JAVA',
          leftCode: [
            '// Java forces every function into a class',
            'public class MainApp {',
            '    public static void main(String[] args) {',
            '        System.out.println("Too much boilerplate!");',
            '    }',
            '}'
          ],
          rightTitle: 'Kotlin (Clean top-level entry point)',
          rightTag: 'KOTLIN',
          rightCode: [
            '// Kotlin needs no class wrapper at all!',
            'fun main() {',
            '    println("Pure signal, zero noise!")',
            '}'
          ],
          verdict: 'Kotlin frees you from writing artificial wrapper classes for simple programs.'
        }
      },
      {
        id: 'execution-flow',
        title: 'Sequential Execution: Top to Bottom, Line by Line',
        icon: 'reorder',
        badge: 'CONTROL FLOW',
        paragraphs: [
          'Statements inside main() execute in strict chronological order from top to bottom. Each line must complete before the next line begins.'
        ],
        codeSnippet: {
          title: 'Sequential Execution in Action',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    println("1. Engine ignition started...")',
            '    println("2. Fuel systems nominal...")',
            '    println("3. Liftoff!")',
            '}'
          ],
          output: '1. Engine ignition started...\n2. Fuel systems nominal...\n3. Liftoff!',
          explanation: 'The output lines appear in the exact order in which println() statements were written.'
        }
      },
      {
        id: 'semicolons',
        title: 'The Semicolon Rule: Clean, Noise-Free Lines',
        icon: 'clear_all',
        badge: 'STYLE GUIDE',
        paragraphs: [
          'In Kotlin, semicolons (;) at the end of statements are completely optional. The compiler automatically understands where a statement ends based on line breaks.',
          'Putting a semicolon at the end of a line is technically legal for Java backward compatibility, but the Kotlin style guide strongly discourages it.',
          'The only situation where a semicolon is required is if you place two separate statements on the exact same physical line (which is generally considered poor code style).'
        ],
        codeSnippet: {
          title: 'Optional vs Single-Line Semicolons',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    // Recommended idiomatic Kotlin (NO semicolons):',
            '    val hero = "Kotlin"',
            '    println(hero)',
            '',
            '    // Legal, but discouraged by Kotlin style linter:',
            '    val score = 100; println(score);',
            '}'
          ],
          output: 'Kotlin\n100',
          explanation: 'Always prefer writing each statement on its own line without semicolons.'
        }
      }
    ],
    gotchas: [
      {
        mistake: 'Writing "Main" with a capital M',
        whyItFails: 'Kotlin is strictly case-sensitive. The runtime specifically searches for lowercase main.',
        badCode: ['fun Main() {', '    println("Hello")', '}'],
        fixedCode: ['fun main() {', '    println("Hello")', '}'],
        correction: 'Always spell the entry point in lowercase: fun main().'
      },
      {
        mistake: 'Missing or mismatched curly braces { }',
        whyItFails: 'The body of fun main() requires both an opening { and a closing } brace. Forgetting } causes a syntax error: "Expecting \'}\'".',
        badCode: ['fun main() {', '    println("Oops forgotten closing brace")'],
        fixedCode: ['fun main() {', '    println("Fixed!")', '}'],
        correction: 'Ensure every opening brace { has a matching closing brace }.'
      },
      {
        mistake: 'Using Python\'s "def" or JavaScript\'s "function"',
        whyItFails: 'Kotlin keywords are strict. Kotlin functions must begin with "fun".',
        badCode: ['def main():', 'function main() { }'],
        fixedCode: ['fun main() {', '    // statements here', '}'],
        correction: 'In Kotlin, the keyword to declare a function is always "fun".'
      }
    ],
    cheatsheet: [
      {
        term: 'fun',
        syntax: 'fun name() { }',
        description: 'Keyword used to declare a function in Kotlin.'
      },
      {
        term: 'main()',
        syntax: 'fun main()',
        description: 'The standard entry point where Kotlin programs begin execution.'
      },
      {
        term: 'println()',
        syntax: 'println("text")',
        description: 'Standard library function that prints text to the console followed by a newline.'
      },
      {
        term: '{ }',
        syntax: '{ statement1; statement2 }',
        description: 'Block delimiters enclosing executable code statements.'
      },
      {
        term: 'Semicolon ;',
        syntax: 'Optional',
        description: 'Not required at the end of lines in idiomatic Kotlin.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What keyword does Kotlin use to define a function or program entry point?',
        options: ['def', 'function', 'fun', 'fn'],
        correctIndex: 2,
        explanation: 'Kotlin uses the "fun" keyword (short for function) to declare functions.'
      },
      {
        id: 'q2',
        question: 'Do you need to wrap fun main() inside a class in Kotlin?',
        options: [
          'Yes, like Java every function must be inside a public class',
          'No, Kotlin supports top-level functions directly in the file',
          'Only when compiling for Android',
          'Only when using external libraries'
        ],
        correctIndex: 1,
        explanation: 'In Kotlin, functions can exist at the top level of a file without an enclosing class!'
      },
      {
        id: 'q3',
        question: 'Are semicolons (;) required at the end of statements in Kotlin?',
        options: [
          'Yes, leaving out a semicolon results in a compilation error',
          'No, semicolons are optional and idiomatic Kotlin omits them',
          'They are only optional for println statements',
          'They are only required in functions that return a value'
        ],
        correctIndex: 1,
        explanation: 'Semicolons are completely optional in Kotlin. Idiomatic Kotlin relies on clean newlines.'
      }
    ]
  },

  // =========================================================================
  // WORLD 1 -> LESSON 3: Comments
  // =========================================================================
  'world-1-comments': {
    lessonId: 'world-1-comments',
    aliasKeys: ['comments', 'world-1-lesson-3'],
    worldNumber: 1,
    lessonNumber: 3,
    title: 'Comments in Kotlin',
    subtitle: 'Single-Line, Multi-Line, Nested Comments & KDoc Documentation',
    badge: 'WORLD 1 · LESSON 3 DEEP DIVE',
    readTime: '4 min read',
    overviewSummary:
      'Comments allow programmers to write human-readable notes, document complex algorithms, and temporarily disable lines of code during debugging. The Kotlin compiler ignores comments completely. Uniquely, Kotlin supports nested multi-line comments — solving an infamous limitation of Java and C++.',
    toc: [
      { id: 'why-comment', label: 'Why Comments Matter' },
      { id: 'single-line', label: 'Single-Line Comments //' },
      { id: 'multi-line', label: 'Multi-Line Comments /* */' },
      { id: 'nested', label: 'Nested Comments' },
      { id: 'kdoc', label: 'KDoc Documentation' },
      { id: 'best-practices', label: 'Best Practices' },
      { id: 'gotchas', label: 'Common Gotchas' },
      { id: 'cheatsheet', label: 'Quick Reference' },
      { id: 'quiz', label: 'Knowledge Check' }
    ],
    sections: [
      {
        id: 'why-comment',
        title: 'Why Do We Comment Code?',
        icon: 'mode_comment',
        badge: 'HUMAN COMMUNICATION',
        paragraphs: [
          'Code tells the computer how to perform an action. But code often fails to explain why a decision was made, what business rule is being satisfied, or why an unusual workaround was necessary.',
          'Comments are plain-text annotations written directly inside code files. When the Kotlin compiler (kotlinc) parses your source code, it discards every comment before generating bytecode.',
          'Comments consume zero bytes of memory in compiled apps and have zero effect on program performance.'
        ],
        callout: {
          type: 'key',
          title: 'The Golden Philosophy of Comments',
          message:
            'Good code is self-documenting for "what" it is doing. Use comments to explain the "why": business logic, trade-offs, edge-case warnings, and math formulas.'
        },
        flowChart: {
          variant: 'compiler-filter',
          title: 'Compiler Flow: Comment vs. Executable Code',
          subtitle: 'The Kotlin lexer strips away comments during compilation before generating bytecode.',
          conditionText: 'Is Comment?',
          trueLabel: 'if token is comment',
          falseLabel: 'if token is code',
          ifBlockText: 'Discard & Skip',
          elseBlockText: 'Emit Bytecode',
          startLabel: 'Read Token',
          endLabel: 'Next Token',
          sampleCode: {
            condition: 'token.isComment',
            ifBody: '// Discarded: 0 bytes in .class file',
            elseBody: 'val x = 42 // Compiled to bytecode'
          }
        }
      },
      {
        id: 'single-line',
        title: 'Single-Line Comments: //',
        icon: 'notes',
        badge: 'SYNTAX',
        paragraphs: [
          'A single-line comment begins with two forward slashes: //.',
          'Everything from the // characters to the very end of that physical line is ignored by the compiler. It can occupy its own dedicated line or be placed as an inline note after code.'
        ],
        codeSnippet: {
          title: 'Single-Line Comments in Action',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    // Dedicated line comment explaining the next step',
            '    val score = 42',
            '',
            '    val bonus = 10 // Inline comment at the end of a line',
            '    println(score + bonus)',
            '}'
          ],
          output: '52',
          explanation: 'Neither the dedicated line comment nor the trailing inline comment affects the computation or output.'
        }
      },
      {
        id: 'multi-line',
        title: 'Multi-Line Block Comments: /* ... */',
        icon: 'subject',
        badge: 'BLOCK NOTES',
        paragraphs: [
          'When you need to write detailed paragraphs, license notices, or algorithmic summaries that span multiple lines, use a block comment.',
          'A multi-line comment begins with /* and terminates with */. Everything between the two tokens is skipped by the compiler.'
        ],
        codeSnippet: {
          title: 'Multi-Line Comments',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    /*',
            '      Multi-line comments are ideal for:',
            '      - Documenting complex algorithms',
            '      - Temporarily disabling large blocks of code during debugging',
            '      - Multi-line ASCII diagrams',
            '    */',
            '    println("Code execution proceeds normally!")',
            '}'
          ],
          output: 'Code execution proceeds normally!',
          explanation: 'The block comment smoothly wraps across four lines without needing // on each line.'
        }
      },
      {
        id: 'nested',
        title: 'Kotlin Superpower: Nested Multi-Line Comments!',
        icon: 'layers',
        badge: 'KOTLIN EXCLUSIVE',
        paragraphs: [
          'In older languages like C, C++, and Java, multi-line comments cannot be nested. In Java, writing /* /* */ */ causes a syntax error because the very first */ closes the entire comment, leaving the remainder dangling as illegal code.',
          'Kotlin fixed this! The Kotlin compiler maintains a counter of nested /* and */ tokens. This means you can safely comment out an entire block of code that already contains block comments!'
        ],
        codeSnippet: {
          title: 'Nested Block Comments (Valid in Kotlin, Invalid in Java)',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    /* Outer comment start',
            '       val a = 10',
            '       /* Inner nested comment */',
            '       val b = 20',
            '       Outer comment end */',
            '    println("Nested comments work seamlessly in Kotlin!")',
            '}'
          ],
          output: 'Nested comments work seamlessly in Kotlin!',
          explanation: 'Kotlin matches each opening /* with its corresponding closing */, allowing you to comment out code with zero friction.'
        }
      },
      {
        id: 'kdoc',
        title: 'KDoc: Professional Documentation Comments (/** ... */)',
        icon: 'library_books',
        badge: 'DOCUMENTATION TOOL',
        paragraphs: [
          'When building public APIs, libraries, or shared team components, Kotlin uses KDoc (Kotlin\'s equivalent of JavaDoc).',
          'KDoc comments begin with /** and end with */. Unlike JavaDoc which required messy HTML tags, KDoc natively supports clean Markdown syntax (bolding, lists, code spans) along with tags like @param, @return, and @see.'
        ],
        codeSnippet: {
          title: 'KDoc Documentation Example',
          language: 'Kotlin',
          code: [
            '/**',
            ' * Calculates the final price of an item after applying discount.',
            ' *',
            ' * @param price The base retail price in cents',
            ' * @param discountPercent A percentage between 0 and 100',
            ' * @return The final discounted price',
            ' */',
            'fun calculateDiscount(price: Int, discountPercent: Int): Int {',
            '    return price - (price * discountPercent / 100)',
            '}'
          ],
          explanation: 'IDEs like Android Studio and IntelliJ automatically render KDoc comments in beautiful popups on hover.'
        }
      },
      {
        id: 'best-practices',
        title: 'Comment Best Practices & Pro Tips',
        icon: 'verified',
        badge: 'CODE CRAFT',
        paragraphs: [
          'Writing good comments is an art form. Here are key guidelines followed by senior software engineers:'
        ],
        bulletPoints: [
          {
            title: 'Avoid "Stating the Obvious"',
            desc: 'Don\'t write // increment i by 1 above i++. That adds noise without information. Write comments that explain the reasoning behind a choice.'
          },
          {
            title: 'Keep Comments Up-to-Date',
            desc: 'An outdated comment that contradicts the code is worse than no comment at all. When you refactor code, always update adjacent comments.'
          },
          {
            title: 'Use TODO and FIXME tags',
            desc: 'Write // TODO: add network retry logic to flag work that remains. Modern IDEs index TODO comments into an interactive task list.'
          }
        ]
      }
    ],
    gotchas: [
      {
        mistake: 'Putting comments inside a string literal',
        whyItFails: 'Anything inside quotation marks "..." is treated as literal text data, not a comment.',
        badCode: ['println("Hello // this is not a comment!")'],
        fixedCode: [
          '// Real comment outside the string',
          'println("Hello")'
        ],
        correction: '// inside double quotes does not comment anything out; it prints literally.'
      },
      {
        mistake: 'Forgetting to close a multi-line comment */',
        whyItFails: 'An unclosed /* will swallow the remainder of your entire file, causing unexpected compiler errors.',
        badCode: ['/*', '  val secret = 100', 'println(secret)'],
        fixedCode: ['/*', '  val secret = 100', '*/', 'println(secret)'],
        correction: 'Every /* must have a closing */.'
      },
      {
        mistake: 'Using comments to explain cryptic variable names',
        whyItFails: 'Writing "val d = 86400 // elapsed time in seconds" makes every reader look back at the comment.',
        badCode: ['val d = 86400 // seconds in a day'],
        fixedCode: ['val secondsInOneDay = 86400'],
        correction: 'Choose descriptive variable names so your code is self-documenting.'
      }
    ],
    cheatsheet: [
      {
        term: '//',
        syntax: '// Note here',
        description: 'Single-line comment. Ignores everything until the end of the current line.'
      },
      {
        term: '/* ... */',
        syntax: '/* multi-line note */',
        description: 'Block comment. Can span any number of lines.'
      },
      {
        term: 'Nested Comments',
        syntax: '/* outer /* inner */ */',
        description: 'Kotlin feature allowing block comments to be safely nested inside other block comments.'
      },
      {
        term: 'KDoc',
        syntax: '/** markdown docs */',
        description: 'Documentation comment supporting Markdown and @tags for IDE hover tooltips.'
      },
      {
        term: 'TODO',
        syntax: '// TODO: message',
        description: 'Standard tag recognized by IDEs to bookmark unfinished tasks.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which syntax starts a single-line comment in Kotlin?',
        options: ['#', '//', '--', '/*'],
        correctIndex: 1,
        explanation: 'In Kotlin, single-line comments always start with // and continue to the end of the line.'
      },
      {
        id: 'q2',
        question: 'What happens when you nest multi-line comments (/* /* ... */ */) in Kotlin?',
        options: [
          'It fails to compile with a syntax error like in Java and C',
          'It works cleanly because Kotlin tracks nested comment delimiters',
          'The computer deletes the file',
          'The inner comment is executed as live code'
        ],
        correctIndex: 1,
        explanation: 'Unlike Java or C++, Kotlin fully supports nested multi-line comments by tracking opening and closing tokens!'
      },
      {
        id: 'q3',
        question: 'Do comments make your compiled Kotlin application run slower or take more storage?',
        options: [
          'Yes, each comment adds 10KB to the APK',
          'Only multi-line comments increase memory usage',
          'No, the compiler completely discards all comments during compilation',
          'Yes, but only on older versions of Android'
        ],
        correctIndex: 2,
        explanation: 'The Kotlin compiler strips all comments during compilation. They have zero impact on APK size or runtime execution speed.'
      }
    ]
  }
};

/**
 * Creates a comprehensive fallback tutorial for lessons that do not yet have a dedicated handcrafted entry.
 */
export function createFallbackDetailedTutorial(lesson: FiveStageLesson): DetailedTutorialData {
  const sections: TutorialSection[] = [
    {
      id: 'concept',
      title: lesson.learn.title || lesson.topicTitle,
      icon: 'lightbulb',
      badge: 'CORE CONCEPT',
      paragraphs: [
        lesson.learn.subtitle,
        lesson.learn.explanation,
      ].filter(Boolean),
      codeSnippet: lesson.learn.codeSnippet && lesson.learn.codeSnippet.length > 0 ? {
        title: lesson.learn.exampleTitle || 'Kotlin Example',
        language: lesson.learn.language || 'kotlin',
        code: lesson.learn.codeSnippet,
        explanation: lesson.learn.explanation,
      } : undefined,
    },
  ];

  if (lesson.explore?.cards && lesson.explore.cards.length > 0) {
    lesson.explore.cards.forEach((card, idx) => {
      sections.push({
        id: `explore-${card.id || idx}`,
        title: card.title || `Deep Dive Part ${idx + 1}`,
        icon: 'code_blocks',
        badge: 'EXPLORATION',
        paragraphs: [
          card.subtitle,
          ...card.whatItMeans.map((w) => `${w.label}: ${w.description}`),
        ].filter(Boolean),
        codeSnippet: card.code && card.code.length > 0 ? {
          title: card.subtitle || card.title,
          language: card.language || 'kotlin',
          code: card.code,
          explanation: card.whatChanged,
        } : undefined,
      });
    });
  }

  if (lesson.learn.keyIdeas && lesson.learn.keyIdeas.length > 0) {
    sections.push({
      id: 'key-ideas',
      title: 'Key Ideas & Mechanics',
      icon: 'psychology',
      badge: 'ESSENTIALS',
      paragraphs: [
        lesson.learn.keyTakeaway || 'Review the core takeaways and mechanics for this topic.',
      ],
      bulletPoints: lesson.learn.keyIdeas.map((ki) => ({
        title: ki.title,
        desc: ki.description,
      })),
    });
  }

  const cheatsheet = (lesson.learn.keyIdeas || []).map((ki) => ({
    term: ki.title,
    syntax: ki.title,
    description: ki.description,
  }));

  const quiz = (lesson.predict?.questions || []).map((q, idx) => ({
    id: q.id || `quiz-${idx}`,
    question: q.prompt,
    options: q.options.map((o) => o.label),
    correctIndex: Math.max(0, q.options.findIndex((o) => o.isCorrect)),
    explanation: q.explanation?.detail || 'Review the lesson concepts.',
  }));

  const toc = sections.map((s) => ({ id: s.id, label: s.title }));
  if (cheatsheet.length > 0) {
    toc.push({ id: 'cheatsheet', label: 'Quick Reference' });
  }
  if (quiz.length > 0) {
    toc.push({ id: 'quiz', label: 'Knowledge Check' });
  }

  return {
    lessonId: lesson.id,
    aliasKeys: [lesson.id, lesson.topicTitle],
    worldNumber: 1,
    lessonNumber: 1,
    title: lesson.topicTitle,
    subtitle: lesson.learn.subtitle || lesson.learn.title,
    badge: `${(lesson.worldName || 'Kotlin').toUpperCase()} · DEEP DIVE`,
    readTime: '3 min read',
    overviewSummary: lesson.learn.explanation || lesson.learn.subtitle || 'Comprehensive in-depth guide.',
    toc,
    sections,
    gotchas: [],
    cheatsheet,
    quiz,
  };
}

/**
 * Helper to fetch detailed tutorial for a given lesson id or alias,
 * with optional fallback generation from lesson content.
 */
export function getDetailedTutorial(
  lessonIdOrKey?: string,
  fallbackLesson?: FiveStageLesson
): DetailedTutorialData | null {
  if (lessonIdOrKey) {
    // Direct key check
    if (DETAILED_TUTORIALS[lessonIdOrKey]) {
      return DETAILED_TUTORIALS[lessonIdOrKey];
    }

    const clean = lessonIdOrKey.toLowerCase().trim();

    // Search by exact alias or lessonId
    for (const tutorial of Object.values(DETAILED_TUTORIALS)) {
      if (tutorial.lessonId.toLowerCase() === clean) return tutorial;
      if (tutorial.aliasKeys.some((k) => k.toLowerCase() === clean)) return tutorial;
    }

    // Normalization match (e.g. "what-is-kotlin", "world-1-what-is-kotlin")
    const norm = clean.replace(/^world-?\d+-?/, '').replace(/[^a-z0-9]/g, '');
    for (const tutorial of Object.values(DETAILED_TUTORIALS)) {
      const tutNorm = tutorial.lessonId.replace(/^world-?\d+-?/, '').replace(/[^a-z0-9]/g, '');
      if (tutNorm === norm) return tutorial;
    }
  }

  if (fallbackLesson) {
    return createFallbackDetailedTutorial(fallbackLesson);
  }

  return null;
}
