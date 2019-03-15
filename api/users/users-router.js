const router = require("express").Router();
const Users = require("./users-module.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.getAll();
    // console.log(users);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:id?", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findBy({ id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const user = req.body;
    const updated = await Users.updateUser(user);
    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
