'use strict';

var test = require('tape');
var clientFactory = require('../index');

test('autoScaling is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.autoScaling, 'function');
});

test('cloudWatch is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.cloudWatch, 'function');
});

test('dynamoDb is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.dynamoDb, 'function');
});

test('ec2 is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.ec2, 'function');
});

test('iam is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.iam, 'function');
});

test('s3 is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.s3, 'function');
});

test('sqs is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.sqs, 'function');
});
