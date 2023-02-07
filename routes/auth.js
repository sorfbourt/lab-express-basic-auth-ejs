const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcryptjs');
const User = require("../models/User.model");

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});



router.post("/signup", async (req, res, next) => {


  
  
  const body = { ...req.body };
  console.log(body)


  if (body.password.length < 6) {
    res.render('auth/signup', { errorMessage: 'Password too short', body: req.body, userData: req.body})
  } else {


  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(body.password, salt);
  console.log(passwordHash)

  delete body.password;
  body.passwordHash = passwordHash

  try {
    await UserModel.create(body);
    res.redirect("/auth/signup");
  } catch (error) {
    console.log("error in post signup", error)
    if(error.code == 11000){
      console.log("Duplicate!")
      res.render("auth/signup", {errorMessage: "Username already used!", userData: req.body})
    }
    else{
      res.render("auth/signup", {errorMessage: error, userData: req.body})
    }
  }

  }

});


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});


router.post('/login', async (req, res) => {
  console.log('SESSION =====> ', req.session);
  const body = req.body

  const userMatch = await User.find({ username: body.username })
  // console.log(userMatch)
  if (userMatch.length) {
    // User found
    const user = userMatch[0]

    if (bcrypt.compareSync(body.password, user.passwordHash)) {
      // Correct password

      const tempUser = {
        username: user.username,
        email: user.email,
      }

     console.log("req.session: ", req.session)

      req.session.user = tempUser
      res.redirect('/profile')
    } if(!bcrypt.compareSync(body.password, user.passwordHash) && body.password == "") {
      // Incorrect password
      console.log("Please enter your password")
      res.render("auth/login", {errorMessage: "Please enter your password", userData: req.body});
    }
    if(!bcrypt.compareSync(body.password, user.passwordHash) && body.password != "") {
      // Incorrect password
      console.log("Incorrect password")
      res.render("auth/login", {errorMessage: "Incorrect password", userData: req.body});
    }
  } else {
    // User not found.
    console.log("User not found")
    res.render("auth/login", {errorMessage: "User not found!", userData: req.body});
  }
})




module.exports = router;
