import { XMLParser, XMLBuilder } from "fast-xml-parser";
import type { SlideStyleMap } from "./styleMapper";

export function applyTextStyles(
  slideXml: string,
  template: SlideStyleMap
): string {
  if (!template.title) {
    return slideXml;
  }

  const title = template.title;

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    format: false,
  });

  const xml = parser.parse(slideXml);

  function walk(node: unknown): void {
    if (!node) return;

    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    if (typeof node !== "object") {
      return;
    }

    const obj = node as Record<string, unknown>;

    if (
      obj["a:r"] &&
      typeof obj["a:r"] === "object"
    ) {
      const run = obj["a:r"] as Record<string, unknown>;

      if (
        !run["a:rPr"] ||
        typeof run["a:rPr"] !== "object"
      ) {
        run["a:rPr"] = {};
      }

      const rPr = run["a:rPr"] as Record<string, unknown>;

      if (title.fontSize) {
        rPr.sz = title.fontSize;
      }

      if (title.bold) {
        rPr.b = "1";
      }

      if (title.italic) {
        rPr.i = "1";
      }

      if (title.color) {
        rPr["a:solidFill"] = {
          "a:srgbClr": {
            val: title.color,
          },
        };
      }
    }

    Object.values(obj).forEach(walk);
  }

  walk(xml);

  return builder.build(xml);
}