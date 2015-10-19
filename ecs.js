'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function ecs(options) {
  return promisifyAll(new AWS.ECS(options));
}

/**
 * Returns an instance of AWS.ECS which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * createService => createServicePromised
 *
 * @param options
 */
module.exports = memoize(ecs);
