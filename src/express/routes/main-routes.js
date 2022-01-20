'use strict';

const {Router} = require(`express`);
const routes = require(`../../literals/routes`);

const mainRouter = new Router();

const routeController = (req, res) => res.send(req.route.path);

mainRouter.get(routes.root, routeController);
mainRouter.get(routes.register, routeController);
mainRouter.get(routes.login, routeController);
mainRouter.get(routes.search, routeController);
mainRouter.get(routes.categories, routeController);

module.exports = mainRouter;
