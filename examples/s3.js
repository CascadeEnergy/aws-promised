'use strict';

var getS3 = require('../getS3');
var s3 = getS3();

var params = {
  Bucket: 'my-bucket-name',
  Key: 'foo.txt'
};

s3.getObjectAsync(params).then(console.log).catch(console.error);
