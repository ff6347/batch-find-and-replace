module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * https://github.com/gruntjs/grunt-contrib-copy
     *
     */
    copy: {
  main: {
    files: [
      {expand: false, src: ['src/batch-find-and-replace.toml'], dest: 'build/batch-find-and-replace.toml'}, // includes files in path and its subdirs
    ]
  }
},
/* https://github.com/gruntjs/grunt-contrib-concat */
    concat: {
      options: {
        separator: ';',
        process: function (src, filepath) {
          return '// Source: ' + filepath + '\n' +
            src.replace(/#include/g, '//#inlcude');
        },
      },
      basic: {
        src: ['src/bfnr_head.jsx', 'src/submodules/tomljs/toml.js',
          'src/submodules/JsonDiffPatch/src/jsondiffpatch.js',
          'src/bfnr_function.jsx'],
        dest: 'build/batch-find-and-replace.jsx',
      }

    }
  });

  // Load the plugin that provides the "copy and concat" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Default task(s).
  grunt.registerTask('default', ['concat','copy']);

};