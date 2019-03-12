exports.seed = function(knex, Promise) {
  return (
    knex("activity-log-activities")
      // Delete existing entries handled in 000-cleaner.js
      .then(function() {
        // Inserts seed entries
        return knex("activity-log-activities").insert([
          // user_id = 0 for starter activity log
          {
            // id should initialize to 1
            activity_log_id: 1, // using test activity log
            activity_id: 1,
            enjoyment: 9,
            engagement: 6,
            notes: "Always love boating!"
          },
          {
            activity_log_id: 1,
            activity_id: 2,
            enjoyment: 9,
            engagement: 8,
            notes: "Found Pete!! After 3 months!"
          },
          {
            activity_log_id: 1,
            activity_id: 5,
            enjoyment: 8,
            engagement: 10,
            notes: "Made 3 new dog friends."
          },
          {
            activity_log_id: 1,
            activity_id: 4,
            enjoyment: 9,
            engagement: 4,
            notes: "Gotta take a break!"
          },
          {
            activity_log_id: 2,
            activity_id: 3,
            enjoyment: 5,
            engagement: 10,
            notes: "Tough problem with my hobby!"
          },
          {
            activity_log_id: 2,
            activity_id: 7,
            enjoyment: 7,
            engagement: 4,
            notes: "Take my mind off of hard hobby with TV."
          },
          {
            activity_log_id: 2,
            activity_id: 8,
            enjoyment: 9,
            engagement: 9,
            notes: "TV was boring, play games."
          },
          {
            activity_log_id: 2,
            activity_id: 10,
            enjoyment: 7,
            engagement: 8,
            notes: "Dinner with family."
          }
        ]);
      })
  );
};
