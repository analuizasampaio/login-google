const User = require("../../models/user");

async function verify(_accessToken, _refreshToken, profile, callback) {
  // 'profile' is the data that comes from Google after authentication
  // console.log("[profile data]\n", profile);

  try {
    const [user] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        name: profile.displayName,
        image: profile.photos[0].value,
        googleId: profile.id,
      },
    });

    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
}

module.exports = verify;
