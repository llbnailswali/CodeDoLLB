/** Regression cases: Kotlin requires a modifier before these parameter uses. */
export const world9InlineValidationCases = [
 { name: 'returning an inline parameter requires noinline', code: `inline fun keep(action: () -> Unit): () -> Unit {
    return action
}
fun main() {
    val saved = keep { println("saved") }
    saved()
}` },
 { name: 'capturing an inline parameter requires crossinline or noinline', code: `inline fun wrap(action: () -> Unit) {
    val saved = { action() }
    saved()
}
fun main() { wrap { println("wrapped") } }` },
];
