import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const universityService = {
  universityUrl: serviceUrl,

  async authenticate(user) {
    const response = await axios.post(`${this.universityUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createUser(user) {
    const res = await axios.post(`${this.universityUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.universityUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.universityUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.universityUrl}/api/users`);
    return res.data;
  },



  async createCounty(county) {
    const res = await axios.post(`${this.universityUrl}/api/counties`, county);
    return res.data;
  },

  async getCounty(id) {
    const res = await axios.get(`${this.universityUrl}/api/counties/${id}`);
    return res.data;
  },

  async deleteCounty(id) {
    const res = await axios.delete(`${this.universityUrl}/api/counties/${id}`);
    return res.data;
  },

  async getAllCounties() {
    const res = await axios.get(`${this.universityUrl}/api/counties`);
    return res.data;
  },

  async deleteAllCounties() {
    const res = await axios.delete(`${this.universityUrl}/api/counties`);
    return res.data;
  },


  async createUniversity(id,university) {
    const res = await axios.post(`${this.universityUrl}/api/counties/${id}/universities`, university);
    return res.data;
  },

  async getUniversity(id) {
    const res = await axios.get(`${this.universityUrl}/api/universities/${id}`);
    return res.data;
  },

  async deleteUniversity(id) {
    const res = await axios.delete(`${this.universityUrl}/api/universities/${id}`);
    return res.data;
  },
  

  async getAllUniversities() {
    const res = await axios.get(`${this.universityUrl}/api/universities`);
    return res.data;
  },

  async deleteAllUniversities() {
    const res = await axios.delete(`${this.universityUrl}/api/universities`);
    return res.data;}

};
