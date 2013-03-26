define([
  'jquery',
  'underscore',
  'bootstrap.typeahead'
], function($, _, Typeahead) {

  var Search = function($element, options) { this.init($element, options); };
  Search.prototype = $.extend({}, Typeahead.prototype, {
    constructor: Search,
    init: function($element, options) {
      Typeahead.apply(this, [ $element, options ]);
    },
    select: function (e) {
      var value = this.$menu.find('.active').attr('data-value');
      if (value) {
        this.showContent(value);
      } else {
        value = $(e.target).parents('[data-value]').data('value');
        this.showContent(value, $(e.target).html());
      }
      this.$element
        .val(this.updater(value))
        .change();
      return this.hide();
    },
    show: function () {
      this.$menu.show();
      this.shown = true;
      return this;
    },
    process: function (items) {
      var self = this;
      items = self.source.filter(function(item) {
        return self.matcher(item.get('name'));
      });
      items = self.sorter(items);
      if (!items.length) {
        return self.shown ? self.hide() : self;
      }
      return self.render(items.slice(0, self.options.items)).show();
    },
    sorter: function(items) {
      return _.sortBy(items, 'name');
    },
    render: function(items) {
      var self = this;

      items = $(items).map(function (i, item) {
        i = $(self.options.item).attr('data-value', item.get('number'));
        i.find('a').html(self.highlighter(item));
        return i[0];
      });

      items.first().addClass('active');
      $('ul', self.$menu).html(items);
      return self;

      //if (self.options.stations_by_name) {
      //  self.$menu.children().each(function(i, item) {
      //    $routes = $('<ul>').appendTo(item);
      //    $.each(self.options.stations_by_name[$(item).data('value')].routes, function(i, route) {
      //      $routes.append(
      //        $('<li/>').addClass('lpp-route-' + route).append(
      //          $('<a href="#"/>').html(route)));
      //    });
      //  });
      //}
      return self;
    },
    highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
      return item.get('name').replace(
          new RegExp('(' + query + ')', 'ig'), function ($1, match) {
            return '<strong>' + match + '</strong>';
          });
    },
    showContent: function(itemName, selectedRoute) {
      var self = this;
          $progresbar = $('' +
              '<div class="progress progress-striped active">' +
              ' <div class="bar" style="width: 100%;"></div>' +
              '</div>'),
          $closebtn = $('' +
              '<a href="#" class="lpp-close-btn">Zapri</a>'),
          $title = $('' +
              '<h2>Prihodi avtobusov:</h2>');

      // empty content area
      self.$content.html('');

      // close button
      $closebtn
        .appendTo(self.$content)
        .on('click', function(e) {
          e.stopPropagation();
          e.preventDefault();
          self.$content.hide();
        });

      // loader
      self.$content.css('min-height', $(window).height() - 100);
      $progresbar
        .appendTo(self.$content)
        .css('margin-top', self.$content.height()/2 - $progresbar.outerHeight()/2);
      self.$content.show();

      // request station data
      setTimeout(function() {

        // TODO: for now we only fake it
        var result = {};
        $.each(self.options.stations_by_name[itemName].routes, function(i, route) {
          result[route] = {};
          result[route]['Direction 1'] = [ 7, 12, 20, 30, 45 ];
          result[route]['Direction 2'] = [ 7, 20, 45, 55 ];
        });

        // remove progressbar
        $progresbar.remove();

        // title
        $title.appendTo(self.$content);

        // list of station routes with arrival times
        var $list = $('<ul/>').appendTo(self.$content), $item;
        $.each(result, function(route, directions) {
          if (!selectedRoute || selectedRoute === route) {
            $item = $('<li/>')
              .append('<a class="lpp-route-' + route + '" href="#">' + route + '</a>')
              .appendTo($list);
            $.each(directions, function(direction, route_times) {
              $('<div class="lpp-arrival-times">' +
                ' <h3>' + direction + '</h3>' +
                ' <p>' + route_times.join('\', ') + '\'</p>' +
                '</div>').appendTo($item);
            });
            $('<div style="clear:both;"></div>').appendTo($item);
          }
        });

      }, 1000);
    }
  });

  return Search;
});
