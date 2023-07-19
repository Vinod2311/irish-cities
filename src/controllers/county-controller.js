import { db } from "../models/db.js";
import { universitySpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: universitySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
          return h.view("county-view", {title: "Add university error", errors: error.details }).takeover().code(400);
      }
  },
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const newUniversity = {
        name: request.payload.name,
        lat: request.payload.lat,
        lng: request.payload.lng,
        description: request.payload.description,
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
