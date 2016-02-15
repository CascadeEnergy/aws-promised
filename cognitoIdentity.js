'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function cognitoIdentity(options) {
  return promisifyAll(new AWS.CognitoIdentity(options));
}

/**
 * Returns an instance of AWS.CognitoIdentity which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * createIdentityPool => createIdentityPoolPromised
 *
 * @param options
 */
module.exports = memoize(cognitoIdentity);
