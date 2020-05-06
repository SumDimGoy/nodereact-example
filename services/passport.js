const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//load models from mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  /*
  Serialize the User object.

  passport.serializeUser() returns a function object for associating a user object
  to a unique string value. done() is a context from passport library, call it
  to transition to next auth phase.

  done(errhdlr, id)
  errhdlr is the placeholder for the on error arg, set null to bypass. id
  needs to be a unique value to each user. Assigned to the auto-generated value
  of the '_id' property in the users Mongo collection.
  */

  //pass the user id (auto generated in mongodb)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //find the user by id stored in db record
  User.findById(id)
  .then(user => {

    //pass the user object
    done(null, user);
  });
});

//configure google oauth strategy
passport.use(
  new GoogleStrategy( {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true //trust heroku proxy and preserve https
  },
  (accessToken, refreshToken, profile, done) => {
  //test
  //console.log('Access Token: ', accessToken);
  //console.log('Refresh Token: ', refreshToken);
  //console.log('profile: ', profile);
  //console.log('Done: ', done);

    //query the user's google ID, filter by profile id
    User.findOne({ googleID: profile.id })
      .then(
        existingUser => {
          if (existingUser) {
            //if record already exists
            done(null, existingUser);
          }
          else {
            new User({
              googleID: profile.id,
              name: profile.displayName
            })
              .save()
              .then(user => done(null, user));
          }
        }
     )
}));
