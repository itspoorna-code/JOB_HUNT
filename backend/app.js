const express = require("express");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const accountRoutes = require("./routes/account");

const app = express();
const cors = require("cors");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/accounts", accountRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

//Server
module.exports = app;
