'use strict';

const {Router} = require(`express`);
const ROUTES = require(`../../literals/routes`);

const myRouter = new Router();

const routeController = (req, res) => res.send(req.originalUrl);

myRouter.get(ROUTES.my.root, routeController);
myRouter.get(ROUTES.my.comments, routeController);

module.exports = myRouter;
