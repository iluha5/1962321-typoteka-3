'use strict';
const express = require(`express`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const articlesRouter = require(`./routes/articles-routes`);
const {DEFAULT_EXPRESS_PORT} = require(`../service/config`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(DEFAULT_EXPRESS_PORT);
