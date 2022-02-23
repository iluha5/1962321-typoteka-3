'use strict';

const {Router} = require(`express`);
const statusCodes = require(`http-status`);

const route = new Router();

const categoriesRouter = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();

    res.status(statusCodes.OK)
      .json(categories);
  });
};

module.exports = categoriesRouter;
