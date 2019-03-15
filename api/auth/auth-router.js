const router = require("express").Router();
const bcrypt = require("bcrypt");
const tokenSvc = require("./token-service");
const Users = require("../users/users-module.js");

router.post("/register", async (req, res) => {
  let user = req.body;
  if (!(user.username && user.password)) {
    res.status(400).json({ message: "Username and password are required." });
    return;
  }
  // hash user's password, overwrite orig for storage
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  // gen token
  const token = tokenSvc.generateToken(user);

  // users are set to role 1 (non-admin), must be upgraded by admin
  user.role = 1;

  try {
    const saved = await Users.add(user);
    res.status(201).json({
      user_id: saved.id,
      username: saved.username,
      role: saved.role,
      token
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  // lookup username
  try {
    const existing = await Users.findBy({ username });
    if (existing && bcrypt.compareSync(password, existing.password)) {
      const token = tokenSvc.generateToken(existing);
      res.status(200).json({
        user_id: existing.id,
        message: `Welcome back ${existing.username}!`,
        token: token
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials."
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
