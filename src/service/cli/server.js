'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const statusCodes = require(`http-status`);
const {ARGUMENTS, DEFAULT_PORT, API_PREFIX} = require(`../config`);
const {SERVER_STARTED, WRONG_PORT, SERVER_STARTING_ERROR} = require(`../../literals/texts`);
const {getIsInteger} = require(`../../helpers`);
const routes = require(`../api`);

const run = (port) => {
  let currentPort = DEFAULT_PORT;

  if (getIsInteger(port)) {
    currentPort = port;
  } else {
    console.error(chalk.red(WRONG_PORT));
  }

  const app = express();

  app.use(express.json());
  app.use(API_PREFIX, routes);

  app.use((req, res) => res
    .status(statusCodes.NOT_FOUND)
    .send(statusCodes.NOT_FOUND));

  app.listen(currentPort).on(`error`, (message) => {
    console.error(chalk.red(SERVER_STARTING_ERROR, message));
    process.exit(1);
  });
  console.log(chalk.green(`${SERVER_STARTED}: ${currentPort}`));
};

module.exports = {
  name: ARGUMENTS.SERVER,
  run,
};
