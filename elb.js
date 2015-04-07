'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function elb(options) {
  return promisifyAll(new AWS.ELB(options));
}

/**
 * Returns an instance of AWS.ELB which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * createImage => createImagePromised
 *
 * @param options
 */
module.exports = memoize(elb);
