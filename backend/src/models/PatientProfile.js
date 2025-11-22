const mongoose = require("mongoose");

const PatientProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    age: Number,

    gender: { type: String, enum: ["Male", "Female", "Other"] },

    allergies: [String],

    currentMedications: [String],

    conditions: [String],

    emergencyContact: {
      name: String,
      phone: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientProfile", PatientProfileSchema);
