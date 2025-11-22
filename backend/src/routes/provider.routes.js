const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/role");
const auditLogger = require("../middleware/auditLogger");

const {
  getPatients,
  getPatientById,
  addReminderForPatient,
} = require("../controllers/provider.controller");

router.use(auth, authorize("PROVIDER"));

router.get("/patients", auditLogger("PROVIDER_GET_PATIENTS"), getPatients);
router.get(
  "/patients/:id",
  auditLogger("PROVIDER_GET_PATIENT_DETAIL"),
  getPatientById
);
router.post(
  "/patients/:id/reminders",
  auditLogger("PROVIDER_ADD_REMINDER"),
  addReminderForPatient
);

module.exports = router;
