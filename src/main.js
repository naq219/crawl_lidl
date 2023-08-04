// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, Dataset } from 'crawlee';
import fs from 'fs';
import { lidlCrawl } from './LidlCrawl.js';

import { Notifi } from './notify.js';
// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, page, enqueueLinks, log }) {
        // await page.locator('#onetrust-accept-btn-handler').click();

        const html = await page.content();
        log.info(`content of ${request.loadedUrl} is '${html}'`);


    },



});



const crawlerLidl = new lidlCrawl();


// setInterval(async function () {
//     await crawlerLidl.crawl1();

// }, 2 * 60 * 1000);//run this thang every 2 seconds

// cron.schedule("2 * * * * *", function () {
//     console.log("---------------------");
//     console.log("running a task every 15 seconds");
     
//   });

crawlerLidl.crawl1();



function log2File(content) {

    fs.writeFile('test.html', content, err => {
        if (err) {
            console.error(err);
        }

    });
}