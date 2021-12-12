'use strict';

const {TITLES, SENTENCES} = require(`../literals/texts`);
const {MIN_TITLES_NUMBER, MIN_CATEGORIES_NUMBER, MAX_SENTENCES_IN_ANNOUNCE, START_GENERATED_HOUR, MIN_SENTENCES_IN_ANNOUNCE, MIN_SENTENCES_IN_FULL_TEXT, DATE_FORMAT, MONTH_MOCK_COUNTER} = require(`../service/config`);
const {CATEGORIES} = require(`../literals/texts`);
const dateFormat = require(`date-format`);

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

const getSentences = (numberOfSentences) => {
  let sentences = ``;

  for (let index = 0; index < numberOfSentences; index++) {
    sentences += SENTENCES[getRandomInt(0, SENTENCES.length - 1)];
  }

  return sentences;
};

const getCategories = (numberOfCategories) => {
  let categories = new Set();

  for (let index = 0; index < numberOfCategories; index++) {
    categories.add(CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]);
  }

  return [...categories];
};

const getRandomDate = (start, end, startHour, endHour) => {
  const date = new Date(+start + Math.random() * (end - start));
  const hour = startHour + Math.random() * (endHour - startHour) | 0;

  date.setHours(hour);

  return date;
};

const getGeneratedPublications = (count) => {
  const dateInPast = new Date();
  const dateNow = new Date();
  const maxGeneratedHour = dateNow.getHours() - 1;

  dateInPast.setMonth(dateInPast.getMonth() - MONTH_MOCK_COUNTER);

  return Array(count).fill({}).map(() => {
    const date = getRandomDate(dateInPast, dateNow, START_GENERATED_HOUR, maxGeneratedHour);

    return {
      title: TITLES[getRandomInt(MIN_TITLES_NUMBER, TITLES.length - 1)],
      announce: getSentences(getRandomInt(MIN_SENTENCES_IN_ANNOUNCE, MAX_SENTENCES_IN_ANNOUNCE)),
      fullText: getSentences(getRandomInt(MIN_SENTENCES_IN_FULL_TEXT, SENTENCES.length - 1)),
      createDate: dateFormat(DATE_FORMAT, date),
      category: getCategories(getRandomInt(MIN_CATEGORIES_NUMBER, CATEGORIES.length - 1)),
    };
  });
};

module.exports = {
  getIsInteger,
  getRandomInt,
  getShuffledArray,
  getGeneratedPublications,
};
