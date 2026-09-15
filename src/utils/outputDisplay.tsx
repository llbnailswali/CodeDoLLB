import React from 'react';

// Shared by both renderers below: turns every space character in a single
// line of text into a small, muted middle-dot marker instead of an
// invisible gap.
function renderSpacesAsDots(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/( )/).map((chunk, i) =>
    chunk === ' ' ? (
      <span key={`${keyPrefix}-${i}`} className="opacity-40" aria-hidden="false" title="space">
        ·
      </span>
    ) : (
      <React.Fragment key={`${keyPrefix}-${i}`}>{chunk}</React.Fragment>
    )
  );
}

/**
 * Renders a program's actual/expected output with every space character made
 * visible as a small middle-dot marker, instead of a plain invisible gap.
 *
 * Several lessons' correctness depends on an exact space that only appears
 * inside the middle of a string (e.g. print("Status: ") + println("ACTIVE")
 * must produce "Status: ACTIVE", not "Status:ACTIVE") -- a plain-text render
 * of that expected/actual output gives the learner no way to tell there is
 * (or should be) a space there at all, since a space glyph renders as
 * literally nothing. Use this wherever an exact output string is shown for
 * the learner to visually compare against what their code produced.
 */
export function renderVisibleWhitespace(text: string, className = ''): React.ReactNode {
  const lines = text.split('\n');

  return (
    <span className={className}>
      {lines.map((line, lineIdx) => (
        // Each real line gets its own <br/>-separated block, but the line
        // itself must never be allowed to CSS-wrap onto a second visual
        // line -- a wrapped output line looks exactly like an extra,
        // program-produced newline that isn't actually there. Callers
        // should pair this with a `whitespace-nowrap overflow-x-auto`
        // container (see CLAUDE.md) rather than `whitespace-pre-wrap`.
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <br />}
          {renderSpacesAsDots(line, `l${lineIdx}`)}
        </React.Fragment>
      ))}
    </span>
  );
}

/**
 * Renders instructional prose (e.g. a Write & Run challenge's `description`)
 * with every double-quoted phrase kept unbreakable, so it can never be
 * split across a line-wrap.
 *
 * A description that literally quotes an exact expected output, e.g.
 * `so they appear together as "Status: ACTIVE".`, relies on the reader
 * seeing that phrase as one unbroken string. Plain prose word-wrap doesn't
 * know that -- if "Status:" ends one visual line and "ACTIVE" starts the
 * next, it reads exactly like the expected output contains a line break,
 * which it does not. Wrapping each quoted phrase in a `white-space: nowrap`
 * span forces the whole quoted unit to move to the next line together
 * instead of splitting mid-phrase.
 *
 * This intentionally does NOT dot-mark spaces the way
 * `renderVisibleWhitespace` does for output panels -- prose is meant to
 * read naturally, and decorating every quoted word in a sentence would be
 * visual clutter for no benefit. Whether a quoted phrase's whitespace (e.g.
 * a trailing space in "Status: ") is *correct* is a content-authoring
 * concern, not a rendering one -- see CLAUDE.md's rule requiring quoted
 * phrases in `description` to exactly match their corresponding substring
 * of `expectedOutput`.
 */
export function renderProseWithUnbreakableQuotes(text: string): React.ReactNode {
  const parts = text.split(/("[^"]*")/g);

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('"') && part.endsWith('"') && part.length >= 2 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
