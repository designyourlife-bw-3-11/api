exports.seed = function(knex, Promise) {
  // Delete existing entries handled in 000-cleaner.js
  return knex("test").then(function() {
    // Inserts seed entries
    return knex("test").insert([
      { testData: "rowValue1" },
      { testData: "rowValue2" }
    ]);
  });
};
