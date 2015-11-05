'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function cloudFormation(options) {
  return promisifyAll(new AWS.CloudFormation(options));
}

/**
 * Returns an instance of AWS.CloudFormation which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * updateStack : updateStackPromised
 *
 * @param options
 */
module.exports = memoize(cloudFormation);
