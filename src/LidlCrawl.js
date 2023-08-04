import { PlaywrightCrawler, Dataset, Log } from 'crawlee';
import fs from 'fs';
import { MyLog } from './myLog.js';
import { Sequelize, DataTypes } from 'sequelize';
import { Database } from './database.js';
export class lidlCrawl {


    constructor() {
        Dataset.open();
     }

    async crawl1() {
        //this.log2File("startss \n");
        const url2 = "";
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
                if (listProduct.count == 0) {
                    return;
                }
                log.info(`test nao ${await listProduct.count()}`);
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

                    //Dataset.pushData(result);
                    new Database().save(result);
                   

                }


            },

        });

        

        await crawler.run([url0]);



       
        const abc ={
            "id": 1,
            "img": "https://www.lidl.de/assets/gcp43f6c4751a324313b51299d2e2458dd9.jpeg",
            "title": "Kleinkinder/Kinder Mädchen T-Shirt, 2 Stück, aus reiner Baumwolle",
            "discount": "0",
            "price": "\n                    6.99\n                ",
            "url": "https://www.lidl.de//p/kleinkinder-kinder-maedchen-t-shirt-2-stueck-aus-reiner-baumwolle/p100351636#searchTrackingMasterId=Product.100351636&searchTrackingTitle=Kleinkinder%252FKinder%2BM%25C3%25A4dchen%2BT-Shirt%252C%2B2%2BSt%25C3%25BCck%252C%2Baus%2Breiner%2BBaumwolle&searchTrackingPageSize=24&searchTrackingPage=1&searchTrackingEvent=click&searchTrackingId=Product.100351636&searchTrackingOrigPos=1&searchTrackingPos=1&searchTrackingOrigPageSize=24&searchTrackingChannel=DE&list=search"
        }
        //new Database().save(abc);



    }




}


