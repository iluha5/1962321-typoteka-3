'use strict';

const chalk = require(`chalk`);
const {ARGUMENTS} = require(`../config`);
const {HELP_OUTPUT} = require(`../../literals/texts`);

const run = () => {
  console.log(chalk.gray(HELP_OUTPUT));
};

module.exports = {
  name: ARGUMENTS.HELP,
  run,
};
