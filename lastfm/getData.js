function getTopAlbumRequestOption(user, key, albums)
{
	// 50 is the default limit per page and you fetch one page with each request.
	const requests = albums % 50;

	return {
		host: "ws.audioscrobbler.com",
		port: 80,
		path: "/2.0/?method=user.gettopalbums&user=" + user + "&api_key=" + key + "&page=1&format=json"
	};
};

function makeAlbumRequest(user, key, callback)
{
	http.request(getTopAlbumRequestOption(user, key, 500), callback).end();
};