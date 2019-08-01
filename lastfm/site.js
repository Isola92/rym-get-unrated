
/**
 * Executed in the site window. 
 * Exported as string since you can't pass function through page.evaluate
 * Example: https://rateyourmusic.com/collection/Isola92/recent/
 */
 function crawl() {

	// table row that contains both artist and album info
	const parent = '.chartlist-row--with-artist';

	// class for table cell elements that contains anchor artist name
	const artist = '.chartlist-artist a';

	// class for table cell elements that contains anchor with album name
	const album = '.chartlist-name a';

	// fetch all the parent divs on the current page and convert from node list to array
	const parents = Array.from(document.querySelectorAll(parent));

	// iterate over the parent divs and store the album info in each
	const data = parents.map((curr) => {
		return {
			artist: curr.querySelector(artist).innerText,
			album: curr.querySelector(album).innerText
		}
	});

	return data;
}

module.exports.crawl = crawl.toString();

