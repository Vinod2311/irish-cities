import { assert } from "chai";
import { universityService } from "./university-service.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { maggie, testUniversities, dublin, TCD, maggieCredentials } from "../fixtures.js";

const universities = new Array(testUniversities.length);
suite("University API tests", () => {

  let dublinList = null;
  let user = null;

  setup(async () => {
    // db.init("mongo");
    universityService.clearAuth();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
    await universityService.deleteAllCounties();
    await universityService.deleteAllUniversities();
    await universityService.deleteAllUsers();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
    dublinList = await universityService.createCounty(dublin);
    dublinList.userid = user._id;
    for (let i = 0; i < universities.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        universities[i] = await universityService.createUniversity(dublinList._id,testUniversities[i]);
       }
  });
  teardown(async () => {
  });

  test("create a university", async () => {
     const newUniversity = await universityService.createUniversity(dublinList._id,TCD);
     assertSubset(TCD, newUniversity);
     assert.isDefined(newUniversity._id);
  });

  test("get a university - success", async () => {
    const returnedUniversity = await universityService.getUniversity(universities[0]._id);
    assert.deepEqual(universities[0], returnedUniversity);
  });

  test("get a university - bad id", async () => {
    try {
      const returnedUniversity = await universityService.getUniversity("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No university with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });
  
  
  test("delete all universities", async () => {
    let returnedUniversities = await universityService.getAllUniversities();
    assert.equal(returnedUniversities.length, 3);
    await universityService.deleteAllUniversities();
    returnedUniversities = await universityService.getAllUniversities();
    assert.equal(returnedUniversities.length, 0);
  }); 

  test("delete a university - success", async () => {
    let returnedUniversities = await universityService.getAllUniversities();
    assert.equal(returnedUniversities.length, 3);
    await universityService.deleteUniversity(universities[0]._id);
    returnedUniversities = await universityService.getAllUniversities();
    assert.equal(returnedUniversities.length, 2);
  });

  test("delete a university- bad id", async () => {
    try {
        await universityService.deleteUniversity("bad-id");
        assert.fail("Should not return a response");
    } catch (error) {
        assert(error.response.data.message === "No university with this id");
        assert.equal(error.response.data.statusCode, 503);
    }
    
  });

  test("delete a university- deleted id", async () => {
    try {
        await universityService.deleteAllUniversities();
        await universityService.deleteUniversity(universities[0]._id);
        assert.fail("Should not return a response");
    } catch (error) {
        assert(error.response.data.message === "No university with this id");
        assert.equal(error.response.data.statusCode, 404);
    }
    
  });
});
