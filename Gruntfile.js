module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'closure-compiler': {
      min: {
        js: '<%= pkg.name %>.js',
        jsOutputFile: 'build/<%= pkg.name %>.min.js',
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
        }
      }
    },
    jshint: {
      files: ['<%= pkg.name %>.js', 'package.json'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'closure-compiler'
  ]);

};
