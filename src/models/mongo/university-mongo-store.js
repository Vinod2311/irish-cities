import { University } from "./university.js";

export const universityMongoStore = {
  async getAlluniversities() {
    const universities = await University.find().lean();
    return universities;
  },

  async addUniversity(countyId, university) {
    university.countyId = countyId;
    const newUniversity = new University(university);
    const universityObj = await newUniversity.save();
    return this.getUniversityById(universityObj._id);
  },

  async getUniversitiesByCountyId(id) {
    const universities = await University.find({ countyId: id }).lean();
    return universities;
  },

  async getUniversityById(id) {
    if (id) {
      const university = await University.findOne({ _id: id }).lean();
      return university;
    }
    return null;
  },

  async deleteUniversityById(id) {
    try {
      await University.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllUniversities() {
    await University.deleteMany({});
  },

  async updateUniversity(university, updatedUniversity) {
    const universityDoc = await university.findOne({ _id: university._id });
    universityDoc.name = updatedUniversity.name;
    await universityDoc.save();
  },
};
