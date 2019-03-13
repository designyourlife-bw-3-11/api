const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  getById,
  addActivityLog
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

async function addActivityLog(activityLogData, activities) {
  try {
    const [id] = await db("activity-logs").insert(activityLogData, "id");
    // const id = 3;
    const activityLogActivities = activities.map(act => ({
      activity_log_id: id,
      activity_id: act.activity_id,
      enjoyment: act.enjoyment,
      engagement: act.engagement,
      notes: act.notes
    }));
    // console.log(activityLogActivities);
    const [id2] = await db("activity-log-activities").insert(
      activityLogActivities,
      "id"
    );
    return { id, id2 };
  } catch (error) {
    throw new Error(error);
  }
}
