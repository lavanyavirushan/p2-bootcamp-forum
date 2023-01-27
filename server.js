//Imports
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//Initilaize objects
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// The sess object will define the cookies properties
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  //set to false to prevent generating a new cookie on every request 
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
//register the session middleware
app.use(session(sess));
//allow our app to use the handlebars templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware that allows express server to parse json/ rest functions and serve html/css/js 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//express will be able to use the controllers 
app.use(routes);
//sync the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
