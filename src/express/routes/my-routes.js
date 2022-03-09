'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const api = getAPI();
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();

  res.render(`my`, {articles});
});
myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();

  const comments = articles.reduce((acc, article) => {
    article.comments.forEach((comment) => acc.push({
      id: comment.id,
      articleId: article.id,
      articleTitle: article.title,
      name: `Александр Петров`,
      date: article.createDate,
      text: comment.text,
      avatar: `avatar-small-2.png`,
    }));

    return acc;
  }, []);

  res.render(`comments`, {comments});
});

module.exports = myRouter;
