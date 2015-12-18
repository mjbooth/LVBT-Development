module.exports = function(grunt) {

grunt.initConfig({
  uglify: {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        'assets/com-scripts.min.js': ['assets/com-scripts.js']
      }
    }
  }
});

grunt.registerTask('default', ['uglify']);
grunt.loadNpmTasks('grunt-contrib-uglify');

};