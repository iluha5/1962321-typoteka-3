'use strict';

const {Router} = require(`express`);
const statusCodes = require(`http-status`);

const route = new Router();

const categoriesEndpoints = (app, service) => {
  app.use(`/category`, route);

  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();

    res.status(statusCodes.OK)
      .json(categories);
  });
};

module.exports = categoriesEndpoints;
