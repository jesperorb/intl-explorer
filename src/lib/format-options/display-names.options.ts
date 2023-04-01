import { localeMatcher } from "./locale-matcher";

export const displayNamesOptions = {
  style: ["long", "short", "narrow", undefined],
  type: ["language", "region", "script", "calendar", "dateTimeField", "currency", undefined],
  languageDisplay: ["dialect", "standard", undefined],
  fallback: ["code", "none", undefined],
  ...localeMatcher,
} as const;