'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/promisifyAll');

function getAutoScaling(options) {
  return promisifyAll(new AWS.AutoScaling(options));
}

/**
 * Returns an instance of AWS.AutoScaling which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * createAutoScalingGroup => createAutoScalingGroupPromised
 *
 * @param options
 */
module.exports = memoize(getAutoScaling);
