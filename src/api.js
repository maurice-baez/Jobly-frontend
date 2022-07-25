import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of all companies. */

  static async getCompanies(name = {}) {
    let res = await this.request(`companies`, name);
    return res.companies;
  }

  /** Get list of all jobs. */

  static async getJobs(title = null) {
    if (!title) {
      let res = await this.request(`jobs`);
      return res.jobs;
    }
    let res = await this.request(`jobs`, title);
    return res.jobs;
  }

  static async login(formData) {
    let res = await this.request(`auth/token`, formData, "post");
    return res.token;
  }

  static async register(formData) {
    let res = await this.request(`auth/register`, formData, "post");
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async update(formData) {
    const formDataDuplicate = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    let res = await this.request(
      `users/${formData.username}`,
      formDataDuplicate,
      "patch"
    );
    return res.user;
  }

  static async apply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.user;
  }

  static async unApply(username, jobId) {
    let res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      "delete"
    );
    console.log(res);
    return res.user;
  }
}

export default JoblyApi;
