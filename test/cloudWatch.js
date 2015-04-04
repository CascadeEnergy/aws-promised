'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache CloudWatch client', function(t) {
  var options = 'foo';
  var standardCloudWatch = { fake: 'cloudWatchInstance' };
  var promisedCloudWatch = 'promised.cloudWatch';
  var AWS = { CloudWatch: sinon.stub().returns(standardCloudWatch) };
  var promisifyAll = sinon.stub().returns(promisedCloudWatch);
  var cloudWatchPromised = proxyquire('../cloudWatch', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = cloudWatchPromised(options);
  var cachedResult = cloudWatchPromised(options);

  t.ok(AWS.CloudWatch.calledOnce, 'cloudWatch client made');
  t.equal(AWS.CloudWatch.args[0].length, 1);
  t.equal(
    AWS.CloudWatch.args[0][0],
    options,
    'options passed to AWS.CloudWatch constructor'
  );

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardCloudWatch,
    'promisify the CloudWatch client'
  );

  t.equal(result, promisedCloudWatch, 'returns promised cloudWatch client');
  t.equal(cachedResult, result, 'promised client is memoized');

  t.end();
});
