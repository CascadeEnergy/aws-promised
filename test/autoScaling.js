'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache AutoScaling client', function(t) {
  var options = 'foo';
  var standardAutoScaling = { fake: 'autoScalingInstance' };
  var promisedAutoScaling = 'promised.autoScaling';
  var AWS = { AutoScaling: sinon.stub().returns(standardAutoScaling) };
  var promisifyAll = sinon.stub().returns(promisedAutoScaling);
  var autoScalingPromised = proxyquire('../autoScaling', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = autoScalingPromised(options);
  var cachedResult = autoScalingPromised(options);

  t.ok(AWS.AutoScaling.calledOnce, 'autoScaling client made');
  t.equal(AWS.AutoScaling.args[0].length, 1);
  t.equal(
    AWS.AutoScaling.args[0][0],
    options,
    'options passed to AWS.AutoScaling'
  );

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardAutoScaling,
    'promisify the autoScaling client'
  );

  t.equal(result, promisedAutoScaling, 'returns promised autoScaling client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
