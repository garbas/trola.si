define([
  'jquery',
  'backbone',
  'map'
], function($, Backbone, Map) {

  var SearchView = Backbone.View.extend({
    id: 'search',
    initialize: function() {
        self.$wrapper = $('<div id="' + self.id + '-wrapper"/>')
          .append(this.$el).appendTo('body');
        self.$
    }
  });

  return SearchView;

});
