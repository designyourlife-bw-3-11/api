db = require("../../data/dbConfig.js");

module.exports = {
  getAll,
  getById,
  addReflectionLog
};

async function getAll(username) {
  try {
    const reflectionLogs = await db("reflection-logs");
    return reflectionLogs;
  } catch (error) {
    throw new Error("could not fetch reflection logs");
  }
}

async function getById(username, id) {
  try {
    const reflectionLog = await db("reflection-logs").where({ id });
    return reflectionLog;
  } catch (error) {
    throw new Error("Could not fetch reflection log.");
  }
}

async function addReflectionLog(reflectionLogData) {
  try {
    const [rlId] = await db("reflection-logs").insert(reflectionLogData, "id");
    return rlId;
  } catch (error) {
    throw new Error(error);
  }
}
