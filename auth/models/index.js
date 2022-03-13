'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const clothes = require('./clothes.js');
const collection = require('./modelCollection.js');
const User = require('./user-models.js')


const myPOSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(myPOSTGRES_URL, sequelizeOptions);
let clothesCollection =new collection(clothes(sequelize,DataTypes));

module.exports = {
    db: sequelize,
    User: User(sequelize, DataTypes),
    clothesCollection: clothesCollection
}