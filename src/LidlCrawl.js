import { PlaywrightCrawler, Dataset } from 'crawlee';
import fs from 'fs';

export class lidlCrawl {
    
    constructor() { }
      
    async  crawl1(){
        this.log2File("start \n");
        const url ="https://www-lidl-de.translate.goog/q/query/supersale?sort=deliveryStartDate-desc&idsOnly=false&productsOnly=false&_x_tr_sl=auto&_x_tr_tl=vi&_x_tr_hl=vi&_x_tr_pto=wapp&_x_tr_hist=true"
        const crawler = new PlaywrightCrawler({
            // Use the requestHandler to process each of the crawled pages.
            async requestHandler({ request, page, enqueueLinks, log }) {
                
                for (let index = 0; index < 30; index++) {
                    
                   const product= page.locator('#product_'+index);
                    const name = product.locator('//a[class=grid-box__pdp-link]')
                    log.info('name= ');
                    
                }
             
            },
        
        });
    
        await crawler.run([url]);
    
       
    }

     log2File(content){

        fs.writeFile('test.html', content, err => {
        if (err) {
            console.error(err);
        }
        
        });
    }

    appen2File(content){

        fs.appendFile('test.html', content, err => {
        if (err) {
            console.error(err);
        }
        
        });
    }


}

