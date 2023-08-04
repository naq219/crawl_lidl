import fs from 'fs';
export class MyLog{
    constructor() { }

     async logTest(content){

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