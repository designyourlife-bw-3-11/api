const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  let adminPassword = "password";
  let testUserPassword = "pass";

  adminPassword = bcrypt.hashSync(adminPassword, 8);
  testUserPassword = bcrypt.hashSync(testUserPassword, 8);

  return (
    knex("users")
      // Delete existing entries handled in 000-cleaner.js
      .then(function() {
        // Inserts seed entries
        return knex("users").insert([
          { username: "admin", password: adminPassword, role: 0 },
          { username: "testUser", password: testUserPassword, role: 1 }
        ]);
      })
  );
};
