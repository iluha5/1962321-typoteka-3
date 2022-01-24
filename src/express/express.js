'use strict';
const express = require(`express`);
const path = require(`path`);
const statusCodes = require(`http-status`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const articlesRouter = require(`./routes/articles-routes`);
const {DEFAULT_EXPRESS_PORT, PUBLIC_DIR} = require(`../service/config`);

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.get(`*`, (req, res) => {
  res.status(statusCodes.NOT_FOUND).render(`404`);
});


app.listen(DEFAULT_EXPRESS_PORT);
