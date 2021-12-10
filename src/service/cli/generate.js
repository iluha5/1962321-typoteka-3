'use strict';

const fs = require(`fs`);
const {DEFAULT_COUNT, MAX_COUNT, MOCK_FILE_NAME, ARGUMENTS} = require(`../config`);
const {COUNT_TOO_MUCH} = require(`../../literals/texts`);
const {getIsInteger, getGeneratedPublications} = require(`../../helpers`);

const generateMock = (numberOfLines) => {
  const publications = JSON.stringify(getGeneratedPublications(numberOfLines));

  fs.writeFile(MOCK_FILE_NAME, publications, (error) => {
    if (error) {
      return console.error(`Can't write data to file `, MOCK_FILE_NAME);
    }

    return console.info(`Operation success. File created.`);
  });
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
