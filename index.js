'use strict';

/**
 * This is a support factory which generates and returns AWS client instances
 * for various regions that have been wrapped in promise decorators
 *
 * This factory memoizes the api objects it returns. If the requested Api does
 * not already exist it is created, otherwise the existing one is returned.
 *
 * @type {{
 *  autoScaling: (*|exports|module.exports),
 *  cloudWatch: (*|exports|module.exports),
 *  ec2: (*|exports|module.exports),
 *  iam: (*|exports|module.exports),
 *  s3: (*|exports|module.exports)
 *  sqs: (*|exports|module.exports)
 * }}
 */
module.exports = {
  /**
   * Returns a Promises compliant AWS.AutoScaling api.
   *
   * @param {object} options The AWS.AutoScaling constructor options.
   */
  getAutoScaling: require('./autoScaling'),

  /**
   * Returns a Promises compliant AWS.CloudWatch api.
   *
   * @param {object} options The AWS.CloudWatch constructor options.
   */
  getCloudWatch: require('./cloudWatch'),

  /**
   * Returns a Promises compliant AWS.EC2 api.
   *
   * @param {object} options The AWS.EC2 constructor options.
   */
  getEC2: require('./ec2'),

  /**
   * Returns a Promises compliant AWS.IAM api.
   *
   * @param {object} options The AWS.IAM constructor options.
   */
  getIAM: require('./iam'),

  /**
   * Returns a Promises compliant AWS.S3 api.
   *
   * @param {object} options The AWS.S3 constructor options.
   */
  getS3: require('./s3'),

  /**
   * Returns a Promises compliant AWS.SQS api.
   *
   * @param {object} options The AWS.SQS constructor options.
   */
  getSQS: require('./sqs')
};
