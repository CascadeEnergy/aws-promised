'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function cloudFront(options) {
  return promisifyAll(new AWS.CloudFront(options));
}

/**
 * Returns an instance of AWS.CloudFront which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * createDistribution : createDistributionPromised
 *
 * @param options
 */
module.exports = memoize(cloudFront);
