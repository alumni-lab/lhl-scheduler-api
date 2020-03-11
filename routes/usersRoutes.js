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
    // usersRepository,getAllUsers
  });


  router.post("/", async(req,res)=>{
    console.log("user signup with: ", req.body)
    const newUser = req.body;
    try {
      const result = await usersRepository.getUser(newUser);
      console.log("result of checking: ", result.rows)
      if (result.rows.length) {
        throw "same employee id found!"
      }
      const result2 = await usersRepository.createUser(newUser)
      console.log( "result from signing up: ",result2)
      res.send('success')
    } catch (err) {
      console.error("err from signing up:", err);
      res.status(400).send(err);
    }
  })

  //google
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
