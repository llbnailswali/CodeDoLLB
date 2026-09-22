#!/usr/bin/env node
/**
 * Audits curriculum prose for a specific, easy-to-miss readability bug:
 * this codebase's plain-ASCII " -- " house style for an em dash (see
 * PITFALLS.md's "Lesson prose: the plain-ASCII -- em-dash convention
 * collides with -- as an operator") sitting in the same text field as a
 * literal `--`/`++` operator mention (e.g. `x--`, `--x`, `x++`, `` `--` ``).
 * A reader's eye, primed by the operator discussion, is prone to misread
 * the punctuation dash as another instance of the operator.
 *
 * This is a candidate scanner, not an auto-fail check: every match still
 * needs a human/agent judgment call (see WORLD_2_CONTENT_REVIEW.md's
 * W2-08 for a confirmed real instance vs. a harmless one). Only scans
 * prose-bearing keys (subtitle, explanation, keyTakeaway, description,
 * whatChanged, detail, summary, title, label, bugLabel) -- deliberately
 * excludes code/codeSnippet/initialCode/solutionCode/fixedCode/brokenCode,
 * where a bare `--`/`++` is real Kotlin syntax, not prose.
 *
 * Run with: node scripts/audit-dash-collision.mjs
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

const PROSE_KEYS = ['subtitle', 'explanation', 'keyTakeaway', 'description', 'whatChanged', 'detail', 'summary', 'title', 'label', 'bugLabel'];
const fieldRe = new RegExp(`\\b(?:${PROSE_KEYS.join('|')})\\s*:\\s*('(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*")`, 'g');

// The em-dash convention is always written with a space on both sides.
const dashPunct = /\s--\s/;
// A `--`/`++` glued to a non-space character on at least one side is a
// real operator mention (`x--`, `--x`, `` `--` ``, `"--"`, `x++`, `++x`),
// not the punctuation dash.
const operatorGlued = /(?<!\s)--(?!\s)|(?<!\s)\+\+(?!\s)/;

const findings = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  let match;
  while ((match = fieldRe.exec(text)) !== null) {
    const value = match[1].slice(1, -1);
    if (dashPunct.test(value) && operatorGlued.test(value)) {
      const line = text.slice(0, match.index).split('\n').length;
      findings.push({ file: path.relative(ROOT, file), line, snippet: value.length > 160 ? value.slice(0, 160) + '...' : value });
    }
  }
}

if (findings.length === 0) {
  console.log('No candidate -- em-dash / operator collisions found.');
} else {
  console.log(`Found ${findings.length} candidate -- collision(s). Each needs a human/agent read: a real misread risk\n(the operator mention and the punctuation dash sit close enough to confuse a reader) vs. a harmless\ncoincidence (the two are unrelated and far apart in the same string). See PITFALLS.md and\nWORLD_2_CONTENT_REVIEW.md's W2-08 for a worked example of each.\n`);
  for (const f of findings) console.log(`${f.file}:${f.line}\n  ${f.snippet}\n`);
}
