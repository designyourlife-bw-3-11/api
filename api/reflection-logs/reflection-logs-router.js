const router = require("express").Router();
const ReflectionLogs = require("./reflection-logs-module.js");
const User = require("../user/user-module.js");

router.get("/:user/:id?", async (req, res) => {
  const username = req.params.user;
  const reflectionLogId = req.params.id;
  try {
    if (reflectionLogId) {
      // get single reflection
      const [reflectionLog] = await ReflectionLogs.getById(
        username,
        reflectionLogId
      );
      res.status(200).json({ reflectionLog });
    } else {
      // get all reflection logs of user
      const reflectionLogs = await ReflectionLogs.getAll(username);
      res.status(200).json({ reflectionLogs });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:user", async (req, res) => {
  const { date, reflection } = req.body;
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      const reflectionLogData = { date, reflection };
      reflectionLogData.user_id = user.id;
      const id = await ReflectionLogs.addReflectionLog(reflectionLogData);
      res.status(200).json({ "Reflection log added: ": id });
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:user", async (req, res) => {
  const { id, date, reflection } = req.body;
  const username = req.params.user;
  try {
    const user = await User.findBy({ username });
    if (user) {
      const reflectionLogData = { id, date, reflection };
      reflectionLogData.user_id = user.id;
      const updated = await ReflectionLogs.updateReflectionLog(
        reflectionLogData
      );
      res.status(200).json({ "Reflection logs updated": updated });
    } else {
      res.status(400).json({ message: "Invalid username." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
