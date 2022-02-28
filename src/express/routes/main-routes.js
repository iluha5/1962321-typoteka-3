'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const api = getAPI();
const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();

  // TODO: add lastComments and popularArticles calculation and pass to main
  res.render(`main`, {articles});
});
mainRouter.get(`/register`, (req, res) => {
  res.render(`sign-up`);
});
mainRouter.get(`/login`, (req, res) => {
  res.render(`login`);
});
mainRouter.get(`/search`, async (req, res) => {
  const {query} = req.query;

  try {
    const articles = await api.search(query);

    res.render(`search`, {
      articles,
      query
    });
  } catch (error) {
    res.render(`search`, {
      articles: [],
      query
    });
  }
});
mainRouter.get(`/categories`, (req, res) => {
  res.render(`all-categories`);
});

module.exports = mainRouter;
