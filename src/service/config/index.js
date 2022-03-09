'use strict';

const ARGUMENTS = {
  VERSION: `version`,
  HELP: `help`,
  GENERATE: `generate`,
  SERVER: `server`,
  GENERATE_COUNT: `count`,
  PORT: `port`,
};
const DEFAULT_COUNT = 1;
const DEFAULT_PORT = 3000;
const DEFAULT_EXPRESS_PORT = 8080;
const MAX_COUNT = 1000;
const MIN_SENTENCES_IN_ANNOUNCE = 1;
const MAX_SENTENCES_IN_ANNOUNCE = 5;
const MIN_SENTENCES_IN_FULL_TEXT = 1;
const MIN_CATEGORIES_NUMBER = 1;
const MIN_TITLES_NUMBER = 1;
const MAX_COMMENTS = 4;
const EXIT_CODES = {
  SUCCESS: 0,
  ERROR: 1,
};
const MOCK_FILE_NAME = `mock.json`;
const DATE_FORMAT = `yyyy-MM-dd hh:mm:ss`;
const MONTH_MOCK_COUNTER = 3;
const START_GENERATED_HOUR = 0;
const COMMANDER_UNKNOWN_ERROR_MESSAGE = `commander.unknownOption`;
const MOCK_FILES_NAMES = {
  SENTENCES: `data/sentences.txt`,
  TITLES: `data/titles.txt`,
  CATEGORIES: `data/categories.txt`,
  COMMENTS: `data/comments.txt`,
};
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;
const ENV = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  ARGUMENTS,
  DEFAULT_COUNT,
  MAX_COUNT,
  MIN_SENTENCES_IN_ANNOUNCE,
  MAX_SENTENCES_IN_ANNOUNCE,
  MIN_SENTENCES_IN_FULL_TEXT,
  MIN_CATEGORIES_NUMBER,
  EXIT_CODES,
  MOCK_FILE_NAME,
  DATE_FORMAT,
  MONTH_MOCK_COUNTER,
  START_GENERATED_HOUR,
  MIN_TITLES_NUMBER,
  COMMANDER_UNKNOWN_ERROR_MESSAGE,
  MOCK_FILES_NAMES,
  DEFAULT_PORT,
  DEFAULT_EXPRESS_PORT,
  PUBLIC_DIR,
  UPLOAD_DIR,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  API_PREFIX,
  ENV
};
