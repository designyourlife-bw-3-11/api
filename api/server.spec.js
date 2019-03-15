const request = require("supertest");
const jwt = require("jsonwebtoken");

const server = require("./server.js");

const db = require("../data/dbConfig.js");
const tokenSvc = require("./auth/token-service.js");

const secret = process.env.JWT_SECRET || "testing secret";
const user = { id: 2, username: "testUser" };
const token = tokenSvc.generateToken(user);
const activitiesRouterURL = `/api/activities/${user.username}`;
const activityLogRouterURL = `/api/activity-logs/${user.username}`;
const authRouterURL = `/api/auth/`;
const usersURL = `/api/users/`;

// notes:
// - seed data currently places:
//    testUser, password = pass
//    admin,  password = password
//    10 activities
//      activity ids begin at 1
//    2 activity logs containing 4 activities.
//      activity log ids begin at 1
beforeAll(async done => {
  // reset db
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
  return done();
});

describe("server.js", () => {
  describe("baseline", () => {
    it("should set testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
    describe("GET /", () => {
      it("should return 200 OK", async () => {
        const res = await request(server).get("/");
        expect(res.status).toBe(200);
      });
      it("should return JSON", async () => {
        const res = await request(server).get("/");
        expect(res.type).toBe("application/json");
      });
      it("should return { server: 'says hi!' }", async () => {
        const res = await request(server).get("/");
        expect(res.body).toEqual({ message: "Server says hi." });
      });
    });
    describe("GET /testDb", () => {
      it("should return 200 OK", async () => {
        const res = await request(server).get("/");
        expect(res.status).toBe(200);
      });
      it("should return JSON", async () => {
        const res = await request(server).get("/");
        expect(res.type).toBe("application/json");
      });
    });
  }); // end baseline tests

  describe("activities-router.js", () => {
    // check route is protected
    it("should return 401: Unauthorized", async () => {
      const res = await request(server).get(activitiesRouterURL);
      expect(res.status).toBe(401);
    });
    // check route allows access with token
    it("should return 200: OK", async () => {
      const res = await request(server)
        .get(activitiesRouterURL)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });
    describe("GET", () => {
      // check returns single activity when id is provided
      it("should return single activity", async () => {
        const res = await request(server)
          .get(`${activitiesRouterURL}/1`)
          .set("Authorization", token);
        expect(res.body).toEqual([
          {
            id: 1, // must match requested id
            user_id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String)
          }
        ]);
      });
      // check returns all activities when no id is provided
      it("should return all activities", async () => {
        const res = await request(server)
          .get(`${activitiesRouterURL}`)
          .set("Authorization", token);
        expect(res.body).toHaveLength(10);
      });
    }); // end GET tests
    describe("POST", () => {
      const testActivity = {
        id: expect.any(Number),
        user_id: 2,
        name: "test activity",
        description: "test activity description",
        created_at: expect.any(String),
        updated_at: expect.any(String)
      };
      it("should return 400 if activity name is missing", async () => {
        const missingName = { ...testActivity, name: null };
        const res = await request(server)
          .post(`${activitiesRouterURL}`)
          .send(missingName)
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should insert an activity", async () => {
        const resPost = await request(server)
          .post(`${activitiesRouterURL}`)
          .send(testActivity)
          .set("Authorization", token);
        const resGet = await request(server)
          .get(`${activitiesRouterURL}/11`)
          .set("Authorization", token);
        expect(resPost.status).toBe(201);
        expect(resGet.body).toEqual([testActivity]);
      });
    }); // end POST tests
    describe("PUT", () => {
      const testActivity = {
        id: expect.any(Number),
        user_id: 2,
        name: "test activity",
        description: "test activity description",
        created_at: expect.any(String),
        updated_at: expect.any(String)
      };
      it("should return 400 if activity id is missing", async () => {
        const missingId = { ...testActivity, id: null };
        const res = await request(server)
          .put(`${activitiesRouterURL}`)
          .send(missingId)
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should return 400 if activity name is missing", async () => {
        const missingName = { ...testActivity, name: null };
        const res = await request(server)
          .put(`${activitiesRouterURL}`)
          .send(missingName)
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should update an activity", async () => {
        const resPut = await request(server)
          .put(`${activitiesRouterURL}`)
          .send({ id: 1, name: "Updated", description: "Updated description." })
          .set("Authorization", token);
        expect(resPut.status).toBe(200);
        expect(resPut.body.id).toBe(1);
        const resGet = await request(server)
          .get(`${activitiesRouterURL}/1`)
          .set("Authorization", token);
        expect(resGet.body).toEqual([
          {
            ...testActivity,
            id: 1,
            name: "Updated",
            description: "Updated description."
          }
        ]);
      });
    }); // end PUT tests
    describe("DELETE", () => {
      it("should return 400 if id is not provided", async () => {
        const res = await request(server)
          .delete(`${activitiesRouterURL}`)
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should return 400 if id does not match any activity", async () => {
        const res = await request(server)
          .delete(`${activitiesRouterURL}`)
          .send({ id: 100 })
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should delete an activity", async () => {
        // test on deleting activity 11 since this was created in previous test, no logs/reflections depend on it.
        const resGetBefore = await request(server)
          .get(`${activitiesRouterURL}/11`)
          .set("Authorization", token);
        const resDel = await request(server)
          .delete(`${activitiesRouterURL}`)
          .send({ id: 11 })
          .set("Authorization", token);
        const resGetAfter = await request(server)
          .get(`${activitiesRouterURL}/11`)
          .set("Authorization", token);
        expect(resDel.status).toBe(200);
        expect(resGetBefore.status).toBe(200);
        expect(resGetAfter.status).toBe(204);
      });
      it("should not delete an activity if used in logs/reflections", async () => {
        const res = await request(server)
          .delete(`${activitiesRouterURL}`)
          .send({ id: 1 })
          .set("Authorization", token);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({
          message: "Activity is used by logs/reflections. Can not delete"
        });
      });
    }); // end DELETE TESTS
  }); // end activities-router tests

  describe("activity-logs-router.js", () => {
    const testActivity = {
      id: expect.any(Number),
      ala_id: expect.any(Number),
      name: expect.any(String),
      enjoyment: expect.any(Number),
      engagement: expect.any(Number),
      notes: expect.any(String)
    };

    const testActivityLog = {
      date: new Date("3/14/19"),
      outcomes: "Test Outcomes",
      activities: [
        {
          id: 1,
          enjoyment: 8,
          engagement: 8,
          notes: "Test activity notes"
        },
        {
          id: 2,
          enjoyment: 9,
          engagement: 9,
          notes: "Test activity 2 notes"
        }
      ]
    };
    // check route is protected
    it("should return 401: Unauthorized", async () => {
      const res = await request(server).get(activityLogRouterURL);
      expect(res.status).toBe(401);
    });
    // check route allows access with token
    it("should return 200: OK", async () => {
      const res = await request(server)
        .get(activityLogRouterURL)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });
    describe("GET", () => {
      // check returns single activity log matching id when id is provided
      it("should return single activity log", async () => {
        const res = await request(server)
          .get(`${activityLogRouterURL}/1`)
          .set("Authorization", token);
        expect(res.body).toEqual(expect.any(Array));
      });
      // check shape of activity log is correct
      it("should should return correct shape of activity log", async () => {
        const res = await request(server)
          .get(`${activityLogRouterURL}/1`)
          .set("Authorization", token);
        expect(res.body).toEqual([
          {
            id: expect.any(Number),
            user_id: expect.any(Number),
            date: expect.any(String),
            outcomes: expect.any(String),
            activities: expect.any(Array)
          }
        ]);
      });
      // check returns all activities when no id is provided
      it("should return all activities", async () => {
        const res = await request(server)
          .get(`${activityLogRouterURL}`)
          .set("Authorization", token);
        expect(res.body).toHaveLength(2);
      });
    }); // end GET tests
    describe("POST", () => {
      it("should insert an activity log", async () => {
        const resPost = await request(server)
          .post(`${activityLogRouterURL}`)
          .send(testActivityLog)
          .set("Authorization", token);
        const resGet = await request(server)
          .get(`${activityLogRouterURL}/3`)
          .set("Authorization", token);
        expect(resPost.status).toBe(201);
        expect(resGet.body).toEqual(expect.any(Array));
      });
    }); // end POST tests
    describe("PUT", () => {
      it("should return 400 if activity id is missing", async () => {
        const missingId = { ...testActivityLog, id: null };
        const res = await request(server)
          .put(`${activityLogRouterURL}`)
          .send(missingId)
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should update an activity log", async () => {
        // get an activity log to update
        const resLog = await request(server)
          .get(`${activityLogRouterURL}/1`)
          .set("Authorization", token);
        const [log] = resLog.body;
        // make change to an outcomes and activity
        const activitiesUpdate = [...log.activities];
        activitiesUpdate[0] = {
          ...activitiesUpdate[0],
          engagement: 10,
          enjoyment: 10
        };
        const logUpdate = {
          ...log,
          outcomes: "Updated",
          activities: activitiesUpdate
        };
        const resPut = await request(server)
          .put(`${activityLogRouterURL}`)
          .send(logUpdate)
          .set("Authorization", token);
        expect(resPut.status).toBe(200);
        // get back same activity log, see if changes were made
        const resGet = await request(server)
          .get(`${activityLogRouterURL}/1`)
          .set("Authorization", token);
        expect(resGet.body).toEqual([logUpdate]);
        // console.log(resGet.body);
      });
    }); // end PUT tests
    describe("DELETE", () => {
      it("should return 400 if id is not provided", async () => {
        const res = await request(server)
          .delete(`${activityLogRouterURL}`)
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should return 400 if id does not match any activity log", async () => {
        const res = await request(server)
          .delete(`${activityLogRouterURL}`)
          .send({ id: 100 })
          .set("Authorization", token);
        expect(res.status).toBe(400);
      });
      it("should delete an activity log", async () => {
        // test on deleting activity log 3 since this was created in previous test
        const resGetBefore = await request(server)
          .get(`${activityLogRouterURL}/3`)
          .set("Authorization", token);
        const resDel = await request(server)
          .delete(`${activityLogRouterURL}`)
          .send({ id: 3 })
          .set("Authorization", token);
        const resGetAfter = await request(server)
          .get(`${activityLogRouterURL}/3`)
          .set("Authorization", token);
        expect(resDel.status).toBe(200);
        expect(resGetBefore.status).toBe(200);
        expect(resGetAfter.status).toBe(204);
      });
    }); // end DELETE TESTS
  });

  describe("auth-router.js", () => {
    describe("/login", () => {
      // login should log in a registered user
      it("should return 200", async () => {
        const res = await request(server)
          .post(`${authRouterURL}/login`)
          .send({ username: "testUser", password: "pass" });
        expect(res.status).toBe(200);
      });
      // login should return a valid token for good login
      it("should return a valid token", async () => {
        const res = await request(server)
          .post(`${authRouterURL}/login`)
          .send({ username: "testUser", password: "pass" });
        const verify = jwt.verify(res.body.token, secret);
        expect(verify).toEqual(expect.any(Object));
        // console.log(verify);
      });
      // login should return role "0" for admin, "1" for testUser vc
      it("should return correct role", async () => {
        const resAdmin = await request(server)
          .post(`${authRouterURL}/login`)
          .send({ username: "admin", password: "password" });
        const resUser = await request(server)
          .post(`${authRouterURL}/login`)
          .send({ username: "testUser", password: "pass" });
        const verifyAdmin = jwt.verify(resAdmin.body.token, secret);
        expect(verifyAdmin.role).toEqual(0);
        const verifyUser = jwt.verify(resUser.body.token, secret);
        expect(verifyUser.role).toEqual(1);
      });
    });
    describe("/register", () => {
      // register should return 400 if username or password are missing
      it("should return 400 if no username or password", async () => {
        const resNoUser = await request(server)
          .post(`${authRouterURL}/register`)
          .send({ username: "", password: "something" });
        const resNoPass = await request(server)
          .post(`${authRouterURL}/register`)
          .send({ username: "someuser", password: "" });
        expect(resNoUser.status).toBe(400);
        expect(resNoPass.status).toBe(400);
      });
      // register should create new user
      it("should create new user", async () => {
        const res = await request(server)
          .post(`${authRouterURL}/register`)
          .send({ username: "newUser1", password: "newPassword" });
        expect(res.status).toBe(201);
      });
      // register should create user with role: 1
      it("should register a new user with role:1", async () => {
        const res = await request(server)
          .post(`${authRouterURL}/register`)
          .send({ username: "newUser2", password: "newPassword" });
        expect(res.body.role).toBe(1);
      });
    });
  });

  describe("user-router.js", () => {
    describe("GET", () => {
      it("should return a list of users", async () => {
        const res = await request(server).get(`${usersURL}`);
        expect(res.status).toBe(200);
      });
    });
  });
}); // end tests
