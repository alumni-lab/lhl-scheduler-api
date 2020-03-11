const express = require("express");
const router = express.Router();
const passport = require("passport");

module.exports = (usersRepository) => {
  router.get("/", (req, res) => {
    usersRepository
      .getAllUsers()
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  router.get("/auth/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
  });

  router.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });

  return router;
};
