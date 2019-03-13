const router = require("express").Router();
const Activities = require("../activities/activities-module.js");
const User = require("../user/user-module.js");

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

router.post("/:user", async (req, res) => {
  let activityData = req.body;
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      activityData.user_id = user.id;
      const id = await Activities.addActivity(activityData);
      res.status(200).json({ message: "Successfully added activity.", id });
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:user", async (req, res) => {
  let activityData = req.body;
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      activityData.user_id = user.id;
      const id = await Activities.updateActivity(activityData);
      res.status(200).json({ message: "Successfully updated activity.", id });
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:user", async (req, res) => {
  let delId = req.body.id;
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      const deleted = await Activities.deleteActivity(delId);
      if (deleted) {
        res.status(200).json({ message: `Deleted ${deleted} activities.` });
      } else {
        res
          .status(400)
          .json({ message: "Provided id does not match any activities." });
      }
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
