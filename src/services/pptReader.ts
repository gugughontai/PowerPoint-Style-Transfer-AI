import JSZip from "jszip";

export async function readPowerPoint(file: File) {
  console.clear();

  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  const theme = await zip.file("ppt/theme/theme1.xml")?.async("text") ?? "";
  const master = await zip.file("ppt/slideMasters/slideMaster1.xml")?.async("text") ?? "";

  const slides = Object.keys(zip.files)
    .filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
    .sort();

  console.log("=================================");
  console.log("POWERPOINT STYLE SUMMARY");
  console.log("=================================");

  console.log("Slides:", slides.length);

  console.log("");

  console.log("Theme contains Office Theme:",
    theme.includes("Office Theme"));

  console.log("Contains Font Scheme:",
    theme.includes("fontScheme"));

  console.log("Contains Color Scheme:",
    theme.includes("clrScheme"));

  console.log("Contains Format Scheme:",
    theme.includes("fmtScheme"));

  console.log("");

  console.log("Slide Master Size:",
    master.length);

  console.log("");

  slides.forEach((slide, i) => {
    console.log(`Slide ${i + 1}: ${slide}`);
  });
}