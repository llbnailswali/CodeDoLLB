import React from 'react';
import { FlowVisual } from '../components/visuals/FlowVisual';
import { CompareVisual } from '../components/visuals/CompareVisual';
import { ToggleVisual } from '../components/visuals/ToggleVisual';
import { TokenVisual } from '../components/visuals/TokenVisual';
import { KotlinOverviewVisual } from '../components/visuals/KotlinOverviewVisual';
import { PrintCompareVisual } from '../components/visuals/PrintCompareVisual';
import { ValVarVisual } from '../components/visuals/ValVarVisual';
import { ProfileProgramVisual } from '../components/visuals/ProfileProgramVisual';

export interface World1VisualEntry {
  lessonId: string;
  title: string;
  idea: string; // the single sentence the visual must communicate
  render: (isDark: boolean) => React.ReactNode;
}

// One mental-model visual per World 1 (Kotlin Awakening) lesson, in curriculum
// order. Each renders the same tap-to-replay, auto-looping pattern as the
// Functions lesson's FunctionAnimatedExplainer -- built from shared primitives
// so the gallery reads as one consistent system.
export const WORLD_1_LESSON_VISUALS: World1VisualEntry[] = [
  {
    lessonId: 'world-1-what-is-kotlin',
    title: 'What is Kotlin?',
    idea: 'You write modern Kotlin once, and it powers Android, backend, and multiplatform.',
    render: (isDark) => <KotlinOverviewVisual isDark={isDark} />,
  },
  {
    lessonId: 'world-1-kotlin-syntax',
    title: 'Kotlin Syntax & main()',
    idea: 'Every Kotlin program starts running inside fun main().',
    render: (isDark) => (
      <FlowVisual
        isDark={isDark}
        inputLabel="You run"
        inputValue="▶"
        processLabel="fun main()"
        processDetail="entry point"
        outputLabel="Output"
        outputValue="Hi!"
      />
    ),
  },
  {
    lessonId: 'world-1-comments',
    title: 'Comments',
    idea: 'A comment is a note for humans -- the compiler skips it entirely.',
    render: (isDark) => (
      <CompareVisual
        isDark={isDark}
        left={{ label: 'Comment', code: '// a note', note: 'Ignored by compiler', valid: false }}
        right={{ label: 'Code', code: 'val x = 5', note: 'Runs normally', valid: true }}
      />
    ),
  },
  {
    lessonId: 'world-1-print-println',
    title: 'print() and println()',
    idea: 'print() stays on the same line, while println() drops down to a new line.',
    render: (isDark) => <PrintCompareVisual isDark={isDark} />,
  },
  {
    lessonId: 'world-1-val-vs-var',
    title: 'val vs var',
    idea: 'val locks a value forever; var can be reassigned anytime.',
    render: (isDark) => <ValVarVisual isDark={isDark} />,
  },
  {
    lessonId: 'world-1-variables-type-inference',
    title: 'Variables & Type Inference',
    idea: 'Kotlin looks at the value you give it and figures out the type on its own.',
    render: (isDark) => (
      <FlowVisual
        isDark={isDark}
        inputLabel="Value"
        inputValue="21"
        processLabel="val age ="
        processDetail="infers type"
        outputLabel="Type"
        outputValue="Int"
      />
    ),
  },
  {
    lessonId: 'world-1-int-long',
    title: 'Int & Long',
    idea: 'Int and Long both hold whole numbers -- Long just has far more room.',
    render: (isDark) => (
      <CompareVisual
        isDark={isDark}
        left={{ label: 'Int', code: '1000', note: 'Smaller range', valid: true, meter: 0.35 }}
        right={{ label: 'Long', code: '1000L', note: 'Much bigger range', valid: true, meter: 1 }}
      />
    ),
  },
  {
    lessonId: 'world-1-float-double',
    title: 'Float & Double',
    idea: 'Float and Double both hold decimals -- Double just keeps more precision.',
    render: (isDark) => (
      <CompareVisual
        isDark={isDark}
        left={{ label: 'Float', code: '3.14f', note: 'Less precise', valid: true, meter: 0.4 }}
        right={{ label: 'Double', code: '3.14159265', note: 'More precise', valid: true, meter: 1 }}
      />
    ),
  },
  {
    lessonId: 'world-1-boolean',
    title: 'Boolean',
    idea: 'A Boolean can only ever be one of two states: true or false.',
    render: (isDark) => <ToggleVisual isDark={isDark} label="isLoggedIn" />,
  },
  {
    lessonId: 'world-1-char',
    title: 'Char',
    idea: 'A Char holds exactly one character, wrapped in single quotes.',
    render: (isDark) => <TokenVisual isDark={isDark} quote="'" characters={['A']} />,
  },
  {
    lessonId: 'world-1-string',
    title: 'String',
    idea: 'A String holds a sequence of characters, wrapped in double quotes.',
    render: (isDark) => (
      <TokenVisual isDark={isDark} quote='"' characters={['K', 'o', 't', 'l', 'i', 'n']} />
    ),
  },
  {
    lessonId: 'world-1-string-templates',
    title: 'String Templates',
    idea: 'Drop a $variable inside a string and Kotlin fills in its value.',
    render: (isDark) => (
      <FlowVisual
        isDark={isDark}
        inputLabel="name ="
        inputValue="Ana"
        processLabel='"Hi, $name"'
        processDetail="interpolates"
        outputLabel="Result"
        outputValue="Hi, Ana"
      />
    ),
  },
  {
    lessonId: 'world-1-boss',
    title: 'Personal Profile Program',
    idea: 'Combine variables, string templates, and print() to create your profile.',
    render: (isDark) => <ProfileProgramVisual isDark={isDark} />,
  },
];
