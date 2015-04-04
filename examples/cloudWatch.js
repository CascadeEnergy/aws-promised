'use strict';

var getCloudWatch = require('../getCloudWatch');
var cloudWatch = getCloudWatch({ region: 'us-west-2' });

createCpuHighAlarm()
  .then(console.log)
  .catch(console.error);

function createCpuHighAlarm() {
  var params = {
    AlarmName: 'myInstance-cpuAlarmHigh',
    ComparisonOperator: 'GreaterThanThreshold',
    EvaluationPeriods: 2,
    MetricName: 'CPUUtilization',
    Namespace: 'AWS/EC2',
    Period: 300,
    Statistic: 'Average',
    Threshold: 90,
    AlarmDescription: 'Alarms if CPU > 90% for 10 minutes',
    Dimensions: [
      {
        Name: 'InstanceId',
        Value: 'myInstanceId-123' // Replace with an actual instance-id
      }
    ]
  };
  return cloudWatch.putMetricAlarmPromised(params);
}
