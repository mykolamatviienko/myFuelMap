//js
const express = require("express");
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");
const {
  homePageView,
  loginView,
  registerView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const router = express.Router();
router.get("/", homePageView);
router.get("/login", loginView);
router.get("/register", registerView);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", protectRoute, dashboardView);
module.exports = router;
