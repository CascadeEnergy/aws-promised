'use strict';

var AWS = require('aws-sdk');
var Bluebird = require('bluebird');
var memoize = require('lodash/function/memoize');

function getS3(options) {
  return Bluebird.promisifyAll(new AWS.S3(options));
}

/**
 * Returns an instance of AWS.S3 which has Promise methods
 * suffixed by "Async"
 *
 * e.g.
 * getObject : getObjectAsync
 * listObjects : listObjectsAsync
 *
 * @param options
 */
module.exports = memoize(getS3);
