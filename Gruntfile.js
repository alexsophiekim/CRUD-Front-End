grunt.initConfig({
  sass: {
    dist: {
      files: {
        'style.css': 'style.scss'
      }
    }
  },
  // Riss working up untill here
  jshint: {
    files: ['js/*.js','js/!*.min.js'],
      options: {
        esversion: 6
      }
  },


  // Sophie working up untill here
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.registerTask('default', ['sass']);

// Riss working up untill here
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('checkJS', ['jshint']);

// Sophie working up untill here
