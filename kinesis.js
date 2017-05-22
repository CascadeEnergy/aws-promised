'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function kinesis(options) {
  return promisifyAll(new AWS.Kinesis(options));
}

/**
 * Returns an instance of AWS.Kinesis which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * listStreams : listStreamsPromised
 *
 * @param options
 */
module.exports = memoize(kinesis);
