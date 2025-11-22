const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },

    dueDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["UPCOMING", "COMPLETED", "OVERDUE"],
      default: "UPCOMING",
    },

    createdBy: {
      type: String,
      enum: ["SYSTEM", "PROVIDER"],
      default: "SYSTEM",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", ReminderSchema);
