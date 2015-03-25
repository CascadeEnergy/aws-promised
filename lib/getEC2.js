'use strict';

var AWS = require('aws-sdk');
var Bluebird = require('bluebird');
var memoize = require('lodash/function/memoize');

function getEC2(options) {
  return Bluebird.promisifyAll(new AWS.EC2(options));
}

/**
 * Returns an instance of AWS.EC2 which has Promise methods
 * suffixed by "Async"
 *
 * e.g.
 * createImage => createImageAsync
 *
 * @param options
 */
module.exports = memoize(getEC2);
