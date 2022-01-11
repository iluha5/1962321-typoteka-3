'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);
const statusCodes = require(`http-status`);
const {ARGUMENTS, DEFAULT_PORT, MOCK_FILE_NAME} = require(`../config`);
const {SERVER_STARTED, WRONG_PORT, SERVER_STARTING_ERROR, PAGE_TITLE} = require(`../../literals/texts`);
const {getIsInteger} = require(`../../helpers`);

const CONTENT_TYPE = `text/html; charset=UTF-8`;

const sendResponse = (res, status, message) => {
  const template = `
    <!Doctype html>
    <html lang="ru">
      <head>
        <title>${PAGE_TITLE}</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(status, {
    'Content-Type': CONTENT_TYPE,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(MOCK_FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);

        sendResponse(res, statusCodes.OK, `<ul>${message}</ul>`);
      } catch (error) {
        console.error(chalk.red(error));

        sendResponse(res, statusCodes.NOT_FOUND, statusCodes[statusCodes.NOT_FOUND]);
      }
      break;
    default:
      sendResponse(res, statusCodes.NOT_FOUND, statusCodes[statusCodes.NOT_FOUND]);
  }
};

const run = (port) => {
  let currentPort = DEFAULT_PORT;

  if (getIsInteger(port)) {
    currentPort = port;
  } else {
    console.error(chalk.red(WRONG_PORT));
  }

  http.createServer(onClientConnect)
      .listen(currentPort)
      .on(`listening`, () => {
        console.log(chalk.green(`${SERVER_STARTED}: ${currentPort}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(SERVER_STARTING_ERROR, message));
      });
};

module.exports = {
  name: ARGUMENTS.SERVER,
  run,
};
