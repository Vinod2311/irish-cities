import { userMemStore } from "./mem/user-mem-store.js";
import { countyMemStore } from "./mem/county-mem-store.js";
import { universityMemStore } from "./mem/university-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { countyJsonStore } from "./json/county-json-store.js";
import { universityJsonStore } from "./json/university-json-store.js";

export const db = {
  userStore: null,
  countyStore: null,
  universityStore: null,

  
  init(storeType) {
      switch (storeType) {
        case "json":
          this.userStore = userJsonStore;
          this.countyStore = countyJsonStore;
          this.universityStore = universityJsonStore;
          break;
        /* case "mongo":
          this.userStore = userMongoStore;
          this.countyStore = countyMongoStore;
          this.universityStore = universityMongoStore;
          connectMongo();
          break; */
        default:
          this.userStore = userMemStore;
          this.countyStore = countyMemStore;
          this.universityStore = universityMemStore;
      }
    
  },
};