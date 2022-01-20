'use strict';

const {Router} = require(`express`);
const ROUTES = require(`../../literals/routes`);

const mainRouter = new Router();

const routeController = (req, res) => res.send(req.route.path);

mainRouter.get(ROUTES.root, routeController);
mainRouter.get(ROUTES.register, routeController);
mainRouter.get(ROUTES.login, routeController);
mainRouter.get(ROUTES.search, routeController);
mainRouter.get(ROUTES.categories, routeController);

module.exports = mainRouter;
