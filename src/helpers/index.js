'use strict';

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const chalk = require(`chalk`);
const path = require(`path`);
const {WRONG_FILE_NAME, FILE_READING_ERROR, GET_PUBLICATIONS_ERROR} = require(`../literals/texts`);
const {MIN_TITLES_NUMBER, MIN_CATEGORIES_NUMBER, MAX_SENTENCES_IN_ANNOUNCE, START_GENERATED_HOUR, MIN_SENTENCES_IN_ANNOUNCE, MIN_SENTENCES_IN_FULL_TEXT, DATE_FORMAT, MONTH_MOCK_COUNTER, MOCK_FILES_NAMES, MAX_ID_LENGTH, MAX_COMMENTS} = require(`../service/config`);
const dateFormat = require(`date-format`);

const getCleanedFileData = (fileData) => {
  let fileDataArray = fileData.trim().split(`\n`);

  return fileDataArray.reduce(
      (acc, line) =>
        line.trim() !== `` ? [...acc, line.trim()] : acc,
      []
  );
};

const getFileData = async (filePath) => {
  if (typeof filePath !== `string`) {
    console.error(chalk.red(WRONG_FILE_NAME));
    return [];
  }

  try {
    const fileData = await fs.readFile(filePath, `utf8`);

    return getCleanedFileData(fileData);
  } catch (error) {
    console.error(chalk.red(`${FILE_READING_ERROR} ${filePath}`));
    return Promise.reject(error);
  }
};

const getIsInteger = (value) => {
  if (value.toString().search(/[.]/g) !== -1) {
    return false;
  }

  return Number(value) === parseInt(value, 10);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getShuffledArray = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getSentences = (numberOfSentences, mockSentences) => {
  let sentences = ``;

  for (let index = 0; index < numberOfSentences; index++) {
    sentences += mockSentences[getRandomInt(0, mockSentences.length - 1)];
  }

  return sentences;
};

const getCategories = (numberOfCategories, mockCategories) => {
  let categories = new Set();

  for (let index = 0; index < numberOfCategories; index++) {
    categories.add(mockCategories[getRandomInt(0, mockCategories.length - 1)]);
  }

  return [...categories];
};

const getComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: getShuffledArray(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const getRandomDate = (start, end, startHour, endHour) => {
  const date = new Date(+start + Math.random() * (end - start));
  const hour = startHour + Math.random() * (endHour - startHour) | 0;

  date.setHours(hour);

  return date;
};

const getGeneratedPublications = async (count) => {
  const dateInPast = new Date();
  const dateNow = new Date();
  const maxGeneratedHour = dateNow.getHours() - 1;

  dateInPast.setMonth(dateInPast.getMonth() - MONTH_MOCK_COUNTER);

  try {
    const [titles, sentences, categories, comments] = await Promise.all([
      getFileData(path.resolve(MOCK_FILES_NAMES.TITLES)),
      getFileData(path.resolve(MOCK_FILES_NAMES.SENTENCES)),
      getFileData(path.resolve(MOCK_FILES_NAMES.CATEGORIES)),
      getFileData(path.resolve(MOCK_FILES_NAMES.COMMENTS)),
    ]);

    return Array(count).fill({}).map(() => {
      const date = getRandomDate(dateInPast, dateNow, START_GENERATED_HOUR, maxGeneratedHour);

      return {
        id: nanoid(MAX_ID_LENGTH),
        title: titles[getRandomInt(MIN_TITLES_NUMBER, titles.length - 1)],
        announce: getSentences(getRandomInt(MIN_SENTENCES_IN_ANNOUNCE, MAX_SENTENCES_IN_ANNOUNCE), sentences),
        fullText: getSentences(getRandomInt(MIN_SENTENCES_IN_FULL_TEXT, sentences.length - 1), sentences),
        createDate: dateFormat(DATE_FORMAT, date),
        category: getCategories(getRandomInt(MIN_CATEGORIES_NUMBER, categories.length - 1), categories),
        comments: getComments(getRandomInt(1, MAX_COMMENTS), comments),
      };
    });

  } catch (error) {
    console.error(chalk.red(GET_PUBLICATIONS_ERROR));

    return Promise.reject(error);
  }
};

module.exports = {
  getIsInteger,
  getRandomInt,
  getShuffledArray,
  getGeneratedPublications,
  getFileData,
};
