'use strict';

const {Router} = require(`express`);
const routes = require(`../../literals/routes`);

const myRouter = new Router();

const routeController = (req, res) => res.send(req.originalUrl);

myRouter.get(routes.my.root, routeController);
myRouter.get(routes.my.comments, routeController);

module.exports = myRouter;
