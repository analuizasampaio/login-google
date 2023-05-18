require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const verify = require("./verify");

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/oauth2/redirect/google",
};

const strategy = new GoogleStrategy(googleConfig, verify);

function usePassport(instance) {
  instance.use(strategy);

  instance.serializeUser((user, callback) => {
    process.nextTick(() => {
      callback(null, user);
    });
  });

  instance.deserializeUser((user, callback) => {
    process.nextTick(() => {
      return callback(null, user);
    });
  });
}

module.exports = usePassport;
