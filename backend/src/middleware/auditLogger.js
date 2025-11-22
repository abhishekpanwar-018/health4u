const AuditLog = require("../models/AuditLog");

const auditLogger = (action) => {
  return (req, res, next) => {
    const start = Date.now();

    res.on("finish", async () => {
      try {
        await AuditLog.create({
          userId: req.user?.id || null,
          action,
          metadata: {
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: Date.now() - start,
          },
        });
      } catch (err) {
        console.error("Failed to write audit log:", err.message);
      }
    });

    next();
  };
};

module.exports = auditLogger;
