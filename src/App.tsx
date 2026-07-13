import './App.css'

function App() {
  return (
    <div className="app">

      <header className="header">
        <h1>PowerPoint Style Transfer AI</h1>
        <p>Transform any presentation into a professional presentation.</p>
      </header>

      <main className="container">

        <div className="card">
          <h2>📂 Raw Presentation</h2>
          <button>Upload Raw PPTX</button>
        </div>

        <div className="card">
          <h2>🎨 Reference Presentation</h2>
          <button>Upload Professional PPTX</button>
        </div>

        <div className="card">
          <h2>⚡ Generate</h2>
          <button>Generate Professional PPT</button>
        </div>

      </main>

    </div>
  )
}

export default App