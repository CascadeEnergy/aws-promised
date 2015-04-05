'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function metadataService(options) {
  return promisifyAll(new AWS.MetadataService(options));
}

/**
 * Returns an instance of AWS.MetadataService which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * request : requestPromised
 *
 * @param options
 */
module.exports = memoize(metadataService);
