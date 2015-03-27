'use strict';

var sqs = require('../getSQS')({ region: 'us-west-2' });

sqs
  .getQueueUrlAsync({ QueueName: 'my-queue' })
  .then(receiveMessage)
  .then(logMessageBodies)
  .catch(console.error);

function receiveMessage(data) {
  return sqs.receiveMessageAsync({ QueueUrl: data.QueueUrl });
}

function logMessageBodies(data) {
  data.Messages.forEach(function(message) {
    console.log(message.Body);
  });
}
