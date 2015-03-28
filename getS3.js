'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/promisifyAll');

function getS3(options) {
  return promisifyAll(new AWS.S3(options));
}

/**
 * Returns an instance of AWS.S3 which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * listObjects : listObjectsPromised
 *
 * @param options
 */
module.exports = memoize(getS3);
