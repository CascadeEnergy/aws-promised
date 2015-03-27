'use strict';

var AWS = require('aws-sdk');
var Bluebird = require('bluebird');
var memoize = require('lodash/function/memoize');

function getSQS(options) {
  return Bluebird.promisifyAll(new AWS.SQS(options));
}

/**
 * Returns an instance of AWS.SQS which has Promise methods
 * suffixed by "Async"
 *
 * e.g.
 * receiveMessage : receiveMessageAsync
 *
 * @param options
 */
module.exports = memoize(getSQS);
