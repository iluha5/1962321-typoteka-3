'use strict';

const {ARGUMENTS} = require(`../config`);
const {HELP_OUTPUT} = require(`../../literals/texts`);

const run = () => {
  console.log(HELP_OUTPUT);
};

module.exports = {
  name: ARGUMENTS.HELP,
  run,
};
