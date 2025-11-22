const mongoose = require("mongoose");

const HealthArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    category: { type: String, required: true },

    body: { type: String, required: true },

    isPublic: { type: Boolean, default: true },

    isDailyTip: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthArticle", HealthArticleSchema);
