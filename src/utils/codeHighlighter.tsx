import React from 'react';

/**
 * Lightweight, zero-dependency Kotlin syntax highlighter for CodeDo
 */
export function renderKotlinCodeLine(line: string, isBlankHighlighted = false): React.ReactNode {
  // If line has a comment
  if (line.trim().startsWith('//')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Tokenize regex for Kotlin basics
  const tokenRegex = /(\/\/.*$|"[^"]*"|_____|\b(?:val|var|fun|class|when|if|else|for|in|downTo|step|until|return|null|true|false|is)\b|\b(?:Int|String|Boolean|Double|Unit|Float|List|Set|Map)\b|\b(?:println|print|listOf|mutableListOf)\b|\b\d+\b|[{}()+\-*\/=?:.,!<>]+|[A-Za-z_][A-Za-z0-9_]*|\s+)/g;

  const tokens = line.match(tokenRegex) || [line];

  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith('//')) {
          return (
            <span key={i} className="text-slate-500 italic">
              {token}
            </span>
          );
        }
        if (token.startsWith('"') && token.endsWith('"')) {
          return (
            <span key={i} className="text-emerald-300">
              {token}
            </span>
          );
        }
        if (token === '_____') {
          return (
            <span
              key={i}
              className={`font-bold px-2 py-0.5 rounded border border-dashed ${
                isBlankHighlighted
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400 animate-pulse'
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-400'
              }`}
            >
              _____
            </span>
          );
        }
        if (
          [
            'val',
            'var',
            'fun',
            'class',
            'when',
            'if',
            'else',
            'for',
            'in',
            'downTo',
            'step',
            'until',
            'return'
          ].includes(token)
        ) {
          return (
            <span key={i} className="text-purple-400 font-bold">
              {token}
            </span>
          );
        }
        if (['true', 'false', 'null'].includes(token)) {
          return (
            <span key={i} className="text-amber-400 font-bold">
              {token}
            </span>
          );
        }
        if (['Int', 'String', 'Boolean', 'Double', 'Unit', 'Float', 'List', 'Set', 'Map'].includes(token)) {
          return (
            <span key={i} className="text-indigo-300 font-semibold">
              {token}
            </span>
          );
        }
        if (['println', 'print', 'listOf', 'mutableListOf'].includes(token)) {
          return (
            <span key={i} className="text-cyan-400 font-medium">
              {token}
            </span>
          );
        }
        if (/^\d+$/.test(token)) {
          return (
            <span key={i} className="text-amber-300">
              {token}
            </span>
          );
        }
        if (/^[{}()+\-*\/=?:.,!<>]+$/.test(token)) {
          return (
            <span key={i} className="text-slate-400">
              {token}
            </span>
          );
        }
        return (
          <span key={i} className="text-slate-200">
            {token}
          </span>
        );
      })}
    </>
  );
}
