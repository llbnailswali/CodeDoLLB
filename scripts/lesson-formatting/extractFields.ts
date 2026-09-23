/** Enumerates every formattable Kotlin code field on a FiveStageLesson, with a human screen name and a precise path for later AST-based writing. */

export type FieldPath =
  | { stage: 'learn'; prop: 'codeSnippet' }
  | { stage: 'explore'; cardIndex: number; prop: 'code' }
  | { stage: 'predict'; questionIndex: number; prop: 'code' }
  | { stage: 'writeRun'; prop: 'initialCode' | 'solutionCode' }
  | { stage: 'debug'; prop: 'brokenCode' | 'fixedCode' };

export interface FieldEntry {
  screenName: string;
  path: FieldPath;
  kind: 'array' | 'string';
  value: string[] | string;
}

export function extractFields(lesson: any): FieldEntry[] {
  const fields: FieldEntry[] = [];

  if (Array.isArray(lesson?.learn?.codeSnippet)) {
    fields.push({ screenName: 'Learn — code snippet', path: { stage: 'learn', prop: 'codeSnippet' }, kind: 'array', value: lesson.learn.codeSnippet });
  }

  const cards = lesson?.explore?.cards;
  if (Array.isArray(cards)) {
    cards.forEach((card: any, i: number) => {
      if (Array.isArray(card?.code)) {
        fields.push({
          screenName: `Explore — Card ${i + 1}${card.title ? ` (${card.title})` : ''}`,
          path: { stage: 'explore', cardIndex: i, prop: 'code' },
          kind: 'array',
          value: card.code,
        });
      }
    });
  }

  const questions = lesson?.predict?.questions;
  if (Array.isArray(questions)) {
    questions.forEach((q: any, i: number) => {
      if (Array.isArray(q?.code)) {
        fields.push({
          screenName: `Predict — Question ${i + 1}`,
          path: { stage: 'predict', questionIndex: i, prop: 'code' },
          kind: 'array',
          value: q.code,
        });
      }
    });
  }

  if (typeof lesson?.writeRun?.initialCode === 'string') {
    fields.push({ screenName: 'Write & Run — Initial Code', path: { stage: 'writeRun', prop: 'initialCode' }, kind: 'string', value: lesson.writeRun.initialCode });
  }
  if (typeof lesson?.writeRun?.solutionCode === 'string') {
    fields.push({ screenName: 'Write & Run — Solution Code', path: { stage: 'writeRun', prop: 'solutionCode' }, kind: 'string', value: lesson.writeRun.solutionCode });
  }

  if (typeof lesson?.debug?.brokenCode === 'string') {
    fields.push({ screenName: 'Debug — Broken Code', path: { stage: 'debug', prop: 'brokenCode' }, kind: 'string', value: lesson.debug.brokenCode });
  }
  if (typeof lesson?.debug?.fixedCode === 'string') {
    fields.push({ screenName: 'Debug — Fixed Code', path: { stage: 'debug', prop: 'fixedCode' }, kind: 'string', value: lesson.debug.fixedCode });
  }

  return fields;
}

export function fieldKey(path: FieldPath): string {
  switch (path.stage) {
    case 'learn': return 'learn.codeSnippet';
    case 'explore': return `explore.cards[${path.cardIndex}].code`;
    case 'predict': return `predict.questions[${path.questionIndex}].code`;
    case 'writeRun': return `writeRun.${path.prop}`;
    case 'debug': return `debug.${path.prop}`;
  }
}
