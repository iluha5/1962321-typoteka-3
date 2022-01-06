'use strict';

const chalk = require(`chalk`);
const {ARGUMENTS} = require(`../config`);
const packageJsonFile = require(`../../../package.json`);

const run = () => {
  const version = packageJsonFile.version;
  console.log(chalk.blue(version));
};

module.exports = {
  name: ARGUMENTS.VERSION,
  run,
};
