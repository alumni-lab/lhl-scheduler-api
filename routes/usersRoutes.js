const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

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
    const user = req.body;
    const password = bcrypt.hashSync(user.password, 10);
    const newUser = {...user, password}

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


  router.post("/delete", async(req,res)=>{
    const id = req.body.id
    try{
      const deleted = await usersRepository.deleteUser(id);
      console.log(deleted.rows[0]);
      if(!deleted.rows[0]) {
        throw "User not found"
      }
      res.send(deleted.rows[0])
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.post("/edit/:type", async(req,res)=>{
    const type = req.params.type;
    console.log("type:",type)
    let user = req.body.user;
    if(type==='pw') {
      const password = bcrypt.hashSync(user.password, 10);
      user = {...user, password}
    }
    // console.log(user)
    try{
     await usersRepository.editUser(user);
      res.send('Successfully Edited!')
    } catch (err) {
      console.log("here")
      console.log(err)
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
      console.log(accountId, password, user);

      if (user) {
        // bcrypt.compareSync(password,user.password)
        // user.password===password


        //Only for Development
        if (user.is_admin) {
          console.log("hereasdasd")
          if (user.password===password) {
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
          }}



        if (bcrypt.compareSync(password,user.password)) {
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
