'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function route53(options) {
  return promisifyAll(new AWS.Route53(options));
}

/**
 * Returns an instance of AWS.Route53 which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * changeResourceRecordSets : changeResourceRecordSetsPromised
 *
 * @param options
 */
module.exports = memoize(route53);
