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

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(body.password, salt);

  delete body.password;
  body.passwordHash = passwordHash

  try {
    await UserModel.create(body);
    res.redirect("/auth/signup");
  } catch (error) {
    console.log(error);
  }



});





module.exports = router;
