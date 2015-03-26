'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache EC2 client', function(t) {
  var AWS = { EC2: sinon.stub() };
  var Bluebird = { promisifyAll: sinon.stub() };
  var getEC2 = proxyquire('../getEC2', {
    'aws-sdk': AWS,
    bluebird: Bluebird
  });
  var options = 'foo';
  var standardEC2 = 'standard.ec2';
  var promisedEC2 = 'promised.ec2';
  var result;
  var cachedResult;

  AWS.EC2.returns(standardEC2);
  Bluebird.promisifyAll.returns(promisedEC2);

  result = getEC2(options);
  cachedResult = getEC2(options);

  t.ok(AWS.EC2.calledOnce, 'ec2 client made');
  t.notDeepEqual(AWS.EC2.args[0], options, 'options passed to AWS.EC2');

  t.ok(Bluebird.promisifyAll.calledOnce, 'promisifyAll called');
  t.notDeepEqual(
    Bluebird.promisifyAll.args[0],
    [standardEC2],
    'promisify the ec2 client'
  );

  t.equal(result, promisedEC2, 'returns promised ec2 client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
