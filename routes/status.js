const express = require('express');
const router = express.Router();
const pkginfo = require('pkginfo')(module);

router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is online and fully operational.',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: module.exports.version || 'unknown',
    process: {
      pid: process.pid,
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version
    }
  });
});

module.exports = router;
