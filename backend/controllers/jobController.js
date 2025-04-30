const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ available: true });
    res.status(200).json({
      status: "success",
      data: {
        jobs,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
