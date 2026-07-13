import { XMLParser } from "fast-xml-parser";
import type { SlideData } from "./slideExtractor";

export interface SlideObject {
  slide: number;
  type: string;
  text: string;
}

function walk(node: unknown, objects: SlideObject[], slide: number) {
  if (node == null) return;

  if (Array.isArray(node)) {
    node.forEach((item) => walk(item, objects, slide));
    return;
  }

  if (typeof node !== "object") return;

  const obj = node as Record<string, unknown>;

  // Shape
  if (obj["p:sp"]) {
    const shapes = Array.isArray(obj["p:sp"])
      ? obj["p:sp"]
      : [obj["p:sp"]];

    shapes.forEach((shape) => {
      const s = shape as Record<string, unknown>;

      let text = "";

      const txBody = s["p:txBody"] as Record<string, unknown> | undefined;

      if (txBody) {
        text = JSON.stringify(txBody)
          .replace(/\\n/g, " ")
          .replace(/"/g, "")
          .trim();
      }

      objects.push({
        slide,
        type: "Shape",
        text,
      });
    });
  }

  // Picture
  if (obj["p:pic"]) {
    const pics = Array.isArray(obj["p:pic"])
      ? obj["p:pic"]
      : [obj["p:pic"]];

    pics.forEach(() => {
      objects.push({
        slide,
        type: "Picture",
        text: "",
      });
    });
  }

  // Graphic Frame (Chart/Table/SmartArt)
  if (obj["p:graphicFrame"]) {
    const frames = Array.isArray(obj["p:graphicFrame"])
      ? obj["p:graphicFrame"]
      : [obj["p:graphicFrame"]];

    frames.forEach(() => {
      objects.push({
        slide,
        type: "GraphicFrame",
        text: "",
      });
    });
  }

  Object.values(obj).forEach((value) => {
    walk(value, objects, slide);
  });
}

export function extractObjects(slides: SlideData[]) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const result: SlideObject[] = [];

  slides.forEach((slide) => {
    const xml = parser.parse(slide.xml);

    walk(xml, result, slide.number);
  });

  console.log("");
  console.log("========== OBJECTS ==========");

  console.table(
    result.map((o) => ({
      Slide: o.slide,
      Type: o.type,
      Text: o.text.substring(0, 40),
    }))
  );

  return result;
}