[![Build Status](https://travis-ci.org/nackjicholson/aws-promised.svg)](https://travis-ci.org/nackjicholson/aws-promised)

# aws-promised

Provides Promises/A+ compliant versions of all your favorite AWS SDK clients.

#### Disclaimer

This module is v0.0.1 and is a work in progress. Not all of the AWS SDK clients are wrapped
at this point. Below is a list of the clients which have been wrapped.

#### What this module does.

This module uses the [bluebird](https://github.com/petkaantonov/bluebird) promises library and it's
[.promisifyAll](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisepromisifyallobject-target--object-options---object)
method to wrap instances of AWS SDK clients in order to provide promise compliant alternative
methods to all of the client's node style callback methods.

- [IAM](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html)

#### Usage

```javascript
var awsPromised = require('aws-promised');
var iam = awsPromised.getIam({region: 'us-west-2'});

iam
  .getRoleAsync({ RoleName: 'myRole' })
  .then(function(data) { 
    // The iam.getRole response data describing 'myRole'
    console.log(data);
  })
  .catch(function(err) {
    // This handles getRole errors, i.e. When 'myRole' doesn't exist.
    console.error(err);
  });
```
