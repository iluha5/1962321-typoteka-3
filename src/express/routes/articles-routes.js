'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

const routeController = (req, res) => res.send(req.originalUrl);

articlesRouter.get(`/category/:id`, routeController);
articlesRouter.get(`/add`, routeController);
articlesRouter.get(`/edit/:id`, routeController);
articlesRouter.get(`/:id`, routeController);

module.exports = articlesRouter;
