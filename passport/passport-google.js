'use strict'

const passport = require('passport');
const User = require('../models/user');
const config = require('../config/secret');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  User.findOne({ 'google': profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    } else {
      const newUser = new User();
      newUser.username = profile.emails[0].value;
      newUser.google = profile.id;
      newUser.fullname = profile.displayName;
      newUser.email = profile.emails[0].value;
      newUser.userImage = profile._json.image.url;
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    }
  });
}));