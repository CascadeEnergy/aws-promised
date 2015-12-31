'use strict';

var assert = require('assert');
var mocha = require('mocha');
var withData = require('leche').withData;

var describe = mocha.describe;
var it = mocha.it;

var clientFactory = require('../index');

describe('index client factory', function() {
  withData([
    ['apiGateway', 'APIGateway'],
    ['autoScaling', 'AutoScaling'],
    ['cloudFormation', 'CloudFormation'],
    ['cloudFront', 'CloudFront'],
    ['cloudWatch', 'CloudWatch'],
    ['dynamoDb', 'DynamoDB'],
    ['ec2', 'EC2'],
    ['ecs', 'ECS'],
    ['elastiCache', 'ElastiCache'],
    ['elb', 'ELB'],
    ['es', 'ES'],
    ['iam', 'IAM'],
    ['kinesis', 'Kinesis'],
    ['lambda', 'Lambda'],
    ['metadataService', 'MetadataService'],
    ['route53', 'Route53'],
    ['s3', 'S3'],
    ['ses', 'SES'],
    ['sns', 'SNS'],
    ['sqs', 'SQS']
  ], function(factoryMethod) {
    it(factoryMethod + ' is a function', function() {
      assert.equal(
        typeof clientFactory[factoryMethod],
        'function',
        'has factory method for client type'
      );
    });
  });
});
