const mongoose = require('mongoose');
const express = require('express');

require('./models/User');
require('./services/passport');

const dbstring = require('./config/keys').mongoURI;
mongoose.connect(dbstring);

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
