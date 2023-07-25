import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { idSpec, universityArraySpec, universitySpec, universitySpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const universityApi = {
  find: {
    auth: false, 
    tags: ["api"],
    description: "Get all universities",
    notes: "Get all universities", 
    handler: async function (request, h) {
      try {
        const universities = await db.universityStore.getAllUniversities();
        return universities;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    response: {schema: universityArraySpec, failAction: validationError}
  },

  findOne: {
    auth: false,
    tags: ["api"],
    description: "Get a specific university",
    notes: "Returns a university with given Id",
    validate: { params: { id: idSpec}, failAction: validationError},
    handler: async function (request, h) {
      try {
        const university = await db.universityStore.getUniversityById(request.params.id);
        if (!university) {
          return Boom.notFound("No university with this id");
        }
        return university;
      } catch (err) {
        return Boom.serverUnavailable("No university with this id");
      }
    },
    response: {schema: universitySpecPlus, failAction: validationError}
  },

  create: {
    auth: false,
    validate: {payload: universitySpec, params: { id: idSpec }, failAction: validationError},
    tags: ["api"],
    description: "Create a university",
    notes: "Creates a university and returns created university", 
    handler: async function (request, h) {
      try {
        const university = await db.universityStore.addUniversity(request.params.id, request.payload);
        if (university) {
          return h.response(university).code(201);
        }
        return Boom.badImplementation("error creating university");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    response: {schema: universitySpecPlus, failAction: validationError}
  },

  deleteOne: {
    auth: false,
    validate: { params: { id: idSpec }, failAction: validationError},
    tags: ["api"],
    description: "Delete a university",
    notes: "Deletes a university with the given Id", 
    handler: async function (request, h) {
      try {
        const university = await db.universityStore.getUniversityById(request.params.id);
        if (!university) {
          return Boom.notFound("No university with this id");
        }
        await db.universityStore.deleteUniversityById(university._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No university with this id");
      }
    },
  },

  deleteAll: {
    auth: false, 
    tags: ["api"],
    description: "Deletes all universities",
    notes: "Deletes all universities",
    handler: async function (request, h) {
      try {
        await db.universityStore.deleteAllUniversities();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
