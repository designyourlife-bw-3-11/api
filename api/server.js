const express = require("express");

const configMiddleware = require("./middleware.js");
// routers:
const authRouter = require("./auth/auth-router.js");
const activitiesRouter = require("./activities/activities-router.js");
const activityLogsRouter = require("./activity-logs/activity-logs-router.js");

const db = require("../data/dbConfig.js");

const server = express();

configMiddleware(server);

const protect = require("./auth/auth-restrict-mw.js");

// not protected, for login, register:
server.use("/api/auth", authRouter);
// todo: protect this route, provides list of activities
server.use("/api/activities", activitiesRouter);
// todo: protect this route, provides list of activity logs
server.use("/api/activity-logs", activityLogsRouter);
// todo: un-protect this route once done with testing
server.get("/", protect, (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

server.get("/testDb", async (req, res) => {
  const rows = await db("test");
  res.status(200).json(rows);
});

module.exports = server;
