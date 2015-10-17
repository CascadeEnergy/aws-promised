'use strict';

var assert = require('assert');
var mocha = require('mocha');

var describe = mocha.describe;
var it = mocha.it;

describe('lib/promisifyAll', function() {
  it('calls promisifyAll on a target, with suffix option', function() {
    var target = { myFunc: function() {} };
    var promisifyAll = require('../../../lib/util/promisifyAll');
    var result = promisifyAll(target);

    assert.ok(
      typeof result.myFunc === 'function',
      'myFunc still present'
    );
    assert.ok(
      typeof result.myFuncPromised === 'function',
      'myFuncPromised was made'
    );
  });
});
