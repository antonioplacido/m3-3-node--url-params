const { top50 } = require("../data/top50");

newArtistArray = [];
for (let i = 0; i < top50.length; i++) {
  // console.log(top50[i].artist)
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
console.log(popularArtist);

const displayPopArtistSongs(req, res){
    
}