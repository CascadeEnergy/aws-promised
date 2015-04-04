'use strict';

var awsPromised = require('../index');
var ec2 = awsPromised.ec2({region: 'us-west-2'});

var groupName = 'global-www';

var params = {
  Description: 'Allows global 8000 access',
  GroupName: groupName
};

ec2
  .createSecurityGroupPromised(params)
  .then(addIngressRule)
  .then(success)
  .catch(console.error);

function addIngressRule(data) {
  var params = {
    CidrIp: '0.0.0.0/0',
    FromPort: 8000,
    GroupId: data.GroupId,
    IpProtocol: 'tcp',
    ToPort: 8000
  };

  return ec2.authorizeSecurityGroupIngressPromised(params);
}

function success() {
  console.log('Yay we made a security group');
}
