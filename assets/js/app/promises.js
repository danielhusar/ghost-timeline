(function(window, document, APP, $, Modernizr, undefined) {
  'use strict';

  APP.promises = {

    /**
     * Device changed promise, will be executed when the device has changed
     * @return {void}
     * @sample usage:
     * APP.promises.deviceChanged.small.done(function(){});
     */
    deviceChanged: (function() {
      var treshold = 500,
        devicePromise,
        debounce;

      devicePromise = {
        small: $.Deferred(),
        medium: $.Deferred(),
        large: $.Deferred()
      };

      $(window).on('resize.app', function() {
        window.clearTimeout(debounce);
        debounce = window.setTimeout(function() {
          if (APP.settings.environment.device !== APP.events.getDevice()) {
            APP.settings.environment.device = APP.events.getDevice();
            devicePromise[APP.settings.environment.device].resolve();
          }
        }, treshold);
      });
      //return the device promise
      return {
        small: devicePromise.small.promise(),
        medium: devicePromise.medium.promise(),
        large: devicePromise.large.promise()
      };
    })()

  };

})(this, this.document, this.APP, this.jQuery, this.Modernizr);
