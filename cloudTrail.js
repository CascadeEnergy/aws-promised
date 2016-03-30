'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function cloudTrail(options) {
  return promisifyAll(new AWS.CloudTrail(options));
}

/**
 * Returns an instance of AWS.CloudTrail which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * describeTrails : describeTrailsPromised
 *
 * @param options
 */
module.exports = memoize(cloudTrail);
