"use strict";

const morgan = require("morgan");

const express = require("express");

const { top50 } = require("./data/top50");

const home = (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50,
  });
};

const handlePopularArtist = (req, res) => {
  let newArtistArray = [];
  for (let i = 0; i < top50.length; i++) {
    // console.log(top50[i].artist);
    newArtistArray.push(top50[i].artist);
  }
  function mode(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }
  const popularArtist = mode(newArtistArray);
  console.log(popularArtist); // returns the element popular artist.
  let popularArtistSongs = top50.filter(
    (song) => song.artist === popularArtist
  );
  res.render("partials/popularArtist", {
    title: "Top Artist",
    songs: popularArtistSongs,
  });
};

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here

app.get("/top50", home);

app.get("/top50/popular-artist", handlePopularArtist);

app.get("/top50/:song");

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
