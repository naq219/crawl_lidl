
import axios from "axios";
export class Notifi {
    static async newSale(content) {

        //const token = 'bot675127710:AAG99N1eMEVW2D1lhfgRpVwD0itBTT67DoQ';
        // Create a bot that uses 'polling' to fetch new updates
        //const bot = new TelegramBot(token, { polling: false });

        //bot.sendMessage("-814575263", "content");
        // const result= {
        //     id:1,
        //     img:img0,
        //     title:title,
        //     discount:discount,
        //     price:price,
        //     link:link
        // }
        const shortUrl= await this.shortenLink(content.url);
        const msg = ` →${encodeURI(content.title)} %0A → Giảm ${content.discount}% , Giá ${content.price}€ %0A ${encodeURI(content.img)} %0A URL= ${shortUrl}`;

        //const msg2= encodeURI(msg);

        


        axios.get(`http://apiv2.lemyde.com/api/notify/send_message?ott=telegram&channel=@lemyde_spm&content=` + msg.toString()).then(response => {
            console.log(response);
        });

    }

    static async shortenLink(url) {
        const encodedParams = new URLSearchParams();
        encodedParams.set('url', url);

        const options = {
            method: 'POST',
            url: 'https://url-shortener-service.p.rapidapi.com/shorten',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '95595bf2aamshd3161b01afd6ce2p19662ejsn053ec2902b34',
                'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            if(response.status==200){
                const urlShort= response.data.result_url;
                return urlShort;
            }
            return url;
            
        } catch (error) {
            console.error(error);
            return url;
        }
    }
}