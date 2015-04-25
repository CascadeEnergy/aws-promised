'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache ECS client', function(t) {
  var options = 'foo';
  var standardECS = { fake: 'ecsInstance' };
  var promisedECS = 'promised.ecs';
  var AWS = { ECS: sinon.stub().returns(standardECS) };
  var promisifyAll = sinon.stub().returns(promisedECS);
  var ecsPromised = proxyquire('../ecs', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = ecsPromised(options);
  var cachedResult = ecsPromised(options);

  t.ok(AWS.ECS.calledOnce, 'ecs client made');
  t.equal(AWS.ECS.args[0].length, 1);
  t.equal(AWS.ECS.args[0][0], options, 'options passed to AWS.ECS');

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardECS,
    'promisify the ecs client'
  );

  t.equal(result, promisedECS, 'returns promised ecs client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
