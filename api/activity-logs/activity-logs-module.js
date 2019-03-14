const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  getById,
  addActivityLog,
  updateActivityLog,
  deleteActivityLog
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
    const [alId] = await db("activity-logs").insert(activityLogData, "id");
    const activityLogActivities = activities.map(act => ({
      activity_log_id: alId,
      activity_id: act.id,
      enjoyment: act.enjoyment,
      engagement: act.engagement,
      notes: act.notes
    }));
    // console.log(activityLogActivities);
    const [alaId] = await db("activity-log-activities").insert(
      activityLogActivities,
      "id"
    );
    return { alId, alaId };
  } catch (error) {
    throw new Error(error);
  }
}

async function updateActivityLog(activityLogData, activities) {
  const { id, date, outcomes } = activityLogData;
  try {
    const updatedAlId = await db("activity-logs")
      .where({ id })
      .update({ id, date, outcomes }, "id");
    const updatedAlaId = activities.map(async act => {
      const { id, ala_id, enjoyment, engagement, notes } = act;
      const alaId = await db("activity-log-activities")
        .where({ id: ala_id })
        .update({
          activity_id: id,
          enjoyment,
          engagement,
          notes
        });
      return [alaId];
    });
    Promise.all(updatedAlaId).then(alaId => {
      if (updatedAlId && alaId) {
        // console.log({ updatedAlId, alaId });
        return { updatedAlId, updatedAlaId };
      } else {
        throw new Error("Error updating activity log activities.");
      }
    });
    return updatedAlId;
  } catch (error) {
    throw error;
  }
}

async function deleteActivityLog(delId) {
  // console.log("deleteid: ", delId);
  try {
    const id = delId;
    const deleted = await db("activity-logs")
      .where({ id })
      .del();
    // console.log("here:", deleted);
    return deleted;
  } catch (error) {
    throw error;
  }
}
