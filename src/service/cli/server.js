'use strict';

const express = require(`express`);
const statusCodes = require(`http-status`);
const {ARGUMENTS, DEFAULT_PORT, API_PREFIX} = require(`../config`);
const {SERVER_STARTED, WRONG_PORT, SERVER_STARTING_ERROR} = require(`../../literals/texts`);
const {getIsInteger} = require(`../../helpers`);
const routes = require(`../api`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

const run = (port) => {
  let currentPort = DEFAULT_PORT;

  if (getIsInteger(port)) {
    currentPort = port;
  } else {
    logger.error(WRONG_PORT);
  }

  const app = express();

  app.use((req, res, next) => {
    logger.debug(`Request on route ${req.url}`);

    res.on(`finish`, () => {
      logger.info(`Response status code ${res.statusCode}`);
    });

    next();
  });

  app.use(express.json());

  app.use(API_PREFIX, routes);

  app.use((req, res) => {
    res
    .status(statusCodes.NOT_FOUND)
    .send(statusCodes.NOT_FOUND);

    logger.error(`Route not found: ${req.url}`);
  });

  app.use((err, _req, _res, _next) => {
    logger.error(`An error occurred on processing request: ${err.message}`);
  });

  app.listen(currentPort).on(`error`, (message) => {
    logger.error(SERVER_STARTING_ERROR, message);
    process.exit(1);
  });

  logger.info(`${SERVER_STARTED}: ${currentPort}`);
};

module.exports = {
  name: ARGUMENTS.SERVER,
  run,
};
