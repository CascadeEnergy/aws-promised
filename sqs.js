'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function sqs(options) {
  return promisifyAll(new AWS.SQS(options));
}

/**
 * Returns an instance of AWS.SQS which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * receiveMessage : receiveMessagePromised
 *
 * @param options
 */
module.exports = memoize(sqs);
