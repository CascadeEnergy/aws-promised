'use strict';

var awsPromised = require('../index');
var s3 = awsPromised.s3();

var params = {
  Bucket: 'my-bucket-name',
  Key: 'foo.txt'
};

s3.getObjectPromised(params)
  .then(printContents)
  .catch(console.error);

function printContents(data) {
  console.log(data.Body.toString());
}
