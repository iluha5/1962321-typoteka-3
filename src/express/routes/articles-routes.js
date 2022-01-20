'use strict';

const {Router} = require(`express`);
const routes = require(`../../literals/routes`);

const articlesRouter = new Router();

const routeController = (req, res) => res.send(req.originalUrl);

articlesRouter.get(routes.articles.category, routeController);
articlesRouter.get(routes.articles.add, routeController);
articlesRouter.get(routes.articles.edit, routeController);
articlesRouter.get(routes.articles.id, routeController);

module.exports = articlesRouter;
