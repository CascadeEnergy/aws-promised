'use strict';

var awsParams = {
  region: 'us-east-1'
};

var awsPromised = require('../index');
var kms = awsPromised.kms(awsParams);

kms.listKeysPromised()
  .then(printContents)
  .catch(console.error);

function printContents(data) {
  console.log(data);
}
