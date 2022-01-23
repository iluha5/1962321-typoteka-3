'use strict';
const express = require(`express`);
const path = require(`path`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const articlesRouter = require(`./routes/articles-routes`);
const {DEFAULT_EXPRESS_PORT, PUBLIC_DIR} = require(`../service/config`);

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `templates`));

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(DEFAULT_EXPRESS_PORT);
