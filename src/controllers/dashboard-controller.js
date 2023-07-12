export const dashboardController = {
  index: {
    handler: async function (request, h) {
      return h.view("main");
    },
  },

  showLogin: {
    handler: async function (request, h) {
      return h.view("login-view");
    },
  },

  showSignup: {
    handler: async function (request, h) {
      return h.view("signup-view");
    },
  },
};
