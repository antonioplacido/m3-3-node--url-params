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

const displaySong = (req, res) => {
  const songID = req.params.rank;
  var nextValue = songID - -1; /// I DONT CARE, THIS WORKED, CONCATENATING SUCKS
  console.log(nextValue);
  const songNumberIndex = songID - 1;
  // console.log(songID);
  // console.log(songNumberIndex);

  //note to self, /pages is NOT the same as /partials.
  if (songID < 51 && songID > 0) {
    res.render("partials/lookupsong", {
      title: "Song #" + top50[songNumberIndex].rank,
      song: top50[songNumberIndex],
      rank: songID,
      nextButton: nextValue,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "Sucks to be you",
      path: req.originalUrl,
    });
  }
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
  //Top part used to calculate popular artist//

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

app.get("/top50/song/:rank", displaySong);

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
