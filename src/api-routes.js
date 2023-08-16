import { userApi } from "./api/user-api.js";
import { countyApi } from "./api/county-api.js";
import {universityApi} from "./api/university-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/email/{email}", config: userApi.findOneByEmail },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate},
  { method: "POST", path: "/api/users/{userId}/editUserDetails", config: userApi.editUserDetails },

  { method: "GET", path: "/api/counties", config: countyApi.find },
  { method: "GET", path: "/api/users/{userId}/counties", config: countyApi.findUserCounties },
  { method: "POST", path: "/api/users/{userId}/counties", config: countyApi.create },
  { method: "DELETE", path: "/api/counties", config: countyApi.deleteAll },
  { method: "DELETE", path: "/api/counties/{id}", config: countyApi.deleteOne },
  { method: "GET", path: "/api/counties/{id}", config: countyApi.findOne },


  { method: "GET", path: "/api/universities", config: universityApi.find },
  { method: "POST", path: "/api/counties/{id}/universities", config: universityApi.create },
  { method: "DELETE", path: "/api/universities", config: universityApi.deleteAll },
  { method: "DELETE", path: "/api/universities/{id}", config: universityApi.deleteOne },
  { method: "GET", path: "/api/universities/{id}", config: universityApi.findOne },

  { method: "POST", path: "/api/county/{id}/uploadImage", config: countyApi.uploadImage },
  { method: "GET", path: "/api/county/{id}/deleteImage", config: countyApi.deleteImage },
  
];
