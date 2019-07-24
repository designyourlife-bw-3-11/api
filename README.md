# API for Lead a Valuable Life -- LVL up your Life!

## >> build weeks team: **design your life** <<

https://backend-designyourlife.herokuapp.com/

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
  id: 1, // activity id
  user_id: 0, // id matches user id of creator. 0 for starter activities (available to anyone)
  name: "first activity", // required
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
    user_id: 0 // corresponding to user who created it
    date: "2019-03-14T06:00:00.000Z" // as returned by new Date('3/14/19')
    outcomes: "Notes on how the day went",
    activities: [
      {
        id: 1, // matches id of an activity,
        ala_id: 4 // activity-log-activities id, used by db.
        name: "Boating", // matches name of activity
        enjoyment: 8,
        engagement: 9,
        notes: "I liked doing this activity"
      },
      {
        id: 2,
        ala_id: 5,
        name: "Hiking",
        enjoyment: 5,
        engagement: 2,
        notes: "I didn't like doing this activity"
      }
    ]
  }
];
```

### **Reflection Log**

Weekly log of activities and associated data about the week.

```js
reflectionLogs = [
  {
    id: 1, // created by database when creating a new reflection
    user_id: 0 // corresponding to user who created it
    date: "2019-03-10T06:00:00.000Z", // as returned by new Date('3/10/19'), use date corresponding to day-beginning the week of the reflection
    reflection: "Some text reflecting on the week"
  },
  {
    id: 2,
    user_id: 0 // corresponding to user who created it
    date: "2019-03-17T06:00:00.000Z",
    reflection: "Another good week"
  }
];
```

### **User data for users routes**:

Used by users with role 0 to modify user data

```js
users: [
  {
    id: 1,
    username: "admin",
    password: "hashed password",
    role: 0,
    created_at: "2019-03-15T14:42:19.018Z",
    updated_at: "2019-03-15T14:42:19.018Z"
  },
  {
    id: 2,
    username: "testUser",
    password: "hashed password",
    role: 1,
    created_at: "2019-03-15T14:42:19.018Z",
    updated_at: "2019-03-15T14:42:19.018Z"
  }
];
```

## The API publishes the following endpoints

### Testing

| Method | URL         | Description                                                                        |
| ------ | ----------- | ---------------------------------------------------------------------------------- |
| GET    | /api/       | Returns JSON: `{ "message": "Server says hi." }` if server is running              |
| GET    | /api/testDb | Returns JSON with some test data if the server's connection to the database is OK. |

### Users

| Method | URL                | Description                                                                                                                                                                      |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/auth/register | Expects JSON conforming to spec: `User data for auth routes`. Returns error if user already exists. If registration is successful, returns username as submitted adn token data. |
| POST   | /api/auth/login    | Expects JSON conforming to spec: `User data for auth routes`. If correct credentials, returns a welcome message and token data.                                                  |

---

---

### The following routes are protected. Provide token returned from successful `register` or `login` as `Authorization` header

### Activities - protected

| Method | URL                     | Description                                                                                                                                                                                                                         |
| ------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/activities/user/id | Must provide `user`, string matching username of a registered user. `id` is optional, if provided will return single activity matching `id`. If `id` is not provided, the entire list of activities created by `user` are returned. |
| POST   | /api/activities/user    | Must provide `user`, string matching username of a registered user. Expects JSON with activity data conforming to spec but do not provide id, this will be created by the database.                                                 |
| PUT    | /api/activities/user    | Must provide `user`, string matching username of a registered user. Expects JSON with activity data conforming to spec. Note: must provide id for activity to be updated.                                                           |
| DELETE | /api/activities/user    | Must provide `user`, string matching username of a registered user. Expects JSON with id for activity to be deleted, for example to delete activity with id 3: `{id: 3}`.                                                           |

### Activity Logs - protected

| Method | URL                        | Description                                                                                                                                                                                                                                |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | /api/activity-logs/user/id | Must provide `user`, string matching username of a registered user. `id` is optional, if provided will return the activity log matching the `id` provided. If `id` is not provided, all activities belonging to the user will be returned. |
| POST   | /api/activity-logs/user    | Must provide `user`, string matching username of a registered user. Expects JSON with activity log data conforming to spec but do not provide id, this will be created by the database.                                                    |
| PUT    | /api/activity-logs/user    | Must provide `user`, string matching username of a registered user. Expects JSON with activity log data conforming to spec. Note: must provide id for activity to be updated.                                                              |
| DELETE | /api/activity-logs/user    | Must provide `user`, string matching username of a registered user. Expects JSON with id for activity log to be deleted, for example to delete activity-log with id 3: `{id: 3}`.                                                          |

### Reflection Logs - protected

| Method | URL                          | Description                                                                                                                                                                               |
| ------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/reflection-logs/user/id | Must provide `user`, a string matching username of a registered user. `id` is optional, if provided will return the reflection log matching the `id` provided.                            |
| POST   | /api/reflection-logs/user    | Must provide `user`, string matching username of a registered user. Expects JSON with reflection log data conforming to spec but do not provide id, this will be created by the database. |
| PUT    | /api/reflection-logs/user    | Must provide `user`, string matching username of a registered user. Expects JSON with reflection log data conforming to spec. Note: must provide id for reflection to be updated.         |
| DELETE | /api/reflection-logs/user    | Must provide `user`, string matching username of a registered user. Expects JSON with id for reflection log to be deleted, for example to delete reflection-log with id 3: `{id: 3}`.     |

### The following routes are protected, AND restricted. Provide token returned from successful `login` as `Authorization` header. Only users with role `0` set in the token may access these routes.

### Users - protected, restricted

| Method | URL           | Description                                                                                                                 |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/users/id | `id` is optional, if provided will return user matching `id`, otherwise returns a list of all registered users.             |
| PUT    | /api/users    | Expects JSON with user data conforming to spec. This is used by an admin to change another user's role (or other user data) |
