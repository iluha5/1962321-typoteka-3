'use strict';

const statusCodes = require(`http-status`);

const articleExist = (articleService) => (req, res, next) => {
  const {articleId} = req.params;
  const article = articleService.findOne(articleId);

  if (!article) {
    return res.status(statusCodes.NOT_FOUND)
      .send(statusCodes.NOT_FOUND);
  }

  res.locals.article = article;
  return next();
};

module.exports = {
  articleExist
};
