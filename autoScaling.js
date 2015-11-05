'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function autoScaling(options) {
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
module.exports = memoize(autoScaling);
