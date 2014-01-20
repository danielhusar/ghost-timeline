module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Concat files
    concat: {
      options: {
        separator: '\r\n;'
      },
      app: {
        src: ['assets/js/libraries/polyfills.js',
              'assets/js/app/global.js',
              'assets/js/app/settings.js',
              'assets/js/app/promises.js',
              'assets/js/app/events.js',
              'assets/js/app/validation.js',
              'assets/js/modules/*.js',
              'assets/js/app/init.js'],
        dest: 'assets/js/app.js'
      },
      plugins: {
        src: ['assets/js/plugins/*.js'],
        dest: 'assets/js/plugins.js'
      }
    },

    //Uglify files
    uglify: {
      dist: {
        src: ['assets/js/*.js', '!assets/js/*.min.js'], // source files mask
        dest: 'assets/js/', // destination folder
        expand: true, // allow dynamic building
        flatten: true, // remove all unnecessary nesting
        ext: '.min.js' // replace .js to .min.js
      }
    },

    //Lint only app files
    jshint: {
      files: ['<%= concat.app.src %>', 'gruntfile.js', 'package.json', '!assets/js/libraries/polyfills.js']
    },

    //ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
    eslint: {
      options: {
        config: 'eslint.json'
      },
      target: ['<%= concat.app.src %>', '!assets/js/libraries/polyfills.js']
    },

    //Less compiler
    less: {
      development: {
        files: {
          "assets/css/style.css": "less/style.less",
          "assets/css/IE.css": "less/IE.less"
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          "assets/css/style.min.css": "less/style.less",
          "assets/css/IE.min.css": "less/IE.less"
        }
      }
    },

    //Watch task for less changes
    watch: {
      less: {
        files: ['less/*.less', 'less/**/*.less', 'less/**/**/*.less', 'less/**/**/**/*.less'],
        tasks: ['less:development']
      },
      js: {
        files: ['<%= concat.app.src %>', '<%= concat.plugins.src %>'],
        tasks: ['concat', 'uglify']
      }
    },

    //Beautify javascript
    jsbeautifier: {
      files: ['<%= jshint.files %>'],
      options: {
        js: {
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false
        }
      }
    }

  });

  //Dependencies
  require('load-grunt-tasks')(grunt);

  //Tasks
  grunt.registerTask('default', ['concat', 'uglify', 'less']);

  grunt.registerTask('packjs', ['concat', 'uglify']);
  grunt.registerTask('beauty', ['jsbeautifier']);

  grunt.registerTask('css', ['less']);
  grunt.registerTask('hint', ['jshint', 'eslint']);
  grunt.registerTask('server', ['watch']);

  return grunt;

};
