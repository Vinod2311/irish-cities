import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { countyController } from "./controllers/county-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addCounty", config: dashboardController.addCounty },
  { method: "GET", path: "/dashboard/deleteCounty/{id}", config: dashboardController.deleteCounty },

  { method: "GET", path: "/county/{id}", config: countyController.index },
  { method: "POST", path: "/county/{id}/addUniversity", config: countyController.addUniversity },
  { method: "GET", path: "/county/{id}/deleteUniversity/{universityId}", config: countyController.deleteUniversity },
  
  { method: "POST", path: "/county/{id}/uploadImage", config: countyController.uploadImage },
  { method: "GET", path: "/county/{id}/deleteImage", config: countyController.deleteImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];
