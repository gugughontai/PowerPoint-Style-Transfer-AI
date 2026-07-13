import PptxGenJS from "pptxgenjs";
import { extractSlides } from "./slideExtractor";
import { extractSlideText } from "./textExtractor";
import { extractImages } from "./imageExtractor";

export async function clonePresentation(rawFile: File) {
  console.log("Step 1");

  const slides = await extractSlides(rawFile);

  console.log("Step 2");

  const slideText = extractSlideText(slides);

  const slideImages = extractImages(slides);

  console.log("");
  console.log("Images Found:");

  console.table(
    slideImages.map((s) => ({
      Slide: s.slide,
      Images: s.images.length,
    }))
  );

  console.log("Step 3");

  const pptx = new PptxGenJS();

  console.log("Step 4");

  pptx.layout = "LAYOUT_WIDE";

  slideText.forEach((slideInfo) => {
    console.log("Creating slide", slideInfo.slide);

    const slide = pptx.addSlide();

    slide.addText(`Slide ${slideInfo.slide}`, {
      x: 0.5,
      y: 0.5,
      w: 12,
      h: 0.4,
      fontSize: 24,
    });

    let y = 1.1;

    slideInfo.texts.forEach((item) => {
      if (!item.text.trim()) return;

      slide.addText(item.text, {
        x: 0.6,
        y,
        w: 11,
        h: 0.3,
        fontSize: 18,
      });

      y += 0.3;
    });
  });

  console.log("Step 5");

  await pptx.writeFile({
    fileName: "Cloned Presentation.pptx",
  });

  console.log("Step 6");
}