exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("test")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("test").insert([
        { testData: "rowValue1" },
        { testData: "rowValue2" }
      ]);
    });
};
