import { inspectStyles, type ObjectStyle } from "./styleInspector";
import {
  extractShapeStyles,
  type ShapeStyle,
} from "./shapeStyleExtractor";

import type { SlideData } from "./slideExtractor";

export interface SlideStyleMap {
  slide: number;
  title?: ObjectStyle;
  body: ObjectStyle[];
  shapes: ShapeStyle[];
}

export function buildStyleMap(
  slides: SlideData[]
): SlideStyleMap[] {
  const textStyles = inspectStyles(slides);

  const shapeStyles = extractShapeStyles(slides);

  const maps: SlideStyleMap[] = [];

  slides.forEach((slide) => {
    const slideTexts = textStyles.filter(
      (x) => x.slide === slide.number
    );

    const slideShapes = shapeStyles.filter(
      (x) => x.slide === slide.number
    );

    const title =
      slideTexts.length === 0
        ? undefined
        : [...slideTexts].sort(
            (a, b) =>
              Number(b.fontSize) -
              Number(a.fontSize)
          )[0];

    maps.push({
      slide: slide.number,
      title,
      body: slideTexts.filter(
        (x) => x !== title
      ),
      shapes: slideShapes,
    });
  });

  console.log("");
  console.log(
    "========== STYLE MAP =========="
  );

  console.table(
    maps.map((m) => ({
      Slide: m.slide,
      Shapes: m.shapes.length,
      Body: m.body.length,
      Title:
        m.title?.text.substring(0, 30) ?? "",
    }))
  );

  return maps;
}