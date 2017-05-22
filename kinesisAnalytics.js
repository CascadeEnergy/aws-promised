'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function kinesisAnalytics(options) {
  return promisifyAll(new AWS.KinesisAnalytics(options));
}

/**
 * Returns an instance of AWS.kinesisAnalytics which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * listApplications : listApplicationsPromised
 *
 * @param options
 */
module.exports = memoize(kinesisAnalytics);
