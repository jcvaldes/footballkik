'use strict'

const passport = require('passport');
const User = require('../models/user');
const config = require('../config/secret');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  profileFields: ['email', 'displayName', 'photos'],
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true
}, (req, token, refreshToken, profile, done) => {
  User.findOne({ 'facebook': profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    } else {
      const newUser = new User();
      newUser.facebook = profile.id;
      newUser.username = profile._json.email;
      newUser.email = profile._json.email;
      newUser.fullname = profile.displayName;
      newUser.userImage = 'https://graph.facebook.com' + profile.id + '/picture?type=large';
      newUser.fbTokens.push({ token: token });
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    }

  });
}));