'use strict';

var assert = require('assert');
var mocha = require('mocha');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var withData = require('leche').withData;

var describe = mocha.describe;
var it = mocha.it;

withData([
  ['autoScaling', 'AutoScaling'],
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
  ['sns', 'SNS'],
  ['sqs', 'SQS']
], function(moduleName, constructorName) {
  describe(moduleName, function() {
    it('promisify and cache ' + moduleName + ' client', function() {
      // jshint maxstatements:false
      var options = 'foo';
      var sdkInstance = {fake: 'sdk.instance'};
      var promisedInstance = 'promised.instance';
      var AWS = {};
      AWS[constructorName] = sinon.stub().returns(sdkInstance);

      var promisifyAll = sinon.stub().returns(promisedInstance);

      var subjectUnderTest = proxyquire('../' + moduleName, {
        'aws-sdk': AWS,
        './lib/util/promisifyAll': promisifyAll
      });

      var result = subjectUnderTest(options);
      var cachedResult = subjectUnderTest(options);

      assert.ok(
        AWS[constructorName].calledOnce,
        'constructor called once'
      );
      assert.equal(
        AWS[constructorName].args[0].length,
        1,
        'constructor called with one argument'
      );

      assert.equal(
        AWS[constructorName].args[0][0],
        options,
        'options passed to constructor'
      );

      assert.ok(promisifyAll.calledOnce, 'promisifyAll called');
      assert.equal(promisifyAll.args[0].length, 1);
      assert.equal(
        promisifyAll.args[0][0],
        sdkInstance,
        'promisify the client'
      );

      assert.equal(
        result,
        promisedInstance,
        'returns promised client'
      );

      assert.equal(
        cachedResult,
        result,
        'promised client is memoized.'
      );
    });
  });
});
