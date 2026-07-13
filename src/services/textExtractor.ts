import { XMLParser } from "fast-xml-parser";
import type { SlideData } from "./slideExtractor";

export interface TextItem {
  text: string;
}

function findText(node: unknown, output: TextItem[]): void {
  if (node == null) return;

  if (Array.isArray(node)) {
    node.forEach((item) => findText(item, output));
    return;
  }

  if (typeof node !== "object") return;

  const obj = node as Record<string, unknown>;

  const textNode = obj["a:t"];

  if (typeof textNode === "string") {
    output.push({
      text: textNode,
    });
  } else if (Array.isArray(textNode)) {
    textNode.forEach((item) => {
      if (typeof item === "string") {
        output.push({
          text: item,
        });
      }
    });
  }

  Object.values(obj).forEach((value) => {
    findText(value, output);
  });
}

export function extractSlideText(slides: SlideData[]) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const result = slides.map((slide) => {
    const xml = parser.parse(slide.xml);

    const texts: TextItem[] = [];

    findText(xml, texts);

    return {
      slide: slide.number,
      texts,
    };
  });

  console.log("");
  console.log("========== SLIDE TEXT ==========");

  result.forEach((slide) => {
    console.log("");
    console.log(`Slide ${slide.slide}`);

    slide.texts.forEach((item) => {
      console.log("•", item.text);
    });
  });

  return result;
}