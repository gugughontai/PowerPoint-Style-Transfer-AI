import { useState } from "react";
import "./App.css";

import UploadCard from "./components/UploadCard";

import { extractStyle } from "./services/styleExtractor";
import { generatePresentation } from "./services/pptGenerator";

function App() {
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  return (
    <div className="app">
      <header className="header">
        <h1>PowerPoint Style Transfer AI</h1>
        <p>
          Transform any presentation into a professional presentation.
        </p>
      </header>

      <main className="container">
        <UploadCard
          title="📂 Raw Presentation"
          buttonText="Upload Raw PPTX"
          onFileSelected={(file) => {
            setRawFile(file);
          }}
        />

        <UploadCard
          title="🎨 Reference Presentation"
          buttonText="Upload Professional PPTX"
          onFileSelected={(file) => {
            setReferenceFile(file);
            extractStyle(file);
          }}
        />

        <div className="card">
          <h2>⚡ Generate</h2>

          <button
            disabled={!rawFile || !referenceFile}
            onClick={() => {
              if (!rawFile || !referenceFile) return;

              generatePresentation(rawFile, referenceFile);
            }}
          >
            Generate Professional PPT
          </button>

          <div
            style={{
              marginTop: 20,
              color: "#666",
              fontSize: 14,
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {rawFile && referenceFile
              ? "Ready to generate."
              : "Waiting for both PowerPoint files..."}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;