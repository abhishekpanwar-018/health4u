const User = require("../models/User");
const Goal = require("../models/Goal");
const Reminder = require("../models/Reminder");
const PatientProfile = require("../models/PatientProfile");

const getPatients = async (req, res, next) => {
  try {
    // Simple version: all patients
    const patients = await User.find({ role: "PATIENT" }).select(
      "_id name email lastLoginAt"
    );

    // Could also compute compliance % but keep it simple for now
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const { id: patientId } = req.params;

    const user = await User.findById(patientId).select("-passwordHash");
    const profile = await PatientProfile.findOne({ userId: patientId });
    const goals = await Goal.find({ patientId }).sort({ date: -1 }).limit(14);
    const reminders = await Reminder.find({ patientId }).sort({ dueDate: 1 });

    res.json({ user, profile, goals, reminders });
  } catch (err) {
    next(err);
  }
};

const addReminderForPatient = async (req, res, next) => {
  try {
    const { id: patientId } = req.params;
    const { title, dueDate } = req.body;

    const reminder = await Reminder.create({
      patientId,
      title,
      dueDate,
      status: "UPCOMING",
      createdBy: "PROVIDER",
    });

    res.status(201).json(reminder);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPatients,
  getPatientById,
  addReminderForPatient,
};
