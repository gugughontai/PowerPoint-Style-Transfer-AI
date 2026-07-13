import { XMLParser, XMLBuilder } from "fast-xml-parser";
import type { SlideData } from "./slideExtractor";

export interface ShapeStyle {
  slide: number;
  name: string;
  xml: string;
}

export function extractShapeStyles(
  slides: SlideData[]
): ShapeStyle[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    format: false,
  });

  const result: ShapeStyle[] = [];

  slides.forEach((slide) => {
    const parsed = parser.parse(slide.xml);

    const shapes =
      parsed?.["p:sld"]?.["p:cSld"]?.["p:spTree"]?.["p:sp"];

    if (!shapes) return;

    const list = Array.isArray(shapes)
      ? shapes
      : [shapes];

    list.forEach((shape: Record<string, unknown>, index: number) => {
      const nv =
        shape["p:nvSpPr"] as Record<string, unknown> | undefined;

      const cNv =
        nv?.["p:cNvPr"] as Record<string, unknown> | undefined;

      result.push({
        slide: slide.number,
        name:
          typeof cNv?.name === "string"
            ? cNv.name
            : `Shape ${index + 1}`,
        xml: builder.build({
          "p:sp": shape,
        }),
      });
    });
  });

  console.log("");
  console.log("========== SHAPE XML ==========");

  console.table(
    result.map((s) => ({
      Slide: s.slide,
      Shape: s.name,
      XML: `${s.xml.length} chars`,
    }))
  );

  return result;
}