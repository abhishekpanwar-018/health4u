const express = require("express");
const router = express.Router();

const {
  getPublicArticles,
  getTipOfTheDay,
} = require("../controllers/healthInfo.controller");

router.get("/public", getPublicArticles);
router.get("/tip-of-the-day", getTipOfTheDay);

module.exports = router;
