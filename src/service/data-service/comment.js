'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../config`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(articleId) {
    const article = this._articles.find((articleItem) => articleItem.id === articleId);

    if (!article) {
      return null;
    }

    return article.comments;
  }

  remove(articleId, commentId) {
    const articleIndex = this._articles.findIndex((articleItem) => articleItem.id === articleId);

    if (articleIndex === -1) {
      return null;
    }

    const article = this._articles[articleIndex];
    const commentIndex = article.comments.findIndex((comment) => comment.id === commentId);

    if (commentIndex === -1) {
      return null;
    }

    const removedCommentArray = this._articles[articleIndex].comments.splice(commentIndex, 1);

    return removedCommentArray[0];
  }

  create(articleId, comment) {
    const articleIndex = this._articles.findIndex((article) => article.id === articleId);

    if (articleIndex === -1) {
      return null;
    }

    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    this._articles[articleIndex].comments.push(newComment);

    return newComment;
  }
}

module.exports = CommentService;
