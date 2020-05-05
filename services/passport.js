const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//load models from mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  /*
  Serialize the User object.

  done is a context from passport library, call it to transition to next auth
  phase.

  done(errhdlr, unique_id)
  errhdlr is the placeholder for the error arg, set null to bypass. unique_id
  needs to be a unique value to each user.

  Set to the auto-generated value of the '_id' property in the users Mongo
  collection.

  */
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //unserialize the user object by user.id
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

//configure google oauth strategy
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
