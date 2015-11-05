'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function ses(options) {
  return promisifyAll(new AWS.SES(options));
}

/**
 * Returns an instance of AWS.SES which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * sendEmail : sendEmailPromised
 *
 * @param options
 */
module.exports = memoize(ses);
