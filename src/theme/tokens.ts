// ─── Design Tokens ────────────────────────────────────────────────────────────
// Single source of truth for all design values.
// Use these in StyleSheet / inline styles.
// NativeWind utilities in global.css reference the same values.

// ── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  // Primary brand palette
  linguaPurple:     '#6C4EF5',
  linguaDeepPurple: '#5B3BF6',
  linguaBlue:       '#4D8BFF',
  linguaGreen:      '#21C16B',

  // Semantic
  success:  '#21C16B',
  warning:  '#FFC800',
  streak:   '#FF8A00',
  error:    '#FF4D4F',
  info:     '#4D8BFF',

  // Neutrals
  textPrimary:   '#0D132B',
  textSecondary: '#6B7280',
  border:        '#E5E7EB',
  surface:       '#F6F7FB',
  background:    '#FFFFFF',
  white:         '#FFFFFF',
} as const;

export type ColorKey = keyof typeof colors;

// ── Typography ───────────────────────────────────────────────────────────────

export const fonts = {
  regular:  'Poppins-Regular',
  medium:   'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold:     'Poppins-Bold',
} as const;

export type FontKey = keyof typeof fonts;

// ── Font Sizes (px) ──────────────────────────────────────────────────────────

export const fontSize = {
  caption:  11,
  bodySm:   13,
  bodyMd:   14,
  bodyLg:   16,
  h4:       16,
  h3:       20,
  h2:       24,
  h1:       32,
} as const;

// ── Line Heights (px – absolute values required by React Native) ──────────────
// Calculated from: size × multiplier
//   H1:        32 × 1.2 = 38
//   H2:        24 × 1.3 = 31
//   H3:        20 × 1.3 = 26
//   H4:        16 × 1.4 = 22
//   BodyLg:    16 × 1.6 = 26
//   BodyMd:    14 × 1.6 = 22
//   BodySm:    13 × 1.6 = 21
//   Caption:   11 × 1.4 = 15

export const lineHeight = {
  h1:      38,
  h2:      31,
  h3:      26,
  h4:      22,
  bodyLg:  26,
  bodyMd:  22,
  bodySm:  21,
  caption: 15,
} as const;

// ── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  '2xl': 24,
  full: 9999,
} as const;

// ── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
} as const;
