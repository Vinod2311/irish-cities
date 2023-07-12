import { dashboardController } from "./controllers/dashboard-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: dashboardController.index },
  { method: "GET", path: "/login", config: dashboardController.showLogin },
  { method: "GET", path: "/signup", config: dashboardController.showSignup }
];
