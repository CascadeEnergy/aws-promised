'use strict';

var awsPromised = require('../index');
var metadataService = awsPromised.metadataService();

metadataService.requestPromised('/latest/dynamic/instance-identity/document')
  .then(JSON.parse)
  .then(printContents)
  .catch(console.error);

function printContents(data) {
  console.log(data);
}
