import type { SlideStyleMap } from "./styleMapper";
import type { SlideData } from "./slideExtractor";

export interface TransferResult {
  rawSlide: number;
  referenceSlide: number;
  titleStyleApplied: boolean;
  bodyStylesApplied: number;
  shapeStylesApplied: number;
}

export function buildTransferPlan(
  rawSlides: SlideData[],
  referenceMap: SlideStyleMap[]
): TransferResult[] {
  const plan: TransferResult[] = [];

  const count = Math.min(
    rawSlides.length,
    referenceMap.length
  );

  for (let i = 0; i < count; i++) {
    const reference = referenceMap[i];

    plan.push({
      rawSlide: rawSlides[i].number,
      referenceSlide: reference.slide,
      titleStyleApplied: reference.title !== undefined,
      bodyStylesApplied: reference.body.length,
      shapeStylesApplied: reference.shapes.length,
    });
  }

  console.log("");
  console.log("========== TRANSFER PLAN ==========");

  console.table(
    plan.map((p) => ({
      Raw: p.rawSlide,
      Reference: p.referenceSlide,
      Title: p.titleStyleApplied,
      Body: p.bodyStylesApplied,
      Shapes: p.shapeStylesApplied,
    }))
  );

  return plan;
}