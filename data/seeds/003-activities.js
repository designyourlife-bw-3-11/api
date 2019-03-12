exports.seed = function(knex, Promise) {
  return (
    knex("activities")
      // Delete existing entries handled in 000-cleaner.js
      .then(function() {
        // Inserts seed entries
        return knex("activities").insert([
          // user_id = 0 for starter activity
          {
            user_id: 0,
            name: "Boating",
            description: "Get in a boat and BOAT!"
          },
          {
            user_id: 0,
            name: "Hiking",
            description: "Get walk out the door and up a hill!"
          },
          {
            user_id: 0,
            name: "Hobby Project",
            description: "Spent some time on that side project finally."
          },
          {
            user_id: 0,
            name: "Have some beer",
            description: "Sit or stand wile enjoying a cold one."
          },
          {
            user_id: 0,
            name: "Read a book",
            description: "A wholesome book."
          },
          {
            user_id: 0,
            name: "Read the news",
            description: "Some troubling news"
          },
          {
            user_id: 0,
            name: "Watch TV",
            description: "Something entertaining"
          },
          {
            user_id: 0,
            name: "Play Video Games",
            description: "On the PC or console maybe."
          },
          {
            user_id: 0,
            name: "Play Internet",
            description:
              "Look at pictures of cats and argue with strangers about them."
          },
          {
            user_id: 0,
            name: "Interact with family",
            description: "Maybe during food."
          }
        ]);
      })
  );
};
