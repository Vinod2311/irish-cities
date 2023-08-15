import { County} from "./county.js";
import { universityMongoStore } from "./university-mongo-store.js";


export const countyMongoStore = {
  async getAllCounties() {
    const counties = await County.find().lean();
    return counties;
  },

  async getCountyById(id) {
    if (id) {
      const county = await County.findOne({ _id: id }).lean();
      if (county) {
        county.universities = await universityMongoStore.getUniversitiesByCountyId(county._id);
      }
      return county;
    }
    return null;
  },

  async addCounty(county,userId) {
    county.userId = userId;
    const newCounty = new County(county);
    const countyObj = await newCounty.save();
    return this.getCountyById(countyObj._id);
  },

  async getUserCounties(id) {
    const counties = await County.find({ userId: id }).lean();
    return counties;
  },

  async deleteCountyById(id) {
    try {
      await County.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCounties() {
    await County.deleteMany({});
  },

  async updateCounty(updatedCounty) {
    const county = await County.findOne({ _id: updatedCounty._id });
    county.name = updatedCounty.name;
    county.img = updatedCounty.img;
    await county.save();
  },

};
