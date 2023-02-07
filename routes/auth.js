const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcryptjs');

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






module.exports = router;
