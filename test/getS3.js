'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache S3 client', function(t) {
  var AWS = { S3: sinon.stub() };
  var Bluebird = { promisifyAll: sinon.stub() };
  var getS3 = proxyquire('../getS3', {
    'aws-sdk': AWS,
    bluebird: Bluebird
  });
  var options = 'foo';
  var standardS3 = 'standard.s3';
  var promisedS3 = 'promised.s3';
  var result;
  var cachedResult;

  AWS.S3.returns(standardS3);
  Bluebird.promisifyAll.returns(promisedS3);

  result = getS3(options);
  cachedResult = getS3(options);

  t.ok(AWS.S3.calledOnce, 's3 client made');
  t.notDeepEqual(AWS.S3.args[0], options, 'options passed to AWS.S3');

  t.ok(Bluebird.promisifyAll.calledOnce, 'promisifyAll called');
  t.notDeepEqual(
    Bluebird.promisifyAll.args[0],
    [standardS3],
    'promisify the s3 client'
  );

  t.equal(result, promisedS3, 'returns promised s3 client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
