const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const authUrl = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  changePassword: `${BASE_URL}/auth/changePassword`
};

export const newsUrl = {
  create: `${BASE_URL}/news`,
  getAll: `${BASE_URL}/news`,
  getById: `${BASE_URL}/news/:id`,
  getBySlug: `${BASE_URL}/news/slug/:slug`,
  update: `${BASE_URL}/news/:id`,
  delete: `${BASE_URL}/news/:id`,
  recent: `${BASE_URL}/news/recent`,
  getCatWise: `${BASE_URL}/news/categorywise`,
}

export const categoryUrl = {
  create: `${BASE_URL}/categories`,
  getAll: `${BASE_URL}/categories`,
  getById: `${BASE_URL}/categories/:id`,
  update: `${BASE_URL}/categories/:id`,
  delete: `${BASE_URL}/categories/:id`,
}

export const countryUrl = {
  create: `${BASE_URL}/countries`,
  getAll: `${BASE_URL}/countries`,
  getById: `${BASE_URL}/countries/:id`,
  update: `${BASE_URL}/countries/:id`,
  delete: `${BASE_URL}/countries/:id`,
}

export const yearUrl = {
  getAll: `${BASE_URL}/years`
}
