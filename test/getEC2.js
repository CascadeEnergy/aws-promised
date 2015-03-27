'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache EC2 client', function(t) {
  var options = 'foo';
  var standardEC2 = { fake: 'ec2Instance' };
  var promisedEC2 = 'promised.ec2';
  var AWS = { EC2: sinon.stub().returns(standardEC2) };
  var Bluebird = { promisifyAll: sinon.stub().returns(promisedEC2) };
  var getEC2 = proxyquire('../getEC2', {
    'aws-sdk': AWS,
    bluebird: Bluebird
  });
  var result = getEC2(options);
  var cachedResult = getEC2(options);

  t.ok(AWS.EC2.calledOnce, 'ec2 client made');
  t.equal(AWS.EC2.args[0].length, 1);
  t.equal(AWS.EC2.args[0][0], options, 'options passed to AWS.EC2');

  t.ok(Bluebird.promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(Bluebird.promisifyAll.args[0].length, 1);
  t.equal(
    Bluebird.promisifyAll.args[0][0],
    standardEC2,
    'promisify the ec2 client'
  );

  t.equal(result, promisedEC2, 'returns promised ec2 client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
