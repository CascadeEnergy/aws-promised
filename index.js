'use strict';

/**
 * This is a support factory which generates and returns AWS client instances
 * for various regions that have been wrapped in promise decorators
 *
 * This factory memoizes the api objects it returns. If the requested Api does
 * not already exist it is created, otherwise the existing one is returned.
 *
 * @type {{
 *  apiGateway: (*|exports|module.exports),
 *  autoScaling: (*|exports|module.exports),
 *  cloudFormation: (*|exports|module.exports),
 *  cloudFront: (*|exports|module.exports),
 *  cloudTrail: (*|exports|module.exports),
 *  cloudWatch: (*|exports|module.exports),
 *  dynamoDb: (*|exports|module.exports),
 *  ec2: (*|exports|module.exports),
 *  ecs: (*|exports|module.exports),
 *  elastiCache: (*|exports|module.exports),
 *  elb: (*|exports|module.exports),
 *  es: (*|exports|module.exports),
 *  iam: (*|exports|module.exports),
 *  kinesis: (*|exports|module.exports),
 *  kinesisAnalytics: (*|exports|module.exports),
 *  kms: (*|exports|module.exports),
 *  lambda: (*|exports|module.exports),
 *  metadataService: (*|exports|module.exports)
 *  s3: (*|exports|module.exports)
 *  ses: (*|exports|module.exports)
 *  sns: (*|exports|module.exports)
 *  sqs: (*|exports|module.exports)
 * }}
 */
module.exports = {
  /**
   * Returns a Promises compliant AWS.APIGateway api.
   *
   * @param {object} options The AWS.APIGateway constructor options.
   */
  apiGateway: require('./apiGateway'),

  /**
   * Returns a Promises compliant AWS.AutoScaling api.
   *
   * @param {object} options The AWS.AutoScaling constructor options.
   */
  autoScaling: require('./autoScaling'),

  /**
   * Returns a Promises compliant AWS.CloudFormation api.
   *
   * @param {object} options The AWS.CloudFormation constructor options.
   */
  cloudFormation: require('./cloudFormation'),

  /**
   * Returns a Promises compliant AWS.CloudFront api.
   *
   * @param {object} options The AWS.CloudFront constructor options.
   */
  cloudFront: require('./cloudFront'),

  /**
   * Returns a Promises compliant AWS.CloudTrail api.
   *
   * @param {object} options The AWS.CloudTrail constructor options.
   */
  cloudTrail: require('./cloudTrail'),

  /**
   * Returns a Promises compliant AWS.CloudWatch api.
   *
   * @param {object} options The AWS.CloudWatch constructor options.
   */
  cloudWatch: require('./cloudWatch'),

  /**
   * Returns a Promises compliant AWS.CognitoIdentity api.
   *
   * @param {object} options The AWS.CognitoIdentity constructor options.
   */
  cognitoIdentity: require('./cognitoIdentity'),

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
   * Returns a Promise compliant AWS.ElastiCache api
   *
   * @param {object} options The AWS.ElastiCache constructor options.
   */
  elastiCache: require('./elastiCache'),

  /**
   * Returns a Promises compliant AWS.ELB api.
   *
   * @param {object} options The AWS.ELB constructor options.
   */
  elb: require('./elb'),

  /**
   * Returns a Promises compliant AWS.ES api.
   *
   * @param {object} options The AWS.ES constructor options.
   */
  es: require('./es'),

  /**
   * Returns a Promises compliant AWS.IAM api.
   *
   * @param {object} options The AWS.IAM constructor options.
   */
  iam: require('./iam'),

  /**
   * Returns a Promises compliant AWS.Iot api.
   *
   * @param {object} options The AWS.Iot constructor options.
   */
  iot: require('./iot'),

  /**
   * Returns a Promises compliant AWS.IotData api.
   *
   * @param {object} options The AWS.IotData constructor options.
   */
  iotData: require('./iotData'),

  /**
   * Returns a Promises compliant AWS.Kinesis api.
   *
   * @param {object} options The AWS.Kinesis constructor options.
   */
  kinesis: require('./kinesis'),

  /**
   * Returns a Promises compliant AWS.KinesisAnalytics api.
   *
   * @param {object} options The AWS.KinesisAnalytics constructor options.
   */
  kinesisAnalytics: require('./kinesisAnalytics'),
  
  /**
   * Returns a Promises compliant AWS.KMS api.
   *
   * @param {object} options The AWS.KMS constructor options.
   */
  kms: require('./kms'),

  /**
   * Returns a Promises compliant AWS.Lambda api.
   *
   * @param {object} options The AWS.Lambda constructor options.
   */
  lambda: require('./lambda'),

  /**
   * Returns a Promises compliant AWS.MetadataService api.
   *
   * @param {object} options The AWS.MetadataService constructor options.
   */
  metadataService: require('./metadataService'),

  /**
   * Returns a Promises compliant AWS.Route53 api.
   *
   * @param {object} options The AWS.Route53 constructor options.
   */
  route53: require('./route53'),

  /**
   * Returns a Promises compliant AWS.S3 api.
   *
   * @param {object} options The AWS.S3 constructor options.
   */
  s3: require('./s3'),

  /**
   * Returns a Promises compliant AWS.SES api.
   *
   * @param {object} options The AWS.SES constructor options.
   */
  ses: require('./ses'),

  /**
   * Returns a Promises compliant AWS.SNS api.
   *
   * @param {object} options The AWS.SNS constructor options.
   */
  sns: require('./sns'),

  /**
   * Returns a Promises compliant AWS.SQS api.
   *
   * @param {object} options The AWS.SQS constructor options.
   */
  sqs: require('./sqs')
};
