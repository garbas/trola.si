requirejs.config({
  paths: {
    'text': '../lib/require-text',
    'json': '../lib/json3',
    'jquery': '../lib/jquery',
    'underscore': '../lib/underscore',
    'backbone': '../lib/backbone',
    'backbone.localstorage': '../lib/backbone.localstorage',
    'bootstrap.typeahead': '../lib/bootstrap/js/bootstrap-typeahead'
  }
});

require([ 'require' ], function(require) {
  window.AppConfig = {
    home_latitude: '46.051426',
    home_longitude: '14.505965',
    googleapi_key: 'AIzaSyBnSQxwaigLJSDz2ighHD53Z4N3ED1PjDU',
    googleapi_language: 'sl',
    api_items: '/api/items'
  };
  require([ 'app' ]);
});
