import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";

import { EmptyThemeStyle, printThemeStyle } from "./styleModel";
import { buildStyleProfile, printStyleProfile } from "./styleEngine";

export async function extractStyle(file: File) {
  console.clear();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  const style = structuredClone(EmptyThemeStyle);

  // -----------------------------
  // Theme
  // -----------------------------

  const themeXML =
    (await zip.file("ppt/theme/theme1.xml")?.async("text")) ?? "";

  if (themeXML) {
    const theme = parser.parse(themeXML);

    style.themeName =
      theme?.["a:theme"]?.name ?? "Unknown Theme";

    style.fontScheme =
      theme?.["a:theme"]?.["a:themeElements"]?.["a:fontScheme"]?.name ??
      "Unknown";

    style.colorScheme =
      theme?.["a:theme"]?.["a:themeElements"]?.["a:clrScheme"]?.name ??
      "Unknown";

    style.majorLatinFont =
      theme?.["a:theme"]?.["a:themeElements"]?.["a:fontScheme"]?.[
        "a:majorFont"
      ]?.["a:latin"]?.typeface ?? "";

    style.minorLatinFont =
      theme?.["a:theme"]?.["a:themeElements"]?.["a:fontScheme"]?.[
        "a:minorFont"
      ]?.["a:latin"]?.typeface ?? "";

    const clr =
      theme?.["a:theme"]?.["a:themeElements"]?.["a:clrScheme"];

    style.accentColors = [
      clr?.["a:accent1"]?.["a:srgbClr"]?.val,
      clr?.["a:accent2"]?.["a:srgbClr"]?.val,
      clr?.["a:accent3"]?.["a:srgbClr"]?.val,
      clr?.["a:accent4"]?.["a:srgbClr"]?.val,
      clr?.["a:accent5"]?.["a:srgbClr"]?.val,
      clr?.["a:accent6"]?.["a:srgbClr"]?.val,
    ].filter(Boolean);
  }

  // -----------------------------
  // Slides
  // -----------------------------

  const slides = Object.keys(zip.files).filter(
    (x) =>
      x.startsWith("ppt/slides/slide") &&
      x.endsWith(".xml") &&
      !x.includes("_rels")
  );

  style.slideCount = slides.length;

  printThemeStyle(style);

  // -----------------------------
  // AI PROFILE
  // -----------------------------

  const profile = buildStyleProfile(style);

  printStyleProfile(profile);
}