import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const defaultData = { universities: [] };
const db = new Low(new JSONFile("./src/models/json/universities.json"), defaultData);

export const universityJsonStore = {
  async getAllUniversities() {
    await db.read();
    return db.data.universities;
  },

  async addUniversity(countyId, university) {
    await db.read();
    university._id = v4();
    university.countyId = countyId;
    db.data.universities.push(university);
    await db.write();
    return university;
  },

  async getUniversitiesByCountyId(id) {
    await db.read();
    return db.data.universities.filter((university) => university.countyId === id);
  },

  async getUniversityById(id) {
    await db.read();
    return db.data.universities.find((university) => university._id === id);
  },

  async deleteUniversityById(id) {
    await db.read();
    const index = db.data.universities.findIndex((university) => university._id === id);
    db.data.universities.splice(index, 1);
    await db.write();
  },

  async deleteAllUniversities() {
    db.data.universities = [];
    await db.write();
  },

  async updateUniversity(university, updatedUniversity) {
    university.name = updatedUniversity.name;
    await db.write();
  },
};
