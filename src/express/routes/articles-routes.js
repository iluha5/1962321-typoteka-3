'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const api = getAPI();
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => {
  res.render(`articles-by-category`);
});
articlesRouter.get(`/add`, async (req, res) => {
  const allCategories = await api.getCategories();

  const categories = allCategories.map((item) => {
    return {
      item,
      checked: false,
    };
  });
  const article = {};

  res.render(`post`, {article, categories});
});
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);
  const allCategories = await api.getCategories();

  const formattedArticle = {
    ...article,
    createDate: article.createDate.slice(0, 10)
  };

  const categories = allCategories.map((item) => {
    return {
      item,
      checked: article.category.includes(item),
    };
  });

  res.render(`post`, {article: formattedArticle, categories});
});
articlesRouter.get(`/:id`, (req, res) => {
  res.render(`post-detail`);
});

module.exports = articlesRouter;
