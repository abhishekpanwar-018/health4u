const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const patientRoutes = require("./routes/patient.routes");
const providerRoutes = require("./routes/provider.routes");
const healthInfoRoutes = require("./routes/healthInfo.routes");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Health check route – VERY IMPORTANT
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/health-info", healthInfoRoutes);

// Error handler (last)
app.use(errorHandler);

module.exports = app;
