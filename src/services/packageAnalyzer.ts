import JSZip from "jszip";

export async function analyzePackage(zip: JSZip) {
  console.log("");
  console.log("========== PACKAGE ANALYSIS ==========");

  const files = Object.keys(zip.files);

  const groups = {
    slides: 0,
    slideRelationships: 0,
    slideLayouts: 0,
    slideMasters: 0,
    themes: 0,
    media: 0,
    charts: 0,
    embeddings: 0,
    notes: 0,
    relationships: 0,
    others: 0,
  };

  files.forEach((file) => {
    if (file.startsWith("ppt/slides/_rels/")) {
      groups.slideRelationships++;
    } else if (file.startsWith("ppt/slides/")) {
      groups.slides++;
    } else if (file.startsWith("ppt/slideLayouts/")) {
      groups.slideLayouts++;
    } else if (file.startsWith("ppt/slideMasters/")) {
      groups.slideMasters++;
    } else if (file.startsWith("ppt/theme/")) {
      groups.themes++;
    } else if (file.startsWith("ppt/media/")) {
      groups.media++;
    } else if (file.startsWith("ppt/charts/")) {
      groups.charts++;
    } else if (file.startsWith("ppt/embeddings/")) {
      groups.embeddings++;
    } else if (file.startsWith("ppt/notesSlides/")) {
      groups.notes++;
    } else if (file.endsWith(".rels")) {
      groups.relationships++;
    } else {
      groups.others++;
    }
  });

  console.log("");
  console.log("PowerPoint Package Summary");

  console.table(groups);

  console.log("");
  console.log("Total Files:", files.length);
}