'use strict';

var _ = require('lodash');
var awsPromised = require('../index');
var ec2 = awsPromised.ec2({ region: 'us-west-2' });
var elb = awsPromised.elb({ region: 'us-west-2' });

describeAvailabilityZones()
  .then(createLoadBalancer)
  .then(configureHealthCheck)
  .then(success)
  .catch(console.error);

function describeAvailabilityZones() {
  return ec2.describeAvailabilityZonesPromised();
}

function createLoadBalancer(data) {
  var availabilityZoneNames = _.pluck(data.AvailabilityZones, 'ZoneName');

  var params = {
    Listeners: [
      {
        InstancePort: 3000,
        LoadBalancerPort: 80,
        Protocol: 'HTTP'
      }
    ],
    LoadBalancerName: 'test-lb',
    AvailabilityZones: availabilityZoneNames
  };

  return elb.createLoadBalancerPromised(params);
}

function configureHealthCheck() {
  var params = {
    HealthCheck: {
      HealthyThreshold: 5,
      Interval: 5,
      Target: 'HTTP:3000/healthcheck',
      Timeout: 4,
      UnhealthyThreshold: 5
    },
    LoadBalancerName: 'test-lb'
  };

  return elb.configureHealthCheckPromised(params);
}

function success() {
  console.log('Made a load balancer');
}
