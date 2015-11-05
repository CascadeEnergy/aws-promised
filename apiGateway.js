'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function apiGateway(options) {
  return promisifyAll(new AWS.APIGateway(options));
}

/**
 * Returns an instance of AWS.APIGateway which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * getApiKeys : getApiKeysPromised
 *
 * @param options
 */
module.exports = memoize(apiGateway);
