import { assert } from "chai";
import { universityService } from "./university-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers, maggieCredentials } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);
suite("User API tests", () => {
  
  let user = null;

  setup(async () => {
    db.init("mongo")
    universityService.clearAuth();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
    await universityService.deleteAllUsers();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await universityService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await universityService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await universityService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await universityService.deleteAllUsers();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
    returnedUsers = await universityService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await universityService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await universityService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      // assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await universityService.deleteAllUsers();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
    try {
      const returnedUser = await universityService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });


});
