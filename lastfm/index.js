const puppeteer = require('puppeteer');
const fs = require('fs');
const site = require('./site');

(async () => {

	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	
	//TODO: Scrape this or provide through config. My current page count is 176 but I don't want albums with low amount of plays.
	const totalPages = 20;

	let currPage = 1;
	let allData = [];
	do
	{
			await page.goto('https://www.last.fm/user/HugePackage/library/albums?date_preset=ALL&page=' + currPage);
			const result = await page.evaluate((funcString) => {
				const func = new Function(`return ${funcString}.apply(null, arguments)`)
				return func();
			}, site.crawl);

			allData = allData.concat(result);
			currPage++;

			// Use a delay to make it appear more like normal user behaviour
			await delay(2000);

	} while(currPage <= totalPages);

	const json = JSON.stringify(allData);
	fs.writeFile('albums.json', json, 'utf8', () => browser.close());
})();

function delay(delay) {
	return new Promise(res => setTimeout(res, delay));
}
