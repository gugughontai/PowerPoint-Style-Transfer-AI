import type { ThemeStyle } from "./styleModel";

export interface StyleProfile {
  theme: string;
  majorFont: string;
  minorFont: string;

  colors: string[];

  titleSize: number;
  bodySize: number;

  slideCount: number;
}

export function buildStyleProfile(style: ThemeStyle): StyleProfile {
  return {
    theme: style.themeName,

    majorFont: style.majorLatinFont,

    minorFont: style.minorLatinFont,

    colors: style.accentColors,

    titleSize:
      style.averageTitleSize > 0
        ? style.averageTitleSize
        : 32,

    bodySize:
      style.averageBodySize > 0
        ? style.averageBodySize
        : 20,

    slideCount: style.slideCount,
  };
}

export function printStyleProfile(profile: StyleProfile) {
  console.log("");
  console.log("======================================");
  console.log("AI STYLE PROFILE");
  console.log("======================================");

  console.table(profile);
}