'use strict';

const {Router} = require(`express`);
const statusCodes = require(`http-status`);
const {newArticleValidator, updateArticleValidator} = require(`../middlewares/article-validator`);
const {articleExist} = require(`../middlewares/article-exist`);
const {commentValidator} = require(`../middlewares/comment-validator`);

const route = new Router();

const articleRouter = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();

    res.status(statusCodes.OK).json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(statusCodes.NOT_FOUND)
        .send(statusCodes.NOT_FOUND);
    }

    return res.status(statusCodes.OK).json(article);
  });

  route.post(`/`, newArticleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(statusCodes.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, updateArticleValidator, (req, res) => {
    const {articleId} = req.params;
    const existentArticle = articleService.findOne(articleId);

    if (!existentArticle) {
      return res.status(statusCodes.NOT_FOUND)
        .send(statusCodes.NOT_FOUND);
    }

    const updatedArticle = articleService.update(articleId, req.body);

    return res.status(statusCodes.OK)
      .json(updatedArticle);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.remove(articleId);

    if (!article) {
      return res.status(statusCodes.NOT_FOUND)
        .send(statusCodes.NOT_FOUND);
    }

    return res.status(statusCodes.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;

    const comments = commentService.findAll(article.id);

    res.status(statusCodes.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.remove(article.id, commentId);

    if (!deletedComment) {
      return res.status(statusCodes.NOT_FOUND)
        .send(statusCodes.NOT_FOUND);
    }

    return res.status(statusCodes.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article.id, req.body);

    return res.status(statusCodes.CREATED)
      .json(comment);
  });
};

module.exports = articleRouter;
