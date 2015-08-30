/*
 * grunt-ractive-compile
 * https://github.com/ecusict/grunt-ractive-compile
 *
 * Copyright (c) 2015 Emil Custic
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('ractive_compile', 'A plugin for parsing and compiling ractive templates.', function() {
    var ractive = require('ractive');

    var options = this.options();
    if(!options.name) {
      options.name = 'templates';
    }

    this.files.forEach(function(f) {
        var templates = {};

        f.src.forEach(function(filePath) {
            var html = grunt.file.read(filePath);
            var template = ractive.parse(html);
            if(options.basePath) {
              templates[filePath.replace(new RegExp('^' + options.basePath), '')] = template;
            } else {
              templates[filePath] = template;
            }
        });

        if(options.property) {
          grunt.file.write(f.dest, options.property.parent + '.' + options.name + ' = ' + JSON.stringify(templates) + ';');
        } else {
          grunt.file.write(f.dest, 'var ' + options.name + ' = ' + JSON.stringify(templates) + ';');
        }

    });
  });

};
