const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userSFn = require("../dbHelpers/usersFn");

module.exports = db => {
  // ---- SERIALIZE THE USER USING ITS GOOGLE_ID TO BE PUT INTO COOKIE ------------ //
  passport.serializeUser((user, done) => {
    done(null, user.google_id);
  });

  // ---- DESERIALIZE THE COOKIE and USE THE ID TO FIND THAT PARTICULAR USER ------ //
  passport.deserializeUser((id, done) => {
    userSFn.getUserByGoogleId(db, id).then(user => {
      done(null, user);
    });
  });

  // ---- OAUTH SECTION ----------------------------------------------------------- //
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/users/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await userSFn.getUserByGoogleId(db, profile.id);
        if (existingUser) {
          return done(null, existingUser);
        }

        const user = await userSFn.addNewUser(db, {
          name: profile.displayName,
          email: profile.emails[0].value,
          google_id: profile.id
        });
        done(null, user);
      }
    )
  );
};
