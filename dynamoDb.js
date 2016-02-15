'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function dynamoDb(options) {
  return promisifyAll(new AWS.DynamoDB(options));
}

function documentClient(options) {
  return promisifyAll(new AWS.DynamoDB.DocumentClient(options));
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

/**
 * Returns an instance of AWS.DynamoDB.DocumentClient
 * which has Promise methods suffixed by "Promised"
 *
 * e.g.
 * get: getPromised
 *
 * @param options
 */
module.exports.documentClient = memoize(documentClient);
