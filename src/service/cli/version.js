'use strict';

const {ARGUMENTS} = require(`../config`);
const packageJsonFile = require(`../../../package.json`);

const run = () => {
  const version = packageJsonFile.version;
  console.log(version);
};

module.exports = {
  name: ARGUMENTS.VERSION,
  run,
};
