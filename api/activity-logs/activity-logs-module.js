const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  getById
};

async function getAll(username) {
  try {
    const activityLogs = await db("activity-logs");
    return activityLogs;
  } catch (error) {
    throw new Error("could not fetch activity logs");
  }
}

async function getById(username, id) {
  try {
    const activityLog = await db("activity-logs").where({ id });
    return activityLog;
  } catch (error) {
    throw new Error("Could not fetch activity log.");
  }
}
