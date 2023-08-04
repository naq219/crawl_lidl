import { PlaywrightCrawler, Dataset, Log } from 'crawlee';
import fs from 'fs';
import { MyLog } from './myLog.js';
export class lidlCrawl {

   
    constructor() { }
    
    async crawl1() {
        //this.log2File("startss \n");
        const url2 = "";
        const url1 = "http://static.lemyde.com/other/lidl_sale.html";
        const url = "https://www-lidl-de.translate.goog/q/query/supersale?sort=deliveryStartDate-desc&idsOnly=false&productsOnly=false&_x_tr_sl=auto&_x_tr_tl=vi&_x_tr_hl=vi&_x_tr_pto=wapp&_x_tr_hist=true"
        const crawler = new PlaywrightCrawler({
            // Use the requestHandler to process each of the crawled pages.
            async requestHandler({ request, page, enqueueLinks, log }) {
                //     const html = await page.content();
                //    const log2= new MyLog();
                //    await log2.logTest(html);
                //const test = await page.locator('//li[id="product_0"]'); 

                const listProduct = await page.locator('li.s-grid__item');
                if (listProduct.count == 0) {
                    return;
                }
                log.info(`test nao ${await listProduct.count()}`);
                const lengthList = await listProduct.count();

                for (let index = 0; index < 10; index++) {
                    const element = await listProduct.nth(index);
                    const html1= await element.innerHTML();
                    const img0 = await element.locator('img').first().getAttribute('src'); //
                    const title = await element.locator('[data-qa-label="product-grid-box-title"]').innerText();
                   try {
                    
                    
                        const discount0 = await element.locator('[data-qa-label="product-price-discount"]');
                        let discount = '';
                        if(discount0.textContent()) discount= await discount0.innerHTML();
                        log.info('==='+discount);
                     
                   } catch (error) {
                    log.error('loii discorunt'+ await element.innerHTML());
                   }

                   

                    const price = await element.locator('.m-price__price').textContent();
                    const link =  await element.locator('.grid-box__pdp-link').first().getAttribute('href');

                    //log.info(`img ${'https://www.lidl.de/'+link}`);
                }


            },

        });

        await crawler.run([url]);




    }


    async isSelectorExists(_page,selector) {
        return await this._page.$(selector).catch(() => null) !== null;
      }



}


