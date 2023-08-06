import { PlaywrightCrawler, Dataset, Log } from 'crawlee';
import fs from 'fs';
import { MyLog } from './myLog.js';
import { Sequelize, DataTypes } from 'sequelize';
import { Database } from './database.js';
export class lidlCrawl {
      
    /**
     https://www.lidl.de/q/brand/topmove/b1774?sort=discountPercentage-desc&idsOnly=false&productsOnly=false

     */
    constructor() {
        Dataset.open();
     }

    async crawl1() {
        //this.log2File("startss \n");
        
        const url1 = "http://static.lemyde.com/other/lidl_sale.html";
        const url = "https://www-lidl-de.translate.goog/q/query/supersale?sort=deliveryStartDate-desc&idsOnly=false&productsOnly=false&_x_tr_sl=auto&_x_tr_tl=vi&_x_tr_hl=vi&_x_tr_pto=wapp&_x_tr_hist=true"
        const url0="https://www.lidl.de/q/query/supersale?sort=deliveryStartDate-desc&idsOnly=false&productsOnly=true";
        const crawler = new PlaywrightCrawler({
            // Use the requestHandler to process each of the crawled pages.
            async requestHandler({ request, page, enqueueLinks, log }) {
                //     const html = await page.content();
                //    const log2= new MyLog();
                //    await log2.logTest(html);
                //const test = await page.locator('//li[id="product_0"]'); 


                const listProduct = await page.locator('li.s-grid__item');
                const countList= await listProduct.count();
                if (countList == 0) {
                    return;
                }
                log.info(`test nao ${countList}`);
                MyLog.appenLog(`\ncountList=${countList}`);

                const lengthList = await listProduct.count();

                for (let index = 0; index < 5; index++) {
                    const element = await listProduct.nth(index);
                    const html1 = await element.innerHTML();
                    const img0 = await element.locator('img').first().getAttribute('src'); //
                    const title = await element.locator('[data-qa-label="product-grid-box-title"]').innerText();
                   
                    const discount0 = await element.locator('[data-qa-label="product-price-discount"]');
                    let discount= '0';
                    if(discount0.count>0) discount= discount0.first().textContent();
                   
                    const price = await element.locator('.m-price__price').textContent();
                    let link =  await element.locator('.grid-box__pdp-link').first().getAttribute('href');
                    if (!link.includes("http")) link ='https://www.lidl.de/'+link;
                    log.info(`img ${'https://www.lidl.de/'+discount}`);

                    const result= {
                        
                        img:img0,
                        title:title,
                        discount:discount,
                        price:price,
                        url:link
                    }
                    result.price = result.price.trim();

                    MyLog.appenLog(`\n title=${title}`);

                    new Database().save(result);
                   

                }


            },

        });

        
        const urls = ['https://www.google.com/search?q=nodejs+current+folder&oq=nodejs+current+folder&aqs=chrome..69i57j0i19i22i30l6.4110j0j7&sourceid=chrome&ie=UTF-8'];
        await crawler.run(["google.com"]);

        




    }




}


