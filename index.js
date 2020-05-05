const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');//allows passport to use cookieSession
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //cookie lasts for one day (ms)
    keys: [keys.cookieKey] //array allows multiple keys, chooses one at random
  })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
