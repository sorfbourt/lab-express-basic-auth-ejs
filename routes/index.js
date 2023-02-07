const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res) => {
  console.log('SESSION =====> ', req.session);
  //instead of copy pasting the below all on pages,use middleware route-guards.  https://my.ironhack.com/cohorts/6308b3fc0614cc002cc4e0bc/lms/courses/course-v1:IRONHACK+WDFT+202301_RMT/modules/ironhack-course-chapter_6/units/ironhack-course-chapter_6-sequential_2-vertical_5
  // if(!req.session.user){
  //   res.redirect("/auth/login")
  // }
  res.render("profile", {user: req.session.user});
});

router.get("/main", isLoggedIn, (req, res, next) => {
  res.render("main");
});

router.get("/private", isLoggedIn, (req, res, next) => {
  res.render("private");
});

module.exports = router;
