const puppeteer = require('puppeteer');
const fs = require('fs');
const site = require('./site');

(async () => {
	console.log(site.crawl);
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	
	//TODO: Scrape this. My current page count is 18.
	const totalPages = 18;

	let currPage = 1;
	let allData = [];
	do
	{
			await page.goto('https://rateyourmusic.com/collection/Isola92/recent/' + currPage);
			const result = await page.evaluate((funcString) => {
				const func = new Function(`return ${funcString}.apply(null, arguments)`)
				return func();
			}, site.crawl);

			allData = allData.concat(result);
			currPage++;

			await delay(2000);

	} while(currPage <= totalPages);

	const json = JSON.stringify(allData);
	fs.writeFile('albums.json', json, 'utf8', () => browser.close());
})();

function delay(delay) {
	return new Promise(res => setTimeout(res, delay));
}
