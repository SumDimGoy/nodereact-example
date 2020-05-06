const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');//allows passport to use cookieSession
const keys = require('./config/keys');

//import the mongoose models before connecting
require('./models/User');

//import our passport functions and strategies
require('./services/passport');

//connect to the mongo database cluster
mongoose.connect(keys.mongoURI);

//create the express app instance
const app = express();

//create cookie session middleware object and give it to the app object
//this will assign the session object to the request object in express routes
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //cookie expires after one day (ms)
    keys: [keys.cookieKey] //array for multiple keys, selects randomly
  })
);

//init passport
app.use(passport.initialize());

//allow passport to obtain the session object from the request
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
