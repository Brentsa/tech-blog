//Import libraries
const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Initialize express server and define the port to use
const app = express();
const PORT = process.env.PORT || 3001;

//Define our session configuration
const sess = {
    secret: 'An Amazing Secret For No One To See',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({db: sequelize})
};

//Instruct the server to use our session and store it in the database
app.use(session(sess));

//Create a handlebars instance and then register the handlebars view engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Express middleware to accept incoming json objects
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Instructs the server to use static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

//Use the routes found in controllers
app.use(routes);

//Sync the sequelize models using our sequelize models to the MySQL database
sequelize.sync({force: false}).then( () => {
    //Instruct the server to listen to the designated PORT
    app.listen(PORT, ()=> console.log(`App is listening on port: ${PORT}`));
});