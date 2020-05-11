const passport = require('passport');

//call passport authenticate middleware
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']}));

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      //function to redirect response after logging in and callback from Google
      res.redirect('/surveys')
    });

  app.get(
    '/api/currentuser',
    (req, res) => {
      res.send(req.user)
  });

  app.get(
    '/api/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
  });
};
