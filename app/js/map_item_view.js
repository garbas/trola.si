define([
  'jquery',
  'backbone'
], function($, Backbone) {

  var MapItemView = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
      this.marker = new google.maps.Marker();
      this.listenTo(this.options.model, 'change', this.render);
      this.render();
    },
    render: function(map) {
      this.marker.setOptions({
        map: this.options.map,
        title: this.options.model.get('name'),
        position: new google.maps.LatLng(
          parseFloat(this.options.model.get('latitude')),
          parseFloat(this.options.model.get('longitude'))),
        draggable: false
      });
    }
  });

  return MapItemView;

});
