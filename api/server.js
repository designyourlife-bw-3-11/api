const express = require("express");

const configMiddleware = require("./middleware.js");
// routers:
const authRouter = require("./auth/auth-router.js");
const activitiesRouter = require("./activities/activities-router.js");
const activityLogsRouter = require("./activity-logs/activity-logs-router.js");
const reflectionLogsRouter = require("./reflection-logs/reflection-logs-router.js");
const usersRouter = require("./users/users-router.js");

const db = require("../data/dbConfig.js");

const server = express();

configMiddleware(server);

const protect = require("./auth/auth-restrict-mw.js").protect;
const restrict = require("./auth/auth-restrict-mw.js").restrict;

// **** api routes ****
// not protected, for login, register:
server.use("/api/auth", authRouter);
// protected routes
server.use("/api/activities", protect, activitiesRouter);
server.use("/api/activity-logs", protect, activityLogsRouter);
server.use("/api/reflection-logs", protect, reflectionLogsRouter);
// protected, role-restricted routes
server.use("/api/users", protect, restrict, usersRouter);

// **** testing routes ****
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

server.get("/testDb", async (req, res) => {
  const rows = await db("test");
  res.status(200).json(rows);
});

module.exports = server;
