import React from 'react';

const SPOTIFY_CLIENT_ID = 'your_client_id';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email&response_type=code`;

function App() {
  const handleLogin = () => {
    // Redirect the user to Spotify login page
    window.location.href = SPOTIFY_AUTH_URL;
  };

  return (
    <div>
      <h1>Your React Spotify App</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}

export default App;