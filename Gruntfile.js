module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          "spec/build/specs.js": ["spec/*.coffee"],
          "dist/ng-tree-nav.js": ["src/*.coffee"]
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          "dist/ng-tree-nav.min.js": "dist/ng-tree-nav.js"
        }
      }
    },
    less: {
      compile: {
        files: {
          "dist/ng-tree-nav.css": ["src/ng-tree-nav.less"]
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
        dest: 'dist/ng-tree-nav.zip'
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
