import React, { useState, useEffect } from 'react';

export default function FileUploader() {
  const [storedSongs, setStoredSongs] = useState([]);

  // Load saved songs from localStorage when the component mounts
  useEffect(() => {
    const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setStoredSongs(savedSongs);
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newSong = {
        title: file.name,
        src: URL.createObjectURL(file),
      };
      const updatedSongs = [...storedSongs, newSong];
      setStoredSongs(updatedSongs);
      localStorage.setItem('songs', JSON.stringify(updatedSongs)); // Update localStorage
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: '10px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h3>Manage Songs</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      />
      <p style={{ color: '#fff', marginTop: '10px' }}>Your files are saved in local storage.</p>

      <h4 style={{ marginTop: '20px' }}>Uploaded Songs</h4>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #444',
          borderRadius: '5px',
          padding: '10px',
          backgroundColor: '#333',
        }}
      >
        {storedSongs.map((song, index) => (
          <li key={index} style={{ marginBottom: '10px', color: '#fff' }}>
            <span style={{ display: 'block', fontWeight: 'bold' }}>{song.title}</span>
            <audio controls style={{ width: '100%' }}>
              <source src={song.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
