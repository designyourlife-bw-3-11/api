exports.up = function(knex, Promise) {
  return Promise.all([
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
      // ***** activities table *****
      .createTable("activities", tbl => {
        tbl.increments();
        tbl.integer("user_id");
        tbl
          .string("name", 128)
          .notNullable()
          .unique();
        tbl.text("description");
        tbl.timestamps(true, true);
      })
      // ***** activity logs table  *****
      .createTable("activity-logs", tbl => {
        // primary key
        tbl.increments();
        // foreign key -> user id of owner
        tbl
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE");
        // date of activity log
        tbl.string("date"); // integer type is a headache in pg
        // notes by user on how the day went
        tbl.text("outcomes");
      })
      // ***** activity-log/activities table *****
      .createTable("activity-log-activities", tbl => {
        // primary key
        tbl.increments();
        // foreign key -> id of activity log
        tbl
          .integer("activity_log_id")
          .unsigned()
          .references("id")
          .inTable("activity-logs")
          .onUpdate("CASCADE");
        // foreign key -> id of activity
        tbl
          .integer("activity_id")
          .unsigned()
          .references("id")
          .inTable("activities")
          .onUpdate("CASCADE");
        tbl.integer("enjoyment").unsigned();
        tbl.integer("engagement").unsigned();
        tbl.text("notes");
      })
  ]);
};

exports.down = function(knex, Promise) {
  return (
    knex.schema
      // had to use .raw method here to get access to CASCADE
      // NOTE the type of quote used matters!
      // .dropTableIfExists("test")
      .raw('drop table if exists "test" CASCADE')
      // .dropTableIfExists("users")
      .raw('DROP TABLE IF EXISTS "users" CASCADE')
      // .dropTableIfExists("activities")
      .raw('DROP TABLE IF EXISTS "activities" CASCADE')
      // .dropTableIfExists("activity-logs")
      .raw('DROP TABLE IF EXISTS "activity-logs" CASCADE')
      .raw('DROP TABLE IF EXISTS "activity-log-activities" CASCADE')
  );
};
