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
    subtitle: 'Meet Kotlin, discover what it can build, and understand how your first program runs.',
    badge: 'BEGINNER',
    readTime: '6 min',
    overviewSummary:
      'Kotlin is a modern, general-purpose programming language used for Android apps, server applications, and multiplatform development. Discover its design goals, basic program structure, supported platforms, and how Kotlin code becomes a running program.',

    toc: [
      { id: 'kotlin-and-its-uses', label: 'Kotlin and Its Uses' },
      { id: 'kotlin-design-goals', label: 'Kotlin Design Goals' },
      { id: 'source-files-and-first-program', label: 'Source Files and First Program' },
      { id: 'platforms-and-java-interop', label: 'Platforms and Java Interop (Intermediate)' },
      { id: 'expressions-vs-statements', label: 'Expressions vs Statements (Intermediate)' },
      { id: 'gotchas', label: 'Gotchas' },
      { id: 'cheatsheet', label: 'Cheatsheet' },
      { id: 'quiz', label: 'Quiz' }
    ],

    sections: [
      {
        id: 'kotlin-and-its-uses',
        title: 'Kotlin and Its Uses',
        icon: 'code',
        badge: 'GETTING STARTED',
        paragraphs: [
          'Kotlin is a modern, general-purpose programming language developed by JetBrains. You use it to write instructions that a computer or mobile device can execute. Kotlin is statically typed, meaning that the compiler checks the types of values used in your program.',
          'Kotlin is widely used for Android application development. It is also suitable for backend services, shared multiplatform code, and scripting. You can use the same language for several kinds of software rather than learning a completely different language for every platform.',
          'For example, a shopping application might use Kotlin for its Android interface and Kotlin on a server to process orders. Kotlin Multiplatform can also share suitable application logic across Android, iOS, and other supported targets.'
        ],
        bulletPoints: [
          { title: 'Android', desc: 'Build native Android applications, including their interfaces and application logic.' },
          { title: 'Backend', desc: 'Create server-side applications, APIs, and services.' },
          { title: 'Multiplatform', desc: 'Share suitable code across supported platforms.' },
          { title: 'Scripting', desc: 'Automate tasks using Kotlin scripts and supported tooling.' }
        ],
        callout: {
          type: 'key',
          title: 'Remember',
          message: 'Kotlin is a programming language, not just an Android development tool.'
        }
      },

      {
        id: 'kotlin-design-goals',
        title: 'Kotlin Design Goals',
        icon: 'verified',
        badge: 'CORE CONCEPT',
        paragraphs: [
          'Kotlin was designed to make everyday programming concise, safer, interoperable, and practical. These goals influence how Kotlin programs are written.',
          'Conciseness means expressing an idea without unnecessary code. Safety means the language helps detect certain mistakes before a program runs. Interoperability means Kotlin can work with existing software, particularly Java on the JVM. Pragmatism means providing features that solve real development problems.'
        ],
        comparison: {
          leftTitle: 'Java',
          leftCode: [
            'public class Main {',
            '    public static void main(String[] args) {',
            '        System.out.println("Hello!");',
            '    }',
            '}'
          ],
          leftTag: 'MORE BOILERPLATE',
          rightTitle: 'Kotlin',
          rightCode: [
            'fun main() {',
            '    println("Hello!")',
            '}'
          ],
          rightTag: 'CONCISE',
          verdict: 'Both programs print the same message. Kotlin requires less ceremony for this simple example.'
        },
        callout: {
          type: 'info',
          title: 'Safety Is Not Automatic',
          message: 'Kotlin helps prevent certain errors, but developers must still write and test their programs carefully.'
        }
      },

      {
        id: 'source-files-and-first-program',
        title: 'Source Files and First Program',
        icon: 'terminal',
        badge: 'FIRST PROGRAM',
        paragraphs: [
          'Kotlin source code is normally stored in files ending with .kt. For example, Main.kt can contain the starting point of a simple application.',
          'The function fun main() is the entry point of a basic Kotlin program. When the program starts, the instructions inside its braces are executed. The println() function displays a value in the console and moves to the next line.',
          'Your source code does not run directly. The Kotlin compiler translates a .kt file into a form the target platform can execute — for example, JVM bytecode on Kotlin/JVM — and that translated form is what actually runs.',
          'Kotlin programs can use the Kotlin standard library without any special setup. It provides ready-made functionality such as println() for output, common String and collection operations, and basic math functions, so you do not have to write these yourself.',
          'A few vocabulary words are useful when reading Kotlin code: a keyword is a reserved word with special meaning (like fun or val), an identifier is a name you choose (like main or greet), a literal is a fixed value written directly in code (like "Hello" or 42), and a function call is an instruction that runs a function by writing its name followed by parentheses (like println("Hello")).'
        ],
        codeSnippet: {
          title: 'Main.kt',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    println("Hello, Kotlin!")',
            '}'
          ],
          explanation: 'Execution begins inside main(). The println() call writes the greeting to standard output.',
          output: 'Hello, Kotlin!'
        },
        bulletPoints: [
          { title: 'fun', desc: 'A Kotlin keyword used to declare a function.' },
          { title: 'main', desc: 'The identifier naming the program entry-point function.' },
          { title: '"Hello, Kotlin!"', desc: 'A string literal containing text.' },
          { title: 'println()', desc: 'A function call that prints a value followed by a line break.' }
        ],
        callout: {
          type: 'tip',
          title: 'Keep This Vocabulary Handy',
          message: 'Keyword, identifier, literal, and function call are terms you will see again throughout this course — recognizing them makes later explanations easier to follow.'
        }
      },

      {
        id: 'platforms-and-java-interop',
        title: 'Platforms and Java Interop (Intermediate)',
        icon: 'devices',
        badge: 'INTERMEDIATE',
        paragraphs: [
          'Kotlin can target different execution environments. Kotlin/JVM compiles code into JVM bytecode, which runs on a Java Virtual Machine. Kotlin/JS produces JavaScript, while Kotlin/Native compiles supported Kotlin code into native binaries.',
          'Kotlin Multiplatform allows developers to share suitable code between different targets while retaining platform-specific implementations where needed. It is an approach to sharing code, rather than a separate programming language.',
          'On the JVM, Kotlin has strong interoperability with Java. Kotlin code can call existing Java libraries, and Java code can call appropriately exposed Kotlin declarations. This makes it possible to introduce Kotlin gradually into many existing Java projects.'
        ],
        bulletPoints: [
          { title: 'Kotlin/JVM', desc: 'Targets the Java Virtual Machine, commonly used for Android and backend development.' },
          { title: 'Kotlin/JS', desc: 'Compiles Kotlin code to JavaScript.' },
          { title: 'Kotlin/Native', desc: 'Compiles supported code into native binaries.' },
          { title: 'Kotlin Multiplatform', desc: 'Shares common code across supported targets.' }
        ],
        callout: {
          type: 'info',
          title: 'Go Deeper',
          message: 'You do not need to master these targets yet. Understand their basic differences and Kotlin’s ability to work with Java.'
        }
      },

      {
        id: 'expressions-vs-statements',
        title: 'Expressions vs Statements (Intermediate)',
        icon: 'functions',
        badge: 'INTERMEDIATE',
        paragraphs: [
          'An expression is a piece of code that produces a value. For example, 2 + 3 is an expression whose value is 5.',
          'A statement performs an action or establishes a declaration. A variable declaration, for example, introduces a name that can be used later. Kotlin is expression-oriented: several constructs that are statements in some languages can produce values in Kotlin.',
          'For now, the useful distinction is simple: an expression produces a value, while a declaration introduces something into your program.'
        ],
        codeSnippet: {
          title: 'Expression and declaration',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    val result = 2 + 3',
            '    println(result)',
            '}'
          ],
          explanation: '2 + 3 is an expression. The val declaration introduces result, and println() displays its value.',
          output: '5'
        }
      }
    ],

    gotchas: [
      {
        mistake: 'Thinking Kotlin is only for Android.',
        whyItFails: 'Kotlin also supports backend, JavaScript, native, and multiplatform development.',
        correction: 'Remember that Android is one important Kotlin use case, not the language’s only purpose.'
      },
      {
        mistake: 'Using a Java-style main declaration in Kotlin.',
        whyItFails: 'Kotlin uses its own function declaration syntax.',
        badCode: ['public static void main(String[] args) {', '    println("Hello")', '}'],
        fixedCode: ['fun main() {', '    println("Hello")', '}'],
        correction: 'Declare a basic Kotlin entry point with fun main().'
      },
      {
        mistake: 'Writing printLine() instead of println().',
        whyItFails: 'printLine() is not the Kotlin standard-library function for printing a line.',
        badCode: ['printLine("Hello")'],
        fixedCode: ['println("Hello")'],
        correction: 'Use println() to print a value followed by a line break.'
      }
    ],

    cheatsheet: [
      { term: 'Kotlin source file', syntax: 'Main.kt', description: 'A typical Kotlin source filename uses the .kt extension.' },
      { term: 'Entry point', syntax: 'fun main() { }', description: 'Declares the entry point of a basic Kotlin program.' },
      { term: 'Console output', syntax: 'println("Hello")', description: 'Prints a message followed by a newline.' },
      { term: 'Value declaration', syntax: 'val result = 2 + 3', description: 'Introduces a read-only name initialized with an expression.' },
      { term: 'Kotlin platforms', syntax: 'JVM / JS / Native', description: 'Major compilation targets; Multiplatform enables suitable code sharing.' }
    ],

    quiz: [
      {
        id: 'w1-l1-q1',
        question: 'Which statement correctly describes Kotlin?',
        options: [
          'It is exclusively an Android development language.',
          'It is a general-purpose programming language.',
          'It is a database management system.',
          'It only runs inside web browsers.'
        ],
        correctIndex: 1,
        explanation: 'Kotlin supports Android, backend, scripting, and several other development targets.'
      },
      {
        id: 'w1-l1-q2',
        question: 'What is the purpose of main() in a basic Kotlin program?',
        options: [
          'It stores the program’s files.',
          'It automatically installs dependencies.',
          'It provides the program entry point.',
          'It converts Kotlin into Java source code.'
        ],
        correctIndex: 2,
        explanation: 'The main() function provides the entry point for a basic Kotlin application.'
      },
      {
        id: 'w1-l1-q3',
        question: 'What does Kotlin/JVM primarily target?',
        options: [
          'The Java Virtual Machine',
          'Only native iOS applications',
          'A database server',
          'Only JavaScript browsers'
        ],
        correctIndex: 0,
        explanation: 'Kotlin/JVM compiles Kotlin code into bytecode that runs on the Java Virtual Machine.'
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
    subtitle: 'Understand how Kotlin files, functions, blocks, and statements fit together.',
    badge: 'BEGINNER',
    readTime: '6 min',
    overviewSummary:
      'Learn the structure of a Kotlin program, how main() starts execution, how functions and code blocks work, and the basic rules for naming and formatting code.',

    toc: [
      { id: 'kotlin-files-and-main', label: 'Kotlin Files and main()' },
      { id: 'functions-blocks-and-calls', label: 'Functions, Blocks and Calls' },
      { id: 'statements-and-formatting', label: 'Statements and Formatting' },
      { id: 'identifiers-and-keywords', label: 'Identifiers and Keywords' },
      { id: 'arguments-packages-and-imports', label: 'Arguments, Packages and Imports (Intermediate)' },
      { id: 'gotchas', label: 'Gotchas' },
      { id: 'cheatsheet', label: 'Cheatsheet' },
      { id: 'quiz', label: 'Quiz' }
    ],

    sections: [
      {
        id: 'kotlin-files-and-main',
        title: 'Kotlin Files and main()',
        icon: 'description',
        badge: 'PROGRAM STRUCTURE',
        paragraphs: [
          'A Kotlin source file contains declarations and executable code inside functions. Kotlin files normally use the .kt extension, such as Main.kt.',
          'A basic standalone Kotlin application begins execution in a function named main. The declaration fun main() introduces that function, and the braces enclose its body. When the program starts, the instructions inside main() run in sequence.',
          'Unlike Java, a simple Kotlin program does not require you to wrap main() inside a class. Top-level functions can be declared directly in a Kotlin source file.'
        ],
        codeSnippet: {
          title: 'Your first Kotlin program',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    println("Starting")',
            '    println("Finished")',
            '}'
          ],
          explanation: 'The program enters main() and executes the two function calls in order.',
          output: 'Starting\nFinished'
        },
        callout: {
          type: 'key',
          title: 'Entry Point',
          message: 'The main() function is where a basic Kotlin application starts executing.'
        }
      },

      {
        id: 'functions-blocks-and-calls',
        title: 'Functions, Blocks and Calls',
        icon: 'account_tree',
        badge: 'FUNCTION SYNTAX',
        paragraphs: [
          'A function is a named block of code that performs a task. A basic function declaration contains the fun keyword, a function name, parentheses, and a body enclosed in braces.',
          'The opening brace { begins a code block, and the closing brace } ends it. Instructions inside the block belong to that function. You call a function by writing its name followed by parentheses.',
          'A function can be declared outside main() and called from inside it. Execution enters the called function, runs its instructions, and then returns to the point after the call.'
        ],
        codeSnippet: {
          title: 'Declaring and calling a function',
          language: 'Kotlin',
          code: [
            'fun greet() {',
            '    println("Welcome!")',
            '}',
            '',
            'fun main() {',
            '    println("Before")',
            '    greet()',
            '    println("After")',
            '}'
          ],
          explanation: 'main() prints Before, calls greet(), then resumes and prints After.',
          output: 'Before\nWelcome!\nAfter'
        },
        callout: {
          type: 'info',
          title: 'Go Deeper',
          message: 'A function declaration defines a task; a function call executes it. Parentheses are required even when the function takes no arguments.'
        }
      },

      {
        id: 'statements-and-formatting',
        title: 'Statements and Formatting',
        icon: 'format_align_left',
        badge: 'READABLE CODE',
        paragraphs: [
          'Kotlin programs contain statements and expressions. A statement can introduce a declaration or perform an action. An expression produces a value that another part of the program can use.',
          'Kotlin normally uses line breaks to separate instructions. Semicolons are optional in ordinary code, although they can separate multiple statements on the same line. Writing one instruction per line is usually easier to read.',
          'Whitespace makes code readable. The common Kotlin convention is to indent code inside a block by four spaces. Indentation is a formatting convention, not a replacement for braces.'
        ],
        comparison: {
          leftTitle: 'Harder to read',
          leftCode: ['fun main(){println("One");println("Two")}'],
          leftTag: 'VALID BUT CRAMPED',
          rightTitle: 'Recommended formatting',
          rightCode: [
            'fun main() {',
            '    println("One")',
            '    println("Two")',
            '}'
          ],
          rightTag: 'READABLE',
          verdict: 'Both versions are valid and print the same output. The formatted version makes the block and execution order easier to see.'
        },
        callout: {
          type: 'info',
          title: 'Go Deeper',
          message: 'Use consistent whitespace, four-space indentation, and optional semicolons only when they genuinely improve readability.'
        }
      },

      {
        id: 'identifiers-and-keywords',
        title: 'Identifiers and Keywords',
        icon: 'label',
        badge: 'NAMING RULES',
        paragraphs: [
          'An identifier is a name you give to something in your program, such as a function or variable. Names help you recognize the purpose of each part of your code.',
          'Ordinary identifiers can contain letters, digits, and underscores, but they cannot begin with a digit. Kotlin identifiers are case-sensitive, so greet and Greet are different names.',
          'Keywords are words with special meaning in the language. For example, fun declares a function, while val and var introduce values and variables. You cannot use a hard keyword as an ordinary identifier.',
          'Use meaningful names such as printWelcome rather than vague names such as abc. Function and variable names normally use camelCase.'
        ],
        bulletPoints: [
          { title: 'Valid names', desc: 'greet, printWelcome, user2, and _count are valid ordinary identifiers.' },
          { title: 'Invalid names', desc: '2user starts with a digit, and fun is a keyword.' },
          { title: 'Case sensitivity', desc: 'printMessage and PrintMessage are distinct identifiers.' },
          { title: 'Naming convention', desc: 'Prefer descriptive camelCase names for functions and variables.' }
        ],
        callout: {
          type: 'tip',
          title: 'Naming Tip',
          message: 'Choose names that describe what your code does. Clear names reduce the need for explanatory comments.'
        }
      },

      {
        id: 'arguments-packages-and-imports',
        title: 'Arguments, Packages and Imports (Intermediate)',
        icon: 'inventory_2',
        badge: 'INTERMEDIATE',
        paragraphs: [
          'A Kotlin main() function can optionally accept command-line arguments through a parameter such as args: Array<String>. These arguments are strings supplied when the program is launched. You do not need this parameter for programs that do not use command-line arguments.',
          'A package declaration identifies the namespace to which a Kotlin file belongs. When present, it appears near the top of the file, before imports and ordinary declarations.',
          'Import directives allow you to refer to declarations from other packages without repeatedly writing their fully qualified names. Kotlin also provides default imports for commonly used declarations, including println.'
        ],
        codeSnippet: {
          title: 'Package, import, and main arguments',
          language: 'Kotlin',
          code: [
            'package demo',
            '',
            'import kotlin.math.abs',
            '',
            'fun main(args: Array<String>) {',
            '    println(abs(-5))',
            '    println("Arguments: ${args.size}")',
            '}'
          ],
          explanation: 'The package declaration identifies the namespace, the import makes abs available by its short name, and args contains command-line arguments. This output assumes no arguments were supplied.',
          output: '5\nArguments: 0'
        },
        callout: {
          type: 'info',
          title: 'At This Stage',
          message: 'Recognize package, import, and command-line argument syntax. Detailed package organization and argument processing can come later.'
        }
      }
    ],

    gotchas: [
      {
        mistake: 'Forgetting parentheses when declaring main.',
        whyItFails: 'A function declaration requires parentheses after its name.',
        badCode: ['fun main {', '    println("Hello")', '}'],
        fixedCode: ['fun main() {', '    println("Hello")', '}'],
        correction: 'Write main() with parentheses, even when it has no parameters.'
      },
      {
        mistake: 'Forgetting the closing brace of a function.',
        whyItFails: 'Every opening brace in a function body must have a matching closing brace.',
        badCode: ['fun main() {', '    println("Hello")'],
        fixedCode: ['fun main() {', '    println("Hello")', '}'],
        correction: 'Match every opening brace with a closing brace.'
      },
      {
        mistake: 'Using a keyword as an ordinary function name.',
        whyItFails: 'Hard keywords have reserved meanings in Kotlin.',
        badCode: ['fun fun() {', '    println("Hello")', '}'],
        fixedCode: ['fun greet() {', '    println("Hello")', '}'],
        correction: 'Choose a valid, descriptive identifier instead of a reserved keyword.'
      }
    ],

    cheatsheet: [
      { term: 'Main function', syntax: 'fun main() { }', description: 'Declares the entry point of a basic Kotlin application.' },
      { term: 'Function declaration', syntax: 'fun greet() { }', description: 'Defines a named function with a body.' },
      { term: 'Function call', syntax: 'greet()', description: 'Invokes a function using its name and parentheses.' },
      { term: 'Code block', syntax: '{ ... }', description: 'Groups instructions inside a function or another block.' },
      { term: 'Package and import', syntax: 'package demo\nimport kotlin.math.abs', description: 'Declares a namespace and imports a declaration from another package.' }
    ],

    quiz: [
      {
        id: 'w1-l2-q1',
        question: 'What is the role of braces in a basic Kotlin function?',
        options: [
          'They identify the source filename.',
          'They enclose the function body.',
          'They replace function-call parentheses.',
          'They declare the function return type.'
        ],
        correctIndex: 1,
        explanation: 'Braces enclose the instructions belonging to a function body.'
      },
      {
        id: 'w1-l2-q2',
        question: 'Which statement about semicolons in Kotlin is correct?',
        options: [
          'Every instruction must end with a semicolon.',
          'Semicolons are forbidden.',
          'Semicolons are normally optional.',
          'Semicolons replace closing braces.'
        ],
        correctIndex: 2,
        explanation: 'Kotlin normally separates instructions with line breaks. Semicolons can be used when needed, such as between statements on the same line.'
      },
      {
        id: 'w1-l2-q3',
        question: 'Which identifier follows ordinary Kotlin naming rules?',
        options: ['2message', 'fun', 'printMessage', 'user-name'],
        correctIndex: 2,
        explanation: 'printMessage is a valid camelCase identifier. The other options either begin with a digit, use a reserved keyword, or contain a hyphen.'
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
    title: 'Comments',
    subtitle: 'Explain your code clearly using Kotlin comments.',
    badge: 'BEGINNER',
    readTime: '4 min',
    overviewSummary:
      'Learn when comments are useful, how single-line and block comments work, and how Kotlin supports nested comments and introductory KDoc documentation.',

    toc: [
      { id: 'why-and-when-to-comment', label: 'Why and When to Comment' },
      { id: 'single-line-and-block-comments', label: 'Single-Line and Block Comments' },
      { id: 'nested-and-kdoc-comments', label: 'Nested and KDoc Comments (Intermediate)' },
      { id: 'gotchas', label: 'Gotchas' },
      { id: 'cheatsheet', label: 'Cheatsheet' },
      { id: 'quiz', label: 'Quiz' }
    ],

    sections: [
      {
        id: 'why-and-when-to-comment',
        title: 'Why and When to Comment',
        icon: 'comment',
        badge: 'PURPOSE',
        paragraphs: [
          'Comments are notes written inside source code for people reading it. The compiler ignores comments when executing your program. They help explain why a decision was made, clarify unusual behavior, or document an important assumption.',
          'A useful comment provides information that is not obvious from the code itself. Avoid explaining every instruction or repeating what a clear function name already says. Excessive comments can make a program harder to read and maintain.',
          'Keep comments accurate when the code changes. An outdated comment can be more misleading than having no comment at all.'
        ],
        comparison: {
          leftTitle: 'Obvious comment',
          leftCode: ['// Print Hello', 'println("Hello")'],
          leftTag: 'LOW VALUE',
          rightTitle: 'Intent-focused comment',
          rightCode: ['// Show a welcome message before the tutorial begins.', 'println("Hello")'],
          rightTag: 'EXPLAINS WHY',
          verdict: 'Prefer comments that explain intent or context instead of merely describing visible syntax.'
        },
        callout: {
          type: 'info',
          title: 'Go Deeper',
          message: 'Write comments for future readers. Use clear wording, consistent spacing after comment markers, and remove comments that no longer match the code.'
        }
      },

      {
        id: 'single-line-and-block-comments',
        title: 'Single-Line and Block Comments',
        icon: 'notes',
        badge: 'COMMENT SYNTAX',
        paragraphs: [
          'A single-line comment begins with //. Everything after the marker on that line is treated as a comment. You can place it on its own line or after an instruction as an end-of-line comment.',
          'A block comment starts with /* and ends with */. It can cover part of a line or several lines, making it useful for longer explanations.',
          'While learning or debugging, you can temporarily comment out code to prevent it from executing. However, removing unnecessary code is generally preferable to leaving large blocks of disabled code in a finished program.'
        ],
        codeSnippet: {
          title: 'Single-line and block comments',
          language: 'Kotlin',
          code: [
            'fun main() {',
            '    // Display the first message.',
            '    println("Hello") // End-of-line comment',
            '',
            '    /*',
            '       This message is temporarily disabled.',
            '       println("Hidden")',
            '    */',
            '',
            '    println("Done")',
            '}'
          ],
          explanation: 'The compiler ignores the single-line, end-of-line, and block comments. Only the two active println() calls execute.',
          output: 'Hello\nDone'
        },
        callout: {
          type: 'info',
          title: 'Go Deeper',
          message: 'Commenting out code is useful for short experiments. Before finishing a program, remove disabled code that is no longer needed.'
        }
      },

      {
        id: 'nested-and-kdoc-comments',
        title: 'Nested and KDoc Comments (Intermediate)',
        icon: 'article',
        badge: 'INTERMEDIATE',
        paragraphs: [
          'Kotlin supports nested block comments. You can place a /* ... */ comment inside another block comment, and Kotlin correctly matches their boundaries. This is useful when temporarily disabling code that already contains block comments.',
          'KDoc is Kotlin\u2019s documentation-comment format. It starts with /** and ends with */. KDoc comments are normally placed immediately before the declarations they describe and can be processed by documentation tools.',
          'You do not need to document every function at this stage. Recognize the difference: ordinary comments explain code to readers, while KDoc is intended to document declarations in a structured way.'
        ],
        codeSnippet: {
          title: 'Nested comments and KDoc',
          language: 'Kotlin',
          code: [
            '/** Prints a short greeting. */',
            'fun greet() {',
            '    println("Hello")',
            '}',
            '',
            'fun main() {',
            '    /*',
            '       Temporarily disabled:',
            '       /* An inner block comment. */',
            '       println("Hidden")',
            '    */',
            '    greet()',
            '}'
          ],
          explanation: 'The nested block is ignored. The KDoc comment documents greet(), and main() calls that function.',
          output: 'Hello'
        },
        callout: {
          type: 'key',
          title: 'Kotlin-Specific Capability',
          message: 'Unlike some programming languages, Kotlin allows block comments to be nested.'
        }
      }
    ],

    gotchas: [
      {
        mistake: 'Expecting commented-out code to execute.',
        whyItFails: 'The compiler ignores everything inside a comment.',
        badCode: ['fun main() {', '    // println("Hello")', '}'],
        fixedCode: ['fun main() {', '    println("Hello")', '}'],
        correction: 'Remove the comment marker when you want the instruction to execute.'
      },
      {
        mistake: 'Forgetting to close a block comment.',
        whyItFails: 'An unterminated block comment causes a compilation error.',
        badCode: ['fun main() {', '    /* An unfinished comment', '    println("Hello")', '}'],
        fixedCode: ['fun main() {', '    /* A completed comment */', '    println("Hello")', '}'],
        correction: 'Close every block comment with */.'
      },
      {
        mistake: 'Writing comments that contradict the code.',
        whyItFails: 'Misleading comments can cause readers to misunderstand the program.',
        badCode: ['// Print Goodbye', 'println("Hello")'],
        fixedCode: ['// Display the welcome message.', 'println("Hello")'],
        correction: 'Update or remove comments whenever the code changes.'
      }
    ],

    cheatsheet: [
      { term: 'Single-line comment', syntax: '// Your comment', description: 'Comments out the remainder of the current line.' },
      { term: 'End-of-line comment', syntax: 'println("Hi") // Greeting', description: 'Places a comment after an instruction on the same line.' },
      { term: 'Block comment', syntax: '/* Your comment */', description: 'Creates a comment that can span multiple lines.' },
      { term: 'Nested comment', syntax: '/* Outer /* Inner */ Outer */', description: 'Places one block comment inside another.' },
      { term: 'KDoc', syntax: '/** Documents a declaration. */', description: 'Introduces a documentation comment for a Kotlin declaration.' }
    ],

    quiz: [
      {
        id: 'w1-l3-q1',
        question: 'What is the primary purpose of a useful code comment?',
        options: [
          'To make the program execute faster.',
          'To replace function declarations.',
          'To explain intent or important context.',
          'To make every line of code longer.'
        ],
        correctIndex: 2,
        explanation: 'Useful comments clarify intent, assumptions, or behavior that is not immediately obvious from the code.'
      },
      {
        id: 'w1-l3-q2',
        question: 'Which statement about Kotlin block comments is correct?',
        options: [
          'They can only occupy one line.',
          'They can contain nested block comments.',
          'They must always appear inside main().',
          'They are executed before other instructions.'
        ],
        correctIndex: 1,
        explanation: 'Kotlin supports nested block comments and correctly matches their opening and closing markers.'
      },
      {
        id: 'w1-l3-q3',
        question: 'What is KDoc primarily used for?',
        options: [
          'Running commented-out instructions.',
          'Replacing Kotlin source files.',
          'Documenting declarations for readers and documentation tools.',
          'Printing comments in the console.'
        ],
        correctIndex: 2,
        explanation: 'KDoc provides structured documentation comments for Kotlin declarations.'
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
