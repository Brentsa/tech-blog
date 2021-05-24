//Import libraries
const express = require('express');
const sequelize = require('./config/connection');

//Initialize express server and define the port to use
const app = express();
const PORT = process.env.PORT || 3001;

//Express middleware to accept incoming json objects
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Sync the sequelize models using our sequelize models to the MySQL database
sequelize.sync({force: true}).then( () => {
    //Instruct the server to listen to the designated PORT
    app.listen(PORT, ()=> console.log(`App is listening on port: ${PORT}`));
});