const HealthArticle = require("../models/HealthArticle");

const getPublicArticles = async (req, res, next) => {
  try {
    const articles = await HealthArticle.find({ isPublic: true }).sort({
      createdAt: -1,
    });
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

const getTipOfTheDay = async (req, res, next) => {
  try {
    const tip = await HealthArticle.findOne({ isDailyTip: true }).sort({
      createdAt: -1,
    });
    res.json(tip);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPublicArticles, getTipOfTheDay };
