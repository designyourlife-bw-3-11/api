const router = require("express").Router();
const Activities = require("../activities/activities-module.js");

router.get("/:user/:id?", async (req, res) => {
  const username = req.params.user;
  const activityId = req.params.id;
  console.log(username, activityId);
  try {
    if (activityId) {
      console.log(`single activity, id:${activityId}`);
      // return single activity matching id
      const activity = await Activities.getById(username, activityId);
      res.status(200).json(activity);
    } else {
      console.log("all activities");
      // return all activities
      const activities = await Activities.getAll(username);
      res.status(200).json(activities);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
