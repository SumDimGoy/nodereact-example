const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//load models from mongoose
const User = mongoose.model('users');

passport.serializeUser(
  (user, done) => {
    /*
    Serialize the User object.

    passport.serializeUser() returns a function object for associating a user
    object to a unique string value. done() is a context from passport library,
    call it to transition to next auth phase.

    done(error, id)
    error: function to perform on error
    id: needs to be a unique value to each user. Assigned to the auto-generated
    value of the '_id' property in the users Mongo collection.
    */

    //pass the user id (auto generated in mongodb)
    done(null, user.id);
});

passport.deserializeUser(
  async(id, done) => {
    let user = await User.findById(id);
    done(null, user);
  }
);

//configure google oauth strategy
passport.use(
  new GoogleStrategy ( {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  async(accessToken, refreshToken, profile, done) => {

      //query the user's google account ID (profile id)
      let existingUser = await User.findOne({ googleID: profile.id});

      //if the record already exists, return and give data to passport
      if (existingUser) {
        return done(null, existingUser);
      }

      //else create new user
      let newUser = new User({
        googleID: profile.id,
        name: profile.displayName,
        email: profile.email
      });

      //commit to db
      await newUser.save();

      //give data to passport
      done(null, newUser);
    })
);
