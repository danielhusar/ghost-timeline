(function(window, document, APP, $, Modernizr, undefined) {
  'use strict';

  APP.events = {

    /**
     * Get the current device which is viewing the page
     * @return {string} device name
     */
    getDevice: function() {
      var device = '';
      APP.isDevice('small', function() {
        device = 'small';
      });
      APP.isDevice('medium', function() {
        device = 'medium';
      });
      APP.isDevice('large', function() {
        device = 'large';
      });
      return device;
    },

    /**
     * Lazy load image
     * @return {void}
     */
    lazyLoad: function() {
      $('img[data-src]').lazyLoad(200, function() {
        $(this).css('opacity', 1);
        APP.log('%c ' + $(this).attr('alt') + ' image lazy loaded', APP.settings.console.css);
      });
    },

    /**
     * Log the versions of the used plugins
     * @return {void}
     */
    logs: function() {
      APP.log('%c jQuery version used: ' + $.fn.jquery, APP.settings.console.css);
      APP.log('%c Modernizr version used: ' + Modernizr._version, APP.settings.console.css);
      APP.log('%c ----------------------------', APP.settings.console.css);

      //promises
      APP.promises.deviceChanged.small.done(function() {
        APP.log('%c Executing promises for small device.', APP.settings.console.css);
      });
      APP.promises.deviceChanged.medium.done(function() {
        APP.log('%c Executing promises for medium device.', APP.settings.console.css);
      });
      APP.promises.deviceChanged.large.done(function() {
        APP.log('%c Executing promises for large device.', APP.settings.console.css);
      });
    }

  };

})(this, this.document, this.APP, this.jQuery, this.Modernizr);
