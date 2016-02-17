'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function iot(options) {
  return promisifyAll(new AWS.Iot(options));
}

/**
 * Returns an instance of AWS.Iot which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * acceptCertificateTransfer => acceptCertificateTransferPromised
 *
 * @param options
 */
module.exports = memoize(iot);
