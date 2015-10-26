'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function lambda(options) {
  return promisifyAll(new AWS.Lambda(options));
}

/**
 * Returns an instance of AWS.Lambda which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * invoke : invokePromised
 *
 * @param options
 */
module.exports = memoize(lambda);
