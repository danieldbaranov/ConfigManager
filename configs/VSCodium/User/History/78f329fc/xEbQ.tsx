import React from 'react';
import { useRef } from 'react';

const SPOTIFY_CLIENT_ID = '814a69d9aa614d8dae0ac2a85c66c93c';
const SPOTIFY_CLIENT_SECRET = '57d4e4e4064e434c886ffddec7fed8a3';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email&response_type=code`;
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

function App() {
  const accessTokenRef = useRef<string | null>(null);

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

  // Handle the callback URL to extract the authorization code
  const queryParams = new URLSearchParams(window.location.search);
  const authorizationCode = queryParams.get('code');

  if (authorizationCode) {
    // Use the authorization code to obtain the access token from Spotify
    const tokenRequestBody = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: REDIRECT_URI,
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    });

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: tokenRequestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const accessToken = data.access_token;
        accessTokenRef.current = accessToken; // Store the access token
      })
      .catch((error) => {
        console.error('Error getting access token:', error);
      });
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