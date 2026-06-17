// ─── Typography Presets ───────────────────────────────────────────────────────
// Ready-to-spread style objects for React Native Text components.
// Use these inside StyleSheet.create() or spread directly in style props
// when NativeWind utility classes are not sufficient.

import { fonts, fontSize, lineHeight, colors } from './tokens';

// Poppins Bold, 32px, lh 1.2 — Page / Screen Title
export const textH1 = {
  fontFamily:  fonts.bold,
  fontSize:    fontSize.h1,
  lineHeight:  lineHeight.h1,
  color:       colors.textPrimary,
} as const;

// Poppins SemiBold, 24px, lh 1.3 — Section Title
export const textH2 = {
  fontFamily:  fonts.semiBold,
  fontSize:    fontSize.h2,
  lineHeight:  lineHeight.h2,
  color:       colors.textPrimary,
} as const;

// Poppins SemiBold, 20px, lh 1.3 — Card / Module Title
export const textH3 = {
  fontFamily:  fonts.semiBold,
  fontSize:    fontSize.h3,
  lineHeight:  lineHeight.h3,
  color:       colors.textPrimary,
} as const;

// Poppins Medium, 16px, lh 1.4 — Subheading
export const textH4 = {
  fontFamily:  fonts.medium,
  fontSize:    fontSize.h4,
  lineHeight:  lineHeight.h4,
  color:       colors.textPrimary,
} as const;

// Poppins Regular, 16px, lh 1.6 — Important content
export const textBodyLg = {
  fontFamily:  fonts.regular,
  fontSize:    fontSize.bodyLg,
  lineHeight:  lineHeight.bodyLg,
  color:       colors.textPrimary,
} as const;

// Poppins Regular, 14px, lh 1.6 — Body text
export const textBodyMd = {
  fontFamily:  fonts.regular,
  fontSize:    fontSize.bodyMd,
  lineHeight:  lineHeight.bodyMd,
  color:       colors.textPrimary,
} as const;

// Poppins Regular, 13px, lh 1.6 — Supporting text
export const textBodySm = {
  fontFamily:  fonts.regular,
  fontSize:    fontSize.bodySm,
  lineHeight:  lineHeight.bodySm,
  color:       colors.textPrimary,
} as const;

// Poppins Regular, 11px, lh 1.4 — Labels / meta text
export const textCaption = {
  fontFamily:  fonts.regular,
  fontSize:    fontSize.caption,
  lineHeight:  lineHeight.caption,
  color:       colors.textSecondary,
} as const;

export const typography = {
  h1:      textH1,
  h2:      textH2,
  h3:      textH3,
  h4:      textH4,
  bodyLg:  textBodyLg,
  bodyMd:  textBodyMd,
  bodySm:  textBodySm,
  caption: textCaption,
} as const;
