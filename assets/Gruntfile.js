'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: "js",
                    layout: "byComponent"
                }
            }
        },
        // let us know if our JS is sound
        jshint: {
            options: {
                "bitwise": true,
                "browser": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "esnext": true,
                "immed": true,
                "jquery": true,
                "latedef": false,
                "newcap": false,
                "noarg": true,
                "node": true,
                "strict": false,
                "trailing": false,
                "undef": false,
                "devel": true,
                "globals": {
                    "jQuery": true,
                    "alert": true
                }
            },
            all: [
                'Gruntfile.js',
                'js/source/*.js'
            ]
        },

        imagemin: {
            jpgs: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['img/*.png'],
                    dest: 'images/'
                }]
            }
        },
      
        //   // concatenation and minification all in one
        //   uglify: {
        //     options: {
        //         sourceMap: true
        //     },
        //     dist: {
        //         files: {
        //             'js/build/vendor.min.js': [
        //                 'js/vendor/imagesloaded.pkgd.min.js',
        //                 'js/vendor/bgsrcset.js',
        //                 'js/vendor/slick.js',
        //                 'js/vendor/social-share-kit.min.js',
		// 				'js/vendor/jsrender/jsrender.js',
		// 				'js/vendor/underscore/underscore-min.js',
		// 				'js/vendor/unveil/jquery.unveil.min.js',
		// 				'js/vendor/history/scripts/bundled-uncompressed/html5/jquery.history.js',
		// 				'js/vendor/jquery.xdomainrequest.min.js',
		// 				'js/vendor/jquery-validation/dist/jquery.validate.min.js',
		// 				'js/vendor/jquery-zoom/jquery.zoom.min.js',
        //                 'js/vendor/jquery.svg.package-1.5.0/jquery.svg.min.js',
        //                 'js/vendor/flickity.pkgd.min.js',
        //                 'js/vendor/flickity-fade.js',
        //                 'js/vendor/modernizr-custom2.js'
        //             ],
        //             'js/build/script.min.js': [
        //                 'js/source/utilities.js',
		// 				'js/source/shop-utilities.js',
		// 				'js/source/shop-cart-interaction.js',
		// 				'js/source/shop-sidebar-filters.js',
		// 				'js/source/shop-init.js',
        //                 'js/source/global.js',
        //                 'js/source/interactive-map.js',
        //                 'js/source/vineyards-map.js',
        //                 'js/source/jquery.matchHeight-min.js'
        //             ],
        //             'js/build/admin-api.min.js': [
        //                 'js/vendor/jsrender/jsrender.js',
        //                 'js/vendor/underscore/underscore-min.js',
        //                 'js/source/shop-utilities.js',
        //                 'js/source/shop-data-processing.js',
        //                 'js/source/shop-admin.js'
        //             ]
        //         }
        //     }
        // },


        sass: {
            options: {
                sourceMap: true,
                outputStyle: "compact"
            },
            dist: {
                files: {
                    'css/build/global.css': 'css/source/dynamic.scss',
                }
            }
        },

        // watch our project for changes
        watch: {
            css: {
                files: [
                    'css/source/*',
                    'css/source/**/*'
                ],
                tasks: ['sass', 'postcss'],
                options: {
                    livereload: 35729
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')()
                ]
            },
            dist: {
                src: 'css/build/*.css'
            }
        },

        cssmin: {
            target: {
              files: [{
                expand: true,
                cwd: 'css/build/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/build/',
                ext: '.min.css'
              }]
            }
          },

        htmlmin: {                                     // Task
        dist: {                                      // Target
            options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true
            },
            files: {                                   // Dictionary of files
            '../index.html': 'index.html',     // 'destination': 'source'
            }
        }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    

    // register task
    grunt.registerTask('default', [
        'jshint',
        'sass',
        'uglify',
        'postcss',
        'watch',
        'cssmin'
    ]);
    

};

// Note: File paths are relative to the Gruntfile.js itself.

// JSHint
// The first block outlines my jshint configuration options. You can check out the full range of options on the plugin detail page but essentially I’ve got it configured to let me easily work with jQuery, alerts(), and some best practices when it comes to writing JavaScript. When this Task runs, Grunt will let me know if my JavaScript has any errors in it before proceeding to the rest of the build process. The other property being defined outlines what files this Task should keep an eye on. Note that it’s only watching my source directory.

// Uglify
// Once my JavaScript has passed hinting, it gets sent to the uglify task. This one is great because it kills two birds with one stone by both concatenating and minifying all in one step, which is great. The dist property is named as such because this task is intended for distribution. You can create multiple properties like this so as to define a different set of rules for your development environment versus your production environment, but that’s outside the scope of this intro. The first property within dist outlines an array of files I’d like to concatenate and uglify. I add each jQuery plugin I’m using here, for instance, so I’m able to package it into a single compressed file straight from the vendor. I also keep the script I’m writing by hand in a separate file. Each property name in files outlines the output file you want to use, and it’s value includes either a string (if only one file) or an array of files that will be included in the process to generate that destination file.

// Compass
// Up next is my Compass task. The grunt-contrib-compass plugin lets you include your config right within the Gruntfile so as to remove the necessity of one more file in your setup, I like that. Again, dist is used here in the same capacity as the uglify task. You’ll notice that the options closely match those of your standard config.rb with other Compass projects, but the property names are slightly different in certain cases so you’ll want to review the grunt-contrib-compass docs.

// Watch
// Next is our watch task, which tells Grunt when to automatically rebuild my project. You can break out functionality into a number of what are essentially sub-tasks that each watch for different file patterns and trigger different tasks. My first is compass that watches for any changed files within my source and vendor styles subdirectories. Note that with each files property there is a paired tasks property, that tells Grunt which tasks (defined earlier in the Gruntfile) to fire when the file pattern triggers a match. You can take a look at my js watch task to see some other awesomeness that Grunt provides; my files pattern doesn’t look like my compass file pattern because Grunt allows you to use declared files or file patterns from other tasks in places like this. That way, I only have to keep one canonical list of files in a Task that can be used in other tasks down the line.

// Now we can use Grunt
// The last two blocks of the Gruntfile take care of some business Grunt needs taken care of in loading the Tasks that shipped with our plugins and registering our default task which you can consider “what gets fired when I execute grunt on the command line”. Grunt is now set up to take care of all the dirty work when it comes to running the build for my WordPress theme assets. Invoking everything that was just set up is a matter of cracking open a terminal session, cding to my project directory and executing the following command:

// grunt

// Grunt will basically ‘execute’ my Gruntfile.js and watch for all of the changes I want based on the watch Task that was set up. It’s quite a beautiful thing.

// npm install

// Which will parse the package.json file that was set up and grab each of the devDependencies needed for the project. Once that command finishes, the client developer will be able to fire grunt and have the exact same build process I was working with. It’s fantastic.

// Some best practices and closing thoughts

// One other tip I’ve made for myself is one surrounding easy invokation of grunt for any particular project I may be working on. While it’s no big deal to open up Terminal.app, cd to my project directory and fire grunt, there’s a pattern to my local development environment that I can exploit to save a couple keystrokes. All of my client work takes the format ~/dev/%client%/wp-content/themes/%client$ where %client% is the name of the client project (the same in both places). Realizing that, I set up a quick Alfred Extension to quickly open iTerm2 and get grunt up and running for any particular project. The Extension is quite trivial, but it feels really quick to get up and running for the day using 4-5 keypresses. I’d make the Extension available as a download, but the chances of your local development environment directory structure matching mine are too slim for that, so here’s what it looks like:

// alfred-grunt