'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache S3 client', function(t) {
  var options = 'foo';
  var standardS3 = { fake: 's3Instance' };
  var promisedS3 = 'promised.s3';
  var AWS = { S3: sinon.stub().returns(standardS3) };
  var promisifyAll = sinon.stub().returns(promisedS3);
  var getS3 = proxyquire('../getS3', {
    'aws-sdk': AWS,
    './lib/promisifyAll': promisifyAll
  });
  var result = getS3(options);
  var cachedResult = getS3(options);

  t.ok(AWS.S3.calledOnce, 's3 client made');
  t.equal(AWS.S3.args[0].length, 1);
  t.equal(AWS.S3.args[0][0], options, 'options passed to AWS.S3');

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardS3,
    'promisify the s3 client'
  );

  t.equal(result, promisedS3, 'returns promised s3 client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
