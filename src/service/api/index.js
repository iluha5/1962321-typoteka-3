'use strict';

const {Router} = require(`express`);
const chalk = require(`chalk`);
const articleRouter = require(`./article`);
const categoryRouter = require(`./category`);
const searchRouter = require(`./search`);
const getMockData = require(`../lib/get-mock-data`);
const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service/`);


const initServices = async () => {
  try {
    const mockArticles = await getMockData();

    articleRouter(app, new ArticleService(mockArticles), new CommentService(mockArticles));
    categoryRouter(app, new CategoryService(mockArticles));
    searchRouter(app, new SearchService(mockArticles));
  } catch (error) {
    console.log(chalk.red(`Cannot init services: ${error}`));
  }
};

const app = new Router();

initServices();

module.exports = app;
