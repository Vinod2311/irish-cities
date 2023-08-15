import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { idSpec, countyArraySpec, countySpec, countySpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/images-store.js";

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

  findUserCounties: {
    auth: {
      strategy: "jwt"
    }, 
    validate: { params: { userId: idSpec}, failAction: validationError},
    tags: ["api"],
    description: "Return a user's counties",
    notes: "Return all counties with a specific user ID", 
    handler: async function (request, h) {
      try {
        const counties = await db.countyStore.getUserCounties(request.params.userId);
        if (!counties) {
          return Boom.notFound("No county with this user id");
        }
        return counties;
      } catch (err) {
        return Boom.serverUnavailable("No county with this user id");
      }
    },
    response: { schema: countyArraySpec, failAction: validationError}
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
        const county = await db.countyStore.addCounty(request.payload,request.params.userId);
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

  uploadImage: {
    auth: false,
    tags: ["api"],
    description: "Upload Image",
    notes: "Upload one image to cloudinary",
    handler: async function (request, h) {
      try {
        const county = await db.countyStore.getCountyById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          county.img = url;
          await db.countyStore.updateCounty(county);
          return h.response(url).code(201);
        }
        return Boom.badImplementation("error uploading image");
      } catch (err) {
        return Boom.serverUnavailable("Database error")
        
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    auth: false,
    tags: ["api"],
    description: "Delete image",
    notes: "Delete image on database",
    handler: async function (request, h) {
      try {
      const county = await db.countyStore.getCountyById(request.params.id);
      if (county.img) {
        await imageStore.deleteImage(county.img).then(result=>console.log(result));
        county.img = "";
        await db.countyStore.updateCounty(county);
        return h.response().code(201);
      }
      return Boom.badImplementation("error deleting image");
      } catch (err) {
        return Boom.serverUnavailable("Database error")
      }
    }
  },
};
