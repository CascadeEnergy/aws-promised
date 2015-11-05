'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function elb(options) {
  return promisifyAll(new AWS.ELB(options));
}

/**
 * Returns an instance of AWS.ELB which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * createLoadBalancer => createLoadBalancerPromised
 *
 * @param options
 */
module.exports = memoize(elb);
