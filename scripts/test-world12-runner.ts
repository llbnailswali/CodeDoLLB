import assert from 'node:assert/strict';
import { compileAndRunKotlin } from '../src/utils/kotlinRunner';

const cases = [
  ['generic class preserves its value', `class Box<T>(val value: T) {
    fun get() = value
}
fun main() {
    println(Box("Ada").get())
}`, 'Ada'],
  ['multiple generic parameters erase safely', `class PairBox<K, V>(val key: K, val value: V) {
    fun render() = key.toString() + ":" + value.toString()
}
fun main() {
    println(PairBox<String, Int>("age", 7).render())
}`, 'age:7'],
  ['generic function infers each call type', `fun <T> echo(value: T): T = value
fun main() {
    println(echo(7))
    println(echo("go"))
}`, '7\ngo'],
  ['type alias substitutes at compile time', `typealias Name = String
fun main() {
    val name: Name = "Ada"
    println(name)
}`, 'Ada'],
  ['generic API accepts an explicit type argument', `class Cache<T> {
    var value: T? = null
    fun put(next: T) {
        value = next
    }
    fun get(): T? = value
}
fun main() {
    val cache = Cache<Int>()
    cache.put(7)
    println(cache.get())
}`, '7'],
  ['generic Boss shape supports distinct clients', `class Toolkit<T>(val value: T) {
    fun render() = "Value: " + value
}
fun main() {
    println(Toolkit(7).render())
    println(Toolkit("Ada").render())
}`, 'Value: 7\nValue: Ada'],
] as const;

for (const [name, code, expected] of cases) {
  const result = await compileAndRunKotlin(code);
  assert.equal(result.success, true, `${name}: ${result.error?.message}`);
  assert.equal(result.output, expected, name);
}

console.log(`World 12 runner baseline passed: ${cases.length} generic runtime cases.`);
