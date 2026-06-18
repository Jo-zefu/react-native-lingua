import type { Unit, LanguageCode } from '@/types/learning';

// ─── Units ─────────────────────────────────────────────────────────────────
// A unit groups related lessons together (e.g. "Greetings", "Numbers").
// The `color` is used as the unit card accent. Use the app color palette
// defined in src/theme/tokens.ts as a guide.

export const units: Unit[] = [
  // ── Spanish ─────────────────────────────────────────────────────────────

  {
    id: 'es-unit-1',
    languageCode: 'es',
    title: 'Greetings',
    description: 'Learn how to say hello, goodbye, and be polite.',
    color: '#58CC02',
    icon: '👋',
    order: 1,
    totalLessons: 2,
  },
  {
    id: 'es-unit-2',
    languageCode: 'es',
    title: 'Numbers',
    description: 'Count from 1 to 10 in Spanish.',
    color: '#FF9600',
    icon: '🔢',
    order: 2,
    totalLessons: 2,
  },

  // ── French ──────────────────────────────────────────────────────────────

  {
    id: 'fr-unit-1',
    languageCode: 'fr',
    title: 'Greetings',
    description: 'Start your French journey with essential phrases.',
    color: '#CE82FF',
    icon: '🥐',
    order: 1,
    totalLessons: 2,
  },

  // ── Japanese ────────────────────────────────────────────────────────────

  {
    id: 'ja-unit-1',
    languageCode: 'ja',
    title: 'Basics',
    description: 'Essential Japanese words and everyday greetings.',
    color: '#FF4B4B',
    icon: '🌸',
    order: 1,
    totalLessons: 2,
  },

  // ── German ──────────────────────────────────────────────────────────────

  {
    id: 'de-unit-1',
    languageCode: 'de',
    title: 'Greetings',
    description: 'Master common German greetings and polite expressions.',
    color: '#1CB0F6',
    icon: '🏰',
    order: 1,
    totalLessons: 1,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getUnitsByLanguage(code: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === code)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
