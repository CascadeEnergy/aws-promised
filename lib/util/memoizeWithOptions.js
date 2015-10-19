'use strict';

var memoize = require('lodash/function/memoize');

function memoizeWithOptions(target) {
  return memoize(target, JSON.stringify);
}

module.exports = memoizeWithOptions;
