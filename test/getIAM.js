'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache IAM client', function(t) {
  var options = 'foo';
  var standardIam = { fake: 'iamInstance' };
  var promisedIam = 'promised.iam';
  var AWS = { IAM: sinon.stub().returns(standardIam) };
  var Bluebird = { promisifyAll: sinon.stub().returns(promisedIam) };
  var getIAM = proxyquire('../getIAM', {
    'aws-sdk': AWS,
    bluebird: Bluebird
  });
  var result = getIAM(options);
  var cachedResult = getIAM(options);

  t.ok(AWS.IAM.calledOnce, 'iam client made');
  t.equal(AWS.IAM.args[0].length, 1);
  t.equal(AWS.IAM.args[0][0], options, 'options passed to AWS.IAM');

  t.ok(Bluebird.promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(Bluebird.promisifyAll.args[0].length, 1);
  t.equal(
    Bluebird.promisifyAll.args[0][0],
    standardIam,
    'promisify the iam client'
  );

  t.equal(result, promisedIam, 'returns promised iam client');
  t.equal(cachedResult, result, 'promised client is memoized');

  t.end();
});
