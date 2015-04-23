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
 *  dynamoDb: (*|exports|module.exports),
 *  ec2: (*|exports|module.exports),
 *  elb: (*|exports|module.exports),
 *  iam: (*|exports|module.exports),
 *  metadataService: (*|exports|module.exports)
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
  autoScaling: require('./autoScaling'),

  /**
   * Returns a Promises compliant AWS.CloudWatch api.
   *
   * @param {object} options The AWS.CloudWatch constructor options.
   */
  cloudWatch: require('./cloudWatch'),

  /**
   * Returns a Promises compliant AWS.DynamoDB api.
   *
   * @param {object} options The AWS.DynamoDB constructor options.
   */
  dynamoDb: require('./dynamoDb'),

  /**
   * Returns a Promises compliant AWS.EC2 api.
   *
   * @param {object} options The AWS.EC2 constructor options.
   */
  ec2: require('./ec2'),

  /**
   * Returns a Promises compliant AWS.ECS api.
   *
   * @param {object} options The AWS.ECS constructor options.
   */
  ecs: require('./ecs'),

  /**
   * Returns a Promises compliant AWS.ELB api.
   *
   * @param {object} options The AWS.ELB constructor options.
   */
  elb: require('./elb'),

  /**
   * Returns a Promises compliant AWS.IAM api.
   *
   * @param {object} options The AWS.IAM constructor options.
   */
  iam: require('./iam'),

  /**
   * Returns a Promises compliant AWS.MetadataService api.
   *
   * @param {object} options The AWS.MetadataService constructor options.
   */
  metadataService: require('./metadataService'),

  /**
   * Returns a Promises compliant AWS.S3 api.
   *
   * @param {object} options The AWS.S3 constructor options.
   */
  s3: require('./s3'),

  /**
   * Returns a Promises compliant AWS.SQS api.
   *
   * @param {object} options The AWS.SQS constructor options.
   */
  sqs: require('./sqs')
};
