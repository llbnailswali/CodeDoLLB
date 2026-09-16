import { runKotlinCode, KotlinExecutionResult } from '../src/utils/kotlinRunner';

// ANSI terminal colors
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

interface TestReport {
  suite: string;
  name: string;
  passed: boolean;
  expected?: string;
  actual?: string;
  error?: string;
}

const reports: TestReport[] = [];

function assert(condition: boolean, suite: string, name: string, details?: { expected?: string; actual?: string; error?: string }) {
  if (condition) {
    reports.push({ suite, name, passed: true });
    console.log(`  ${green('✔')} [${suite}] ${name}`);
  } else {
    reports.push({
      suite,
      name,
      passed: false,
      expected: details?.expected,
      actual: details?.actual,
      error: details?.error,
    });
    console.log(`  ${red('✖')} [${suite}] ${name}`);
    if (details?.expected !== undefined) console.log(`      Expected: ${JSON.stringify(details.expected)}`);
    if (details?.actual !== undefined) console.log(`      Actual:   ${JSON.stringify(details.actual)}`);
    if (details?.error !== undefined) console.log(`      Error:    ${details.error}`);
  }
}

/**
 * EditorState simulates the exact state and operations of WriteRun.tsx
 */
class EditorSimulator {
  userCode: string;
  cursorPosition: number;
  history: string[];
  historyIndex: number;

  constructor(initialCode: string = '') {
    this.userCode = initialCode;
    this.cursorPosition = initialCode.length;
    this.history = [initialCode];
    this.historyIndex = 0;
  }

  updateCodeWithHistory(newCode: string, newPos: number) {
    const updatedHistory = this.history.slice(0, this.historyIndex + 1);
    updatedHistory.push(newCode);
    this.history = updatedHistory;
    this.historyIndex = updatedHistory.length - 1;
    this.userCode = newCode;
    this.cursorPosition = Math.max(0, Math.min(newCode.length, newPos));
  }

  typeToken(token: string) {
    const start = this.cursorPosition;
    const end = this.cursorPosition;

    // Overtype if next char matches closing bracket/quote
    if (
      start === end &&
      (token === ')' || token === '}' || token === ']' || token === '"') &&
      this.userCode[start] === token
    ) {
      this.cursorPosition = start + 1;
      return;
    }

    let insert = token;
    let cursorOffset = token.length;

    // Auto-closing brackets
    if (token === '{') {
      insert = '{}';
      cursorOffset = 1;
    } else if (token === '(') {
      insert = '()';
      cursorOffset = 1;
    } else if (token === '[') {
      insert = '[]';
      cursorOffset = 1;
    } else if (token === '"') {
      insert = '""';
      cursorOffset = 1;
    }

    const before = this.userCode.slice(0, start);
    const after = this.userCode.slice(end);
    this.updateCodeWithHistory(before + insert + after, start + cursorOffset);
  }

  typeString(text: string) {
    for (const char of text) {
      this.typeToken(char);
    }
  }

  backspace() {
    const start = this.cursorPosition;
    if (start > 0) {
      const charBefore = this.userCode[start - 1];
      const charAfter = this.userCode[start];

      const isPair =
        (charBefore === '{' && charAfter === '}') ||
        (charBefore === '(' && charAfter === ')') ||
        (charBefore === '[' && charAfter === ']') ||
        (charBefore === '"' && charAfter === '"');

      if (isPair) {
        const before = this.userCode.slice(0, start - 1);
        const after = this.userCode.slice(start + 1);
        this.updateCodeWithHistory(before + after, start - 1);
        return;
      }

      const before = this.userCode.slice(0, start - 1);
      const after = this.userCode.slice(start);
      this.updateCodeWithHistory(before + after, start - 1);
    }
  }

  delete() {
    if (this.cursorPosition < this.userCode.length) {
      const before = this.userCode.slice(0, this.cursorPosition);
      const after = this.userCode.slice(this.cursorPosition + 1);
      this.updateCodeWithHistory(before + after, this.cursorPosition);
    }
  }

  smartReturn() {
    const pos = this.cursorPosition;
    const textBefore = this.userCode.slice(0, pos);
    const textAfter = this.userCode.slice(pos);

    const currentLineMatch = textBefore.match(/(?:^|\n)([^\n]*)$/);
    const currentLine = currentLineMatch ? currentLineMatch[1] : '';
    const indentMatch = currentLine.match(/^(\s*)/);
    const currentIndent = indentMatch ? indentMatch[1] : '';

    const trimmedLine = currentLine.trim();
    const endsWithOpenBrace = trimmedLine.endsWith('{');
    const nextCharIsCloseBrace = textAfter.startsWith('}');

    let insert = '\n' + currentIndent;
    let cursorOffset = insert.length;

    if (endsWithOpenBrace) {
      if (nextCharIsCloseBrace) {
        insert = '\n' + currentIndent + '    \n' + currentIndent;
        cursorOffset = 1 + currentIndent.length + 4;
      } else {
        insert = '\n' + currentIndent + '    ';
        cursorOffset = insert.length;
      }
    }

    const newCode = textBefore + insert + textAfter;
    this.updateCodeWithHistory(newCode, pos + cursorOffset);
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.userCode = this.history[this.historyIndex];
      this.cursorPosition = this.userCode.length;
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.userCode = this.history[this.historyIndex];
      this.cursorPosition = this.userCode.length;
    }
  }

  arrowLeft() {
    this.cursorPosition = Math.max(0, this.cursorPosition - 1);
  }

  arrowRight() {
    this.cursorPosition = Math.min(this.userCode.length, this.cursorPosition + 1);
  }

  get lines() {
    return this.userCode.split('\n');
  }

  get currentLineIndex() {
    let charCount = 0;
    for (let i = 0; i < this.lines.length; i++) {
      charCount += this.lines[i].length + 1;
      if (this.cursorPosition < charCount) return i;
      if (i === this.lines.length - 1) return i;
    }
    return 0;
  }

  arrowUp() {
    const lines = this.lines;
    const curIdx = this.currentLineIndex;
    const lineOffsets: number[] = [];
    let off = 0;
    for (let i = 0; i < lines.length; i++) {
      lineOffsets.push(off);
      off += lines[i].length + 1;
    }
    if (curIdx > 0) {
      const targetLine = curIdx - 1;
      const col = this.cursorPosition - lineOffsets[curIdx];
      const targetOffset = lineOffsets[targetLine] + Math.min(col, lines[targetLine].length);
      this.cursorPosition = targetOffset;
    } else {
      this.cursorPosition = 0;
    }
  }

  arrowDown() {
    const lines = this.lines;
    const curIdx = this.currentLineIndex;
    const lineOffsets: number[] = [];
    let off = 0;
    for (let i = 0; i < lines.length; i++) {
      lineOffsets.push(off);
      off += lines[i].length + 1;
    }
    if (curIdx < lines.length - 1) {
      const targetLine = curIdx + 1;
      const col = this.cursorPosition - lineOffsets[curIdx];
      const targetOffset = lineOffsets[targetLine] + Math.min(col, lines[targetLine].length);
      this.cursorPosition = targetOffset;
    } else {
      this.cursorPosition = this.userCode.length;
    }
  }

  home() {
    let off = 0;
    for (let i = 0; i < this.currentLineIndex; i++) {
      off += this.lines[i].length + 1;
    }
    this.cursorPosition = off;
  }

  end() {
    let off = 0;
    for (let i = 0; i < this.currentLineIndex; i++) {
      off += this.lines[i].length + 1;
    }
    this.cursorPosition = off + this.lines[this.currentLineIndex].length;
  }
}

async function runTests() {
  console.log(bold(cyan('======================================================')));
  console.log(bold(cyan('  STAGE 4 USER TYPING & FULL PROGRAMS VERIFICATION    ')));
  console.log(bold(cyan('======================================================\n')));

  // ----------------------------------------------------
  // SUITE 1: User Keystroke Typing & Editor Simulation
  // ----------------------------------------------------
  console.log(bold(yellow('SUITE 1: User Typing & Keystroke Interactions')));

  {
    const ed = new EditorSimulator();
    ed.typeString('val x = 42');
    assert(ed.userCode === 'val x = 42', 'Typing', 'Basic string entry', { expected: 'val x = 42', actual: ed.userCode });
    assert(ed.cursorPosition === 10, 'Typing', 'Cursor at end of input');
  }

  {
    // Auto-bracket insertion & smart overtype
    const ed = new EditorSimulator();
    ed.typeToken('(');
    assert(ed.userCode === '()', 'Typing', 'Auto-close paren creates ()', { expected: '()', actual: ed.userCode });
    assert(ed.cursorPosition === 1, 'Typing', 'Cursor positioned between parens');

    // Overtyping closing paren steps over without creating extra paren
    ed.typeToken(')');
    assert(ed.userCode === '()', 'Typing', 'Overtyping ) steps over existing closing paren', { expected: '()', actual: ed.userCode });
    assert(ed.cursorPosition === 2, 'Typing', 'Cursor now past closing paren');
  }

  {
    // Quotes insertion & overtyping
    const ed = new EditorSimulator();
    ed.typeString('println(');
    assert(ed.userCode === 'println()', 'Typing', 'println( auto-closes to println()');
    ed.typeToken('"');
    assert(ed.userCode === 'println("")', 'Typing', 'Opening quote auto-closes to ""');
    ed.typeString('Hello Kotlin');
    assert(ed.userCode === 'println("Hello Kotlin")', 'Typing', 'String typed inside quotes');
    ed.typeToken('"'); // Overtype closing quote
    assert(ed.userCode === 'println("Hello Kotlin")', 'Typing', 'Overtyping closing quote steps over');
    ed.typeToken(')'); // Overtype closing paren
    assert(ed.userCode === 'println("Hello Kotlin")', 'Typing', 'Overtyping closing paren steps over');
    assert(ed.cursorPosition === ed.userCode.length, 'Typing', 'Cursor at final end');
  }

  {
    // Smart return & indentation
    const ed = new EditorSimulator();
    ed.typeString('fun main() {');
    assert(ed.userCode === 'fun main() {}', 'Typing', 'Brace auto-closes to {}');
    ed.smartReturn();
    const expected = 'fun main() {\n    \n}';
    assert(ed.userCode === expected, 'Typing', 'Smart return expands braces and indents 4 spaces', { expected, actual: ed.userCode });
    assert(ed.cursorPosition === 'fun main() {\n    '.length, 'Typing', 'Cursor placed at 4-space indent');

    ed.typeString('val name = "Alex"');
    ed.smartReturn();
    assert(ed.userCode.includes('val name = "Alex"\n    '), 'Typing', 'Next return preserves 4-space indent');
  }

  {
    // Smart Backspace deletes paired empty brackets
    const ed = new EditorSimulator();
    ed.typeToken('(');
    assert(ed.userCode === '()', 'Typing', 'Paren opened');
    ed.backspace();
    assert(ed.userCode === '', 'Typing', 'Backspace on empty () deletes both brackets');

    ed.typeToken('{');
    assert(ed.userCode === '{}', 'Typing', 'Brace opened');
    ed.backspace();
    assert(ed.userCode === '', 'Typing', 'Backspace on empty {} deletes both brackets');

    ed.typeToken('"');
    assert(ed.userCode === '""', 'Typing', 'Quote opened');
    ed.backspace();
    assert(ed.userCode === '', 'Typing', 'Backspace on empty "" deletes both quotes');
  }

  {
    // Delete key (forward delete)
    const ed = new EditorSimulator('val x = 10');
    ed.cursorPosition = 4; // Right before 'x'
    ed.delete();
    assert(ed.userCode === 'val  = 10', 'Typing', 'Delete key forward deletes character');
  }

  {
    // Multi-line Arrow navigation
    const ed = new EditorSimulator('line1\nline2222\nline3');
    ed.cursorPosition = 2; // on 'line1' at col 2
    ed.arrowDown();
    assert(ed.currentLineIndex === 1, 'Typing', 'ArrowDown moves to next line');
    assert(ed.cursorPosition === 6 + 2, 'Typing', 'ArrowDown maintains column 2');

    ed.end();
    assert(ed.cursorPosition === 6 + 8, 'Typing', 'End key moves to end of line2222');

    ed.arrowUp();
    assert(ed.currentLineIndex === 0, 'Typing', 'ArrowUp moves to line1 clamped to length');
    assert(ed.cursorPosition === 5, 'Typing', 'ArrowUp clamps col to line1 length 5');

    ed.home();
    assert(ed.cursorPosition === 0, 'Typing', 'Home key moves to start of line');
  }

  {
    // Undo / Redo
    const ed = new EditorSimulator();
    ed.typeString('val a = 1');
    ed.typeString('; val b = 2');
    assert(ed.userCode === 'val a = 1; val b = 2', 'Typing', 'History tracked text');
    ed.undo();
    assert(ed.userCode === 'val a = 1; val b = ', 'Typing', 'Undo restores previous state');
    ed.redo();
    assert(ed.userCode === 'val a = 1; val b = 2', 'Typing', 'Redo restores undone state');
  }

  {
    // Complete program typed keystroke-by-keystroke in simulated editor then executed
    const ed = new EditorSimulator();
    ed.typeString('fun main() {');
    ed.smartReturn();
    ed.typeString('val message = "Hello from Typed Program"');
    ed.smartReturn();
    ed.typeString('println(message)');
    ed.arrowDown();

    const result = await runKotlinCode(ed.userCode);
    assert(result.success, 'Typing', 'Typed program compiles & runs successfully');
    assert(result.output === 'Hello from Typed Program', 'Typing', 'Typed program outputs expected text', {
      expected: 'Hello from Typed Program',
      actual: result.output,
    });
  }

  // ----------------------------------------------------
  // SUITE 2: Full Different Programs Written & Executed
  // ----------------------------------------------------
  console.log(bold(yellow('\nSUITE 2: Writing & Running Diverse Full Programs')));

  // Program 1: FizzBuzz with Kotlin when expression
  {
    const code = `
fun main() {
    for (i in 1..15) {
        val result = when {
            i % 15 == 0 -> "FizzBuzz"
            i % 3 == 0 -> "Fizz"
            i % 5 == 0 -> "Buzz"
            else -> i.toString()
        }
        println(result)
    }
}
    `.trim();

    const res = await runKotlinCode(code);
    const expectedLines = [
      '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz',
      '11', 'Fizz', '13', '14', 'FizzBuzz'
    ];
    assert(res.success, 'Full Programs', 'Program 1: FizzBuzz executes without errors', { error: res.error?.message, actual: res.output });
    assert(res.output === expectedLines.join('\n'), 'Full Programs', 'Program 1: FizzBuzz outputs correct sequence', { expected: expectedLines.join('\n'), actual: res.output });
  }

  // Program 2: Fibonacci Sequence Generator with Lists
  {
    const code = `
fun main() {
    val fib = mutableListOf(0, 1)
    for (i in 2..9) {
        val next = fib[i - 1] + fib[i - 2]
        fib.add(next)
    }
    println("Fibonacci: " + fib.joinToString(", "))
    println("Count: " + fib.size)
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 2: Fibonacci executes without errors', { error: res.error?.message, actual: res.output });
    assert(res.output.includes('Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34'), 'Full Programs', 'Program 2: Fibonacci sequence values match');
    assert(res.output.includes('Count: 10'), 'Full Programs', 'Program 2: Fibonacci count matches');
  }

  // Program 3: Palindrome Checker with Functions & String Manipulation
  {
    const code = `
fun isPalindrome(word: String): Boolean {
    val reversed = word.reversed()
    return word.lowercase() == reversed.lowercase()
}

fun main() {
    val words = listOf("racecar", "Kotlin", "madam", "Android")
    for (w in words) {
        if (isPalindrome(w)) {
            println(w + " is palindrome")
        } else {
            println(w + " is not palindrome")
        }
    }
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 3: Palindrome checker executes without errors', { error: res.error?.message, actual: res.output });
    assert(res.output.includes('racecar is palindrome'), 'Full Programs', 'Program 3: racecar detected');
    assert(res.output.includes('Kotlin is not palindrome'), 'Full Programs', 'Program 3: Kotlin detected not palindrome');
    assert(res.output.includes('madam is palindrome'), 'Full Programs', 'Program 3: madam detected');
  }

  // Program 4: Student Grade Analyzer with Data Classes & Collections
  {
    const code = `
data class Student(val name: String, val score: Int)

fun main() {
    val students = listOf(
        Student("Alice", 92),
        Student("Bob", 68),
        Student("Charlie", 85),
        Student("Diana", 95)
    )

    var totalScore = 0
    var honorCount = 0

    for (s in students) {
        totalScore += s.score
        if (s.score >= 85) {
            println("Honor Roll: " + s.name + " (" + s.score + ")")
            honorCount++
        }
    }

    val average = totalScore / students.size
    println("Total Students: " + students.size)
    println("Average Score: " + average)
    println("Honors: " + honorCount)
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 4: Student Grade Analyzer executes without errors');
    assert(res.output.includes('Honor Roll: Alice (92)'), 'Full Programs', 'Program 4: Alice in Honor Roll');
    assert(res.output.includes('Honor Roll: Charlie (85)'), 'Full Programs', 'Program 4: Charlie in Honor Roll');
    assert(res.output.includes('Honor Roll: Diana (95)'), 'Full Programs', 'Program 4: Diana in Honor Roll');
    assert(res.output.includes('Total Students: 4'), 'Full Programs', 'Program 4: Total students correct');
    assert(res.output.includes('Average Score: 85'), 'Full Programs', 'Program 4: Average score computed accurately');
  }

  // Program 5: Bank Account Transaction Ledger with Classes & Methods
  {
    const code = `
class BankAccount(val owner: String, var balance: Int) {
    fun deposit(amount: Int) {
        balance += amount
        println("Deposited " + amount + ", new balance: " + balance)
    }

    fun withdraw(amount: Int): Boolean {
        if (balance >= amount) {
            balance -= amount
            println("Withdrew " + amount + ", remaining balance: " + balance)
            return true
        } else {
            println("Declined: Insufficient funds for " + amount)
            return false
        }
    }
}

fun main() {
    val account = BankAccount("Elena", 500)
    println("Account created for " + account.owner)
    account.deposit(250)
    account.withdraw(100)
    account.withdraw(800)
    println("Final balance: " + account.balance)
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 5: BankAccount OOP class executes without errors', { error: res.error?.message, actual: res.output });
    assert(res.output.includes('Account created for Elena'), 'Full Programs', 'Program 5: Account created');
    assert(res.output.includes('Deposited 250, new balance: 750'), 'Full Programs', 'Program 5: Deposit works');
    assert(res.output.includes('Withdrew 100, remaining balance: 650'), 'Full Programs', 'Program 5: Withdrawal works');
    assert(res.output.includes('Declined: Insufficient funds for 800'), 'Full Programs', 'Program 5: Overdraft declined');
    assert(res.output.includes('Final balance: 650'), 'Full Programs', 'Program 5: Final balance matches');
  }

  // Program 6: Null Safety Pipeline with Elvis, Safe Calls, and Null Checks
  {
    const code = `
fun processUser(rawName: String?, rawAge: Int?): String {
    val name = rawName ?: "Guest"
    val ageDisplay = if (rawAge != null) {
        "Age: " + rawAge
    } else {
        "Age: Not provided"
    }
    return name + " (" + ageDisplay + ")"
}

fun main() {
    val user1 = processUser("Samantha", 28)
    val user2 = processUser(null, null)
    val user3 = processUser("Leo", null)

    println(user1)
    println(user2)
    println(user3)
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 6: Null safety pipeline executes without errors', { error: res.error?.message, actual: res.output });
    assert(res.output.includes('Samantha (Age: 28)'), 'Full Programs', 'Program 6: Full user profile formatted');
    assert(res.output.includes('Guest (Age: Not provided)'), 'Full Programs', 'Program 6: Fallback defaults formatted');
    assert(res.output.includes('Leo (Age: Not provided)'), 'Full Programs', 'Program 6: Partial null handled');
  }

  // Program 7: Nested Loops Multiplication Table Matrix
  {
    const code = `
fun main() {
    for (i in 1..4) {
        val row = mutableListOf<Int>()
        for (j in 1..4) {
            row.add(i * j)
        }
        println("Row " + i + ": " + row.joinToString(" "))
    }
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 7: Nested loops matrix executes without errors', { error: res.error?.message, actual: res.output });
    assert(res.output.includes('Row 1: 1 2 3 4'), 'Full Programs', 'Program 7: Row 1 matches');
    assert(res.output.includes('Row 2: 2 4 6 8'), 'Full Programs', 'Program 7: Row 2 matches');
    assert(res.output.includes('Row 3: 3 6 9 12'), 'Full Programs', 'Program 7: Row 3 matches');
    assert(res.output.includes('Row 4: 4 8 12 16'), 'Full Programs', 'Program 7: Row 4 matches');
  }

  // Program 8: Factorial & Number Classifier (Loops and Branching)
  {
    const code = `
fun factorial(n: Int): Int {
    var result = 1
    for (i in 1..n) {
        result *= i
    }
    return result
}

fun classify(n: Int): String {
    return if (n % 2 == 0) "Even" else "Odd"
}

fun main() {
    println("5! = " + factorial(5))
    println("6! = " + factorial(6))
    println("7 is " + classify(7))
    println("8 is " + classify(8))
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 8: Factorial & classifier executes without errors');
    assert(res.output.includes('5! = 120'), 'Full Programs', 'Program 8: 5! = 120');
    assert(res.output.includes('6! = 720'), 'Full Programs', 'Program 8: 6! = 720');
    assert(res.output.includes('7 is Odd'), 'Full Programs', 'Program 8: 7 is Odd');
    assert(res.output.includes('8 is Even'), 'Full Programs', 'Program 8: 8 is Even');
  }

  // Program 9: Enums and Compass Navigator
  {
    const code = `
enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

fun describeMove(dir: Direction): String {
    return when (dir) {
        Direction.NORTH -> "Heading North (+Y)"
        Direction.SOUTH -> "Heading South (-Y)"
        Direction.EAST -> "Heading East (+X)"
        Direction.WEST -> "Heading West (-X)"
    }
}

fun main() {
    val moves = listOf(Direction.NORTH, Direction.EAST, Direction.SOUTH)
    for (m in moves) {
        println(describeMove(m))
    }
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 9: Enum and when matching executes without errors');
    assert(res.output.includes('Heading North (+Y)'), 'Full Programs', 'Program 9: North move');
    assert(res.output.includes('Heading East (+X)'), 'Full Programs', 'Program 9: East move');
    assert(res.output.includes('Heading South (-Y)'), 'Full Programs', 'Program 9: South move');
  }

  // Program 10: Shopping Cart with Maps, Discounts & Sales Tax
  {
    const code = `
fun main() {
    val prices = mapOf(
        "Potion" to 25,
        "Shield" to 150,
        "Sword" to 300
    )

    val cart = listOf("Potion", "Shield", "Potion", "Sword")
    var subtotal = 0

    for (item in cart) {
        val price = prices[item] ?: 0
        subtotal += price
    }

    val discount = if (subtotal > 200) 50 else 0
    val total = subtotal - discount

    println("Items: " + cart.size)
    println("Subtotal: " + subtotal)
    println("Discount: " + discount)
    println("Total: " + total)
}
    `.trim();

    const res = await runKotlinCode(code);
    assert(res.success, 'Full Programs', 'Program 10: Shopping cart with maps executes without errors', { error: res.error?.message, actual: res.output });
    assert(res.output.includes('Items: 4'), 'Full Programs', 'Program 10: Cart size is 4');
    assert(res.output.includes('Subtotal: 500'), 'Full Programs', 'Program 10: Subtotal is 500');
    assert(res.output.includes('Discount: 50'), 'Full Programs', 'Program 10: Discount is 50');
    assert(res.output.includes('Total: 450'), 'Full Programs', 'Program 10: Total is 450');
  }

  // Summary
  const passed = reports.filter((r) => r.passed).length;
  const failed = reports.filter((r) => !r.passed).length;

  console.log(bold(cyan('\n======================================================')));
  console.log(bold(`TOTAL TESTS: ${reports.length}`));
  console.log(green(`PASSED: ${passed}`));
  if (failed > 0) {
    console.log(red(`FAILED: ${failed}`));
    process.exit(1);
  } else {
    console.log(bold(green('ALL TYPING & FULL PROGRAM TESTS PASSED! ✨')));
  }
  console.log(bold(cyan('======================================================\n')));
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
