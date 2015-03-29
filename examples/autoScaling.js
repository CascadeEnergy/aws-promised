'use strict';

var getAutoScaling = require('../getAutoScaling');
var autoScaling = getAutoScaling({ region: 'YOUR_REGION' });

createLaunchConfiguration()
  .then(createAutoScalingGroup)
  .then(console.log)
  .catch(console.error);

function createLaunchConfiguration() {
  var params = {
    LaunchConfigurationName: 'test-lc',
    IamInstanceProfile: 'arn:aws:iam::YOUR_ACCOUNT_ID:instance-profile/YOUR_INSTANCE_PROFILE_NAME',
    ImageId: 'ami-e7527ed7',
    InstanceType: 't2.micro',
    KeyName: 'YOUR_KEY_NAME',
    SecurityGroups: [
      'YOUR_SECURITY_GROUP_ID'
    ],
    UserData: new Buffer(
      '#!/bin/bash -xe\n' +
      'yum update -y\n' +
      'yum install -y nodejs npm --enablerepo=epel\n'
    ).toString('base64')
  };

  return autoScaling.createLaunchConfigurationPromised(params);
}

function createAutoScalingGroup() {
  var params = {
    AutoScalingGroupName: 'test-asg',
    AvailabilityZones: [ 'YOUR_AVAILABILITY_ZONES' ],
    MaxSize: 1,
    MinSize: 1,
    DesiredCapacity: 1,
    HealthCheckGracePeriod: 60,
    HealthCheckType: 'EC2',
    LaunchConfigurationName: 'test-lc',
    Tags: [
      {
        Key: 'Name',
        PropagateAtLaunch: true,
        Value: 'test-asg-instance'
      }
    ]
  };

  return autoScaling.createAutoScalingGroupPromised(params);
}
