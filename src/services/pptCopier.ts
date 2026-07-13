import JSZip from "jszip";
import { analyzePackage } from "./packageAnalyzer";
import { mergePackages } from "./packageMerger";

export async function copyPresentation(
  rawFile: File,
  referenceFile: File
) {
  console.clear();

  console.log("====================================");
  console.log("POWERPOINT FILE COPIER");
  console.log("====================================");

  console.log("");
  console.log("Opening RAW presentation...");

  const rawBuffer = await rawFile.arrayBuffer();
  const rawZip = await JSZip.loadAsync(rawBuffer);

  console.log("");
  console.log("Opening REFERENCE presentation...");

  const referenceBuffer = await referenceFile.arrayBuffer();
  const referenceZip = await JSZip.loadAsync(referenceBuffer);

  console.log("");
  console.log("Analyzing RAW package...");

  await analyzePackage(rawZip);

  console.log("");
  console.log("Merging professional style...");

  const mergedZip = await mergePackages(
    rawZip,
    referenceZip
  );

  console.log("");
  console.log("Merge completed.");

  return mergedZip;
}