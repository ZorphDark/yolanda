/*!
 * Yolanda (http://www.yolandahernandezsantacruz.com/)
 * <> by @zorphdark 2016
 */

module.exports = function(grunt) {
 	grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),
 		path: {
 			base: './',
 			sources: 'sources/',
 			assets: 'dist/assets/',
 			css: {
 				source: '<%= path.sources %>css/',
 				dist: '<%= path.assets %>css/'
 			},
 			js: {
 				source: '<%= path.sources %>js/',
 				dist: '<%= path.assets %>js/'
 			},
 			html: {
 				source: '<%= path.sources %>html/',
 				dist: 'dist/html/'
 			}
 		},
 		banner: '/*!\n' +
 		' * <%= pkg.name %> (<%= pkg.homepage %>)\n' +
 		' * (c) <%= grunt.template.today("yyyy") %> <%= pkg.description %>\n' +
 		' */\n\n',

    postcss: {
      options: {
        processors: [
          require('postcss-cssnext')(),
          require('precss')(),
          require('postcss-clean')()
        ]
      },
      dist: {
        files: {
          '<%= path.css.source %>compiled.min.css': '<%= path.css.source %>styles.css'
        }
      }
    },

 		uglify: {
 			options: {
 				mangle: false,
 				preserveComments: 'some'
 			},
 			dist: {
 				files: {
 					'<%= path.js.source %>compiled.min.js': [
   					'<%= path.js.source %>scripts.js',
   					'<%= path.js.source %>contact.js'
 					]
 				}
 			}
 		},

 		concat : {
 			css: {
 				files: {
 					'<%= path.css.dist %>styles.min.css': [
            '<%= path.css.source %>vendor/slider.min.css',
            '<%= path.css.source %>vendor/vertical.min.css',
            '<%= path.css.source %>vendor/theme.min.css',
 					  '<%= path.css.source %>compiled.min.css'
 					]
 				}
 			},
 			js: {
 				files: {
 					'<%= path.js.dist %>scripts.min.js': [
   					'<%= path.js.source %>compiled.min.js'
 					]
 				}
 			}
 		},

 		usebanner: {
 			options: {
 				banner: '<%= banner %>'
 			},
 			css: {
 				files: {
 					src: [ '<%= path.css.dist %>styles.min.css', '!<%= path.css.dist %>compiled.min.css' ]
 				}
 			},
 			js: {
 				files: {
 					src: [ '<%= path.js.dist %>scripts.min.js' ]
 				}
 			}
 		},

 		pug: {
      compile: {
        options: {
          pretty: true,
        },
        files: [{
          cwd: '<%= path.html.source %>',
          src: ['**/*.pug', "!_*/**/*.pug"],
          dest: '<%= path.html.dist %>',
          expand: true,
          ext: '.php'
        }]
      }
 		},

 		watch: {
 			options: { livereload: true },
 			css: {
 				files: [
          '<%= path.css.source %>**/*.*',
          '!<%= path.js.source %>compiled.min.css'
        ],
 				tasks: ['css']
 			},
 			js: {
 				files: [
          '<%= path.js.source %>**/*.js',
 			  	'!<%= path.js.source %>compiled.min.js'
 				],
 				tasks: ['js']
 			},
 			html: {
 				files: ['<%= path.html.source %>**/*.*'],
 				tasks: ['html']
 			}
 		}
 	});

	require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('html', ['pug']);
	grunt.registerTask('css', ['postcss', 'concat:css', 'usebanner:css']);
	grunt.registerTask('js', ['uglify:dist', 'concat:js', 'usebanner:js']);
	grunt.registerTask('default', ['html', 'css', 'js']);
};
