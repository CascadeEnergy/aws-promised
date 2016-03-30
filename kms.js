'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function kms(options) {
  return promisifyAll(new AWS.KMS(options));
}

/**
 * Returns an instance of AWS.KMS which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * listKeys : listKeysPromised
 *
 * @param options
 */
module.exports = memoize(kms);
