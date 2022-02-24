'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getLogger} = require(`../lib/logger`);
const {DEFAULT_COUNT, MAX_COUNT, MOCK_FILE_NAME, ARGUMENTS} = require(`../config`);
const {COUNT_TOO_MUCH, DATA_WRITTEN_SUCCESS_MESSAGE, DATA_WRITTEN_ERROR_MESSAGE} = require(`../../literals/texts`);
const {getIsInteger, getGeneratedPublications} = require(`../../helpers`);

const logger = getLogger({name: `generate`});

const generateMock = async (numberOfLines) => {
  try {
    const generatedMocks = await getGeneratedPublications(numberOfLines);
    const publications = JSON.stringify(generatedMocks);

    await fs.writeFile(MOCK_FILE_NAME, publications);

    console.info(chalk.green(DATA_WRITTEN_SUCCESS_MESSAGE));
    logger.info(DATA_WRITTEN_SUCCESS_MESSAGE);
  } catch (error) {
    console.error(chalk.red(DATA_WRITTEN_ERROR_MESSAGE));
    console.error(chalk.red(error));
    logger.error(DATA_WRITTEN_ERROR_MESSAGE);
  }
};

const run = async (numberOfLines) => {
  if (getIsInteger(numberOfLines)) {
    if (Number(numberOfLines) > MAX_COUNT) {
      console.error(chalk.red(COUNT_TOO_MUCH));
      logger.error(COUNT_TOO_MUCH);

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
