exports.seed = function(knex, Promise) {
  return (
    knex("reflection-logs")
      // Delete existing entries handled in 000-cleaner.js
      .then(function() {
        // Inserts seed entries
        return knex("reflection-logs").insert([
          {
            // activity id should initialize to 1
            // setting user_id corresponding to testUser
            user_id: 2,
            date: new Date("2019,3,3"),
            reflection: "Nice week!"
          },
          {
            // id should initialize to 1
            user_id: 2,
            date: new Date("2019,3,10"),
            reflection: "Good week!"
          }
        ]);
      })
  );
};
