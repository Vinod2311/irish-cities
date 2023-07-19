import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const counties = await db.countyStore.getAllCounties();
      const viewData = {
        title: "Irish Counties Dashboard",
        counties: counties,
      };
      return h.view("dashboard-view", viewData);
    },
  },



  addCounty: {
    handler: async function (request, h) {
      const newCounty = {
        name: request.payload.name,
      };
      await db.countyStore.addCounty(newCounty);
      return h.redirect("/dashboard");
    },
  },

  deleteCounty: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      await db.countyStore.deleteCountyById(county._id);
      return h.redirect("/dashboard");
    },
  },
};
