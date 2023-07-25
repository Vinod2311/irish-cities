import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { dublin ,testUniversities, TCD} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("University Model tests", () => {
  
  let county = null;

  setup(async () => {
    db.init("mongo");
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

  test("delete all universities", async () => {
    const universities = await db.universityStore.getAllUniversities();
    assert.equal(testUniversities.length, universities.length);
    await db.universityStore.deleteAllUniversities();
    const newUniversities = await db.universityStore.getAllUniversities();
    assert.equal(0, newUniversities.length);
  });

  test("get multiple universities", async () => {
    const universities = await db.universityStore.getUniversitiesByCountyId(county._id);
    assert.equal(universities.length, testUniversities.length)
  });

  test("delete One university - success", async () => {
    await db.universityStore.deleteUniversityById(testUniversities[0]._id);
    const universities = await db.universityStore.getAllUniversities();
    assert.equal(universities.length, testUniversities.length - 1);
    const deletedUniversity = await db.universityStore.getUniversityById(testUniversities[0]._id);
    assert.isNull(deletedUniversity);
  });

  test("get a university - bad params", async () => {
    assert.isNull(await db.universityStore.getUniversityById(""));
    assert.isNull(await db.universityStore.getUniversityById());
  });

  test("delete one university - fail", async () => {
    await db.universityStore.deleteUniversityById("bad-id");
    const universities = await db.universityStore.getAllUniversities();
    assert.equal(universities.length, testUniversities.length);
  });
});