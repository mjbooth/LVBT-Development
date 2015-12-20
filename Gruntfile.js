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
  },

  cssmin: {
    options: {
    shorthandCompacting: true,
    roundingPrecision: -1,
  },
    css: {
      files: [{
        expand: true,
        cwd: 'assets',
        src: ['*.css', '!*.min.css'],
        dest: 'assets',
        ext: '.min.css'
      }]
    }
  }

});

grunt.registerTask('default', ['uglify', 'cssmin'] );
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');

};
