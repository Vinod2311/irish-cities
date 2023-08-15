import { assert } from "chai";
import {readFileSync} from "fs";
import { universityService } from "./university-service.js";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { testCounties, dublin, maggie, maggieCredentials } from "../fixtures.js";
import { imageStore } from "../../src/models/images-store.js";

const counties = new Array(testCounties.length);
suite("County API tests", () => {

  let user = null;

  setup(async () => {
    // db.init("mongo");
    universityService.clearAuth();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials); 
    await universityService.deleteAllUniversities();
    await universityService.deleteAllCounties();
    await universityService.deleteAllUsers();
    user = await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
      for (let i = 0; i < testCounties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      counties[i] = await universityService.createCounty(testCounties[i],user._id);
    }  
  }); 
  teardown(async () => {
  });

  test("create a county", async () => {
    const newCounty = await universityService.createCounty(dublin,user._id);
    assertSubset(dublin, newCounty);
    assert.isDefined(newCounty._id);
  });

  test("get user counties", async () => {
    const returnedCounties = await universityService.getUserCounties(user._id);
    assert.equal(returnedCounties.length,3);

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

  test("Upload an image - success", async () => {
    const newCounty = await universityService.createCounty(dublin,user._id);
    const imagefile = readFileSync('./public/images/test-image.jpg');
    await imageStore.uploadImage(imagefile);
    await universityService.uploadImage(imagefile,newCounty._id);

  });


});
