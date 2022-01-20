'use strict';
const express = require(`express`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const articlesRouter = require(`./routes/articles-routes`);
const routes = require(`../literals/routes`);
const {DEFAULT_EXPRESS_PORT} = require(`../service/config`);

const app = express();

app.use(routes.root, mainRouter);
app.use(routes.my.route, myRouter);
app.use(routes.articles.route, articlesRouter);

app.listen(DEFAULT_EXPRESS_PORT);
