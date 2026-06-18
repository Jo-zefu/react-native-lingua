// ─── Learning Content Types ────────────────────────────────────────────────
// Core type definitions for the learning content system.
// All data files (languages, units, lessons) are typed with these interfaces.

// ── Language ────────────────────────────────────────────────────────────────

/** ISO 639-1 codes for supported languages. Extend as more languages are added. */
export type LanguageCode = 'es' | 'fr' | 'ja' | 'de' | 'ko' | 'zh';

export interface Language {
  /** ISO 639-1 language code */
  code: LanguageCode;
  /** English display name */
  name: string;
  /** Name in the target language */
  nativeName: string;
  /** Emoji flag for quick visual identification */
  flag: string;
  /** Short marketing tagline shown on the language selection screen */
  description: string;
  /** How many units are available for this language */
  totalUnits: number;
  /** Whether this language is visible and selectable in the app */
  isAvailable: boolean;
  /** Human-readable learner count shown on the language selection card, e.g. "28.4M" */
  learners: string;
  /** Whether this language is shown in the "Popular" section */
  isPopular?: boolean;
}

// ── Unit ────────────────────────────────────────────────────────────────────

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  /** Display title, e.g. "Greetings", "Numbers" */
  title: string;
  /** One-line summary shown below the title */
  description: string;
  /** Hex color used for the unit card background/accent */
  color: string;
  /** Emoji icon shown on the unit card */
  icon: string;
  /** Display order within the language's unit list (1-indexed) */
  order: number;
  /** Total number of lessons in this unit */
  totalLessons: number;
}

// ── Vocabulary ───────────────────────────────────────────────────────────────

export interface Vocabulary {
  id: string;
  /** The word in the target language */
  word: string;
  /** English translation */
  translation: string;
  /** Romanized spelling or IPA guide to help with pronunciation */
  pronunciation: string;
  /** A short example sentence in the target language */
  example: string;
  /** English translation of the example sentence */
  exampleTranslation: string;
}

// ── Phrase ───────────────────────────────────────────────────────────────────

export interface Phrase {
  id: string;
  /** The full phrase in the target language */
  phrase: string;
  /** English translation */
  translation: string;
  /** Romanized pronunciation guide */
  pronunciation: string;
  /** When or how to use this phrase (e.g. "Used when meeting someone for the first time") */
  context: string;
}

// ── Activities ───────────────────────────────────────────────────────────────

/** All supported activity (exercise) formats */
export type ActivityType =
  | 'multiple_choice' // Select the correct answer from 4 options
  | 'fill_blank'      // Complete the sentence with the missing word
  | 'match_pairs'     // Drag/tap to match a word to its translation
  | 'listen_select'   // Hear the audio then pick the correct answer
  | 'translate'       // Type or select a full translation
  | 'speak';          // Speak the word/phrase aloud (future audio feature)

export interface ActivityOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

/** A left/right pair used in match_pairs activities */
export interface MatchPair {
  /** Word or phrase in the target language */
  left: string;
  /** English translation */
  right: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  /** The prompt shown to the user (question, sentence with blank, etc.) */
  question: string;
  /** Used by multiple_choice and listen_select */
  options?: ActivityOption[];
  /** Used by match_pairs */
  pairs?: MatchPair[];
  /** Used by fill_blank, translate, and speak */
  correctAnswer?: string;
  /** Optional nudge shown after a wrong attempt */
  hint?: string;
}

// ── Lesson ───────────────────────────────────────────────────────────────────

/** The primary format of a lesson */
export type LessonType =
  | 'vocabulary'  // Focus on learning new words
  | 'grammar'     // Focus on grammar rules
  | 'conversation'// Practice real-world dialogue
  | 'ai_teacher'  // Guided session with a Stream Vision Agent AI teacher
  | 'audio';      // Audio-based listening lesson

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LessonGoal {
  /** Human-readable summary, e.g. "Learn how to greet people in Spanish" */
  description: string;
  /** Specific skills the learner will gain, shown as bullet points */
  skillsCovered: string[];
}

/**
 * Configuration passed to the Stream Vision Agent for AI teacher lessons.
 * The systemPrompt is sent server-side — never expose this directly to the client
 * in a production app. Here it lives in static data for the teaching demo.
 */
export interface AITeacherPrompt {
  /** Persona and behavioral instructions for the AI teacher character */
  systemPrompt: string;
  /** Short summary of what this lesson covers (used in the UI header) */
  lessonFocus: string;
  /** Sample back-and-forth dialogue to show students what to expect */
  exampleDialogue: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  type: LessonType;
  difficulty: DifficultyLevel;
  /** XP awarded upon lesson completion */
  xpReward: number;
  /** Rough time estimate in minutes */
  estimatedMinutes: number;
  goal: LessonGoal;
  vocabulary: Vocabulary[];
  phrases: Phrase[];
  activities: Activity[];
  /**
   * Only required for ai_teacher lessons.
   * Optionally included on other lesson types so they can be taught
   * by an AI teacher in a future feature.
   */
  aiTeacherPrompt?: AITeacherPrompt;
  /** Display order within the unit (1-indexed) */
  order: number;
}
