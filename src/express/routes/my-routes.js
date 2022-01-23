'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

const routeController = (req, res) => res.send(req.originalUrl);

myRouter.get(`/`, routeController);
myRouter.get(`/comments`, routeController);

module.exports = myRouter;
