import React from 'react';
import { useRef } from 'react';

type UserInfo = {
  display_name: string;
  email: string;
  // Add more fields as needed
};

const SPOTIFY_CLIENT_ID = '814a69d9aa614d8dae0ac2a85c66c93c';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email&response_type=code`;
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

function App() {
  const accessTokenRef = useRef(null);

  const handleLogin = () => {
    // Redirect the user to Spotify login page
    window.location.href = SPOTIFY_AUTH_URL;
  };

  const handleFetchUserInfo = () => {
    if (!accessTokenRef.current) {
      alert('You need to log in first.');
      return;
    }

    // Fetch basic user information from the Spotify API
    fetch(`${SPOTIFY_API_BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User Info:', data);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  };

  // Handle the callback URL to extract the access token
  const queryParams = new URLSearchParams(window.location.search);
  const authorizationCode = queryParams.get('code');

  if (authorizationCode) {
    // Store the access token
    // Note: In a production app, handle token storage securely, not in a ref
    accessTokenRef.current = 'your_access_token_here';
  }

  return (
    <div>
      <h1>Your React Spotify App</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
      <button onClick={handleFetchUserInfo}>Fetch User Info</button>
    </div>
  );
}

export default App;