[![Build Status](https://travis-ci.org/CascadeEnergy/aws-promised.svg)](https://travis-ci.org/CascadeEnergy/aws-promised)

# aws-promised

Provides Promises/A+ compliant versions of all your favorite AWS SDK clients.

[![NPM](https://nodei.co/npm/aws-promised.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/aws-promised/)

#### Disclaimer

This module is v0.0.1 and is a work in progress. Not all of the AWS SDK clients are wrapped
at this point. If you want to add one, it's really easy. Pretty please see the contribution section below
 
This is a list of the currently implemented clients:

- [IAM](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html)
- [S3](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)

#### What this module does.

This module uses the [bluebird](https://github.com/petkaantonov/bluebird) promises library and it's
[.promisifyAll](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisepromisifyallobject-target--object-options---object)
method to wrap instances of AWS SDK clients in order to provide promise compliant alternative
methods to all of the client's node style callback methods. All the methods are suffixed with "Async".

`s3.getObject` : `s3.getObjectAsync`

#### Usage

```javascript
var getS3 = require('aws-promised').getS3;
var s3 = getS3();

var params = {
  Bucket: 'my-bucket-name',
  Key: 'foo.txt'
};

s3.getObjectAsync(params).then(console.log).catch(console.error);
```

#### install

```
npm i --save aws-promised
```

#### Contributing

I'm adding AWS clients to this module as I need them, and therefore the one you may need might be missing.
They're all pretty much the same. You can look at the source for any client, and it's associated test and can likely
copy-paste and change a few names and get it to work. Please submit PR's for proposed additions, write tests, and try to
follow the [Cascade Energy Style Guide for NodeJs](https://github.com/CascadeEnergy/node-style-guide).
