const db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  getById,
  addActivity,
  updateActivity,
  deleteActivity
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
  } catch (error) {
    throw error;
  }
}

async function addActivity(activityData) {
  try {
    if (activityData.name) {
      const [id] = await db("activities").insert(activityData, "id");
      return id;
    } else {
      throw "Please provide activity name.";
    }
  } catch (error) {
    throw error;
  }
}

async function updateActivity(activityData) {
  try {
    const id = activityData.id;
    if (id) {
      const [updatedId] = await db("activities")
        .where({ id })
        .update({ ...activityData }, "id");
      if (updatedId) {
        return updatedId;
      } else {
        throw new Error("Error updating, is there an activity with that id?");
      }
    } else {
      throw "Please provide activity id.";
    }
  } catch (error) {
    throw error;
  }
}

async function deleteActivity(delId) {
  try {
    const id = delId;
    const deleted = await db("activities")
      .where({ id })
      .del();
    return deleted;
  } catch (error) {
    throw error;
  }
}
