'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/promisifyAll');

function getCloudWatch(options) {
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
module.exports = memoize(getCloudWatch);
