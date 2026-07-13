import JSZip from "jszip";
import type { StyledSlide } from "./presentationStyler";

export async function savePackage(
  zip: JSZip,
  styledSlides: StyledSlide[]
) {
  console.log("");
  console.log("========== WRITING POWERPOINT ==========");

  for (const slide of styledSlides) {
    const fileName = `ppt/slides/slide${slide.number}.xml`;

    console.log("Updating", fileName);

    zip.file(fileName, slide.xml);
  }

  console.log("");
  console.log("Generating PPTX...");

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "Styled Presentation.pptx";

  document.body.appendChild(a);

  a.click();

  a.remove();

  URL.revokeObjectURL(url);

  console.log("");
  console.log("Presentation saved successfully.");
}