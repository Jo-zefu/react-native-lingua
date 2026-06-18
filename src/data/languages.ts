import type { Language } from "@/types/learning";

// ─── Supported Languages ───────────────────────────────────────────────────
// Add a new entry here when a language is ready to ship.
// Set isAvailable: false to hide a language without deleting its data.

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    description: "The world's second most spoken language.",
    totalUnits: 2,
    isAvailable: true,
    learners: "28.4M",
    isPopular: true,
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    description: "The language of love and culture.",
    totalUnits: 1,
    isAvailable: true,
    learners: "19.4M",
    isPopular: true,
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/jp.png",
    description: "A fascinating blend of scripts and culture.",
    totalUnits: 1,
    isAvailable: true,
    learners: "12.7M",
    isPopular: true,
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "https://flagcdn.com/w320/kr.png",
    description: "Gateway to K-pop, K-drama, and modern culture.",
    totalUnits: 1,
    isAvailable: true,
    learners: "9.3M",
    isPopular: true,
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    description: "Precise, powerful, and beautifully expressive.",
    totalUnits: 1,
    isAvailable: true,
    learners: "8.1M",
    isPopular: true,
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "https://flagcdn.com/w320/cn.png",
    description: "The most spoken language in the world.",
    totalUnits: 1,
    isAvailable: true,
    learners: "7.4M",
    isPopular: true,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find((lang) => lang.code === code);
}

export function getAvailableLanguages(): Language[] {
  return languages.filter((lang) => lang.isAvailable);
}

export function getPopularLanguages(): Language[] {
  return languages.filter((lang) => lang.isAvailable && lang.isPopular);
}
