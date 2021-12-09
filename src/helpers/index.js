'use strict';

const {TITLES, SENTENCES} = require(`../literals/texts`);
const {NUMBER_OF_SENTENCES_IN_TITLE, MIN_SENTENCES_IN_FULL_TEXT} = require(`../service/config`);
const {CATEGORIES} = require(`../literals/texts`);

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
  let categories = [];

  for (let index = 0; index < numberOfCategories; index++) {
    numberOfCategories.push(CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]);
  }

  return categories;
};

const getGeneratedPublications = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: getSentences(getRandomInt(0, NUMBER_OF_SENTENCES_IN_TITLE)),
    fullText: getSentences(getRandomInt(MIN_SENTENCES_IN_FULL_TEXT, SENTENCES.length - 1)),
    createDate: Date.now(),
    category: getCategories(getRandomInt(0, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  getIsInteger,
  getRandomInt,
  getShuffledArray,
  getGeneratedPublications,
};
