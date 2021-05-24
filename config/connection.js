//import and configure dotenv
require('dotenv').config();

//import the sequelize library
const {Sequelize} = require('sequelize');

//instantiate a sequelize connection
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

//export the connection
module.exports = sequelize;