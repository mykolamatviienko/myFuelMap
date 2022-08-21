//js
const express = require("express");
const homePageView = require("../controllers/homePageController");
const router = express.Router();
router.get("/", homePageView);
module.exports = router;
