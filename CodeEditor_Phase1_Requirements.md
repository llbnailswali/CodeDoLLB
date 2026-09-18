# CodeDo Mobile Code Editor --- Phase 1/2 Coding Experience Requirements

## Purpose

This document defines the coding-editor features that should be
implemented in the CodeDo mobile Kotlin IDE.

The objective is to make CodeDo's in-app editor comfortable for writing
and modifying Kotlin code on a phone without trying to reproduce the
full feature set of Android Studio.

The current UI is already designed. This document focuses on **editor
behavior, interaction, and functionality**, not visual redesign.

The implementation agent must first inspect the existing codebase and
reuse the current editor, keyboard, state-management,
syntax-highlighting, and execution infrastructure wherever practical.

------------------------------------------------------------------------

# Feature List

The following features are in scope:

1.  Smart indentation
2.  Intelligent bracket handling
3.  Cursor navigation
    -   Arrow/cursor controls
    -   Swipe left/right across the spacebar to move the cursor
4.  Long-press selection
5.  Undo / Redo
6.  Better autocomplete
7.  Document-aware autocomplete
8.  Code formatting
9.  Duplicate line
10. Delete line
11. Move line up/down

Additional requirement:

-   **Duplicate line and Delete line must be available through the
    long-press editor interaction.**
-   Do not introduce test-case functionality as part of these editor
    features.

------------------------------------------------------------------------

# 1. Smart Indentation

## Goal

Make indentation behave naturally when writing Kotlin code on a mobile
device.

The user should not have to manually insert spaces every time they
create a nested block.

## Basic Behavior

Given:

``` kotlin
fun calculate() {
```

When the user presses Enter after `{`, the editor should create:

``` kotlin
fun calculate() {
    |
}
```

where `|` represents the cursor.

The default Kotlin indentation should be **4 spaces**, unless the
existing project/editor configuration already defines another
convention.

## Nested Blocks

Example:

``` kotlin
fun calculate() {
    if (age > 18) {
```

Pressing Enter should produce:

``` kotlin
fun calculate() {
    if (age > 18) {
        |
    }
}
```

The indentation level must increase according to the nesting level.

## Closing Braces

When the user starts a new line and enters `}` where a block is being
closed, the editor should reduce the indentation appropriately.

Example:

``` kotlin
fun calculate() {
    if (age > 18) {
        return true
    |
}
```

Typing `}` should result in:

``` kotlin
fun calculate() {
    if (age > 18) {
        return true
    }
}
```

The closing brace should align with the corresponding opening block.

## Supported Kotlin Constructs

Smart indentation should work for common block constructs, including:

-   `fun`
-   `if`
-   `else`
-   `when`
-   `for`
-   `while`
-   `do`
-   `class`
-   `object`
-   `interface`
-   `try`
-   `catch`
-   `finally`
-   `init`
-   Lambda blocks
-   Nested `{ }` blocks

## Important Constraints

Do not aggressively reformat the entire document while the user is
typing.

Indentation should only modify the newly created/current line unless an
explicit **Format Code** action is requested.

------------------------------------------------------------------------

# 2. Intelligent Bracket Handling

## Goal

Make brackets behave like a professional code editor.

Support automatic pairing for:

``` text
(
)
{
}
[
]
"
'
```

## Auto Closing

When the user types:

``` text
(
```

the editor should insert:

``` text
(|)
```

The cursor remains between the opening and closing character.

Likewise:

``` text
{
```

becomes:

``` text
{|}
```

and:

``` text
[
```

becomes:

``` text
[|]
```

For quotes:

``` text
"
```

becomes:

``` text
"|"
```

## Intelligent Closing

If the closing character already exists immediately after the cursor,
pressing that closing character should **move over the existing
character** rather than insert a duplicate.

Example:

``` text
(|)
```

User presses `)`.

Result:

``` text
()
```

NOT:

``` text
())
```

The same behavior should work for:

-   `)`
-   `}`
-   `]`
-   Matching quotes where appropriate

## Intelligent Backspace

If the cursor is between an automatically paired empty set:

``` text
(|)
```

pressing Backspace should remove both characters:

``` text
|
```

instead of leaving:

``` text
)
```

This behavior should only happen when the pair is empty and was
created/recognized as a matching pair.

Do not unexpectedly delete user content.

## Selection Behavior

Bracket insertion must behave safely when text is selected.

Example:

``` text
selected text
```

Typing `(` should ideally produce:

``` text
(selected text)
```

if supported by the existing editor architecture.

Do not corrupt selected content.

## Paste Behavior

Pasting code containing brackets must not cause unwanted duplicate
auto-closing characters.

Auto-pairing should apply primarily to normal character insertion, not
blindly to pasted text.

------------------------------------------------------------------------

# 3. Cursor Navigation

## Goal

Precise cursor movement is one of the biggest challenges of mobile code
editing.

The editor should provide multiple ways to move the cursor accurately.

------------------------------------------------------------------------

## 3.1 Cursor Arrow Controls

Provide accessible cursor controls for:

-   Left
-   Right
-   Up
-   Down

Conceptually:

``` text
←   ↑   ↓   →
```

These controls may be integrated into the existing coding
toolbar/keyboard.

### Behavior

-   Left: move cursor one character left
-   Right: move cursor one character right
-   Up: move to the closest position on the previous visual/logical line
-   Down: move to the closest position on the next visual/logical line

Do not lose the user's preferred horizontal position when moving
vertically where standard editor behavior can preserve it.

------------------------------------------------------------------------

## 3.2 Swipe Left/Right Across Spacebar

This is an important mobile-specific requirement.

The user should be able to:

> Swipe left or right across the CodeDo spacebar to move the text
> cursor.

### Swipe left

Move the cursor toward the beginning of the current text.

### Swipe right

Move the cursor toward the end of the current text.

The exact movement can be character-by-character or by a small
configurable horizontal distance, but it must feel smooth and
predictable.

### Important

Do not interfere with normal spacebar typing.

A normal tap on the spacebar must still insert a space.

Only a deliberate horizontal swipe gesture should trigger cursor
movement.

### Gesture Requirements

-   Detect horizontal movement primarily.
-   Use a minimum swipe threshold to prevent accidental movement.
-   Ignore very small horizontal movement.
-   Do not trigger cursor movement for a normal tap.
-   Do not trigger when the user is performing an unrelated keyboard
    gesture.
-   Keep the behavior responsive.
-   Do not visibly alter the text while the gesture is being
    interpreted.

### Recommended UX

A short horizontal swipe should move the cursor a small amount.

A longer/faster swipe may move it farther.

Avoid making the cursor jump unpredictably across the entire document.

------------------------------------------------------------------------

## 3.3 Cursor Position Preservation

Opening or closing:

-   Task sheet
-   Output sheet
-   Keyboard

must not unnecessarily change the cursor position.

The editor should restore the previous cursor position when returning to
the coding state.

------------------------------------------------------------------------

# 4. Long-Press Selection

## Goal

Make text selection usable on a mobile screen.

Long pressing inside the editor should enter selection mode using the
platform/editor's native selection behavior where possible.

## Expected Behavior

Long press a word:

``` kotlin
val customerName = "John"
```

Long pressing `customerName` should select the word.

The contextual action menu should provide actions such as:

``` text
Copy
Cut
Select All
```

where supported.

## Selection Handles

Use native/standard selection handles if available through the existing
editor technology.

Selection handles must be:

-   Easy to see
-   Easy to drag
-   Touch-friendly
-   Accurate

## Word Selection

Word boundaries should work sensibly for code.

For example:

``` text
customerName
```

should preferably select the identifier as a unit.

Punctuation such as:

``` text
(
)
{
}
.
,
:
;
```

should behave naturally.

## Long-Press Editor Actions

The long-press interaction must also expose the CodeDo-specific actions:

``` text
Select
Copy
Cut
Duplicate Line
Delete Line
```

The exact presentation can be a contextual menu/bottom menu depending on
the existing UI.

------------------------------------------------------------------------

# 5. Undo / Redo

## Goal

Provide reliable editing history.

The user must be able to safely experiment with code and recover from
accidental edits.

## Actions

Provide:

``` text
Undo
Redo
```

Prefer visible controls in the editor toolbar or coding toolbar rather
than hiding them deeply inside menus.

## Behavior

Undo should reverse editing operations in sensible units.

Examples:

-   Typing text
-   Deleting text
-   Pasting text
-   Auto-closing brackets
-   Formatting
-   Duplicate line
-   Delete line
-   Move line

## Important

Complex editor actions should ideally be treated as one undoable
operation.

For example:

**Duplicate Line**

should be undone as one action, not as multiple character insertions.

Similarly:

**Format Code**

should be one undo action.

## State Preservation

Opening/closing:

-   Task sheet
-   Output sheet
-   Keyboard

must not reset undo/redo history.

## Button State

Undo should be disabled when there is nothing to undo.

Redo should be disabled when there is nothing to redo.

After a new edit following an undo, the redo stack should behave
according to standard editor semantics.

------------------------------------------------------------------------

# 6. Better Autocomplete

## Goal

Improve the existing suggestion row so it becomes genuinely useful while
writing Kotlin.

The current editor already displays suggestions such as:

``` text
main
println
val
var
fun
```

Build on this existing mechanism instead of creating an unnecessary
second autocomplete system.

## Kotlin Keywords

Support common keywords including:

``` text
fun
val
var
return
if
else
when
for
while
do
in
is
as
class
object
interface
data
sealed
enum
open
override
private
public
protected
internal
this
super
null
true
false
```

## Common Types

Support:

``` text
Int
Long
Short
Byte
Float
Double
Boolean
Char
String
Any
Unit
Nothing
List
MutableList
Set
MutableSet
Map
MutableMap
Array
```

## Common Functions / Constructs

Where appropriate, provide suggestions for commonly used Kotlin
functions and constructs such as:

``` text
println
print
listOf
mutableListOf
setOf
mapOf
arrayOf
rangeTo
```

The list should grow based on CodeDo's curriculum.

## Prefix Matching

If the user types:

``` text
ret
```

suggest:

``` text
return
```

If the user types:

``` text
pri
```

suggest:

``` text
println
print
```

Suggestions should be ranked based on relevance.

## Selection

Tapping a suggestion should insert it at the cursor and replace the
current partial token where appropriate.

Example:

``` text
ret|
```

Tap `return`.

Result:

``` text
return |
```

Do not produce:

``` text
retreturn
```

------------------------------------------------------------------------

# 7. Document-Aware Autocomplete

## Goal

Autocomplete should understand the current code document, not only a
static Kotlin keyword list.

This is a major improvement over basic autocomplete.

------------------------------------------------------------------------

## Local Variables

Given:

``` kotlin
fun calculate(price: Int, discount: Int): Int {
    val finalPrice = price - discount
```

Inside the same scope, typing:

``` text
pri
```

should prioritize:

``` text
price
```

Typing:

``` text
dis
```

should prioritize:

``` text
discount
```

Typing:

``` text
fin
```

should suggest:

``` text
finalPrice
```

------------------------------------------------------------------------

## Function Parameters

Given:

``` kotlin
fun multiply(a: Int, b: Int): Int {
```

inside the function, suggestions should recognize:

``` text
a
b
```

and their types where practical.

------------------------------------------------------------------------

## Functions Declared in the Document

Given:

``` kotlin
fun multiply(a: Int, b: Int): Int {
    return a * b
}

fun main() {
```

typing:

``` text
mul
```

should suggest:

``` text
multiply
```

If practical, the suggestion may show its signature:

``` text
multiply(a: Int, b: Int): Int
```

------------------------------------------------------------------------

## Scope Awareness

Prioritize identifiers available in the current scope.

Do not aggressively suggest variables that are outside the current
scope.

At minimum, support:

-   Current function parameters
-   Local variables
-   Functions declared in the current file
-   Common Kotlin keywords/types

------------------------------------------------------------------------

## Ranking

Suggestions should be ranked approximately by:

1.  Exact prefix match
2.  Current scope
3.  Local variable / parameter relevance
4.  Current lesson relevance
5.  Common Kotlin keyword/type
6.  Fuzzy match where useful

Do not overwhelm the user with dozens of suggestions.

Keep the visible suggestion count small.

------------------------------------------------------------------------

# 8. Code Formatting

## Goal

Provide an explicit action to format the current Kotlin code.

This is different from smart indentation.

Smart indentation happens during editing.

Formatting is an explicit user action.

## Example

Input:

``` kotlin
fun calculate(a:Int,b:Int):Int{
val result=a+b
return result
}
```

After Format Code:

``` kotlin
fun calculate(a: Int, b: Int): Int {
    val result = a + b
    return result
}
```

## Important

Use an existing Kotlin formatter/parser if the project already has one.

Do not build a fragile formatter using simple string replacement if a
proper formatter/parser is available.

If a formatter dependency is required, evaluate:

-   APK size impact
-   Runtime performance
-   Licensing
-   Compatibility with the app's Kotlin version
-   Offline execution

## Formatting Behavior

Formatting should:

-   Preserve valid Kotlin semantics.
-   Normalize indentation.
-   Normalize spacing where supported.
-   Preserve strings.
-   Preserve comments.
-   Handle nested blocks.
-   Be deterministic.

## Undo Integration

The entire formatting operation should be undoable as one action.

------------------------------------------------------------------------

# 9. Duplicate Line

## Goal

Allow the user to quickly duplicate the current line.

This is especially useful on mobile because manually selecting/copying a
complete line is cumbersome.

## Access

Duplicate Line must be available through the **long-press editor menu**.

Example:

Long press inside:

``` kotlin
println("Hello")
```

Show:

``` text
Select
Copy
Cut
Duplicate Line
Delete Line
```

## Behavior

Current:

``` kotlin
println("Hello")
println("World")
```

Cursor anywhere on the first line.

Choose:

**Duplicate Line**

Result:

``` kotlin
println("Hello")
println("Hello")
println("World")
```

## Cursor Behavior

After duplication, place the cursor in a sensible location.

Recommended:

-   Preserve the same horizontal cursor position on the duplicated line.

Example:

``` kotlin
println("Hel|lo")
```

Duplicate:

``` kotlin
println("Hel|lo")
println("Hello")
```

or the reverse depending on the editor's standard behavior.

Choose one behavior and keep it consistent.

## Multi-line Selection

If multiple lines are selected, optionally duplicate the entire selected
block.

If this is not supported initially, clearly scope the first version to
the current line.

## Undo

Duplicate Line must be one undo operation.

------------------------------------------------------------------------

# 10. Delete Line

## Goal

Allow the user to delete the entire current line quickly.

## Access

Delete Line must be available through the **long-press editor menu**.

Example:

``` text
Select
Copy
Cut
Duplicate Line
Delete Line
```

## Behavior

Current:

``` kotlin
val age = 20
println(age)
```

Cursor anywhere on the first line.

Choose:

**Delete Line**

Result:

``` kotlin
println(age)
```

## Newline Handling

Deleting a line must also correctly handle its line terminator.

Do not leave:

-   Blank unintended lines
-   Broken indentation
-   Merged lines when not intended

## Cursor Behavior

After deletion, place the cursor at a sensible location on the resulting
line.

Do not move the cursor to an unrelated part of the document.

## Empty Document

If the document contains only one empty line, Delete Line should not
cause an invalid editor state.

Keep at least one editable line.

## Undo

Delete Line must be one undo operation.

------------------------------------------------------------------------

# 11. Move Line Up / Down

## Goal

Allow the user to move the current line upward or downward without
manually cutting and pasting.

This is useful for reorganizing code.

## Actions

Provide:

``` text
Move Line Up
Move Line Down
```

These can be exposed in the editor action menu/toolbar.

They do not need to be part of the long-press menu unless it fits
naturally.

## Example

Before:

``` kotlin
val a = 10
val b = 20
println(a)
```

Cursor on:

``` kotlin
val b = 20
```

Move Line Up:

``` kotlin
val b = 20
val a = 10
println(a)
```

Move Line Down:

``` kotlin
val a = 10
println(a)
val b = 20
```

## Cursor Preservation

The cursor should move with the line.

Example:

``` kotlin
val b = 2|
0
```

Move line up:

``` kotlin
val b = 2|
0
val a = 10
```

The cursor remains at the corresponding position within the moved line.

## Indentation

Preserve the line's existing indentation when moving it.

Do not automatically reformat unrelated lines.

## Multi-line Selection

If practical, support moving a selected block.

For the initial implementation, current-line movement is acceptable.

## Boundary Behavior

If the current line is already the first line:

-   Disable Move Up or do nothing safely.

If it is the last line:

-   Disable Move Down or do nothing safely.

Do not create blank lines or corrupt the document.

## Undo

Move Line Up/Down must be one undo operation.

------------------------------------------------------------------------

# 12. Interaction Between Features

These features must work together rather than behaving as isolated
utilities.

## Example

User types:

``` kotlin
fun calculate() {
```

Smart indentation creates:

``` kotlin
fun calculate() {
    |
}
```

User types:

``` text
val result = (10 + 20)
```

Auto-closing brackets should work.

User realizes the line is in the wrong position.

Long press → Move Line Up.

Then:

Undo

should restore the previous position.

The editor must maintain:

-   Cursor position
-   Selection
-   Scroll position
-   Undo history

through these operations.

------------------------------------------------------------------------

# 13. Performance Requirements

Mobile typing must remain responsive.

Avoid expensive processing on every keystroke.

Particularly:

-   Do not run a full Kotlin parser on every character unless absolutely
    necessary.
-   Do not run full-document formatting during normal typing.
-   Do not rebuild the entire editor model unnecessarily.
-   Autocomplete should be lightweight and preferably debounced.
-   Syntax highlighting should not cause visible typing lag.
-   Cursor movement should be immediate.
-   Bracket insertion should be immediate.
-   Undo/redo should be efficient.

The user should be able to type continuously without noticeable delay.

------------------------------------------------------------------------

# 14. State Preservation

The following must survive UI changes:

-   Editor content
-   Cursor position
-   Selection
-   Scroll position where practical
-   Undo history
-   Redo history

Opening or closing:

-   Task bottom sheet
-   Output bottom sheet
-   Keyboard

must not reset editor state.

If the app already has editor persistence/autosave, integrate with it.

Do not create a second independent persistence mechanism unless
necessary.

------------------------------------------------------------------------

# 15. Existing Architecture

Before implementation, inspect the current project.

Identify:

-   Code editor component
-   Text/document model
-   Syntax highlighting implementation
-   Custom keyboard implementation
-   Autocomplete implementation
-   Editor state holder
-   Code execution mechanism
-   Existing Compose state architecture
-   Existing dependencies

Prefer extending existing code.

Do not replace a working editor library simply to implement one feature.

Do not introduce a new third-party editor unless the existing
implementation cannot support the required behavior.

------------------------------------------------------------------------

# 16. Recommended Implementation Order

Implement in this order:

### Phase A --- Editing Fundamentals

1.  Smart indentation
2.  Intelligent bracket handling
3.  Undo / Redo
4.  Long-press selection
5.  Duplicate line
6.  Delete line

### Phase B --- Mobile Cursor Experience

7.  Cursor arrow controls
8.  Spacebar swipe cursor movement

### Phase C --- Intelligent Assistance

9.  Better autocomplete
10. Document-aware autocomplete

### Phase D --- Code Manipulation

11. Code formatting
12. Move line up/down

This order minimizes dependencies between features and allows each group
to be tested independently.

------------------------------------------------------------------------

# 17. Acceptance Criteria

The implementation is considered successful when:

## Smart Indentation

-   [ ] Enter after an opening block increases indentation.
-   [ ] Nested blocks indent correctly.
-   [ ] Closing braces align correctly.
-   [ ] Common Kotlin block constructs behave correctly.
-   [ ] Normal typing does not trigger whole-document formatting.

## Brackets

-   [ ] `(` automatically creates `()`.
-   [ ] `{` automatically creates `{}`.
-   [ ] `[` automatically creates `[]`.
-   [ ] Quotes can auto-pair where appropriate.
-   [ ] Existing closing brackets are skipped rather than duplicated.
-   [ ] Empty paired brackets can be removed intelligently with
    Backspace.
-   [ ] Pasting code does not produce duplicate brackets.

## Cursor

-   [ ] Left/right controls work.
-   [ ] Up/down controls work.
-   [ ] Normal spacebar tap still inserts a space.
-   [ ] Horizontal swipe on the spacebar moves the cursor.
-   [ ] Small accidental horizontal movements do not move the cursor.
-   [ ] Cursor position survives opening/closing UI sheets.

## Selection

-   [ ] Long press selects code/word naturally.
-   [ ] Selection handles work.
-   [ ] Copy works.
-   [ ] Cut works.
-   [ ] Paste works.
-   [ ] Select All works.
-   [ ] Long-press menu exposes Duplicate Line.
-   [ ] Long-press menu exposes Delete Line.

## Undo / Redo

-   [ ] Undo works.
-   [ ] Redo works.
-   [ ] Duplicate Line is one undo operation.
-   [ ] Delete Line is one undo operation.
-   [ ] Move Line is one undo operation.
-   [ ] Format Code is one undo operation.
-   [ ] UI sheet interactions do not clear history.

## Autocomplete

-   [ ] Kotlin keywords are suggested.
-   [ ] Kotlin types are suggested.
-   [ ] Common functions are suggested.
-   [ ] Partial words are replaced correctly.
-   [ ] Suggestions are ranked sensibly.
-   [ ] Suggestions do not cause typing lag.

## Document-Aware Autocomplete

-   [ ] Function parameters are recognized.
-   [ ] Local variables are recognized.
-   [ ] Functions declared in the current document are recognized.
-   [ ] Suggestions prioritize current-scope identifiers.
-   [ ] Function signatures can be shown where practical.

## Formatting

-   [ ] Format Code produces consistent Kotlin formatting.
-   [ ] Comments are preserved.
-   [ ] Strings are preserved.
-   [ ] Nested blocks are formatted.
-   [ ] Formatting is one undo operation.

## Duplicate Line

-   [ ] Long press exposes Duplicate Line.
-   [ ] Current line is duplicated correctly.
-   [ ] Cursor remains sensible after duplication.
-   [ ] Duplicate is undoable in one action.

## Delete Line

-   [ ] Long press exposes Delete Line.
-   [ ] Current line is removed correctly.
-   [ ] Newlines are handled correctly.
-   [ ] Cursor remains sensible.
-   [ ] Empty-document behavior is safe.
-   [ ] Delete is undoable in one action.

## Move Line

-   [ ] Current line can move up.
-   [ ] Current line can move down.
-   [ ] Cursor moves with the line.
-   [ ] First-line/last-line boundaries are handled safely.
-   [ ] Indentation is preserved.
-   [ ] Move is undoable in one action.

## Overall

-   [ ] No noticeable typing lag.
-   [ ] No cursor jumping during normal typing.
-   [ ] No text corruption.
-   [ ] No duplicate characters caused by editor features.
-   [ ] Existing code execution still works.
-   [ ] Existing UI remains intact.
-   [ ] Existing custom keyboard continues to work.
-   [ ] No test-case functionality is introduced.

------------------------------------------------------------------------

# 18. Important Product Principle

CodeDo should optimize for **mobile coding ergonomics**, not feature
count.

The editor should make these actions extremely easy:

``` text
Type
↓
Move cursor
↓
Select
↓
Modify
↓
Undo if necessary
↓
Run
```

Every feature should reduce friction in that loop.

Avoid adding desktop IDE features simply because they exist in Android
Studio.

The best mobile editor is not the one with the most features.

It is the one where common coding actions require the fewest awkward
touch interactions.
