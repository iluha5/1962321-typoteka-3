'use strict';

const {Router} = require(`express`);
const articleRouter = require(`./article`);
const categoryRouter = require(`./category`);
const getMockData = require(`../lib/get-mock-data`);
const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service/`);

const app = new Router();

const initServices = async () => {
  const mockArticles = await getMockData();

  articleRouter(app, new ArticleService(mockArticles), new CommentService(mockArticles));
  categoryRouter(app, new CategoryService(mockArticles));
};

initServices();

module.exports = app;
