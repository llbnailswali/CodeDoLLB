import { compileAndRunKotlin, transpileKotlinToJS } from './kotlinRunner';
import { COROUTINE_FUNDAMENTALS_BUILDER_LESSON as LESSON } from '../data/curriculum/world16LessonsData';

// Cases pull `code` directly from the real, shipped lesson object so this
// test cannot silently drift from lesson content the way a hand-copied
// duplicate would (see PITFALLS.md: "Automated checks must use the lesson's
// actual arrays... not assumed counts"). `expected` remains an explicit,
// independently-verified assertion of the intended teaching output, not
// something derived from the runner's own behavior.
type Case = { name: string; code: string; expected: string };

const exploreExpected = ['child\ndone', 'done\nchild', 'false\ntrue', 'resumed'];

export const lessonOneCases: Case[] = [
  { name: 'Learn', code: LESSON.learn.codeSnippet.join('\n'), expected: 'child\ndone' },
  ...LESSON.explore!.cards.map((card, i) => ({
    name: `Explore ${i + 1}`,
    code: card.code.join('\n'),
    expected: exploreExpected[i],
  })),
  ...LESSON.predict!.questions
    .filter(q => q.topicMeta === 'output')
    .map((q, i) => ({
      name: `Predict ${i + 1} (output)`,
      code: (q.code ?? []).join('\n'),
      expected: q.options.find(o => o.isCorrect)!.label,
    })),
  { name: 'Write & Run starter', code: LESSON.writeRun!.initialCode, expected: '0' },
  { name: 'Write & Run solution', code: LESSON.writeRun!.solutionCode, expected: LESSON.writeRun!.expectedOutput },
  { name: 'Debug broken', code: LESSON.debug!.brokenCode, expected: 'pending' },
  { name: 'Debug fixed', code: LESSON.debug!.fixedCode, expected: LESSON.debug!.expectedOutput },
];

export async function verifyWorld16Lesson1(): Promise<void> {
  for (const test of lessonOneCases) {
    const result = await compileAndRunKotlin(test.code);
    if (!result.success || result.output !== test.expected) {
      throw new Error(`${test.name}: expected ${JSON.stringify(test.expected)}, got ${JSON.stringify(result.output)} (${result.error?.message ?? 'no engine error'})`);
    }
    // Force every case through the public transpiler as a separate assertion.
    if (typeof transpileKotlinToJS(test.code) !== 'string') throw new Error(`${test.name}: transpilation did not return text`);
  }
}
