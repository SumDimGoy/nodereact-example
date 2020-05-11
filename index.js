const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');//allows passport to use cookieSession
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//import the mongoose models before connecting
require('./models/User');

//import our passport functions and strategies
require('./services/passport');

//connect to the mongo database cluster
mongoose.connect(keys.mongoURI);

//create the express app instance
const app = express();

//add body parser middleware
app.use(bodyParser.json());

//create cookie session middleware
//this will assign the session object to the request object
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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //express will serve production assets
  //like our main.js or main.css
  app.use(express.static('./client/build'));

  //express will serve up the index.html
  //if it doesn't recognize the route
  const path = require('path');
  app.get('*',
    (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
