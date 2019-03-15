const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  findBy,
  getAll
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
