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
            var name = filePath;

            if(options.removeExtension) {
                name = name.replace(/\.[^/.]+$/, "");
            }

            if(options.basePath) {
              name = name.replace(new RegExp('^' + options.basePath), '');
            }

            if(options.slugify) {
              var separator = options.slugify.separator ? options.slugify.separator : '';
              var nameSlug = name.toLowerCase().split(/[\s\/\.\_\-]+/);
              if(options.slugify.camelCase) {
                for(var i = 1; i < nameSlug.length; i++) {
                  nameSlug[i] = nameSlug[i].charAt(0).toUpperCase() + nameSlug[i].slice(1);
                }
              }
              name = nameSlug.join(separator);
            }

            templates[name] = template;
        });



        if(options.property) {
          grunt.file.write(f.dest, options.property.parent + '.' + options.name + ' = ' + JSON.stringify(templates) + ';');
        } else {
          grunt.file.write(f.dest, 'var ' + options.name + ' = ' + JSON.stringify(templates) + ';');
        }

    });
  });

};
