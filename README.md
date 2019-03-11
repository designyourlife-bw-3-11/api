# API for Lead a Valuable Life -- LVL up your Life!

## >> build weeks team: **design your life** <<

## **Data Schemas**

### **User data for auth routes**:

Used for register and login

```js
{
  "username": "userName",
  "password": "password"
}
```

### **Activity Data**:

```js
// single activity:
activity = {
  id: 1,
  name: "first activity",
  description: "How about this activity?" // optional
};

// multiple activities
activities = [
  {
    // activity data
  },
  {
    // activity data
  }
];
```

### **Activity Log**

Daily log of activities plus associated data about each activity

```js
//  (where id is optional, returns a single activity by id)
activityLog = [
  {
    id: 1, // created by database when creating new activity log
    date: 123456, // date in Unix Time Stamp format. Use
    outcomes: "Notes on how the day went",
    activities: [
      {
        id: 1, // matches id of an activity
        enjoyment: 8,
        engagement: 9,
        notes: "I liked doing this activity"
      },
      {
        id: 2,
        enjoyment: 5,
        engagement: 2,
        notes: "I didn't like doing this activity"
      }
    ]
  }
];
```

### **Reflection Log**

Weekly log of activities and associated data bout the week.

```js
// each week obj includes all activities from that week.)
reflections = [
  {
    id: 1, // created by database when creating new reflection
    date: 123456, // Unix Time stamp corresponding to new Date('week-starting sunday date')
    notes: "optional reflection on the week",
    activityLogs: [ // all activity logs for the week
      {
        // first activity log from the week
      },
      {
        // second activity log from the week
      },
      ...
    ]
    activities: [ // all activities from the week, averages for enjoyment and engagement
      {
        id: 1,
        name: "Activity Name",
        description: "Activity Description",
        enjoyment: 8, // <weekly avg for this week>
        engagement: 9, // <weekly avg for this week>
      },
      {
        id: 2,
        name: "Activity Name",
        description: "Activity Description",
        enjoyment: 5, // <weekly avg for this week>
        engagement: 3, // <weekly avg for this week>
      },
    ]
  }
]
```

## The API publishes the following endpoints

| Method | URL                | Description                                                                        |
| ------ | ------------------ | ---------------------------------------------------------------------------------- |
| GET    | /api/              | Returns JSON: `{ "message": "Server says hi." }` if server is running              |
| GET    | /api/testDb        | Returns JSON with some test data if the server's connection to the database is OK. |
| POST   | /api/auth/register | Expects JSON conforming to spec: `User data for auth routes`                       |

## Todo:

| Method | URL                         | Description                                                                                                                                                                                                                         |
| ------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/user/activity/id       | Must provide `user`, string matching username of a registered user. `id` is optional, if provided will return single activity matching `id`. If `id` is not provided, the entire list of activities created by `user` are returned. |
| GET    | /api/user/activity-log/id   | Must provide `user`, string matching username of a registered user. `id` is optional, if provided will return the activity log matching the `id` provided                                                                           |
| GET    | /api/user/reflection-log/id | Must provide `user`, a string matching username of a registered user. `id` is optional, if provided will return the reflection log matching the `id` provided.                                                                      |
