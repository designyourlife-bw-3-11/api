exports.seed = function(knex, Promise) {
  return (
    knex("activity-logs")
      // Delete existing entries handled in 000-cleaner.js
      .then(function() {
        // Inserts seed entries
        return knex("activity-logs").insert([
          // user_id = 0 for starter activity log
          {
            // activity id should initialize to 1
            // setting user_id corresponding to testUser
            user_id: 2,
            date: new Date("2019,3,14"),
            outcomes: "What a nice Day!"
          },
          {
            // id should initialize to 1
            user_id: 2,
            date: new Date("2019,3,15"),
            outcomes: "Colder day."
          }
        ]);
      })
  );
};
