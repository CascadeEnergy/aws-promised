'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache ElastiCache client', function(t) {
  var options = 'foo';
  var standardElastiCache = { fake: 'elastiCache' };
  var promisedElastiCache = 'promised.elastiCache';
  var AWS = { ElastiCache: sinon.stub().returns(standardElastiCache) };
  var promisifyAll = sinon.stub().returns(promisedElastiCache);
  var elastiCachePromised = proxyquire('../elastiCache', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = elastiCachePromised(options);
  var cachedResult = elastiCachePromised(options);

  t.ok(AWS.ElastiCache.calledOnce, 'elastiCache client made');
  console.log(AWS.ElastiCache.args[0]);
  t.equal(AWS.ElastiCache.args[0].length, 1);
  t.equal(
    AWS.ElastiCache.args[0][0],
    options,
    'options passed to AWS.ElastiCache'
  );

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardElastiCache,
    'promisify the ElastiCache client'
  );

  t.equal(result, promisedElastiCache, 'returns promised ElastiCache client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
