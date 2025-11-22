const PatientProfile = require("../models/PatientProfile");
const Goal = require("../models/Goal");
const Reminder = require("../models/Reminder");
const HealthArticle = require("../models/HealthArticle");

const getDashboard = async (req, res, next) => {
  try {
    const patientId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayGoal = await Goal.findOne({ patientId, date: today });

    const reminders = await Reminder.find({
      patientId,
      status: { $in: ["UPCOMING", "OVERDUE"] },
    }).sort({ dueDate: 1 });

    const tip = await HealthArticle.findOne({ isDailyTip: true }).sort({
      createdAt: -1,
    });

    res.json({
      todayGoal,
      reminders,
      tip,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const data = req.body;
    const profile = await PatientProfile.findOneAndUpdate(
      { userId: req.user.id },
      data,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

const getGoals = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const { date } = req.query;

    const query = { patientId };
    if (date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      query.date = d;
    }

    const goals = await Goal.find(query).sort({ date: -1 });
    res.json(goals);
  } catch (err) {
    next(err);
  }
};

const upsertGoal = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const { date, steps, sleep, waterIntake } = req.body;

    if (!date) {
      return res.status(400).json({ message: "date is required" });
    }

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const payload = { patientId, date: d, steps, sleep, waterIntake };

    const goal = await Goal.findOneAndUpdate(
      { patientId, date: d },
      payload,
      { new: true, upsert: true }
    );

    res.json(goal);
  } catch (err) {
    next(err);
  }
};

const getReminders = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const reminders = await Reminder.find({ patientId }).sort({ dueDate: 1 });
    res.json(reminders);
  } catch (err) {
    next(err);
  }
};

const updateReminderStatus = async (req, res, next) => {
  try {
    const patientId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const reminder = await Reminder.findOneAndUpdate(
      { _id: id, patientId },
      { status },
      { new: true }
    );

    res.json(reminder);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
  getProfile,
  updateProfile,
  getGoals,
  upsertGoal,
  getReminders,
  updateReminderStatus,
};
