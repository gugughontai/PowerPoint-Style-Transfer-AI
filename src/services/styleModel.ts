export interface ThemeStyle {
  themeName: string;
  fontScheme: string;
  colorScheme: string;

  slideCount: number;

  majorLatinFont: string;
  minorLatinFont: string;

  accentColors: string[];

  titleObjects: number;
  bodyObjects: number;

  averageTitleSize: number;
  averageBodySize: number;
}

export const EmptyThemeStyle: ThemeStyle = {
  themeName: "",
  fontScheme: "",
  colorScheme: "",

  slideCount: 0,

  majorLatinFont: "",
  minorLatinFont: "",

  accentColors: [],

  titleObjects: 0,
  bodyObjects: 0,

  averageTitleSize: 0,
  averageBodySize: 0,
};

export function printThemeStyle(style: ThemeStyle) {
  console.clear();

  console.log("================================");
  console.log("POWERPOINT STYLE PROFILE");
  console.log("================================");

  console.table({
    Theme: style.themeName,
    FontScheme: style.fontScheme,
    ColorScheme: style.colorScheme,
    Slides: style.slideCount,

    MajorFont: style.majorLatinFont,
    MinorFont: style.minorLatinFont,

    AverageTitleSize: style.averageTitleSize,
    AverageBodySize: style.averageBodySize,
  });

  console.log("");

  console.log("Accent Colors");

  console.table(style.accentColors);

  console.log("");

  console.log("Complete Style Object");

  console.log(style);
}