exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex("activities")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("activities").insert([
        {
          name: "Boating",
          description: "Get in a boat and BOAT!"
        },
        {
          name: "Hiking",
          description: "Get walk out the door and up a hill!"
        },
        {
          name: "Hobby Project",
          description: "Spent some time on that side project finally."
        },
        {
          name: "Have some beer",
          description: "Sit or stand wile enjoying a cold one."
        },
        {
          name: "Read a book",
          description: "A wholesome book."
        },
        {
          name: "Read the news",
          description: "Some troubling news"
        },
        {
          name: "Watch TV",
          description: "Something entertaining"
        },
        {
          name: "Play Video Games",
          description: "On the PC or console maybe."
        },
        {
          name: "Play Internet",
          description:
            "Look at pictures of cats and argue with strangers about them."
        },
        {
          name: "Interact with family",
          description: "Maybe during food."
        }
      ]);
    });
};
