import fs from 'fs';
import { configDotenv } from 'dotenv';

export class MyLog{
    constructor() { }
    configDotenv
     async logTest(content){

        fs.writeFile('test.html', content, err => {
        if (err) {
            console.error(err);
        }
        
        });
    }

    static appenLog(content){

        fs.appendFile(process.env.LOG_FOLDER+'testlidl.html', content, err => {
        if (err) {
            console.error(err);
        }
        
        });
    }


}