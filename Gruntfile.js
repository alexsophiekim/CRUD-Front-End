grunt.initConfig({
  sass: {
    dist: {
      files: {
        'style.css': 'style.scss'
      }
    }
  },
  // Riss working up untill here



  // Sophie working up untill here
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.registerTask('default', ['sass']);

// Riss working up untill here



// Sophie working up untill here
