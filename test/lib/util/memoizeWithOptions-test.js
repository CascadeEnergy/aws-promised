'use strict';

var assert = require('assert');
var mocha = require('mocha');
var sinon = require('sinon');
var proxyquire = require('proxyquire');

var describe = mocha.describe;
var it = mocha.it;

describe('lib/memoizeWithOptions', function() {
  it(
    'calls the lodash memoize function with JSON.stringify as the resolver',
    function() {
      var memoizeWithOptions;
      var memoizeStub;
      var result;
      var target = function() {};

      memoizeStub = sinon.stub();
      memoizeStub.returns('memoizeResult');

      memoizeWithOptions = proxyquire(
        '../../../lib/util/memoizeWithOptions',
        {
          'lodash/function/memoize': memoizeStub
        }
      );

      result = memoizeWithOptions(target);

      assert.equal(result, 'memoizeResult');
      assert.equal(memoizeStub.callCount, 1);
      assert.equal(memoizeStub.args[0][0], target);
      assert.equal(memoizeStub.args[0][1], JSON.stringify);
    }
  );
});
