'use strict';

const chalk = require(`chalk`);
const {ARGUMENTS, DEFAULT_PORT} = require(`../config`);
const {SERVER_STARTED, WRONG_PORT} = require(`../../literals/texts`);
const {getIsInteger} = require(`../../helpers`);

const run = (port) => {
  let currentPort = DEFAULT_PORT;

  if (getIsInteger(port)) {
    currentPort = port;
  } else {
    console.error(chalk.red(WRONG_PORT));
  }

  console.log(chalk.green(`${SERVER_STARTED}: ${currentPort}`));
};

module.exports = {
  name: ARGUMENTS.SERVER,
  run,
};
