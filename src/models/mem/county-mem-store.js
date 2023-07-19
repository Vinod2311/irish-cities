import { v4 } from "uuid";
import { universityMemStore } from "./university-mem-store.js";

let counties = [];

export const countyMemStore = {
  async getAllCounties() {
    return counties;
  },

  async addCounty(county) {
    county._id = v4();
    counties.push(county);
    return county;
  },

  async getCountyById(id) {
    const list = counties.find((county) => county._id === id);
    list.universities = await universityMemStore.getUniversitiesByCountyId(list._id);
    return list;
  },

  async deleteCountyById(id) {
    const index = counties.findIndex((county) => county._id === id);
    counties.splice(index, 1);
  },

  async deleteAllCounties() {
    counties = [];
  },
};
