import PptxGenJS from "pptxgenjs";

export async function writePresentation() {
  console.clear();

  console.log("====================================");
  console.log("POWERPOINT WRITER");
  console.log("====================================");

  const pptx = new PptxGenJS();

  pptx.layout = "LAYOUT_WIDE";

  pptx.author = "PowerPoint Style Transfer AI";

  pptx.company = "OpenAI";

  pptx.subject = "Generated Presentation";

  pptx.title = "Professional Presentation";

  const slide = pptx.addSlide();

  slide.background = {
    color: "FFFFFF",
  };

  slide.addText("PowerPoint Style Transfer AI", {
    x: 0.6,
    y: 0.5,
    w: 11,
    h: 0.6,

    fontFace: "Calibri",

    fontSize: 26,

    bold: true,

    color: "2F5597",

    align: "center",
  });

  slide.addText("Your first generated PowerPoint!", {
    x: 0.8,
    y: 1.4,
    w: 10.5,
    h: 0.5,

    fontFace: "Calibri",

    fontSize: 18,

    color: "444444",

    align: "center",
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 2,
    y: 2.4,
    w: 9,
    h: 2.2,

    fill: {
      color: "E8F2FF",
    },

    line: {
      color: "2F5597",
      pt: 1,
    },

  });

  slide.addText(
    "Congratulations!\n\nThe PowerPoint generator is now creating real PPTX files.\n\nNext we will replace this content with the slides from your uploaded presentation.",
    {
      x: 2.3,
      y: 2.7,
      w: 8.4,
      h: 1.7,

      fontFace: "Calibri",

      fontSize: 20,

      color: "333333",

      align: "center",

    }
  );

  await pptx.writeFile({
    fileName: "Generated Presentation.pptx",
  });

  console.log("");

  console.log("Presentation created successfully.");
}