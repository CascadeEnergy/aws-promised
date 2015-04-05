'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');
var test = require('tape');

test('promisify and cache MetadataService client', function(t) {
  var options = 'foo';
  var standardMetadataService = { fake: 'metadataServiceInstance' };
  var promisedMetadataService = 'promised.MetadataService';
  var AWS = { MetadataService: sinon.stub().returns(standardMetadataService) };
  var promisifyAll = sinon.stub().returns(promisedMetadataService);
  var metadataServicePromised = proxyquire('../metadataService', {
    'aws-sdk': AWS,
    './lib/util/promisifyAll': promisifyAll
  });
  var result = metadataServicePromised(options);
  var cachedResult = metadataServicePromised(options);

  t.ok(AWS.MetadataService.calledOnce, 'MetadataService client made');
  t.equal(AWS.MetadataService.args[0].length, 1);
  t.equal(
    AWS.MetadataService.args[0][0],
    options,
    'options passed to AWS.MetadataService'
  );

  t.ok(promisifyAll.calledOnce, 'promisifyAll called');
  t.equal(promisifyAll.args[0].length, 1);
  t.equal(
    promisifyAll.args[0][0],
    standardMetadataService,
    'promisify the MetadataService client'
  );

  t.equal(
    result,
    promisedMetadataService,
    'returns promised MetadataService client'
  );
  t.equal(cachedResult, result, 'promised client is memoized.');

  t.end();
});
