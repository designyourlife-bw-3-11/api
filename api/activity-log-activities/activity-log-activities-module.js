const db = require("../../data/dbConfig");

module.exports = {
  getActivities
};

async function getActivities(activityLogId) {
  try {
    const ala = "activity-log-activities";
    const activities = await db
      .select(
        `activities.id`,
        "name",
        `${ala}.enjoyment`,
        `${ala}.engagement`,
        `${ala}.notes`
      )
      .from("activities")
      .innerJoin(ala, "activities.id", `${ala}.activity_id`)
      .where({ "activity-log-activities.activity_log_id": activityLogId });
    return activities;
    // console.log("activities: ", activities);
  } catch (error) {
    throw new Error("Could not fetch activities by activity log id");
  }
}
