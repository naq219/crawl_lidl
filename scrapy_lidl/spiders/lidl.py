import scrapy


class LidlSpider(scrapy.Spider):
    name = "lidl"
    allowed_domains = ["lidl.de"]
    start_urls = ["https://lidl.de"]

    def parse(self, response):
        self.logger.error('Russia terrorist state ',response.url)
        pass
