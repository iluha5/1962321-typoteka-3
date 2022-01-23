'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

const routeController = (req, res) => res.send(req.route.path);

mainRouter.get(`/`, (req, res) => {
  res.render(`main`);
});
mainRouter.get(`/register`, routeController);
mainRouter.get(`/login`, routeController);
mainRouter.get(`/search`, routeController);
mainRouter.get(`/categories`, routeController);

module.exports = mainRouter;
