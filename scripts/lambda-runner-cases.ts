export const functionCases: Array<{ name: string; code: string; expected: string }> = [
  { name: 'multiline closure returns the last expression', code: `fun main() {
    var bonus = 3
    val score: (Int) -> Int = { value ->
        val doubled = value * 2
        doubled + bonus
    }
    bonus = 5
    println(score(4))
}`, expected: '13' },
  { name: 'nested implicit it shadows the outer parameter', code: `fun main() {
    val rows = listOf(1, 2).map { outer ->
        listOf(3, 4).map { it + outer }.joinToString(",")
    }
    println(rows.joinToString(";"))
}`, expected: '4,5;5,6' },
  { name: 'outer implicit it remains visible in zero argument lambda', code: `fun runBlock(action: () -> Int): Int {
    return action()
}
fun main() {
    println(listOf(2, 3).map { runBlock { it * 2 } })
}`, expected: '[4, 6]' },
  { name: 'trailing lambda on nested call arguments', code: `fun apply(value: Int, action: (Int) -> Int): Int {
    return action(value)
}
fun main() {
    println(apply(apply(2) { it + 1 }) { it * 4 })
}`, expected: '12' },
  { name: 'lambda final if expression returns its selected branch', code: `fun main() {
    val label: (Int) -> String = { n ->
        if (n > 0) {
            val word = "positive"
            word
        } else {
            "zero"
        }
    }
    println(label(2))
    println(label(0))
}`, expected: 'positive\nzero' },
  { name: 'lambda final single-line if expression', code: `fun main() {
    val abs: (Int) -> Int = { n -> if (n < 0) -n else n }
    println(abs(-4))
}`, expected: '4' },
  { name: 'anonymous expression body with inferred parameters', code: `fun main() {
    val triple: (Int) -> Int = fun(n) = n * 3
    println(triple(4))
}`, expected: '12' },
  { name: 'anonymous function local early return', code: `fun main() {
    val safe = fun(n: Int): Int {
        if (n < 0) return 0
        return n * 2
    }
    println(safe(-1))
    println(safe(3))
}`, expected: '0\n6' },
  { name: 'function returning another function with captured parameter', code: `fun makeAdder(amount: Int): (Int) -> Int {
    return { value -> value + amount }
}
fun main() {
    val add = makeAdder(3)
    println(add(7))
}`, expected: '10' },
  { name: 'nested function type argument', code: `fun calculate(factory: (Int) -> (Int) -> Int): Int {
    val add = factory(3)
    return add(4)
}
fun main() {
    println(calculate { first -> { second -> first + second } })
}`, expected: '7' },
  { name: 'named parameters in function types and explicit invoke', code: `fun main() {
    val combine: (left: Int, right: Int) -> Int = { a, b -> a + b }
    println(combine.invoke(2, 5))
}`, expected: '7' },
  { name: 'nullable function type safe invocation', code: `fun main() {
    var operation: ((Int) -> Int)? = null
    println(operation?.invoke(4) ?: -1)
    operation = { n -> n * 2 }
    println(operation?.invoke(4))
}`, expected: '-1\n8' },
  { name: 'nullable return value is distinct from nullable function', code: `fun main() {
    val empty: () -> String? = { null }
    println(empty())
}`, expected: 'null' },
  { name: 'receiver function type direct invocation', code: `fun main() {
    val decorate: String.(Int) -> String = { count -> this.repeat(count) }
    println(decorate("Hi", 2))
}`, expected: 'HiHi' },
  { name: 'receiver function type extension-style invocation', code: `fun main() {
    val decorate: String.(Int) -> String = { count -> this.repeat(count) }
    println("Hi".decorate(2))
}`, expected: 'HiHi' },
  { name: 'function type alias', code: `typealias Transform = (Int) -> Int
fun main() {
    val double: Transform = { it * 2 }
    println(double(6))
}`, expected: '12' },
  { name: 'bound method reference retains the original instance', code: `class Multiplier(val factor: Int) {
    fun apply(n: Int) = this.factor * n
}
fun main() {
    var instance = Multiplier(3)
    val action = instance::apply
    instance = Multiplier(9)
    println(action(4))
}`, expected: '12' },
  { name: 'unbound instance method reference', code: `class Multiplier(val factor: Int) {
    fun apply(n: Int) = this.factor * n
}
fun main() {
    val action = Multiplier::apply
    println(action(Multiplier(3), 4))
}`, expected: '12' },
  { name: 'bound receiver expression evaluated once', code: `var calls = 0
class Multiplier(val factor: Int) {
    fun apply(n: Int) = this.factor * n
}
fun create(): Multiplier {
    calls += 1
    return Multiplier(3)
}
fun main() {
    val action = create()::apply
    println(action(4))
    println(calls)
}`, expected: '12\n1' },
  { name: 'constructor reference', code: `class Ticket(val id: Int)
fun main() {
    val create = ::Ticket
    println(create(7).id)
}`, expected: '7' },
  { name: 'local function reference', code: `fun main() {
    fun double(n: Int) = n * 2
    val action = ::double
    println(action(5))
}`, expected: '10' },
  { name: 'implicit return label skips only one invocation', code: `fun main() {
    listOf(1, 2, 3).forEach {
        if (it == 2) return@forEach
        println(it)
    }
    println("done")
}`, expected: '1\n3\ndone' },
  { name: 'explicit label returns a value', code: `fun main() {
    val safe: (Int) -> Int = check@ { n ->
        if (n < 0) return@check 0
        n * 2
    }
    println(safe(-1))
    println(safe(3))
}`, expected: '0\n6' },
  { name: 'return to outer lambda crosses an inline lambda', code: `fun main() {
    val values = listOf(1, 2).map outer@ { n ->
        listOf(3, 4).forEach {
            if (it == 3) return@outer n * 10
        }
        0
    }
    println(values)
}`, expected: '[10, 20]' },
  { name: 'non-local return through standard inline forEach', code: `fun firstPositive(): Int {
    listOf(-1, 2, 3).forEach {
        if (it > 0) return it
    }
    return 0
}
fun main() {
    println(firstPositive())
}`, expected: '2' },
  { name: 'non-local return through user inline function', code: `inline fun invokeNow(action: () -> Unit) {
    action()
    println("unreachable")
}
fun answer(): Int {
    invokeNow { return 7 }
    return 0
}
fun main() {
    println(answer())
}`, expected: '7' },
  { name: 'return unwinds finally blocks', code: `inline fun invokeNow(action: () -> Unit) {
    try {
        action()
    } finally {
        println("cleanup")
    }
}
fun answer(): Int {
    invokeNow { return 7 }
    return 0
}
fun main() {
    println(answer())
}`, expected: 'cleanup\n7' },
  { name: 'noinline and crossinline local returns are allowed', code: `inline fun use(noinline first: (Int) -> Int, crossinline second: (Int) -> Int): Int {
    return first(2) + second(3)
}
fun main() {
    println(use({ return@use it * 2 }, { return@use it * 3 }))
}`, expected: '13' },
  { name: 'comments and strings do not become lambdas or references', code: `fun main() {
    // { fake -> return@fake }
    val identity: (String) -> String = { value ->
        /* ::fake { broken -> } */
        value
    }
    println(identity("{ name -> ::fake }"))
}`, expected: '{ name -> ::fake }' },
];

export const invalidFunctionCases = [
  { name: 'wrong lambda parameter count', code: `fun main() {
    val add: (Int, Int) -> Int = { x -> x }
}`, error: 'parameter' },
  { name: 'wrong explicit lambda parameter type', code: `fun main() {
    val add: (Int) -> Int = { x: String -> 1 }
}`, error: 'Type mismatch' },
  { name: 'wrong lambda result type', code: `fun main() {
    val add: (Int) -> Int = { x -> "wrong" }
}`, error: 'Type mismatch' },
  { name: 'wrong function argument type', code: `fun main() {
    val add: (Int) -> Int = { x -> x + 1 }
    println(add("wrong"))
}`, error: 'Type mismatch' },
  { name: 'wrong function argument count', code: `fun main() {
    val add: (Int) -> Int = { x -> x + 1 }
    println(add(1, 2))
}`, error: 'argument count' },
  { name: 'wrong function reference assignment', code: `fun word(value: String): String = value
fun main() {
    val transform: (Int) -> Int = ::word
}`, error: 'Type mismatch' },
  { name: 'wrong higher-order argument', code: `fun use(action: (Int) -> Int): Int {
    return action(2)
}
fun word(value: String): String = value
fun main() {
    println(use(::word))
}`, error: 'Type mismatch' },
  { name: 'wrong anonymous function result', code: `fun main() {
    val action = fun(n: Int): Int { return "wrong" }
}`, error: 'Type mismatch' },
  { name: 'non-local return from stored lambda', code: `fun answer(): Int {
    val action = { return 5 }
    action()
    return 0
}
fun main() { println(answer()) }`, error: 'Non-local return' },
  { name: 'non-local return from non-inline call', code: `fun use(action: () -> Unit) { action() }
fun answer(): Int {
    use { return 5 }
    return 0
}
fun main() { println(answer()) }`, error: 'Non-local return' },
  { name: 'noinline forbids non-local return', code: `inline fun use(noinline action: () -> Unit) { action() }
fun answer(): Int {
    use { return 5 }
    return 0
}
fun main() { println(answer()) }`, error: 'Non-local return' },
  { name: 'crossinline forbids non-local return', code: `inline fun use(crossinline action: () -> Unit) { action() }
fun answer(): Int {
    use { return 5 }
    return 0
}
fun main() { println(answer()) }`, error: 'Non-local return' },
  { name: 'unknown return label', code: `fun main() {
    listOf(1).forEach { return@missing }
}`, error: 'Unresolved return label' },
  { name: 'unsafe nullable function invocation', code: `fun main() {
    val action: ((Int) -> Int)? = null
    println(action(3))
}`, error: 'Nullable function' },
];

functionCases.push(
  { name: 'integer division in a typed lambda truncates', code: `fun main() {
    val half: (Int) -> Int = { n -> n / 2 }
    println(half(5))
}`, expected: '2' },
  { name: 'receiver lambda resolves implicit receiver members', code: `fun main() {
    val size: String.() -> Int = { length }
    println(size("abcd"))
}`, expected: '4' },
  { name: 'anonymous function with receiver', code: `fun main() {
    val repeatText = fun String.(count: Int): String = this.repeat(count)
    println(repeatText("ab", 2))
}`, expected: 'abab' },
  { name: 'generic higher-order function', code: `fun <T, R> transform(value: T, action: (T) -> R): R {
    return action(value)
}
fun main() {
    println(transform(3) { it * 2 })
    println(transform("abc") { it.length })
}`, expected: '6\n3' },
  { name: 'zero parameter lambda with explicit arrow', code: `fun main() {
    val answer: () -> Int = { -> 42 }
    println(answer())
}`, expected: '42' },
  { name: 'function type as a parameter to a lambda', code: `fun main() {
    val twice: ((Int) -> Int, Int) -> Int = { action, value -> action(action(value)) }
    println(twice({ it + 1 }, 4))
}`, expected: '6' },
  { name: 'lambda last expression when', code: `fun main() {
    val label: (Int) -> String = { n ->
        when (n) {
            1 -> "one"
            else -> "other"
        }
    }
    println(label(1))
    println(label(3))
}`, expected: 'one\nother' },
  { name: 'lambda is a Unit callback even when last expression has a value', code: `fun use(action: () -> Unit) {
    action()
    println("done")
}
fun main() {
    use { 42 }
}`, expected: 'done' },
  { name: 'non-local return is not intercepted by a user catch', code: `inline fun use(action: () -> Unit) {
    try {
        action()
    } catch (error: Exception) {
        println("caught")
    } finally {
        println("finally")
    }
}
fun answer(): Int {
    use { return 8 }
    return 0
}
fun main() {
    println(answer())
}`, expected: 'finally\n8' },
  { name: 'bound singleton method reference', code: `object Doubler {
    fun apply(value: Int) = value * 2
}
fun main() {
    val twice = Doubler::apply
    println(twice(6))
}`, expected: '12' },
  { name: 'stdlib unbound member reference', code: `fun main() {
    val upper: (String) -> String = String::uppercase
    println(upper("abc"))
}`, expected: 'ABC' },
  { name: 'trailing lambda follows explicit function argument', code: `fun combine(first: () -> Int, second: () -> Int): Int {
    return first() + second()
}
fun main() {
    println(combine({ 3 }) { 4 })
}`, expected: '7' },
  { name: 'anonymous return stays local inside inline lambda', code: `fun answer(): Int {
    listOf(1).forEach {
        val local = fun(): Int { return 9 }
        println(local())
    }
    return 4
}
fun main() {
    println(answer())
}`, expected: '9\n4' },
);
invalidFunctionCases.push(
  { name: 'function reassignment checks its result type', code: `fun main() {
    var action: (Int) -> Int = { it }
    action = { "bad" }
}`, error: 'Type mismatch' },
  { name: 'return cannot cross anonymous function boundary', code: `fun main() {
    val action = outer@ {
        val inner = fun() { return@outer }
        inner()
    }
    action()
}`, error: 'non-inline function boundary' },
);
functionCases.push(
  { name: 'unbound extension function reference', code: `fun String.tag(): String = "[" + this + "]"
fun main() {
    val tag = String::tag
    println(tag("hi"))
}`, expected: '[hi]' },
  { name: 'bound extension function reference', code: `fun String.tag(): String = "[" + this + "]"
fun main() {
    val tag = "hi"::tag
    println(tag())
}`, expected: '[hi]' },
  { name: 'comparison expressions as multiple call arguments', code: `fun both(first: Boolean, second: Boolean): Boolean = first && second
fun main() {
    val check: (Int) -> Boolean = { n -> both(n > 0, n < 5) }
    println(check(3))
}`, expected: 'true' },
);
invalidFunctionCases.push(
  { name: 'invoke also validates function arguments', code: `fun main() {
    val double: (Int) -> Int = { it * 2 }
    println(double.invoke("bad"))
}`, error: 'Type mismatch' },
  { name: 'invoke requires a safe call on a nullable function', code: `fun main() {
    val action: ((Int) -> Int)? = null
    println(action.invoke(3))
}`, error: 'Nullable function' },
);
functionCases.push(
  { name: 'top-level run supports a local labelled return', code: `fun main() {
    val result = run {
        return@run 9
    }
    println(result)
}`, expected: '9' },
  { name: 'repeat callback uses its index and a local return', code: `fun main() {
    repeat(4) {
        if (it == 2) return@repeat
        println(it)
    }
}`, expected: '0\n1\n3' },
);
functionCases.push({ name: 'constructor expression produces a bound member reference', code: `class Gauge(val offset: Int) {
    fun read(value: Int): Int = offset + value
}
fun main() {
    val read: (Int) -> Int = Gauge(7)::read
    val unbound: (Gauge, Int) -> Int = Gauge::read
    println(read(3))
    println(unbound(Gauge(2), 3))
}`, expected: '10\n5' });
functionCases.push(
 { name: 'forward inline parameter to compatible inline callee', code: `inline fun invokeNow(action: () -> Unit) { action() }
inline fun forward(action: () -> Unit) { invokeNow(action) }
fun main() { forward { println("forwarded") } }`, expected: 'forwarded' },
 { name: 'forward crossinline parameter to wrapped callee', code: `inline fun wrapped(crossinline action: () -> Unit) {
    val task = { action() }
    task()
}
inline fun forward(crossinline action: () -> Unit) { wrapped(action) }
fun main() { forward { println("wrapped") } }`, expected: 'wrapped' },
);
invalidFunctionCases.push(
 { name: 'cannot store ordinary inline parameter', code: `inline fun save(action: () -> Unit) {
    val stored = action
    stored()
}
fun main() { save { println("bad") } }`, error: 'use noinline' },
 { name: 'cannot capture ordinary inline parameter', code: `inline fun wrap(action: () -> Unit) {
    val task = { action() }
    task()
}
fun main() { wrap { println("bad") } }`, error: 'use crossinline or noinline' },
 { name: 'cannot pass inline parameter to ordinary function', code: `fun consume(action: () -> Unit) { action() }
inline fun forward(action: () -> Unit) { consume(action) }
fun main() { forward { println("bad") } }`, error: 'use noinline' },
);
