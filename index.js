const fs = require('fs');
const lastfmData = require('./lastfm/albums.json');
const rymData = require('./rym/albums.json');

const unRatedAlbums = lastfmData.filter( (x) => {
	return typeof(rymData.find( (y) => isAlbum(x, y))) === "undefined"
});

function isAlbum(x, y)
{
	return y.artist.toLowerCase() === x.artist.toLowerCase() && (
		y.album.toLowerCase() === x.album.toLowerCase() ||
		y.album.toLowerCase().includes(x.album.toLowerCase()) ||
		x.album.toLowerCase().includes(y.album.toLowerCase())
	)
}

const json = JSON.stringify(unRatedAlbums);
fs.writeFile('unratedalbums.json', json, 'utf8');
