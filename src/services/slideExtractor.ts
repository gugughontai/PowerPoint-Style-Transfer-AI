import JSZip from "jszip";

export interface SlideData {
  number: number;
  xml: string;
}

export async function extractSlides(file: File): Promise<SlideData[]> {
  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  const slideFiles = Object.keys(zip.files)
    .filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/\d+/)?.[0] || "0");
      const nb = parseInt(b.match(/\d+/)?.[0] || "0");
      return na - nb;
    });

  const slides: SlideData[] = [];

  for (const fileName of slideFiles) {
    const xml = await zip.file(fileName)!.async("text");

    slides.push({
      number: slides.length + 1,
      xml,
    });
  }

  console.clear();

  console.log("================================");
  console.log("SLIDE EXTRACTION");
  console.log("================================");

  console.log("Slides Extracted:", slides.length);

  console.table(
    slides.map((s) => ({
      Slide: s.number,
      Characters: s.xml.length,
    }))
  );

  return slides;
}