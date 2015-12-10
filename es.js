'use strict';

var AWS = require('aws-sdk');
var memoize = require('./lib/util/memoizeWithOptions');
var promisifyAll = require('./lib/util/promisifyAll');

function es(options) {
  return promisifyAll(new AWS.ES(options));
}

/**
 * Returns an instance of AWS.ES which has Promise methods
 * suffixed by "Promised"
 *
 * e.g.
 * updateElasticsearchDomainConfig => updateElasticsearchDomainConfigPromised
 *
 * @param options
 */
module.exports = memoize(es);
