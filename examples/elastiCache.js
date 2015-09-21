'use strict';

var awsPromised = require('../index');
var elastiCache = awsPromised.elastiCache(
  {
    region: 'us-west-2',
    Endpoint: 'endpoint:port'
  }
);

var params = {
  CacheClusterId: 'casc-dev-s2-sessions',
  MaxRecords: 20,
  ShowCacheNodeInfo: true
};

elastiCache.describeCacheClustersPromised(params)
  .then(success)
  .catch(console.error);

function success(result) {
  console.log(result);
}
