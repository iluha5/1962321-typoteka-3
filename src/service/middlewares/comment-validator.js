'use strict';

const statusCodes = require(`http-status`);

const commentKeys = [`text`];

const commentValidator = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = commentKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(statusCodes.BAD_REQUEST)
      .send(statusCodes.BAD_REQUEST);
  }

  return next();
};

module.exports = {
  commentValidator
};
