'use strict';

var assert = require('assert');
var mocha = require('mocha');
var withData = require('leche').withData;

var describe = mocha.describe;
var it = mocha.it;

var clientFactory = require('../index');

describe('index client factory', function() {
  withData([
    ['autoScaling', 'AutoScaling'],
    ['cloudFormation', 'CloudFormation'],
    ['cloudWatch', 'CloudWatch'],
    ['dynamoDb', 'DynamoDB'],
    ['ec2', 'EC2'],
    ['ecs', 'ECS'],
    ['elastiCache', 'ElastiCache'],
    ['elb', 'ELB'],
    ['iam', 'IAM'],
    ['kinesis', 'Kinesis'],
    ['lambda', 'Lambda'],
    ['metadataService', 'MetadataService'],
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
