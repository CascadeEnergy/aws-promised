# aws-promised [![Build Status](https://travis-ci.org/CascadeEnergy/aws-promised.svg)](https://travis-ci.org/CascadeEnergy/aws-promised)

Provides Promises/A+ compliant versions of all your favorite AWS SDK clients.

[![NPM](https://nodei.co/npm/aws-promised.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/aws-promised/)

# DISCLAIMER :exclamation: :warning:

This module is a work in progress. Not all of the AWS SDK clients are wrapped
at this point. If you want to add one, it's really easy. Pretty please see the contribution section below

This is a list of the currently implemented clients:

- [AutoScaling](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/AutoScaling.html)
- [CloudFormation](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html)
- [CloudWatch](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatch.html)
- [DynamoDB](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)
- [EC2](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html)
- [ECS](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECS.html)
- [ElastiCache](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ElastiCache.html)
- [ELB](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ELB.html)
- [IAM](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html)
- [Kinesis](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Kinesis.html)
- [MetadataService](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MetadataService.html)
- [S3](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
- [SES](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html)
- [SQS](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html)

#### What this module does.

Basically,

**Makes**

`s3.getObject` -- A node style callback API

**Into**

`s3.getObjectPromised` -- A Promises/A+ style API

It decorates [aws-sdk](https://github.com/aws/aws-sdk-js) client instances with "Promised" suffixed methods.
Internally `aws-promised` uses
[bluebird](https://github.com/petkaantonov/bluebird) and it's
[.promisifyAll](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisepromisifyallobject-target--object-options---object)
to perform this client decoration.

The nice thing about this approach is that it only adds new methods to the client. All of the orginal aws-sdk methods
are still available for use when you need them.

For instance, the "Promised" methods return promises and not instances of
[AWS.Request](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Request.html). So when you want to do something
with AWS.Request (like open up a Node.js data stream from an s3 file) you're still able to use the original `getObject` 
method and `createReadStream`.

**Why "Promised" and not "Async" suffix?**

Astute users of `bluebird` will notice that this module doesn't use the default suffix of `Async` for the promisified
methods. This is because the `AWS.Lambda` client has one single method which already uses that suffix -- `.invokeAsync`. 
`bluebird` throws an error when trying to promisify an API which contains methods with the promisified suffix.

#### Usage

Really basic, get an object from s3, then log it's contents.

```javascript
'use strict';

var awsPromised = require('aws-promised');
var s3 = awsPromised.s3();

var params = {
  Bucket: 'my-bucket',
  Key: 'foo.txt'
};

s3.getObjectPromised(params)
  .then(printContents)
  .catch(console.error);

function printContents(data) {
  console.log(data.Body.toString()); // contents of foo.txt
}
```

Extract a message from an SQS queue and print it's body.

```javascript
var awsPromised = require('aws-promised');
var sqs = awsPromised.sqs({ region: 'us-west-2' });

sqs
  .getQueueUrlPromised({ QueueName: 'my-queue' })
  .then(receiveMessage)
  .then(logMessageBodies)
  .catch(console.error);

function receiveMessage(data) {
  return sqs.receiveMessagePromised({ QueueUrl: data.QueueUrl });
}

function logMessageBodies(data) {
  data.Messages.forEach(function(message) {
    console.log(message.Body);
  });
}
```

There are examples using several different clients in the `examples/` directory of this repo. By changing names in
them to match components deployed in your aws account, you can run them quite easily. You will need
[SDK credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Setting_AWS_Credentials) and
if you do launch services from those scripts you **will** incur the cost.

#### Node-style modules

Any client factory method is available as a stand-alone require-able module.

In the above Usage example the `s3` promised client factory can be required directly.

```
var s3Promised = require('aws-promised/s3');
var s3 = s3Promised({ region: 'us-west-2' });
```

Or event make an s3 client with a one-liner:

```
var s3 = require('aws-promised/s3')({ region: 'us-west-2' });
```

#### install

```
npm install --save aws-promised
```

### Contributing

I'm adding AWS clients to this module as I need them, and therefore the one you may need might be missing.
They're all pretty much the same. You can look at the source for any client, and it's associated test and can likely
copy-paste and change a few names and get it to work. Please submit PR's for proposed additions, write tests, and try to
follow the [Cascade Energy Style Guide for NodeJs](https://github.com/CascadeEnergy/node-style-guide).
