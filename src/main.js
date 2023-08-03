// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, Dataset } from 'crawlee';
import fs from 'fs';
import { lidlCrawl } from './LidlCrawl.js';
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

// Add first URL to the queue and start the crawl.
//await crawler.run(['https://www-lidl-de.translate.goog/q/query/supersale?sort=deliveryStartDate-desc&idsOnly=false&productsOnly=false&_x_tr_sl=auto&_x_tr_tl=vi&_x_tr_hl=vi&_x_tr_pto=wapp&_x_tr_hist=true']);
 //await crawler.run(['https://naq219.w3spaces.com/clickme.html']);

const crawlerLidl = new lidlCrawl();
await crawlerLidl.crawl1();

function log2File(content){

    fs.writeFile('test.html', content, err => {
    if (err) {
        console.error(err);
    }
    
    });
}