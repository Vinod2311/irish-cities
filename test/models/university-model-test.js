import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { dublin ,testUniversities, TCD} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("University Model tests", () => {
  
  let county = null;

  setup(async () => {
    db.init("json");
    await db.countyStore.deleteAllCounties();
    await db.universityStore.deleteAllUniversities();
    county = await db.countyStore.addCounty(dublin)
    for (let i = 0; i < testUniversities.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUniversities[i] = await db.universityStore.addUniversity(county._id, testUniversities[i]);
    }
  });

  test("create a university", async () => {
    const university = await db.universityStore.addUniversity(county._id, TCD);
    assertSubset(TCD, university);
    assert.isDefined(university._id);
  });

  test("get a university- success", async () => {
    const university =await db.universityStore.addUniversity(county._id, TCD);
    const returnedUniversity = await db.universityStore.getUniversityById(university._id);
    assertSubset(university, returnedUniversity);
  });
});