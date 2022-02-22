'use strict';

const {nanoid} = require(`nanoid`);
const dateFormat = require(`date-format`);
const {MAX_ID_LENGTH, DATE_FORMAT} = require(`../config`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  create(article) {
    const newArticle = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      createDate: dateFormat(DATE_FORMAT, new Date()),
      ...article,
    };

    this._articles.push(newArticle);

    return newArticle;
  }

  update(id, article) {
    const oldArticle = this._articles.find((articleItem) => articleItem.id === id);


    if (!oldArticle) {
      return undefined;
    }

    return Object.assign(oldArticle, article);
  }

  remove(id) {
    const articleIndex = this._articles.findIndex((article) => article.id === id);

    if (articleIndex === -1) {
      return null;
    }

    const removedArticleArray = this._articles.splice(articleIndex, 1);

    return removedArticleArray[0];
  }
}

module.exports = ArticleService;
