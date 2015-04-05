'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache DynamoDB client', function(t) {
  var options = 'foo';
  var standardDynamoDb = { fake: 'dynamoDbInstance' };
  var promisedDynamoDb = 'promised.dynamoDb';
  var AWS = { DynamoDB: sinon.stub().returns(standardDynamoDb) };
  var promisifyAll = sinon.stub().returns(promisedDynamoDb);
  var dynamoDbPromised = proxyquire('../dynamoDb', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = dynamoDbPromised(options);
  var cachedResult = dynamoDbPromised(options);

  t.ok(AWS.DynamoDB.calledOnce, 'DynamoDB client made');
  t.equal(AWS.DynamoDB.args[0].length, 1);
  t.equal(AWS.DynamoDB.args[0][0], options, 'options passed to AWS.DynamoDB');

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardDynamoDb,
    'promisify the dynamoDb client'
  );

  t.equal(result, promisedDynamoDb, 'returns promised dynamoDb client');
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
