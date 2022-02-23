'use strict';

const {Router} = require(`express`);
const statusCodes = require(`http-status`);

const route = new Router();

const searchRouter = (app, searchService) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      res.status(statusCodes.BAD_REQUEST).json([]);

      return;
    }

    const foundArticles = searchService.findAll(query);

    if (foundArticles.length > 0) {
      res.status(statusCodes.OK).json(foundArticles);
    } else {
      res.status(statusCodes.NOT_FOUND).json([]);
    }
  });
};

module.exports = searchRouter;
