(function(window, document, $, Modernizr, undefined) {
  'use strict';

  var Application = function() {
    this.modules = {};
    this.instances = {};
    this.promises = {};
    this.events = {};
  };
  var APP = window.APP = new Application();

  /**
   * Defining named conditions to be used by Application.isDevice
   *
   * @namespace APP
   */
  Application.prototype.device = {
    'large': function() {
      return !Modernizr.mq('only all') || Modernizr.mq('only screen and (min-width: 1025px)');
    },
    'medium': function() {
      return (!Application.prototype.device.large()) && Modernizr.mq('only screen and (min-width: 569px)');
    },
    'small': function() {
      return !(Application.prototype.device.medium() || Application.prototype.device.large());
    }
  };

  /**
   * Function that will execute callback only for specific device
   * Especially useful for executing some for mobile only, tablets only, IE only etc.
   *
   * Sample Usage:
   *
   *   this.isDevice('small', callback);   // => V will run the callback  (just for the small)
   *   this.isDevice('medium', callback);  // => V will run the callback  (just for the medium)
   *   this.isDevice('large', callback);   // => V will run the callback  (just for the large)
   *
   *
   * @param     {Anything}  condition   device to match
   * @param     {Function}  callback    Callback to be triggered when conditions return true
   * @return    {Object}                this
   */
  Application.prototype.isDevice = function(condition, callback) {
    if (Application.prototype.device[condition]()) {
      callback();
    }
    return this;
  };


  /**
   * Check if we are on particular page according to body id
   *
   *
   * this.page('home', function(){
   *   ...
   * });
   * @param     {string, object} page   Page name or array of pages where code should be executed
   * @param     {Function}  callback    Callback to be triggered when conditions return true
   * @return    {Object}                this
   */
  Application.prototype.page = function(page, callback) {

    var pageId = $('body').attr('id').replace('page-', '');

    if ((typeof page === 'string' && pageId === page) || (typeof page === 'object' && page.indexOf(pageId) !== -1)) {
      Application.prototype.log('%c Executing scripts for: ' + pageId, APP.settings.console.css);
      callback();
    }
    return this;
  };


  /**
   * Console log function, it logs only on development enviroment
   * @return {void}
   */
  Application.prototype.log = function() {
    var args;

    if (window.APP.settings && window.APP.settings.environment && !window.APP.settings.environment.isProduction) {
      if (window.console && window.console.log && window.console.log.apply) {
        args = Array.prototype.slice.call(arguments);
        window.console.log.apply(window.console, args);
      }
    }
  };

  /**
   * Return the prefixed version of the css statment
   * @param  {string} method css method
   * @return {string} prefixed method if exist, or the same method of preixed not avaiable
   */
  Application.prototype.prefix = function(method) {
    var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'otransitionend',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    };
    if (method === 'transitionEnd') {
      return transEndEventNames[Modernizr.prefixed('transition')];
    } else {
      method = Modernizr.prefixed(method) ? Modernizr.prefixed(method) : method;
      return method.replace(/([A-Z])/g, function(str, m1) {
        return '-' + m1.toLowerCase();
      }).replace(/^ms-/, '-ms-');
    }

  };


  /**
   * Apply formatting options to the string. This will look for occurrences
   * of %@ in your string and substitute them with the arguments you pass into
   * this method.  If you want to control the specific order of replacement,
   * you can add a number after the key as well to indicate which argument
   * you want to insert.
   *
   * Ordered insertions are most useful when building loc strings where values
   * you need to insert may appear in different orders.
   *
   *
   * Sample Usage:
   *
   *   Application.fmt('Hello %@ %@',    'John', 'Doe') // => 'Hello John Doe'
   *   Application.fmt('Hello %@2, %@1', 'John', 'Doe') // => 'Hello Doe, John'
   *
   *
   * @namespace APP
   *
   * @param  {String}     string  String to be formatted
   * @param  {String...}  *args   Strings to be passed into @string param
   * @return {String}             Formatted string
   */
  Application.prototype.fmt = function(string) {
    var formats;
    var index;

    // Words to fill the string should be all arguments but first
    formats = Array.prototype.slice.call(arguments, 1);

    // first, replace any ORDERED replacements.
    index = 0; // the current index for non-numerical replacements

    return string.replace(/%@([0-9]+)?/g, function(match, argumentIndex) {
      argumentIndex = (argumentIndex) ? parseInt(argumentIndex, 10) - 1 : index++;
      match = formats[argumentIndex];

      return ((match === null) ? '(null)' : (match === undefined) ? '' : match).toString();
    });
  };

  /**
   * Return the module wrapper
   * @param  {String} module   Module name
   * @return {Object}          Module DOM
   *
   * @sample usage:
   * APP.moduleWrap('account');
   */
  Application.prototype.moduleWrap = function(module) {
    return $('[data-module="' + module + '"]');
  };



  /**
   * Add module to our app
   * @param  {String} module   Module name
   * @param  {Object} settings Settings object
   * @param  {Object} events   Events settings
   * @return {Object}          this
   *
   * @sample usage:
   * APP.addModule('account', settings, events);
   */
  Application.prototype.addModule = function(module, settings, events) {
    APP.modules[module] = $.extend({}, {
      settins: settings
    }, events);
    return this;
  };


})(this, this.document, this.jQuery, this.Modernizr);
