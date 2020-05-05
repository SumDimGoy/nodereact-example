const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//load models from mongoose
const User = mongoose.model('users');

//configure google oauth
passport.use(
  new GoogleStrategy( {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
  //console.log('Access Token: ', accessToken);
  //console.log('Refresh Token: ', refreshToken);
  //console.log('profile: ', profile);
  //console.log('Done: ', done);
  new User({
    googleID: profile.id,
    name: profile.displayName
  }).save();
}));
