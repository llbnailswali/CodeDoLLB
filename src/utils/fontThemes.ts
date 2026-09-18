/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FontComboRole {
  roleName: string;
  fontFamily: string;
  category: 'sans' | 'serif' | 'mono';
  description: string;
}

export interface FontCombo {
  id: string;
  name: string;
  badge: string;
  isDefault?: boolean;
  tagline: string;
  description: string;
  bestFor: string;
  vibe: string;
  displayFont: string;
  bodyFont: string;
  codeFont: string;
  tutorialFont: string;
  roles: {
    display: FontComboRole;
    ui: FontComboRole;
    tutorial: FontComboRole;
    code: FontComboRole;
  };
  sampleHeadline: string;
  sampleParagraph: string;
  sampleCode: string;
}

export const RECOMMENDED_FONT_COMBOS: FontCombo[] = [
  {
    id: 'kotlin-native',
    name: 'Modern Kotlin Native',
    badge: 'DEFAULT',
    isDefault: true,
    tagline: 'Tactile gamified energy + modern Android/JetBrains clarity',
    description:
      'The curated gold-standard CodeDo experience. Geometric high-impact display for XP, streaks, and badges paired with Google Android-grade Plus Jakarta Sans for reading and JetBrains Mono for exact code syntax.',
    bestFor: 'General Kotlin learning, daily streaks, interactive challenges, and mixed practice.',
    vibe: 'Modern • Energetic • Precise',
    displayFont: "'Outfit', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    codeFont: "'JetBrains Mono', monospace",
    tutorialFont: "'Plus Jakarta Sans', sans-serif",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Outfit (700/800)',
        category: 'sans',
        description: 'Vibrant geometric letterforms that make gamification elements feel punchy and rewarding.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Plus Jakarta Sans (500)',
        category: 'sans',
        description: 'Open apertures and balanced ascenders for instant mobile scanning.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Plus Jakarta Sans (400/500)',
        category: 'sans',
        description: 'High x-height and generous line-tracking that aligns naturally with inline code tokens.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (500/600)',
        category: 'mono',
        description: 'Created specifically by JetBrains for Kotlin; zero ambiguity between 0/O and 1/l/I.',
      },
    },
    sampleHeadline: 'World 1: Variables & Immutability',
    sampleParagraph:
      'In Kotlin, memory references are strictly governed by val and var keywords. By default, prefer immutable references to build crash-free concurrent systems.',
    sampleCode: 'val maxRetries: Int = 3\nprintln("Attempting connection: $maxRetries")',
  },
  {
    id: 'editorial-book',
    name: 'Editorial Book & Deep Focus',
    badge: 'DEEP READING',
    tagline: 'Literary serif immersion for long tutorials + modern app shell',
    description:
      'Engineered for deep study sessions. Switches detailed tutorial articles to Literata (the award-winning typeface designed by TypeTogether for Google Play Books), while keeping the app navigation and mobile editor modern and sharp.',
    bestFor: 'Learners reading 20+ minute tutorial articles, Kotlin coroutines architecture, and complex theory.',
    vibe: 'Bookish • Academic • Serene',
    displayFont: "'Outfit', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    codeFont: "'JetBrains Mono', monospace",
    tutorialFont: "'Literata', Georgia, serif",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Outfit (700/800)',
        category: 'sans',
        description: 'Keeps game headers lively while the reading body remains scholarly.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Plus Jakarta Sans (500)',
        category: 'sans',
        description: 'Clean UI buttons and navigation tabs.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Literata (Serif, 400/600)',
        category: 'serif',
        description: 'Refined book serif designed for digital screens that guides the eye smoothly across long technical paragraphs.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (500/600)',
        category: 'mono',
        description: 'High-contrast code presentation alongside editorial prose.',
      },
    },
    sampleHeadline: 'Deep Dive: Understanding Kotlin Flow',
    sampleParagraph:
      'Asynchronous data streams in Kotlin represent sequential emissions over time. Unlike cold sequences, Flows integrate directly with structured coroutine lifecycles.',
    sampleCode: 'fun streamEvents(): Flow<Event> = flow {\n  emit(Event.Connected)\n}',
  },
  {
    id: 'minimal-tech',
    name: 'Sleek Minimalist Tech',
    badge: 'LINEAR / VERCEL',
    tagline: 'Ultra-clean, high-density developer aesthetic',
    description:
      'Inspired by Linear, Vercel, and GitHub Next. Pairs geometric Space Grotesk display with Inter for universal readability and Fira Code for programming syntax.',
    bestFor: 'Practicing software engineers who love clean, monochrome, and minimalist developer tools.',
    vibe: 'Industrial • Minimalist • Crisp',
    displayFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Inter', sans-serif",
    codeFont: "'Fira Code', monospace",
    tutorialFont: "'Inter', sans-serif",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Space Grotesk (600/700)',
        category: 'sans',
        description: 'Monospaced-inspired geometric display with distinct high-tech personality.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Inter (400/500)',
        category: 'sans',
        description: 'The industry-standard UI typeface with mathematical neutrality.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Inter (400/500)',
        category: 'sans',
        description: 'Clean, dense documentation feel similar to developer API specifications.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'Fira Code (500)',
        category: 'mono',
        description: 'Beloved open-source programming typeface with distinct punctuation.',
      },
    },
    sampleHeadline: 'Architecture: Sealed Interfaces',
    sampleParagraph:
      'Sealed interfaces enforce algebraic data types at compile time. Every subtype must be declared within the same compilation package unit.',
    sampleCode: 'sealed interface UiState {\n  data class Success(val data: List<Item>) : UiState\n}',
  },
  {
    id: 'friendly-beginner',
    name: 'Warm & Friendly Beginner',
    badge: 'APPROACHABLE',
    tagline: 'Soft, rounded letterforms that make code inviting',
    description:
      'Designed to reduce cognitive intimidation. Uses Figtree for smooth, friendly typography that feels gentle and accessible to first-time programmers and young developers.',
    bestFor: 'Beginners, juniors, and learners who prefer welcoming, humanized learning environments.',
    vibe: 'Warm • Approachable • Cheerful',
    displayFont: "'Outfit', sans-serif",
    bodyFont: "'Figtree', sans-serif",
    codeFont: "'JetBrains Mono', monospace",
    tutorialFont: "'Figtree', sans-serif",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Outfit (700/800)',
        category: 'sans',
        description: 'Cheery display headers that celebrate progress milestones.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Figtree (500)',
        category: 'sans',
        description: 'Curved terminals that soften UI density without compromising clarity.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Figtree (400/500)',
        category: 'sans',
        description: 'Gentle reading rhythm that keeps technical explanations friendly and engaging.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (500)',
        category: 'mono',
        description: 'Crisp code clarity with friendly keyword highlighting.',
      },
    },
    sampleHeadline: 'Getting Started: Your First Function',
    sampleParagraph:
      'Functions are simply small reusable building blocks. Think of them like recipes: you pass in ingredients (arguments) and get a delicious result!',
    sampleCode: 'fun greetLearner(name: String) {\n  println("Welcome to Kotlin, $name!")\n}',
  },
  {
    id: 'cognitive-clarity',
    name: 'Cognitive Velocity & Clarity',
    badge: 'HIGH READING SPEED',
    tagline: 'Scientifically engineered to reduce visual crowding',
    description:
      'Powered by Lexend, a typeface scientifically proven to improve reading velocity by customizing character spacing and aperture openness. Ideal for fast scanners and neurodivergent learners.',
    bestFor: 'Rapid quiz solving, speed runs, learners with dyslexia, or high eye fatigue.',
    vibe: 'Expansive • High Velocity • Clear',
    displayFont: "'Lexend', sans-serif",
    bodyFont: "'Lexend', sans-serif",
    codeFont: "'JetBrains Mono', monospace",
    tutorialFont: "'Lexend', sans-serif",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Lexend (600/700)',
        category: 'sans',
        description: 'Expansive letterforms that leap off the screen with instant recognition.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Lexend (400/500)',
        category: 'sans',
        description: 'Looser letter spacing helps the eyes glide quickly over quiz choices.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Lexend (400)',
        category: 'sans',
        description: 'Mathematically adjusted character widths that reduce reading friction and cognitive strain.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (500)',
        category: 'mono',
        description: 'Fixed-width code tokens aligned with high-velocity prose.',
      },
    },
    sampleHeadline: 'Syntax Sprint: Safe Calls & Elvis Operator',
    sampleParagraph:
      'Kotlin eliminates NullPointerExceptions using safe-call operators. The Elvis operator provides a resilient fallback whenever a nullable expression evaluates to null.',
    sampleCode: 'val username: String? = null\nval display = username ?: "Guest"',
  },
];

const STORAGE_KEY = 'codedo_font_combo_id';
export const DEFAULT_FONT_COMBO_ID = 'kotlin-native';

/**
 * Returns the currently persisted or default font combo
 */
export function getSavedFontCombo(): FontCombo {
  try {
    const savedId = localStorage.getItem(STORAGE_KEY);
    if (savedId) {
      const match = RECOMMENDED_FONT_COMBOS.find((c) => c.id === savedId);
      if (match) return match;
    }
  } catch {
    // Ignore storage issues
  }
  return RECOMMENDED_FONT_COMBOS[0];
}

/**
 * Applies CSS variables directly to document.documentElement
 * so all components and views update immediately.
 */
export function applyFontComboToDom(combo: FontCombo): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.style.setProperty('--font-display', combo.displayFont);
  root.style.setProperty('--font-body', combo.bodyFont);
  root.style.setProperty('--font-code', combo.codeFont);
  root.style.setProperty('--font-tutorial', combo.tutorialFont);

  // Backward-compatible direct variables
  root.style.setProperty('--font-outfit', combo.displayFont);
  root.style.setProperty('--font-jakarta', combo.bodyFont);
  root.style.setProperty('--font-mono', combo.codeFont);

  // Set active combo attribute on root for targeted CSS if needed
  root.setAttribute('data-font-combo', combo.id);
}

/**
 * Persists the selected combo and applies it to the DOM
 */
export function saveAndApplyFontCombo(comboId: string): FontCombo {
  const match = RECOMMENDED_FONT_COMBOS.find((c) => c.id === comboId) || RECOMMENDED_FONT_COMBOS[0];
  try {
    localStorage.setItem(STORAGE_KEY, match.id);
  } catch {
    // Ignore
  }
  applyFontComboToDom(match);
  return match;
}

/**
 * Resets typography back to Modern Kotlin Native (Default)
 */
export function resetFontComboToDefault(): FontCombo {
  return saveAndApplyFontCombo(DEFAULT_FONT_COMBO_ID);
}
