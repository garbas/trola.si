define([
  'require',
  'jquery'
], function(require, $) {

  var GoogleMaps = $.Deferred();

  window._GoogleMapsLoaded = function() {
    delete window._GoogleMapsLoaded;
    $(document).ready(function() {
      GoogleMaps.resolve();
    });
  };

  require(['https://maps.googleapis.com/maps/api/js' +
        '?key=' + window.AppConfig.googleapi_key +
        '&language=' + window.AppConfig.googleapi_language +
        '&sensor=false' +
        '&callback=_GoogleMapsLoaded']);

  return GoogleMaps;

});
