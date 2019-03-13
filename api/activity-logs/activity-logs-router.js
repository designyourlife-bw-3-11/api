const router = require("express").Router();
const ActivityLogs = require("./activity-logs-module.js");
const User = require("../user/user-module.js");
const ActivityLogActivities = require("../activity-log-activities/activity-log-activities-module.js");

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
  const { date, outcomes, activities } = req.body;
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      const activityLogData = { date, outcomes };
      activityLogData.user_id = user.id;
      // console.log(activityLogData);
      const ids = await ActivityLogs.addActivityLog(
        activityLogData,
        activities
      );
      res.status(200).json({ "activity added: ": ids });
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:user", async (req, res) => {
  // updates activity-log data ONLY. to update activity-log-activities, next put
  const { id, date, outcomes } = req.body;
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      const activityLogData = { id, date, outcomes };
      activityLogData.user_id = user.id;
      console.log(activityLogData);
      const [idUpdated] = await ActivityLogs.updateActivityLog(activityLogData);
      res.status(200).json({ "activity updated: ": idUpdated });
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
