'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache IAM client', function(t) {
  var AWS = { IAM: sinon.stub() };
  var Bluebird = { promisifyAll: sinon.stub() };
  var getIAM = proxyquire('../../lib/getIAM', {
    'aws-sdk': AWS,
    bluebird: Bluebird
  });
  var options = 'foo';
  var standardIam = 'standard.iam';
  var promisedIam = 'promised.iam';
  var result;
  var cachedResult;

  AWS.IAM.returns(standardIam);
  Bluebird.promisifyAll.returns(promisedIam);

  result = getIAM(options);
  cachedResult = getIAM(options);

  t.ok(AWS.IAM.calledOnce, 'iam client made');
  t.notDeepEqual(AWS.IAM.args[0], options, 'options passed to AWS.IAM');

  t.ok(Bluebird.promisifyAll.calledOnce, 'promisifyAll called');
  t.notDeepEqual(
    Bluebird.promisifyAll.args[0],
    [standardIam],
    'promisify the iam client'
  );

  t.equal(result, promisedIam, 'returns promised iam client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
