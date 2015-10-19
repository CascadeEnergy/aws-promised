'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function iam(options) {
  return promisifyAll(new AWS.IAM(options));
}

/**
 * Returns an instance of AWS.IAM which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * createRole => createRolePromised
 *
 * @param options
 */
module.exports = memoize(iam);
