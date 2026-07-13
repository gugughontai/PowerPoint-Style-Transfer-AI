import JSZip from "jszip";

export async function mergePackages(
  rawZip: JSZip,
  referenceZip: JSZip
) {
  console.clear();

  console.log("======================================");
  console.log("POWERPOINT PACKAGE MERGER");
  console.log("======================================");

  const foldersToReplace = [
    "ppt/theme/",
    "ppt/slideMasters/",
    "ppt/slideLayouts/",
  ];

  foldersToReplace.forEach((folder) => {
    console.log("");
    console.log("Processing:", folder);

    Object.keys(referenceZip.files).forEach((file) => {
      if (!file.startsWith(folder)) return;

      const refFile = referenceZip.file(file);

      if (!refFile) return;

      rawZip.file(file, refFile.async("uint8array"));
    });
  });

  console.log("");
  console.log("Package merge finished.");

  return rawZip;
}