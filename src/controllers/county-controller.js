import { db } from "../models/db.js";

export const countyController = {
  index: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const viewData = {
        title: "County",
        county: county,
      };
      return h.view("county-view", viewData);
    },
  },

  

  addUniversity: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const newUniversity = {
        name: request.payload.name,
      };
      await db.universityStore.addUniversity(county._id, newUniversity);
      return h.redirect(`/county/${county._id}`);
    },
  },

  deleteUniversity: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      await db.universityStore.deleteUniversityById(request.params.universityId);
      return h.redirect(`/county/${county._id}`);
    },
  },
};
