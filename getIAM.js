'use strict';

var AWS = require('aws-sdk');
var Bluebird = require('bluebird');
var memoize = require('lodash/function/memoize');

function getIAM(options) {
  return Bluebird.promisifyAll(new AWS.IAM(options));
}

/**
 * Returns an instance of AWS.IAM which has Promise methods
 * suffixed by "Async"
 *
 * e.g.
 * createRole => createRoleAsync
 *
 * @param options
 */
module.exports = memoize(getIAM);
