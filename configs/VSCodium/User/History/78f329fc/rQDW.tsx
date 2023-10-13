import React from 'react';
import { useState, useEffect } from 'react';

type UserInfo = {
  display_name: string;
  email: string;
  // Add more fields as needed
};

const SPOTIFY_CLIENT_ID = '814a69d9aa614d8dae0ac2a85c66c93c';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email&response_type=code`;

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Function to fetch user info from Spotify
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Handle user info retrieval on component load
  useEffect(() => {
    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken]);

  const handleLogin = () => {
    // Redirect the user to Spotify login page
    window.location.href = SPOTIFY_AUTH_URL;
  };

  return (
    <div>
      <h1>Your React Spotify App</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
      {accessToken && (
        <div>
          <button onClick={fetchUserInfo}>Get User Info</button>
          {userInfo && (
            <div>
              <h2>User Info</h2>
              <p>Display Name: {userInfo.display_name}</p>
              <p>Email: {userInfo.email}</p>
              {/* Add more user info fields as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;