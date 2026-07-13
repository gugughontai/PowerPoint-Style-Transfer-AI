import { useRef, useState } from "react";

interface UploadCardProps {
  title: string;
  buttonText: string;
  onFileSelected?: (file: File) => void;
}

export default function UploadCard({
  title,
  buttonText,
  onFileSelected,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  function handleFile(file: File) {
    setFileName(file.name);

    if (onFileSelected) {
      onFileSelected(file);
    }
  }

  return (
    <div className="card">
      <h2>{title}</h2>

      <input
        ref={inputRef}
        type="file"
        accept=".pptx"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.length) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      <button onClick={() => inputRef.current?.click()}>
        {buttonText}
      </button>

      {fileName && (
        <div
          style={{
            marginTop: 20,
            background: "#e8f7ef",
            padding: 12,
            borderRadius: 10,
            textAlign: "center",
            color: "#155724",
            fontWeight: 600,
          }}
        >
          ✓ {fileName}
        </div>
      )}
    </div>
  );
}