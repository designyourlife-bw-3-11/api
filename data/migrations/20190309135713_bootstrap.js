exports.up = function(knex, Promise) {
  return (
    knex.schema
      // ***** test table *****
      .createTable("test", tbl => {
        tbl.increments();
        tbl
          .string("testData", 128)
          .notNullable()
          .unique();
        tbl.timestamps(true, true);
      })
      // ***** users table *****
      .createTable("users", tbl => {
        tbl.increments();
        tbl
          .string("username", 128)
          .notNullable()
          .unique();
        tbl.string("password", 128).notNullable();
        tbl.timestamps(true, true);
      })
      .createTable("activities", tbl => {
        tbl.increments();
        tbl
          .string("name", 128)
          .notNullable()
          .unique();
        tbl.text("description");
        tbl.timestamps(true, true);
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("test").dropTableIfExists("users");
};
