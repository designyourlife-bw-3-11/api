exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex("activity-log-activities")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("activity-log-activities").insert([
        // user_id = 0 for starter activity log
        {
          // id should initialize to 1
          activity_log_id: 1, // using test activity log
          activity_id: 0,
          enjoyment: 9,
          engagement: 6,
          notes: "Always love boating!"
        },
        {
          activity_log_id: 1,
          activity_id: 2,
          enjoyment: 9,
          engagement: 8,
          notes: "Always love hiking!"
        },
        {
          activity_log_id: 1,
          activity_id: 5,
          enjoyment: 8,
          engagement: 10,
          notes: "Expanded my mind."
        },
        {
          activity_log_id: 1,
          activity_id: 4,
          enjoyment: 9,
          engagement: 4,
          notes: "Gotta take a break!"
        }
      ]);
    });
};
