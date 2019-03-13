const router = require("express").Router();
const ReflectionLogs = require("./reflection-logs-module.js");

router.get("/:user/:id?", async (req, res) => {
  const username = req.params.user;
  const reflectionLogId = req.params.id;
  try {
    if (activityLogId) {
      // get single reflection
      let [reflectionLog] = await ReflectionLogs.getById(
        username,
        activityLogId
      );
      res.status(200).json({ reflectionLog });
    } else {
      // get all reflection logs of user
      let [reflectionLogs] = await ReflectionLogs.getAll(username);
      res.status(200).json({ reflectionLogs });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
