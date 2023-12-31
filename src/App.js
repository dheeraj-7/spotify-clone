import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import { getTokenFromUrl } from "./Components/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player";
import { useDataLayerValue } from "./Components/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [{}, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        console.log("User:", user);
      });
    }
  }, []);

  return (
    <div className="App">
      {token ? (
        <Player />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
