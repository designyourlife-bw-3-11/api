exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex("activity-logs")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("activity-logs").insert([
        // user_id = 0 for starter activity log
        {
          // id should initialize to 1
          user_id: 0,
          date: new Date("2019,3,14"),
          outcomes: "What a nice Day!"
        }
      ]);
    });
};