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
  formula: string; // e.g. "SERIF • SANS • SERIF • MONO"
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
    formula: 'SANS • SANS • SANS • MONO',
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
        fontFamily: 'Outfit (Geometric Sans)',
        category: 'sans',
        description: 'Vibrant geometric letterforms that make gamification elements feel punchy and rewarding.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Plus Jakarta Sans (Sans)',
        category: 'sans',
        description: 'Open apertures and balanced ascenders for instant mobile scanning.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Plus Jakarta Sans (Clean Sans)',
        category: 'sans',
        description: 'High x-height and generous line-tracking that aligns naturally with inline code tokens.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (Mono)',
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
    id: 'academic-press',
    name: 'Oxford Academic Press',
    badge: 'LITERARY SERIF',
    formula: 'SERIF • SANS • SERIF • MONO',
    tagline: 'Scholarly Playfair serif headers + Literata book reading',
    description:
      'Transforms the entire app into a dignified academic publication. World headings, quest banners, and milestones use high-contrast Playfair Display serif, while long-form tutorials read like an elegant hardcover CS volume with Literata.',
    bestFor: 'Learners who appreciate classic editorial design, book publishing, and deep theoretical study.',
    vibe: 'Scholarly • Dignified • Literary',
    displayFont: "'Playfair Display', Georgia, serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    codeFont: "'JetBrains Mono', monospace",
    tutorialFont: "'Literata', Georgia, serif",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Playfair Display (Serif)',
        category: 'serif',
        description: 'Distinguished editorial serif with dramatic contrast and classical proportions.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Plus Jakarta Sans (Sans)',
        category: 'sans',
        description: 'Maintains crisp touch targets and rapid option legibility in quizzes.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Literata (Digital Book Serif)',
        category: 'serif',
        description: 'Engineered by TypeTogether for Google Play Books; eases eye strain during 30-minute reads.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (Mono)',
        category: 'mono',
        description: 'Precise monospace contrast against literary serif paragraphs.',
      },
    },
    sampleHeadline: 'Chapter IV: Asynchronous Coroutines & Flows',
    sampleParagraph:
      'Sequential execution yields gracefully when suspension points are encountered. Under structured concurrency, parent scopes supervise all child coroutines naturally.',
    sampleCode: 'suspend fun fetchTelemetry(): TelemetryResult = coroutineScope {\n  async { httpClient.get("/metrics") }.await()\n}',
  },
  {
    id: 'retro-terminal',
    name: 'Retro Hacker & Cyber Terminal',
    badge: 'ALL MONO VIBE',
    formula: 'MONO • TECH SANS • MONO • MONO',
    tagline: 'Raw cyberpunk hacker terminal with Space Mono & Fira Code',
    description:
      'For Unix purists and terminal enthusiasts. World titles, stats, and headers are styled with bold retro Space Mono, navigation uses brutalist Space Grotesk, and tutorials render in clean monospace developer documentation.',
    bestFor: 'Systems programmers, backend developers, terminal enthusiasts, and cyberpunk fans.',
    vibe: 'Cyberpunk • Retro • Terminal',
    displayFont: "'Space Mono', monospace",
    bodyFont: "'Space Grotesk', sans-serif",
    codeFont: "'Fira Code', monospace",
    tutorialFont: "'JetBrains Mono', monospace",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Space Mono (Fixed-Width Display)',
        category: 'mono',
        description: 'Bold monospace headlines evoking 1980s mainframe terminals and cyberpunk HUDs.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Space Grotesk (Tech Sans)',
        category: 'sans',
        description: 'Proportional sans-serif built directly on the skeletal proportions of Space Mono.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'JetBrains Mono (Mono Prose)',
        category: 'mono',
        description: 'Raw documentation layout reminiscent of man pages, RFC specs, and terminal READMEs.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'Fira Code (Ligature Mono)',
        category: 'mono',
        description: 'Beloved developer monospace with distinctive programming ligatures and operator symbols.',
      },
    },
    sampleHeadline: 'SYS_INIT: MEMORY ALLOCATION & HEAP',
    sampleParagraph:
      'The JVM garbage collector tracks object reachability graphs. When val variables escape local stack frames, heap allocation is tracked through generational roots.',
    sampleCode: 'val buffer: ByteBuffer = ByteBuffer.allocateDirect(1024)\nbuffer.putInt(0xDEADBEEF.toInt())',
  },
  {
    id: 'vintage-storycraft',
    name: 'Vintage Editorial & Storycraft',
    badge: 'WARM SERIF',
    formula: 'SERIF • HUMANIST • SERIF • MONO',
    tagline: 'Warm Fraunces vintage serif + Figtree rounded humanist UI',
    description:
      'Brings artisanal craft and warmth. World titles and milestone celebrations use Fraunces (a quirky, warm 1970s-inspired display serif), paired with rounded Figtree UI and Literata book reading prose.',
    bestFor: 'Design-conscious learners, storytellers, and creative developers seeking warmth and charm.',
    vibe: 'Artisanal • Warm • Character-Rich',
    displayFont: "'Fraunces', Georgia, serif",
    bodyFont: "'Figtree', sans-serif",
    codeFont: "'JetBrains Mono', monospace",
    tutorialFont: "'Literata', Georgia, serif",
    roles: {
      display: {
        roleName: 'Display & Gamification (XP, Map Nodes, Streaks)',
        fontFamily: 'Fraunces (Warm Vintage Serif)',
        category: 'serif',
        description: 'Expressive variable serif with organic warmth, soft serifs, and handcrafted appeal.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Figtree (Humanist Sans)',
        category: 'sans',
        description: 'Approachable rounded letterforms that make navigation and quiz answers feel welcoming.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Literata (Editorial Serif)',
        category: 'serif',
        description: 'Literary cadence that gives programming essays the feeling of reading a beautifully bound book.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (Mono)',
        category: 'mono',
        description: 'Crisp, modern code rendering providing functional balance to the vintage headings.',
      },
    },
    sampleHeadline: 'A Tale of Two Builders: DSLs in Kotlin',
    sampleParagraph:
      'Type-safe builders leverage function literals with receiver. By combining extension functions with lambdas, Kotlin allows you to craft domain-specific languages of sheer elegance.',
    sampleCode: 'fun html(init: HTML.() -> Unit): HTML {\n  return HTML().apply(init)\n}',
  },
  {
    id: 'friendly-beginner',
    name: 'Warm & Friendly Approachable',
    badge: 'DUOLINGO VIBE',
    formula: 'ROUNDED • HUMANIST • HUMANIST • MONO',
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
        fontFamily: 'Outfit (Bold Geometric Sans)',
        category: 'sans',
        description: 'Cheery display headers that celebrate progress milestones.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Figtree (Rounded Sans)',
        category: 'sans',
        description: 'Curved terminals that soften UI density without compromising clarity.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Figtree (Approachable Sans)',
        category: 'sans',
        description: 'Gentle reading rhythm that keeps technical explanations friendly and engaging.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (Friendly Mono)',
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
    id: 'minimal-tech',
    name: 'Silicon Valley Brutalist',
    badge: 'LINEAR / VERCEL',
    formula: 'NEO-GROTESQUE • SANS • SANS • MONO',
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
        fontFamily: 'Space Grotesk (Tech Sans)',
        category: 'sans',
        description: 'Monospaced-inspired geometric display with distinct high-tech personality.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Inter (Neutral Sans)',
        category: 'sans',
        description: 'The industry-standard UI typeface with mathematical neutrality.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Inter (Dense Tech Sans)',
        category: 'sans',
        description: 'Clean, dense documentation feel similar to developer API specifications.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'Fira Code (Code Mono)',
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
    id: 'cognitive-clarity',
    name: 'Cognitive Velocity & Clarity',
    badge: 'HIGH READING SPEED',
    formula: 'EXPANSIVE • EXPANSIVE • EXPANSIVE • MONO',
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
        fontFamily: 'Lexend (Expansive Sans)',
        category: 'sans',
        description: 'Expansive letterforms that leap off the screen with instant recognition.',
      },
      ui: {
        roleName: 'General App Interface (Buttons, Menus, Quizzes)',
        fontFamily: 'Lexend (Open Aperture)',
        category: 'sans',
        description: 'Looser letter spacing helps the eyes glide quickly over quiz choices.',
      },
      tutorial: {
        roleName: 'Detailed Tutorial Reading (Articles & Notes)',
        fontFamily: 'Lexend (Reading Speed)',
        category: 'sans',
        description: 'Mathematically adjusted character widths that reduce reading friction and cognitive strain.',
      },
      code: {
        roleName: 'Code Snippets, Mobile IDE & Keycaps',
        fontFamily: 'JetBrains Mono (Mono)',
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
