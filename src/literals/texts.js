'use strict';

const HELP_OUTPUT = ` Программа запускает http-сервер и формирует файл с данными для API.\n` +
  `\n` +
  `     Гайд:\n` +
  `     service.js <command>\n` +
  `     Команды:\n` +
  `      --version: выводит номер версии\n` +
  `      --help: печатает этот текст\n` +
  `      --generate <count> формирует файл mocks.json`;

const COUNT_TOO_MUCH = `Не больше 1000 публикаций`;
module.exports = {
  HELP_OUTPUT,
  COUNT_TOO_MUCH,
};
