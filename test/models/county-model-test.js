import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { testCounties, dublin } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("County Model tests", () => {
  
  
  setup(async () => {
    db.init("json");
    await db.countyStore.deleteAllCounties();
    for (let i = 0; i < testCounties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCounties[i] = await db.countyStore.addCounty(testCounties[i]);
    }
  });

  test("create a county", async () => {
    const county = await db.countyStore.addCounty(dublin);
    assertSubset(dublin, county);
    assert.isDefined(county._id);
  });

  test("get a county- success", async () => {
    const county =await db.countyStore.addCounty(dublin);
    const returnedCounty = await db.countyStore.getCountyById(county._id);
    assertSubset(county, returnedCounty);
  });
});