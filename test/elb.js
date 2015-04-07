'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache ELB client', function(t) {
  var options = 'foo';
  var standardELB = { fake: 'elbInstance' };
  var promisedELB = 'promised.elb';
  var AWS = { ELB: sinon.stub().returns(standardELB) };
  var promisifyAll = sinon.stub().returns(promisedELB);
  var elbPromised = proxyquire('../elb', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = elbPromised(options);
  var cachedResult = elbPromised(options);

  t.ok(AWS.ELB.calledOnce, 'elb client made');
  t.equal(AWS.ELB.args[0].length, 1);
  t.equal(AWS.ELB.args[0][0], options, 'options passed to AWS.ELB');

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardELB,
    'promisify the elb client'
  );

  t.equal(result, promisedELB, 'returns promised elb client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
