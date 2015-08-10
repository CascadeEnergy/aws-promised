'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function kinesis(options) {
  return promisifyAll(new AWS.Kinesis(options));
}

/**
 * Returns an instance of AWS.Kinesis which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * listObjects : listObjectsPromised
 *
 * @param options
 */
module.exports = memoize(kinesis);
