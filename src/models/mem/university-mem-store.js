import { v4 } from "uuid";

let universities = [];

export const universityMemStore = {
  async getAllUniversities() {
    return universities;
  },

  async addUniversity(countyId, university) {
    university._id = v4();
    university.countyId = countyId;
    universities.push(university);
    return university;
  },

  async getUniversityById(id) {
    return universities.find((university) => university._id === id);
  },

  async getUniversitiesByCountyId(id) {
    return universities.filter((university) => university.countyId === id);
  },

  async deleteUniversityById(id) {
    const index = universities.findIndex((university) => university._id === id);
    universities.splice(index, 1);
  },

  async deleteAllUniversities() {
    universities = [];
  },
};
