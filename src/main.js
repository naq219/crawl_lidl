// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, Dataset } from 'crawlee';
import fs from 'fs';
import { lidlCrawl } from './LidlCrawl.js';
import Slimbot from 'slimbot';
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
 await crawlerLidl.crawl1();


// const url= await Notifi.shortenLink("https://www.google.com/search?q=api.telegram.org%2Fbot+sendPhoto&sxsrf=AB5stBjC8P4Q8jrzwLIGD2o-gPSH7SyFyg%3A1691138854714&ei=JrvMZPGZK8-32roPzI-GgAo&ved=0ahUKEwjxxM2Vz8KAAxXPm1YBHcyHAaAQ4dUDCA8&uact=5&oq=api.telegram.org%2Fbot+sendPhoto&gs_lp=Egxnd3Mtd2l6LXNlcnAiHmFwaS50ZWxlZ3JhbS5vcmcvYm90IHNlbmRQaG90bzIGEAAYBRgeSPctUPwEWKQscAF4AZABAJgBvAGgAbQPqgEEMC4xMrgBA8gBAPgBAcICChAAGEcY1gQYsAPCAgQQIxgn4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp");

// console.log(url);





function log2File(content){

    fs.writeFile('test.html', content, err => {
    if (err) {
        console.error(err);
    }
    
    });
}