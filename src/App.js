import { useState } from 'react';
import logo from './dsm_firmenich_Logo.jpg';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

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
      const response = await fetch(`${API_URL}/api/generate-video`, {
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
  <div style={{ marginTop: '20px' }}>
    <video src={videoUrl} controls style={{ width: '640px' }} />
    <button
      onClick={async () => {
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        a.remove();
      }}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
      }}
    >
      Download Video
    </button>
  </div>
  )}

    </div>
  );
}

export default App;