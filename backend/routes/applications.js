const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// Route to apply for a job
router.post("/", applicationController.applyJob);

module.exports = router;
