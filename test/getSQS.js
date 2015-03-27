'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache sqs client', function(t) {
  var options = 'test.options';
  var standardSQS = { fake: 'sqsInstance' };
  var promisedSQS = 'promised.sqs';
  var AWS = { SQS: sinon.stub().returns(standardSQS) };
  var Bluebird = { promisifyAll: sinon.stub().returns(promisedSQS) };
  var getSQS = proxyquire('../getSQS', {
    'aws-sdk': AWS,
    bluebird: Bluebird
  });
  var result = getSQS(options);
  var cachedResult = getSQS(options);

  t.ok(AWS.SQS.calledOnce, 'makes sqs client');
  t.equal(AWS.SQS.args[0].length, 1);
  t.equal(AWS.SQS.args[0][0], options, 'options passed to AWS.SQS');

  t.ok(Bluebird.promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(Bluebird.promisifyAll.args[0].length, 1);
  t.equal(
    Bluebird.promisifyAll.args[0][0],
    standardSQS,
    'promisify the SQS client'
  );

  t.equal(result, promisedSQS, 'returns promised sqs client');
  t.equal(cachedResult, result, 'promised client is memoized');

  t.end();
});
