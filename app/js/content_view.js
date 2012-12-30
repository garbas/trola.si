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
        this.$el.hide()
          .appendTo(this.$wrapperInner);
        this.$search = $('<input type="text" autofocus="autofocus" ' +
            'id="' + this.id + '-search" placeholder="Vnesi ime postaje" />')
          .appendTo(this.$wrapperInner);

    }
  });

  return ContentView;

});
