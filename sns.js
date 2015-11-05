'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function sns(options) {
  return promisifyAll(new AWS.SNS(options));
}

/**
 * Returns an instance of AWS.SNS which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * publish : publishPromised
 *
 * @param options
 */
module.exports = memoize(sns);
