const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  })
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

module.exports = router;
