define([
  'jquery',
  'backbone',
  'map',
  'search'
], function($, Backbone, Map, Search) {

  var ContentView = Backbone.View.extend({
    id: 'content',
    initialize: function() {
        this.$wrapper = $('<div id="' + this.id + '-wrapper"/>').appendTo('body');
        this.$wrapperInner = $('<div id="' + this.id + '-wrapper-inner"/>')
          .appendTo(this.$wrapper);

        this.$search = $('<input type="text" autofocus="autofocus" ' +
              'id="' + this.id + '-search" ' +
              'placeholder="Isci po imenu postajalisca..." />')
          .appendTo(this.$wrapperInner);

        this.$closest = $('<button id="' + this.id + '-closest"/>')
          .html('Najblizja postajalisca')
          .appendTo(this.$wrapperInner);

        this.$el.hide()
          .append($('<ul/>'))
          .appendTo(this.$wrapperInner);

        this.search = new Search(this.$search, {
          menu: this.$el,
          source: Map
        });

    }
  });

  return ContentView;

});
