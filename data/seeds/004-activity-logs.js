exports.seed = function(knex, Promise) {
  return (
    knex("activity-logs")
      // Delete existing entries handled in 000-cleaner.js
      .then(function() {
        // Inserts seed entries
        return knex("activity-logs").insert([
          // user_id = 0 for starter activity log
          {
            // id should initialize to 1
            user_id: 0,
            date: 1552543200000, //new Date("2019,3,14"),
            outcomes: "What a nice Day!"
          },
          {
            // id should initialize to 1
            user_id: 0,
            date: 1552629600000, //new Date("2019,3,15"),
            outcomes: "Colder day."
          }
        ]);
      })
  );
};
