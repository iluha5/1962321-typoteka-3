'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

const routeController = (req, res) => res.send(req.route.path);

mainRouter.get(`/`, routeController);
mainRouter.get(`/register`, routeController);
mainRouter.get(`/login`, routeController);
mainRouter.get(`/search`, routeController);
mainRouter.get(`/categories`, routeController);

module.exports = mainRouter;
