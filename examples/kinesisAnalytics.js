'use strict';
var awsPromised = require('../index');

var awsParams = {
  region: 'us-east-1'
};

var kinesisAnalytics = awsPromised.kinesisAnalytics(awsParams);

kinesisAnalytics.listApplicationsPromised()
  .then(console.log)
  .catch(console.error);