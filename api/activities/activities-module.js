const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  getById
};

async function getAll(username) {
  try {
    const activities = await db("activities");
    return activities;
  } catch (error) {
    throw new Error("Could not fetch activities");
  }
}

async function getById(username, id) {
  try {
    const activity = await db("activities").where({ id });
    return activity;
  } catch (error) {}
}
