import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { idSpec,userArraySpec, userSpec, userSpecPlus } from "../models/joi-schemas.js";

export const userApi = {
  find: {
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    auth: false,
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    response: { schema: userArraySpec, failAction: validationError }
  },

  findOne: {
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns details of one user",
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    validate: { params: { id: idSpec }, failAction: validationError },
    response: { schema: userSpecPlus, failAction: validationError}
  },

  create: {
    auth: false,
    tags: ["api"],
    description: "Create a user",
    notes: "Creates a user and returns the created user",
    handler: async function (request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    validate: { payload: userSpec, failAction: validationError },
    response: { schema: userSpecPlus, failAction: validationError }
  },

  deleteAll: {
    auth: false,
    tags: ["api"],
    description: "Deletes all users",
    notes: "Deletes all users",
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
