'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache sqs client', function(t) {
  var options = 'test.options';
  var standardSQS = { fake: 'sqsInstance' };
  var promisedSQS = 'promised.sqs';
  var AWS = { SQS: sinon.stub().returns(standardSQS) };
  var promisifyAll = sinon.stub().returns(promisedSQS);
  var getSQS = proxyquire('../getSQS', {
    'aws-sdk': AWS,
    './lib/promisifyAll': promisifyAll
  });
  var result = getSQS(options);
  var cachedResult = getSQS(options);

  t.ok(AWS.SQS.calledOnce, 'makes sqs client');
  t.equal(AWS.SQS.args[0].length, 1);
  t.equal(AWS.SQS.args[0][0], options, 'options passed to AWS.SQS');

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardSQS,
    'promisify the SQS client'
  );

  t.equal(result, promisedSQS, 'returns promised sqs client');
  t.equal(cachedResult, result, 'promised client is memoized');

  t.end();
});
