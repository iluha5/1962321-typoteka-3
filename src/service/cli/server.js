'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const express = require(`express`);
const {ARGUMENTS, DEFAULT_PORT, MOCK_FILE_NAME} = require(`../config`);
const {SERVER_STARTED, WRONG_PORT, SERVER_STARTING_ERROR} = require(`../../literals/texts`);
const {getIsInteger} = require(`../../helpers`);

const sendPosts = async (req, res) => {
  let mockFileContent = [];

  try {
    const mockFile = await fs.readFile(MOCK_FILE_NAME);

    mockFileContent = JSON.parse(mockFile);

  } catch (error) {
    console.error(chalk.red(error));
  }

  res.send(mockFileContent);
};

const run = (port) => {
  let currentPort = DEFAULT_PORT;

  if (getIsInteger(port)) {
    currentPort = port;
  } else {
    console.error(chalk.red(WRONG_PORT));
  }

  const app = express();

  app.use(express.json());

  app.get(`/posts`, sendPosts);

  app.listen(currentPort).on(`error`, (message) => {
    console.error(chalk.red(SERVER_STARTING_ERROR, message));
    process.exit(1);
  });
  console.log(chalk.green(`${SERVER_STARTED}: ${currentPort}`));
};

module.exports = {
  name: ARGUMENTS.SERVER,
  run,
};
