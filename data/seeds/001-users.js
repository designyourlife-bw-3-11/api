const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  let adminPassword = "password";
  let testUserPassword = "pass";

  adminPassword = bcrypt.hashSync(adminPassword, 8);
  testUserPassword = bcrypt.hashSync(testUserPassword, 8);

  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "admin", password: adminPassword },
        { username: "testUser", password: testUserPassword }
      ]);
    });
};
