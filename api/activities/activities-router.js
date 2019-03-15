const router = require("express").Router();
const Activities = require("../activities/activities-module.js");
const User = require("../users/users-module.js");

router.get("/:user/:id?", async (req, res) => {
  const username = req.params.user;
  const activityId = req.params.id;
  try {
    if (activityId) {
      // return single activity matching id
      const activity = await Activities.getById(username, activityId);
      if (!activity.length) {
        // no activity found
        res.status(204).json();
        return;
      }
      res.status(200).json(activity);
    } else {
      // return all activities
      const activities = await Activities.getAll(username);
      res.status(200).json(activities);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:user", async (req, res) => {
  // check required field
  if (!req.body.name) {
    res.status(400).json({ message: "Activity name is required" });
    return;
  }
  // strip out anything extra sent in req.body
  const { name, description } = req.body;
  let activityData = { name, description };
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      activityData.user_id = user.id;
      const id = await Activities.addActivity(activityData);
      res.status(201).json({ message: "Successfully added activity.", id });
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:user", async (req, res) => {
  // check required fields
  if (!req.body.id || !req.body.name) {
    res.status(400).json({ message: "Activity id and name are required" });
    return;
  } // strip out anything extra sent in req.body
  const { id, name, description } = req.body;
  let activityData = { id, name, description };
  // console.log(activityData.name);
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
  // check required fields
  if (!req.body.id) {
    res.status(400).json({ message: "Activity id is required" });
    return;
  }
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
    const msg = (error.code = 23503
      ? "Activity is used by logs/reflections. Can not delete"
      : error.message);
    res.status(500).json({ message: msg });
  }
});

module.exports = router;
