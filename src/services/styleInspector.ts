import { XMLParser } from "fast-xml-parser";
import type { SlideData } from "./slideExtractor";

export interface ObjectStyle {
  slide: number;
  text: string;
  fontFace?: string;
  fontSize?: string;
  color?: string;
  bold: boolean;
  italic: boolean;
  xml: Record<string, unknown>;
}

export function inspectStyles(
  slides: SlideData[]
): ObjectStyle[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const styles: ObjectStyle[] = [];

  slides.forEach((slide) => {
    const parsed = parser.parse(slide.xml);

    function walk(node: unknown): void {
      if (node == null) return;

      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }

      if (typeof node !== "object") return;

      const obj = node as Record<string, unknown>;

      if (
        obj["a:r"] &&
        typeof obj["a:r"] === "object"
      ) {
        const run = obj["a:r"] as Record<string, unknown>;

        const rPr =
          (run["a:rPr"] as Record<string, unknown>) ?? {};

        const text =
          typeof run["a:t"] === "string"
            ? run["a:t"]
            : "";

        let color: string | undefined;

        const solidFill =
          rPr["a:solidFill"] as
            | Record<string, unknown>
            | undefined;

        if (solidFill) {
          const rgb =
            solidFill["a:srgbClr"] as
              | Record<string, unknown>
              | undefined;

          if (rgb && typeof rgb.val === "string") {
            color = rgb.val;
          }
        }

        styles.push({
          slide: slide.number,
          text,
          fontFace:
            typeof rPr.typeface === "string"
              ? rPr.typeface
              : undefined,
          fontSize:
            typeof rPr.sz === "string"
              ? rPr.sz
              : undefined,
          color,
          bold: rPr.b === "1",
          italic: rPr.i === "1",
          xml: run,
        });
      }

      Object.values(obj).forEach(walk);
    }

    walk(parsed);
  });

  console.log("");
  console.log("========== STYLE INSPECTOR ==========");

  console.table(
    styles.map((s) => ({
      Slide: s.slide,
      Text: s.text.substring(0, 30),
      Font: s.fontFace ?? "",
      Size: s.fontSize ?? "",
      Bold: s.bold,
      Italic: s.italic,
      Color: s.color ?? "",
    }))
  );

  return styles;
}