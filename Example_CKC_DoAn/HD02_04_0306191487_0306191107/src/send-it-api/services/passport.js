const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8800/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ uid: profile.id });
        if (user) {
          console.log('user is there');
          return done(null, user);
        } else {
          const newUser = new User({
            email: profile.email,
            full_name: profile.displayName,
            image: profile.picture,
          });
          user = await newUser.save();
          console.log('creating new user');
          return done(null, profile);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);
