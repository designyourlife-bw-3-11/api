const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  findBy,
  getAll,
  updateUser
};

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findBy({ id });
  } catch (error) {
    throw new Error(error);
  }
}

async function findBy(filter) {
  try {
    const user = await db("users")
      .where(filter)
      .first();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAll() {
  // console.log("here");
  try {
    const users = await db("users");
    // console.log(users);
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUser(user) {
  try {
    const id = user.id;
    const updated = await db("users")
      .where({ id })
      .update({ ...user });
    if (updated) {
      return updated;
    } else {
      throw new Error("Error updating user.");
    }
  } catch (error) {
    throw new Error(error);
  }
}
