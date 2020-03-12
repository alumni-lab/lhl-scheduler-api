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


  router.post("/signup", async(req,res)=>{
    console.log("user signup with: ", req.body)
    const newUser = req.body;
    try {
      const result = await usersRepository.getUserByAccount(newUser.accountId);
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
  });

  router.post("/login", async (req, res) => {
    const userInput=req.body;
    const accountId = userInput.accountId;
    const password = userInput.password;
    try {
      res.clearCookie()
      const result = await usersRepository.getUserByAccount(accountId);

      const user = result.rows[0];

      console.log(accountId, password, user)
      if (user) {
        if (user.password === password) {
          // res.cookie('name', `${user.first_name}`)
          res.cookie('user', JSON.stringify({
            name: user.first_name,
            employee_id: user.employee_id,
            is_admin: user.is_admin
          }))
          res.send({ user })
        } else {
          res.cookie(null)
          res.end()
        }
      } else {
        res.end()
      }
    } catch (error) {
      console.log(error)
    }
  });

  router.get("/logout", (req, res) => {
    res.clearCookie('user')
    res.end()
  });

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
