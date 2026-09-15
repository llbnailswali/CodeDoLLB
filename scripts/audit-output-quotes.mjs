#!/usr/bin/env node
/**
 * Audits curriculum data for a specific, easy-to-miss content bug: a lesson
 * stage's instructional text -- writeRun.description, debug.subtitle, or a
 * `// TODO: ...` comment inside initialCode -- quoting a literal phrase
 * that's supposed to describe an exact print()/println() argument or the
 * final assembled output, but whose whitespace doesn't actually match the
 * lesson's own solutionCode/fixedCode and expectedOutput.
 *
 * Example of what this catches: a description saying
 *   Use print() to output "Status:" and println() to output "ACTIVE"
 * while the solution code actually has `print("Status: ")` (with a
 * trailing space) -- the instructions are missing the space the real
 * output requires, so a learner reading them has no way to know a space
 * is expected. The same check applies to the TODO hint left in the
 * learner's starter code, since that's read just as literally.
 *
 * This is grounded in the lesson's own code (not guessed positions in
 * expectedOutput), so it's generic across any lesson rather than hardcoded
 * to one topic: it extracts every print()/println() string-literal argument
 * from solutionCode/fixedCode, then checks every quoted phrase in each of
 * description/subtitle/initialCode against that literal list (and against
 * the full assembled output) for a whitespace mismatch.
 *
 * This is a content-authoring rule, not a rendering one -- see CLAUDE.md.
 * Run with: node scripts/audit-output-quotes.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

function listFiles(dir, exts, out = []) {
  for (const entry of readdirSyncSafe(dir)) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listFiles(full, exts, out);
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function readdirSyncSafe(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const files = listFiles(path.join(ROOT, 'src/data'), ['.ts', '.tsx']);

// A writeRun/debug object body, ending at its closing `  },` at the same
// 2-space indent this codebase consistently uses for top-level stage keys.
const blockRe = /(writeRun|debug)\s*:\s*\{([\s\S]*?)\n  \},/g;
const textFieldRe = /(?:description|subtitle)\s*:\s*'((?:[^'\\]|\\.)*)'/;
const initialCodeFieldRe = /initialCode\s*:\s*`([\s\S]*?)`/;
const codeFieldRe = /(?:solutionCode|fixedCode)\s*:\s*`([\s\S]*?)`/;
const expectedRe = /expectedOutput\s*:\s*'((?:[^'\\]|\\.)*)'/;
const printCallRe = /\b(?:print|println)\(\s*"((?:[^"\\]|\\.)*)"\s*\)/g;
const quotedPhraseRe = /"([^"\n]+)"/g;

let issueCount = 0;
let checkedBlocks = 0;

function checkSource(label, sourceText, ctx) {
  if (!sourceText) return;
  const { file, lineNo, stageKind, literals, literalsExact, literalsTrimmed, concatenated, expectedOutput } = ctx;

  let qm;
  quotedPhraseRe.lastIndex = 0;
  while ((qm = quotedPhraseRe.exec(sourceText))) {
    const phrase = qm[1];
    if (literalsExact.has(phrase)) continue; // matches a real print() literal exactly
    if (phrase === expectedOutput || phrase === concatenated) continue; // matches the whole result exactly

    const trimmed = phrase.trim();
    const looksLikeSegment = literalsTrimmed.has(trimmed);
    const looksLikeWhole = trimmed === expectedOutput.trim() || trimmed === concatenated.trim();

    if (looksLikeSegment || looksLikeWhole) {
      issueCount++;
      console.log(`${path.relative(ROOT, file)}:~${lineNo}  [${stageKind}.${label}]`);
      console.log(`  Quotes: "${phrase}"`);
      console.log(`  print()/println() literals in the code: ${JSON.stringify(literals)}`);
      console.log(`  expectedOutput: ${JSON.stringify(expectedOutput)}`);
      console.log(`  MISMATCH: this quoted phrase's whitespace doesn't match the real literal/output.\n`);
    }
    // else: the quote is about something unrelated to the output (a
    // variable/type name, etc.) -- not this script's concern.
  }
}

for (const file of files) {
  const text = readFileSync(file, 'utf-8');
  let bm;
  blockRe.lastIndex = 0;
  while ((bm = blockRe.exec(text))) {
    const stageKind = bm[1];
    const body = bm[2];
    const lineNo = text.slice(0, bm.index).split('\n').length;

    const textMatch = body.match(textFieldRe);
    const initialCodeMatch = body.match(initialCodeFieldRe); // writeRun only
    const codeMatch = body.match(codeFieldRe);
    const expectedMatch = body.match(expectedRe);
    if (!codeMatch || !expectedMatch) continue;

    const code = codeMatch[1];
    const expectedOutput = expectedMatch[1];

    // Extract print()/println() single-string-literal arguments, in order.
    // (Calls with string templates, concatenation, or multiple args aren't
    // matched -- this only checks the common, fully-literal case, which is
    // exactly the case where instructional text can quote the argument
    // verbatim.)
    const literals = [];
    let pm;
    printCallRe.lastIndex = 0;
    while ((pm = printCallRe.exec(code))) literals.push(pm[1]);
    if (literals.length === 0) continue; // nothing to cross-check against

    checkedBlocks++;
    const ctx = {
      file,
      lineNo,
      stageKind,
      literals,
      literalsExact: new Set(literals),
      literalsTrimmed: new Set(literals.map((l) => l.trim())),
      concatenated: literals.join(''),
      expectedOutput,
    };

    checkSource('description/subtitle', textMatch?.[1], ctx);
    checkSource('initialCode (TODO hint)', initialCodeMatch?.[1], ctx);
  }
}

console.log(`Checked ${checkedBlocks} writeRun/debug block(s) with print()/println() literals.`);
if (issueCount === 0) {
  console.log('No mismatches found.');
} else {
  console.log(`${issueCount} mismatch(es) found -- see above.`);
  process.exitCode = 1;
}
