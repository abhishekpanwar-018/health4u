const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");
const auditLogger = require("../middleware/auditLogger");

const {
  getDashboard,
  getProfile,
  updateProfile,
  getGoals,
  upsertGoal,
  getReminders,
  updateReminderStatus,
} = require("../controllers/patient.controller");

router.use(auth, authorize("PATIENT"));

router.get("/dashboard", auditLogger("PATIENT_DASHBOARD"), getDashboard);
router.get("/profile", getProfile);
router.put("/profile", auditLogger("PATIENT_UPDATE_PROFILE"), updateProfile);

router.get("/goals", getGoals);
router.post("/goals", auditLogger("PATIENT_UPSERT_GOAL"), upsertGoal);

router.get("/reminders", getReminders);
router.patch(
  "/reminders/:id",
  auditLogger("PATIENT_UPDATE_REMINDER"),
  updateReminderStatus
);

module.exports = router;
