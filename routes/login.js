//js
const express = require("express");
const {
  homePageView,
  loginView,
  registerView,
  registerUser,
} = require("../controllers/loginController");
const router = express.Router();
router.get("/", homePageView);
router.get("/login", loginView);
router.get("/register", registerView);
router.post("/register", registerUser);
module.exports = router;
