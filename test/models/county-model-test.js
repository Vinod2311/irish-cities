import { assert } from "chai";
import { EventEmitter } from "events";
import { writeFileSync,readFileSync,readFile } from "fs";
import { db } from "../../src/models/db.js";
import { testCounties, dublin,maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { imageStore } from "../../src/models/images-store.js";


suite("County Model tests", () => {
  
  let user = null;

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
    await db.countyStore.deleteAllCounties();
    await db.universityStore.deleteAllUniversities();
    user = await db.userStore.addUser(maggie);
    for (let i = 0; i < testCounties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCounties[i] = await db.countyStore.addCounty(testCounties[i],user._id);
    }
  });

  test("create a county", async () => {
    const county = await db.countyStore.addCounty(dublin, user._id);
    assertSubset(dublin, county);
    assert.isDefined(county._id);
  });

  test("get a county- success", async () => {
    const county =await db.countyStore.addCounty(dublin, user._id);
    const returnedCounty = await db.countyStore.getCountyById(county._id);
    assertSubset(county, returnedCounty);
  });



  test("delete all Counties", async () => {
    let returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, 3);
    await db.countyStore.deleteAllCounties();
    returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, 0);
  });

  test("delete One County - success", async () => {
    const id = testCounties[0]._id;
    await db.countyStore.deleteCountyById(id);
    const returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, testCounties.length - 1);
    const deletedCounty = await db.countyStore.getCountyById(id);
    assert.isNull(deletedCounty);
  });

  test("get a county - bad params", async () => {
    assert.isNull(await db.countyStore.getCountyById(""));
    assert.isNull(await db.countyStore.getCountyById());
  });

  test("delete One county - fail", async () => {
    await db.countyStore.deleteCountyById("bad-id");
    const allCounties = await db.countyStore.getAllCounties();
    assert.equal(testCounties.length, allCounties.length);
  });
/*
  test("Upload an image - success", async () => {
    const county = await db.countyStore.addCounty(dublin, user._id);
    const imagefile = readFileSync('./public/images/test-image.jpg');
    await db.countyStore.uploadImage(imagefile,county._id);
    
  });
*/
  
});