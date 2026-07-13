import { extractSlides } from "./slideExtractor";
import { buildStyleMap } from "./styleMapper";
import { buildTransferPlan } from "./styleTransferEngine";
import { stylePresentation } from "./presentationStyler";
import { copyPresentation } from "./pptCopier";
import { savePackage } from "./packageWriter";
import { extractShapeStyles } from "./shapeStyleExtractor";

export async function generatePresentation(
  rawFile: File,
  referenceFile: File
) {
  console.clear();

  console.log("======================================");
  console.log("POWERPOINT STYLE TRANSFER AI");
  console.log("======================================");

  console.log("");
  console.log("Reading RAW presentation...");
  const rawSlides = await extractSlides(rawFile);

  console.log("");
  console.log("Reading REFERENCE presentation...");
  const referenceSlides = await extractSlides(referenceFile);

  console.log("");
  console.log("Extracting REFERENCE shape styles...");
  const shapeStyles = extractShapeStyles(referenceSlides);

  console.log("");
  console.log("Building style map...");
  const styleMap = buildStyleMap(referenceSlides);

  console.log("");
  console.log("Building transfer plan...");
  const transferPlan = buildTransferPlan(
    rawSlides,
    styleMap
  );

  console.log("");
  console.log("Applying styles...");
  const styledSlides = stylePresentation(
    rawSlides,
    styleMap
  );

  console.log("");
  console.log("Loading PowerPoint package...");
  const zip = await copyPresentation(
    rawFile,
    referenceFile
  );

  console.log("");
  console.log("Saving styled presentation...");
  await savePackage(
    zip,
    styledSlides
  );

  console.log("");

  console.table({
    RawSlides: rawSlides.length,
    ReferenceSlides: referenceSlides.length,
    ShapeTemplates: shapeStyles.length,
    StyleTemplates: styleMap.length,
    PlannedTransfers: transferPlan.length,
    StyledSlides: styledSlides.length,
  });

  console.log("");
  console.log("======================================");
  console.log("STYLE TRANSFER COMPLETED");
  console.log("======================================");
}