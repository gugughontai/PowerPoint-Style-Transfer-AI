import { XMLParser } from "fast-xml-parser";
import type { SlideData } from "./slideExtractor";

export interface ImageInfo {
  relationshipId: string;
}

export interface SlideImages {
  slide: number;
  images: ImageInfo[];
}

export function extractImages(slides: SlideData[]): SlideImages[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const result: SlideImages[] = [];

  slides.forEach((slide) => {
    const xml = parser.parse(slide.xml);

    const images: ImageInfo[] = [];

    findImages(xml, images);

    result.push({
      slide: slide.number,
      images,
    });
  });

  console.log("");
  console.log("========== IMAGES ==========");

  result.forEach((slide) => {
    console.log("");

    console.log(
      `Slide ${slide.slide}: ${slide.images.length} image(s)`
    );
  });

  return result;
}

function findImages(
  node: unknown,
  output: ImageInfo[]
) {
  if (!node) return;

  if (Array.isArray(node)) {
    node.forEach((n) => findImages(n, output));
    return;
  }

  if (typeof node !== "object") return;

  const obj = node as Record<string, unknown>;

  if (obj["a:blip"]) {
    const blip = obj["a:blip"] as Record<string, unknown>;

    if (typeof blip["r:embed"] === "string") {
      output.push({
        relationshipId: blip["r:embed"] as string,
      });
    }
  }

  Object.values(obj).forEach((value) =>
    findImages(value, output)
  );
}