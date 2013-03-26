define([
  'require',
  'jquery',
  'backbone',
  'map',
  'map_item_view',
  'googlemaps'
], function(require, $, Backbone, Map, MapItemView, GoogleMaps) {

  var MapView = Backbone.View.extend({
    id: 'map',
    initialize: function() {
      var self = this;
      GoogleMaps.done(function() {
        self.$wrapper = $('<div id="' + self.id + '-wrapper"/>')
          .css({ 'overflow': 'hidden', 'height': '100%', 'width': '100%',
                 'position': 'fixed', 'top': 0, 'left': 0 })
          .append(self.$el).appendTo('body');
        self.$el.css({ 'width': '100%', 'height': '100%' });

        self._map = new google.maps.Map(self.$el[0], {
          zoom: 15,
          disableDefaultUI: true,
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          overviewMapControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: new google.maps.LatLng(
            parseFloat(window.AppConfig.home_latitude),
            parseFloat(window.AppConfig.home_longitude)),
          styles: [
            {'featureType': 'transit.station.bus',
             'elementType': 'labels',
             'stylers': [{ 'visibility': 'off' }]
            },
            {'featureType': 'transit.station.rail',
             'elementType': 'labels',
             'stylers': [{ 'visibility': 'off' }]
            }
          ]
          });

        self.render();
      });
    },
    render: function() {
      var self = this;
      GoogleMaps.done(function() {
        self._markers = [];
        Map.each(function(map_item) {
          self._markers.push( new MapItemView({ model: map_item, map: self._map }) );
        });
      });
    }
  });

  return MapView;

});
