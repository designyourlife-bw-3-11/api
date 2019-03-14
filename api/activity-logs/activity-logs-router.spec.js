const request = require("supertest");
const server = require("../server.js"); // DOES NOT WORK: require("./activities-router.js");
const db = require("../../data/dbConfig.js");
const tokenSvc = require("../auth/token-service");

const user = { id: 2, username: "testUser" };
const token = tokenSvc.generateToken(user);
const testURL = `/api/activity-logs/${user.username}`;

// note: seed data currently places 2 activity logs containing 4 activities. see seed 005-activity-log-activities.js
// activity log ids begin at 1

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

describe("activities-router.js", () => {
  // check route is protected
  it("should return 401: Unauthorized", async () => {
    const res = await request(server).get(testURL);
    expect(res.status).toBe(401);
  });
  // // check route allows access with token
  // it("should return 200: OK", async () => {
  //   const res = await request(server)
  //     .get(testURL)
  //     .set("Authorization", token);
  //   expect(res.status).toBe(200);
  // });
  // describe("GET", () => {
  //   // check returns single activity log matching id when id is provided
  //   it("should return single activity log", async () => {
  //     const res = await request(server)
  //       .get(`${testURL}/1`)
  //       .set("Authorization", token);
  //     expect(res.body).toEqual(expect.any(Array));
  //   });
  //   // check shape of activity log is correct
  //   it("should should return correct shape of activity log", async () => {
  //     const res = await request(server)
  //       .get(`${testURL}/1`)
  //       .set("Authorization", token);
  //     expect(res.body).toEqual([
  //       {
  //         id: expect.any(Number),
  //         user_id: expect.any(Number),
  //         date: expect.any(String),
  //         outcomes: expect.any(String),
  //         activities: expect.any(Array)
  //       }
  //     ]);
  //   });
  //   // check returns all activities when no id is provided
  //   it("should return all activities", async () => {
  //     const res = await request(server)
  //       .get(`${testURL}`)
  //       .set("Authorization", token);
  //     expect(res.body).toHaveLength(2);
  //   });
  // }); // end GET tests
  // describe("POST", () => {
  //   it("should insert an activity log", async () => {
  //     const resPost = await request(server)
  //       .post(`${testURL}`)
  //       .send(testActivityLog)
  //       .set("Authorization", token);
  //     const resGet = await request(server)
  //       .get(`${testURL}/3`)
  //       .set("Authorization", token);
  //     expect(resPost.status).toBe(201);
  //     expect(resGet.body).toEqual([testActivityLog]);
  //   });
  // }); // end POST tests
  // describe("PUT", () => {
  //   const testActivity = {
  //     id: expect.any(Number),
  //     user_id: 2,
  //     name: "test activity",
  //     description: "test activity description",
  //     created_at: expect.any(String),
  //     updated_at: expect.any(String)
  //   };
  //   it("should return 400 if activity id is missing", async () => {
  //     const missingId = { ...testActivity, id: null };
  //     const res = await request(server)
  //       .put(`${testURL}`)
  //       .send(missingId)
  //       .set("Authorization", token);
  //     expect(res.status).toBe(400);
  //   });
  //   it("should return 400 if activity name is missing", async () => {
  //     const missingName = { ...testActivity, name: null };
  //     const res = await request(server)
  //       .put(`${testURL}`)
  //       .send(missingName)
  //       .set("Authorization", token);
  //     expect(res.status).toBe(400);
  //   });
  //   it("should update an activity", async () => {
  //     const resPut = await request(server)
  //       .put(`${testURL}`)
  //       .send({ id: 1, name: "Updated", description: "Updated description." })
  //       .set("Authorization", token);
  //     expect(resPut.status).toBe(200);
  //     expect(resPut.body.id).toBe(1);
  //     const resGet = await request(server)
  //       .get(`${testURL}/1`)
  //       .set("Authorization", token);
  //     expect(resGet.body).toEqual([
  //       {
  //         ...testActivity,
  //         id: 1,
  //         name: "Updated",
  //         description: "Updated description."
  //       }
  //     ]);
  //   });
  // }); // end PUT tests
  // describe("DELETE", () => {
  //   it("should return 400 if id is not provided", async () => {
  //     const res = await request(server)
  //       .delete(`${testURL}`)
  //       .set("Authorization", token);
  //     expect(res.status).toBe(400);
  //   });
  //   it("should return 400 if id does not match any activity", async () => {
  //     const res = await request(server)
  //       .delete(`${testURL}`)
  //       .send({ id: 100 })
  //       .set("Authorization", token);
  //     expect(res.status).toBe(400);
  //   });
  //   it("should delete an activity", async () => {
  //     // test on deleting activity 11 since this was created in previous test, no logs/reflections depend on it.
  //     const resGetBefore = await request(server)
  //       .get(`${testURL}/11`)
  //       .set("Authorization", token);
  //     const resDel = await request(server)
  //       .delete(`${testURL}`)
  //       .send({ id: 11 })
  //       .set("Authorization", token);
  //     const resGetAfter = await request(server)
  //       .get(`${testURL}/11`)
  //       .set("Authorization", token);
  //     expect(resDel.status).toBe(200);
  //     expect(resGetBefore.status).toBe(200);
  //     expect(resGetAfter.status).toBe(204);
  //   });
  //   it("should not delete an activity if used in logs/reflections", async () => {
  //     const res = await request(server)
  //       .delete(`${testURL}`)
  //       .send({ id: 1 })
  //       .set("Authorization", token);
  //     expect(res.status).toBe(500);
  //     expect(res.body).toEqual({
  //       message: "Activity is used by logs/reflections. Can not delete"
  //     });
  //   });
  // }); // end DELETE TESTS
});
