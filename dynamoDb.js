'use strict';

var AWS = require('aws-sdk');
var memoize = require('lodash/function/memoize');
var promisifyAll = require('./lib/util/promisifyAll');

function dynamoDb(options) {
  return promisifyAll(new AWS.DynamoDB(options));
}

/**
 * Returns an instance of AWS.DynamoDB which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * getItem : getItemPromised
 *
 * @param options
 */
module.exports = memoize(dynamoDb);
