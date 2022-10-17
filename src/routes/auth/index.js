const express = require("express");
const passport = require("passport");
const router = new express.Router();
const {
  register,
  loginSuccess,
  loginFailure,
  logout,
  unauthorized,
  me,
} = require("../../controllers/auth");

router.post("/user/register", register);
router.post(
  "/user/login",
  passport.authenticate("local", {
    failureRedirect: "/api/v1/auth/login-failure",
    successRedirect: "/api/v1/auth/login-success",
  }),
  (err, next) => {
    if (err) next(err);
  }
);
router.get("/login-success", loginSuccess);
router.get("/login-failure", loginFailure);
router.get("/unauthorized", unauthorized);
router.get("/user/logout", logout);
router.get("/user/me", me);

module.exports = router;
