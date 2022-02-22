'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {MOCK_FILE_NAME} = require(`../config`);

let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(MOCK_FILE_NAME);

    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(chalk.red(err));

    return (err);
  }

  return data;
};

module.exports = getMockData;
