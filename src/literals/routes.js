'use strict';

const ROUTES = {
  root: `/`,
  register: `/register`,
  login: `/login`,
  my: {
    root: `/`,
    route: `/my`,
    comments: `/comments`,
  },
  articles: {
    route: `/articles`,
    category: `/category/:id`,
    add: `/add`,
    edit: `/edit/:id`,
    id: `/:id`
  },
  search: `/search`,
  categories: `/categories`
};

module.exports = ROUTES;
