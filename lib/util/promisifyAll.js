'use strict';

var Bluebird = require('bluebird');

// Custom promisifier function which adds the "Promised" suffix.
function promisifyAll(target) {
  return Bluebird.promisifyAll(target, { suffix: 'Promised' });
}

module.exports = promisifyAll;
