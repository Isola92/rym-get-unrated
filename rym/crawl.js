const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	
	//TODO: Scrape this. My current page count is 18.
	const totalPages = 1;

	let currPage = 1;
	let allData = [];
	do
	{
			await page.goto('https://rateyourmusic.com/collection/Isola92/recent/' + currPage);
			const result = await page.evaluate(() => {

				// div that contains both artist and album info
				const parent = '.or_q_albumartist';

				// class for anchor elements that contains artist name
				const artist = '.artist';

				// class for anchor elements that contains album name
				const album = '.album';

				// fetch all the parent divs on the current page and convert from node list to array
				const parents = Array.from(document.querySelectorAll(parent));

				// iterate over the parent divs and store the album info
				const data = parents.reduce( (acc, curr) =>
				{
						acc.push({
							artist: curr.querySelector(artist).innerText,
							album: curr.querySelector(album).innerText
						})

						return acc;
				}, []);
				
				return data;
			})

			allData = allData.concat(result);
			currPage++;

	} while(currPage <= totalPages);

	const json = JSON.stringify(allData);
	fs.writeFile('albums.json', json, 'utf8', () => browser.close());
})();

