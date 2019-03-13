const router = require("express").Router();
const ActivityLogs = require("./activity-logs-module.js");
// const ActivityLogActivities = require("../activity-log-activities/activity-log-activities-module.js");

router.get("/:user/:id?", async (req, res) => {
  const username = req.params.user;
  const activityLogId = req.params.id;
  // console.log(username, activityLogId);
  try {
    if (activityLogId) {
      // get single activity
      let [activityLog] = await ActivityLogs.getById(username, activityLogId);
      // look up activities-log-activities
      const activities = await ActivityLogActivities.getActivities(
        activityLogId
      );
      activityLog.activities = activities;
      res.status(200).json([activityLog]);
    } else {
      // get all activities of user
      let activityLogs = await ActivityLogs.getAll(username);
      // look up activities each activity, add to each activityLog
      const returnData = await activityLogs.map(async log => {
        const activities = await ActivityLogActivities.getActivities(log.id);
        return { ...log, activities };
      });
      Promise.all(returnData).then(data => res.status(200).json(data));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:user", async (req, res) => {
  const { user_id, date, outcomes, activities } = req.body;
  const activityData = { user_id, date, outcomes };
  // console.log(activityData, activities);
  try {
    const success = await ActivityLogs.addActivityLog(activityData, activities);
    res.status(200).json({ "activity added: ": success });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
