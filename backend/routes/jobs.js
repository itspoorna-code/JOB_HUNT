const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/", jobController.createJob); // Add a job
router.get("/", jobController.getJobs); // List all jobs

module.exports = router;
