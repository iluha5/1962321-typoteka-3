'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_COUNT, MAX_COUNT, MOCK_FILE_NAME, ARGUMENTS} = require(`../config`);
const {COUNT_TOO_MUCH, DATA_WRITTEN_SUCCESS_MESSAGE, DATA_WRITTEN_ERROR_MESSAGE} = require(`../../literals/texts`);
const {getIsInteger, getGeneratedPublications} = require(`../../helpers`);

const generateMock = async (numberOfLines) => {
  try {
    const publications = JSON.stringify(getGeneratedPublications(numberOfLines));

    await fs.writeFile(MOCK_FILE_NAME, publications);

    console.info(chalk.green(DATA_WRITTEN_SUCCESS_MESSAGE));
  } catch (error) {
    console.error(chalk.red(DATA_WRITTEN_ERROR_MESSAGE, MOCK_FILE_NAME));
  }
};

const run = async (numberOfLines) => {
  if (getIsInteger(numberOfLines)) {
    if (Number(numberOfLines) > MAX_COUNT) {
      console.error(chalk.red(COUNT_TOO_MUCH));

      return;
    }

    await generateMock(Number(numberOfLines));
  } else {
    await generateMock(DEFAULT_COUNT);
  }
};

module.exports = {
  name: ARGUMENTS.GENERATE,
  run,
};
