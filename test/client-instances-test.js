'use strict';

var assert = require('assert');
var mocha = require('mocha');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var withData = require('leche').withData;

var describe = mocha.describe;
var it = mocha.it;

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
], function(moduleName, constructorName) {
  describe(moduleName, function() {
    it('promisify and cache ' + moduleName + ' client', function() {
      // jshint maxstatements:false
      var options = {foo: 'bar'};
      var sdkInstance = {fake: 'sdk.instance'};
      var AWS = {};
      AWS[constructorName] = sinon.stub().returns(sdkInstance);

      var promisifyAll = sinon.stub();

      var subjectUnderTest;
      var result;
      var cachedResult;

      promisifyAll.onFirstCall().returns('promisedInstanceA');
      promisifyAll.onSecondCall().returns('promisedInstanceB');

      subjectUnderTest = proxyquire('../' + moduleName, {
        'aws-sdk': AWS,
        './lib/util/promisifyAll': promisifyAll
      });

      result = subjectUnderTest(options);
      cachedResult = subjectUnderTest(options);

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

      assert.equal(result, 'promisedInstanceA');
      assert.equal(cachedResult, result);

      assert.notEqual(cachedResult, subjectUnderTest({baz: 'qux'}));
    });
  });
});
