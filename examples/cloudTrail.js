'use strict';

var awsParams = {
  region: 'us-east-1'
};

var awsPromised = require('../index');
var cloudTrail = awsPromised.cloudTrail(awsParams);

cloudTrail.describeTrailsPromised()
  .then(printContents)
  .catch(console.error);

function printContents(data) {
  console.log(data);
}
