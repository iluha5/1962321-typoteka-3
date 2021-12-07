'use strict';

const packageJsonFile = require(`../../../package.json`);
const {ARGUMENTS} = require(`src/service/config`);

const run = () => {
  const version = packageJsonFile.version;
  console.info(version);
};

module.exports = {
  name: ARGUMENTS.GENERATE,
  run,
};
