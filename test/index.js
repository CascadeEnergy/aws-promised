'use strict';

var test = require('tape');
var clientFactory = require('../../aws-promised');

test('autoScaling is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getAutoScaling, 'function');
});

test('cloudWatch is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getCloudWatch, 'function');
});

test('ec2 is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getEC2, 'function');
});

test('iam is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getIAM, 'function');
});

test('s3 is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getS3, 'function');
});

test('sqs is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getSQS, 'function');
});
