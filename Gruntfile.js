module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          "spec/build/specs.js": ["spec/*.coffee"],
          "dist/ng-accordion-menu.js": ["src/*.coffee"]
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          "dist/ng-accordion-menu.min.js": "dist/ng-accordion-menu.js"
        }
      }
    },
    less: {
      compile: {
        files: {
          "dist/ng-accordion-menu.css": ["src/ng-accordion-menu.less"]
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.coffee', '**/*.less'],
        tasks: ['coffee', 'uglify', 'less'],
        options: {
          debounceDelay: 250,
        },
      }
    },
    zip: {
      'package': {
        cwd: 'dist/',
        src: ['dist/*.js', 'dist/*.css'],
        dest: 'dist/ng-accordion-menu.zip'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('default', ['coffee', 'uglify', 'less', 'watch']);
  grunt.registerTask('package', ['coffee', 'uglify', 'less', 'zip']);
};
