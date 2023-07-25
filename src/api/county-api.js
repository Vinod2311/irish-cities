import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { idSpec, countyArraySpec, countySpec, countySpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const countyApi = {
  find: {
    auth: {
      strategy: "jwt"
    },
    tags: ["api"],
    description: "Return all counties",
    notes: "Returns all counties", 
    handler: async function (request, h) {
      try {
        const counties = await db.countyStore.getAllCounties();
        return counties;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    response: { schema: countyArraySpec, failAction: validationError}
  },

  findOne: {
    auth: {
      strategy: "jwt"
    }, 
    validate: { params: { id: idSpec}, failAction: validationError},
    tags: ["api"],
    description: "Return a specific county",
    notes: "Return a county with the ID given", 
    handler: async function (request, h) {
      try {
        const county = await db.countyStore.getCountyById(request.params.id);
        if (!county) {
          return Boom.notFound("No county with this id");
        }
        return county;
      } catch (err) {
        return Boom.serverUnavailable("No county with this id");
      }
    },
    response: { schema: countySpecPlus, failAction: validationError}
  },

  deleteOne: {
    auth: {
      strategy: "jwt"
    },
    validate: { params: { id: idSpec}, failAction: validationError},
    tags: ["api"],
    description: "Delete a specific county",
    notes: "Deletes a county with the ID given",  
    handler: async function (request, h) {
      try {
        const county = await db.countyStore.getCountyById(request.params.id);
        if (!county) {
          return Boom.notFound("No county with this id");
        }
        await db.countyStore.deleteCountyById(county._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No county with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt"
    },
    tags: ["api"],
    description: "Create a county",
    notes: "Creates a county and returns the created county",
    validate: { payload: countySpec, failAction: validationError}, 
    handler: async function (request, h) {
      try {
        const county = await db.countyStore.addCounty(request.payload);
        if (county) {
          return h.response(county).code(201);
        }
        return Boom.badImplementation("error creating county");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    response: {schema: countySpecPlus, failAction: validationError}
  },

  deleteAll: {
    auth: {
      strategy: "jwt"
    }, 
    tags: ["api"],
    description: "Delete all counties",
    notes: "Deletes all counties", 
    handler: async function (request, h) {
      try {
        await db.countyStore.deleteAllCounties();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
