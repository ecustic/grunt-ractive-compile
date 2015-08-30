/*
 * grunt-ractive-compile
 * https://github.com/ecust/grunt-ractive-compile
 *
 * Copyright (c) 2015 Emil Custic
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    ractive_compile: {
      default_options: {
        files: {
          'tmp/templates.default.js': ['test/fixtures/**/*.html']
        }
      },
      custom_options: {
        options: {
          basePath: 'test/fixtures/',
          property: {
            parent: 'app'
          }
        },
        files: {
          'tmp/templates.custom.js': ['test/fixtures/**/*.html']
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ractive_compile']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
