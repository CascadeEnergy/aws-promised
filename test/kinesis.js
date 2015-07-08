'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache Kinesis client', function(t) {
  var options = 'foo';
  var standardKinesis = { fake: 'kinesisInstance' };
  var promisedKinesis = 'promised.kinesis';
  var AWS = { Kinesis: sinon.stub().returns(standardKinesis) };
  var promisifyAll = sinon.stub().returns(promisedKinesis);
  var kinesisPromised = proxyquire('../kinesis', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = kinesisPromised(options);
  var cachedResult = kinesisPromised(options);

  t.ok(AWS.Kinesis.calledOnce, 'Kinesis client made');
  t.equal(AWS.Kinesis.args[0].length, 1);
  t.equal(AWS.Kinesis.args[0][0], options, 'options passed to AWS.Kinesis');

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardKinesis,
    'promisify the Kinesis client'
  );

  t.equal(result, promisedKinesis, 'returns promised Kinesis client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
