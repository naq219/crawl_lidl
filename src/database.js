
import { Sequelize, DataTypes } from 'sequelize';
import { Notifi } from './notify.js';
export class Database {

    sequelize;
    constructor() {

    }

    async save(params) {
        let sequelize = new Sequelize('sqlite:/home/quangan/Documents/crawlee/crawl_lidl/crawl.sqlite');
        const Data = sequelize.define('Data', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            url: DataTypes.STRING,
            img: DataTypes.STRING,
            title: DataTypes.STRING,
            discount: DataTypes.STRING,
            price: DataTypes.STRING,

        }, { tableName: 'data' });

        await Data.sync();

        const check= await Data.findAll({
            where: {
                url: params.url
            }
        });
        

        if(check&& check.length>0) return;

       


        var test = Data.build(params);

        test.save();

        Notifi.newSale(params);

        //const jane = await User.create(params);
    }

}