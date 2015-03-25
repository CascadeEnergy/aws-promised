'use strict';

var AWS = require('aws-sdk');
var Bluebird = require('bluebird');
var memoize = require('lodash/function/memoize');

/**
 * Returns an instance of AWS.IAM which has Promise methods
 * suffixed by "Async"
 *
 * e.g.
 * createRole => createRoleAsync
 *
 * @param options
 */
function getIam(options) {
  return Bluebird.promisifyAll(new AWS.IAM(options));
}

/**
 * This is a support factory which generates and returns AWS client instances
 * for various regions that have been wrapped in promise decorators
 *
 * This factory memoizes the api objects it returns. If the requested Api does
 * not already exist it is created, otherwise the existing one is returned.
 *
 * @type {{getMetadataService: Function}}
 */
module.exports = {
  /**
   * Returns a Promises compliant AWS.IAM api.
   *
   * @param {object} options The AWS.IAM constructor options.
   */
  getIam: memoize(getIam)
};
