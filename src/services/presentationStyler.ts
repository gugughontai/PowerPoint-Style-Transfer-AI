import type { SlideData } from "./slideExtractor";
import type { SlideStyleMap } from "./styleMapper";

export interface StyledSlide {
  number: number;
  xml: string;
}

export function stylePresentation(
  rawSlides: SlideData[],
  styleMap: SlideStyleMap[]
): StyledSlide[] {
  console.log("");
  console.log("========== STYLE TRANSFER ==========");

  const output: StyledSlide[] = [];

  const count = Math.min(rawSlides.length, styleMap.length);

  for (let i = 0; i < count; i++) {
    const raw = rawSlides[i];
    const ref = styleMap[i];

    const xml = raw.xml;

    console.log(
      `Slide ${raw.number} ← Reference ${ref.slide}`
    );

    if (ref.shapes.length > 0) {
      console.log(
        `Reference contains ${ref.shapes.length} shapes`
      );
    }

    output.push({
      number: raw.number,
      xml,
    });
  }

  console.log("");

  console.table({
    StyledSlides: output.length,
  });

  return output;
}