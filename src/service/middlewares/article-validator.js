'use strict';

const statusCodes = require(`http-status`);

const newArticleKeys = [`category`, `title`, `announce`, `fullText`];
const updateArticleKeys = [`category`, `title`, `announce`, `fullText`, `id`];

const newArticleValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = newArticleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(statusCodes.BAD_REQUEST)
      .send(statusCodes.BAD_REQUEST);
  }

  return next();
};

const updateArticleValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = updateArticleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(statusCodes.BAD_REQUEST)
      .send(statusCodes.BAD_REQUEST);
  }

  return next();
};

module.exports = {
  newArticleValidator,
  updateArticleValidator,
};
