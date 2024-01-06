import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import { getTokenFromUrl } from "./Components/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player";
import { useDataLayerValue } from "./Components/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // Setting Token
    const hash = getTokenFromUrl();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then((user) => {

        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists) =>{
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist('37i9dQZEVXcJZyENOWUFo7').then((response) =>{
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    });

    spotify.getMyTopArtists().then((response) =>{
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: response,
      })
    });

    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    })

    dispatch({
      type: "SET_PLAYING",
      playing: false,
    })
    }
    console.log("I Have a Token:", token);
  }, [token, dispatch]);

  // console.log("User:", user);
  // console.log("My Token:", token);

  return (
    <div className="App">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
