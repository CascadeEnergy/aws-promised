'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function iotData(options) {
  return promisifyAll(new AWS.IotData(options));
}

/**
 * Returns an instance of AWS.IotData which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * getThingShadow => getThingShadowPromised
 *
 * @param options
 */
module.exports = memoize(iotData);
