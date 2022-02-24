'use strict';

class SearchService {
  constructor(articles) {
    this._artciles = articles;
  }

  findAll(searchText) {
    return this._artciles.filter((article) => article.title.includes(searchText));
  }
}

module.exports = SearchService;
