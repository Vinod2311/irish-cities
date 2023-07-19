import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { universityJsonStore } from "./university-json-store.js";

const defaultData = { counties: [] };
const db = new Low(new JSONFile("./src/models/json/counties.json"), defaultData);

export const countyJsonStore = {
  async getAllCounties() {
    await db.read();
    return db.data.counties;
  },

  async addCounty(county) {
    await db.read();
    county._id = v4();
    db.data.counties.push(county);
    await db.write();
    return county;
  },

  async getCountyById(id) {
    await db.read();
    const list = db.data.counties.find((county) => county._id === id);
    list.universities = await universityJsonStore.getUniversitiesByCountyId(list._id);
    return list;
  },

  async getUserCounties(userId) {
    await db.read();
    return db.data.counties.filter((county) => county.userId === userId);
  },

  async deleteCountyById(id) {
    await db.read();
    const index = db.data.counties.findIndex((county) => county._id === id);
    db.data.counties.splice(index, 1);
    await db.write();
  },

  async deleteAllCounties() {
    db.data.counties = [];
    await db.write();
  },
};
