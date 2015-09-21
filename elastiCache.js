'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function elastiCache(options) {
  return promisifyAll(new AWS.ElastiCache(options));
}

/**
 * Returns an instance of AWS.ElastiCache which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * addTagsToResource : addTagsToResourcePromised
 *
 * @param options
 */
module.exports = memoize(elastiCache);
