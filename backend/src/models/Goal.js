const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: { type: Date, required: true },

    steps: {
      target: Number,
      achieved: { type: Number, default: 0 },
    },

    sleep: {
      targetHours: Number,
      achievedHours: { type: Number, default: 0 },
    },

    waterIntake: {
      targetMl: Number,
      achievedMl: { type: Number, default: 0 },
    },

    status: {
      type: String,
      enum: ["ON_TRACK", "BEHIND"],
      default: "ON_TRACK",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", GoalSchema);
