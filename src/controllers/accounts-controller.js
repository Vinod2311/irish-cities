import { db } from "../models/db.js";
import { userSpec,userCredentialsSpec, userEditDetails } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Irish Universities" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up" });
    },
  },
  signup: {
    auth: false,
    validate: {
        payload: userSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
            return h.view("signup-view", {title: "Sign up error", errors: error.details }).takeover().code(400);
        }
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    
    handler: function (request, h) {
      return h.view("login-view", { title: "Login" });
    },
  },

  showAdminLogin: {
    auth: false,
    
    handler: function (request, h) {
      return h.view("admin-login-view", { title: "Admin Login" });
    },
  },

  login: {
    auth: false,
    validate: {
        payload: userCredentialsSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
            return h.view("login-view", {title: "Login error", errors: error.details }).takeover().code(400);
        }
    },
    handler: async function (request, h) {
        const { email, password } = request.payload;
        const user = await db.userStore.getUserByEmail(email);
        if (!user || user.password !== password) {
          return h.redirect("/");
        }
        request.cookieAuth.set({ id: user._id });
        return h.redirect("/dashboard");
      },  
  },

  adminLogin: {
    auth: false,
    validate: {
        payload: userCredentialsSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
            return h.view("admin-login-view", {title: "Admin Login error", errors: error.details }).takeover().code(400);
        }
    },
    handler: async function (request, h) {
        const { email, password } = request.payload;
        const user = await db.userStore.getUserByEmail(email);
        if (email !== "vinod@yadav.com" || password !== "secret") {
          return h.redirect("/adminLogin");
        }
        request.cookieAuth.set({ id: user._id });
        return h.redirect("/admin");
      },  
  },

  showAdmin: {
    handler: async function (request, h) {
      const admin = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin",
        admin: admin,
        users: users, 
      };
      return h.view("admin-view", viewData);
    },
  },

  

  logout: {
    auth: false,
    handler: function (request, h) {
        request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  showUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials; 
      const viewData = {
        title: "User",
        user: loggedInUser, 
      };
      return h.view("user-view", viewData);
    },
  },

  editUserDetails: {
    validate: {
      payload: userEditDetails,
      options: { abortEarly: false },
      failAction: function ( request, h, error){
        const viewData = {
          title: "Edit user error",
          user: request.auth.credentials,
          errors:  error.details,
        };
        return h.view("user-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials; 
      const updatedUser = request.payload;
      await db.userStore.updateUser(loggedInUser._id,updatedUser);
      return h.redirect("/user");
    },
  },

  deleteUser: {
    auth: false,
    handler: async function (request, h) {
      const admin = request.auth.credentials;
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      console.log("Deleted user");
      return h.redirect("/admin");
    },
  },
  

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};

