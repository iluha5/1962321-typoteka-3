'use strict';

const {ARGUMENTS} = require(`../config`);
const {DEFAULT_COUNT, MAX_COUNT} = require(`../config`);
const {COUNT_TOO_MUCH} = require(`../../literals/texts`);
const {getIsInteger} = require(`../../helpers`);

const generateMock = (numberOfLines) => {
  console.log(`generate count: `, numberOfLines);
};

const run = (numberOfLines) => {
  if (getIsInteger(numberOfLines)) {
    if (Number(numberOfLines) > MAX_COUNT) {
      console.log(COUNT_TOO_MUCH);

      return;
    }

    generateMock(Number(numberOfLines));
  } else {
    generateMock(DEFAULT_COUNT);
  }
};

module.exports = {
  name: ARGUMENTS.GENERATE,
  run,
};
