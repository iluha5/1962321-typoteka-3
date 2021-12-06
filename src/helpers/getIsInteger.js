'use strict';

const getIsInteger = (value) => {
  if (value.toString().search(/[.]/g) !== -1) {
    return false;
  }

  return Number(value) === parseInt(value, 10);
};

module.exports = {
  getIsInteger,
};
