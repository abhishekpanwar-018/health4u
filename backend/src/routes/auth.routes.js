const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/auth.controller");
const auth = require("../middleware/auth");
const auditLogger = require("../middleware/auditLogger");

router.post("/register", auditLogger("REGISTER"), register);
router.post("/login", auditLogger("LOGIN"), login);
router.get("/me", auth, auditLogger("GET_ME"), getMe);

module.exports = router;
