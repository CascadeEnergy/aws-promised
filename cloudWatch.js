'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function cloudWatch(options) {
  return promisifyAll(new AWS.CloudWatch(options));
}

/**
 * Returns an instance of AWS.CloudWatch which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * putMetricAlarm => putMetricAlarmPromised
 *
 * @param options
 */
module.exports = memoize(cloudWatch);
