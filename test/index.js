'use strict';

var test = require('tape');
var clientFactory = require('../');

test('getAutoScaling is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getAutoScaling, 'function');
});

test('getEC2 is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getEC2, 'function');
});

test('getIAM is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getIAM, 'function');
});

test('getS3 is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getS3, 'function');
});

test('getSQS is function', function(t) {
  t.plan(1);
  t.equal(typeof clientFactory.getSQS, 'function');
});
