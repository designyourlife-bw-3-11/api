const router = require("express").Router();
const Users = require("./users-module.js");

router.get("/", async (req, res) => {
  try {
    const users = Users.getAll;
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
