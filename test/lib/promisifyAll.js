'use strict';

var test = require('tape');

test('calls promisifyAll on a target, with suffix option', function(t) {
  var target = { myFunc: function() {} };
  var promisifyAll = require('../../lib/promisifyAll');
  var result = promisifyAll(target);

  t.ok(typeof result.myFunc === 'function', 'myFunc still present');
  t.ok(typeof result.myFuncPromised === 'function', 'myFuncPromised was made');
  t.end();
});
