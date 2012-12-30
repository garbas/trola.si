define([
  'json',
  'jquery',
  'backbone',
  'backbone.localstorage',
  'map_item',
  'text!' + window.location.href + 'api/items'
], function(JSON, $, Backbone, LocalStorage, MapItem, MapItems) {

  var Map = Backbone.Collection.extend({
    localStorage: new LocalStorage("Map"),
    model: MapItem
  });

  return new Map(JSON.parse(MapItems));

});
