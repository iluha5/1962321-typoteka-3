'use strict';

const fs = require(`fs`);
const {DEFAULT_COUNT, MAX_COUNT, MOCK_FILE_NAME, ARGUMENTS} = require(`../config`);
const {COUNT_TOO_MUCH, DATA_WRITTEN_SUCCESS_MESSAGE, DATA_WRITTEN_ERROR_MESSAGE} = require(`../../literals/texts`);
const {getIsInteger, getGeneratedPublications} = require(`../../helpers`);

const generateMock = (numberOfLines) => {
  const publications = JSON.stringify(getGeneratedPublications(numberOfLines));

  fs.writeFile(MOCK_FILE_NAME, publications, (error) => {
    if (error) {
      return console.error(DATA_WRITTEN_ERROR_MESSAGE, MOCK_FILE_NAME);
    }

    return console.info(DATA_WRITTEN_SUCCESS_MESSAGE);
  });
};

const run = (numberOfLines) => {
  if (getIsInteger(numberOfLines)) {
    if (Number(numberOfLines) > MAX_COUNT) {
      console.error(COUNT_TOO_MUCH);

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
