
/**
 * Executed in the site window. 
 * Exported as string since you can't pass function through page.evaluate
 * Example: https://rateyourmusic.com/collection/Isola92/recent/
 */
function crawl() {

	// div that contains both artist and album info
	const parent = '.or_q_albumartist';

	// class for anchor elements that contains artist name
	const artist = '.artist';

	// class for anchor elements that contains album name
	const album = '.album';

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
