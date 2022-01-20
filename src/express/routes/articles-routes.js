'use strict';

const {Router} = require(`express`);
const ROUTES = require(`../../literals/routes`);

const articlesRouter = new Router();

const routeController = (req, res) => res.send(req.originalUrl);

articlesRouter.get(ROUTES.articles.category, routeController);
articlesRouter.get(ROUTES.articles.add, routeController);
articlesRouter.get(ROUTES.articles.edit, routeController);
articlesRouter.get(ROUTES.articles.id, routeController);

module.exports = articlesRouter;
