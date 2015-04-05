'use strict';

var awsPromised = require('../index');
var dynamoDb = awsPromised.dynamoDb({region: 'us-west-2'});

var params = {
  TableName: 'foo',
  Key: {
    bar: { S: 'baz' }
  }
};

dynamoDb.getItemPromised(params)
  .then(printContents)
  .catch(console.error);

function printContents(data) {
  console.log(data);
}
