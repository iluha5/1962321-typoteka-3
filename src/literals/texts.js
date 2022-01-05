'use strict';

const HELP_OUTPUT = ` Программа запускает http-сервер и формирует файл с данными для API.\n` +
  `\n` +
  `     Гайд:\n` +
  `     service.js <command>\n` +
  `     Команды:\n` +
  `      --version, -v: выводит номер версии\n` +
  `      --help, -h: печатает этот текст\n` +
  `      --generate <count>, -g <count>: формирует файл mocks.json`;

const COUNT_TOO_MUCH = `Не больше 1000 публикаций`;
const UNKNOWN_COMMAND = `Неизвестная команда.`;
const DATA_WRITTEN_ERROR_MESSAGE = `Не могу записать данные в файл `;
const WRONG_FILE_NAME = `Неверное имя файла.`;
const FILE_READING_ERROR = `Не могу прочитать файл`;
const DATA_WRITTEN_SUCCESS_MESSAGE = `Данные записаны в файл.`;
const SERVER_STARTED = `Сервер запущен на порту`;
const WRONG_PORT = `Порт введен некорректно.`;
const SERVER_STARTING_ERROR = `Не могу запустить сервер.`;
const PAGE_TITLE = `Типотека`;

module.exports = {
  HELP_OUTPUT,
  COUNT_TOO_MUCH,
  UNKNOWN_COMMAND,
  DATA_WRITTEN_ERROR_MESSAGE,
  DATA_WRITTEN_SUCCESS_MESSAGE,
  WRONG_FILE_NAME,
  FILE_READING_ERROR,
  SERVER_STARTED,
  WRONG_PORT,
  SERVER_STARTING_ERROR,
  PAGE_TITLE,
};
