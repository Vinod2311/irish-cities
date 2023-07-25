import { assert } from "chai";
import { universityService } from "./university-service.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { testCounties, dublin, maggie } from "../fixtures.js";

const counties = new Array(testCounties.length);
suite("County API tests", () => {

  let user = null;

  setup(async () => {
    db.init("mongo");
    /* universityService.clearAuth();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggie); */
    await universityService.deleteAllUniversities();
    await universityService.deleteAllCounties();
    await universityService.deleteAllUsers();
    user = await universityService.createUser(maggie);
    // await universityService.authenticate(maggie);
     dublin.userId = user._id;
      for (let i = 0; i < testCounties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      counties[i] = await universityService.createCounty(testCounties[i]);
    }  
  }); 
  teardown(async () => {
  });

  test("create a county", async () => {
    const newCounty = await universityService.createCounty(dublin);
    assertSubset(dublin, newCounty);
    assert.isDefined(newCounty._id);
  });

  test("delete all counties", async () => {
    let returnedCounties = await universityService.getAllCounties();
    assert.equal(returnedCounties.length, 3);
    await universityService.deleteAllCounties();
    returnedCounties = await universityService.getAllCounties();
    assert.equal(returnedCounties.length, 0);
  });

  test("delete a county", async () => {
    let returnedCounties = await universityService.getAllCounties();
    assert.equal(returnedCounties.length, 3);
    await universityService.deleteCounty(counties[0]._id);
    returnedCounties = await universityService.getAllCounties();
    assert.equal(returnedCounties.length, 2);
  });

  test("delete a county- bad id", async () => {
    try {
        await universityService.deleteCounty("bad-id");
        assert.fail("Should not return a response");
    } catch (error) {
        assert(error.response.data.message === "No county with this id");
        assert.equal(error.response.data.statusCode, 503);
    }
    
  });


  test("get a county - success", async () => {
    const returnedCounty = await universityService.getCounty(counties[0]._id);
    assertSubset(counties[0], returnedCounty);
  });


  test("get a county - bad id", async () => {
    try {
      const returnedCounty = await universityService.getCounty("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No county with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a county - deleted county", async () => {
    await universityService.deleteAllCounties();
    try {
      const returnedCounty = await universityService.getCounty(counties[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No county with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });



});
