import { useState } from 'react';
import logo from './dsm_firmenich_Logo.jpg';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateVideo = async () => {
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      setVideoUrl(data.videoUrl);
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Failed to generate video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: '250px', marginBottom: '30px' }}
      />
      <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>Welcome to my app</h1>

      {/* Input for prompt */}
      <input
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />

      {/* Button to generate video */}
      <button
        onClick={handleGenerateVideo}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        {loading ? 'Generating...' : 'Generate Video'}
      </button>

      {/* Show video if available */}
      {videoUrl && (
        <video
          src={videoUrl}
          controls
          style={{ width: '640px', marginTop: '20px' }}
        />
      )}
    </div>
  );
}

export default App;