module.exports = function ( grunt ) {
// Loads in any grunt tasks in the package.json file
require('load-grunt-tasks')(grunt);

// App-specific configuration data
var appConfig = require( './app.config.js' );

var taskConfig = {

    // Grunt HTML Builder
    // Appends scripts and styles, Removes debug parts, append html partials, Template options
    // https://github.com/spatools/grunt-html-build
    htmlbuild: {
        build: {
            src: ['src/*.html'],
            dest: '<%= build_dir %>',
            options: {
                parseTag: 'build',
                beautify: false,
                relative: true,
                scripts: {
                    // Modernizr need to go in HEAD
                    modernizr: ['<%= build_dir %>/vendor/modernizr.js'],
                    // Define order-dependent files first, then glob
                    vendor: [
                        '<%= build_dir %>/vendor/jquery.js',
                        '<%= build_dir %>/vendor/angular.js',
                        '<%= build_dir %>/vendor/**/*.js',
                        '!**/modernizr.js'
                    ],
                    // Project-specific files
                    app: [
                        '<%= build_dir %>/js/**/*.js',
                        '<%= html2js.app.dest %>'
                    ]

                },
                styles: {
                    vendor: [
                        '<%= build_dir %>/css/vendor/**/*.css'
                    ],
                    app: [
                        '<%= build_dir %>/css/**/*.css'
                    ]
                },
                // Project meta-data (defined in './app.config.js')
                data: {
                    title: "<%= meta.title %>",
                    description: "<%= meta.description %>",
                    viewport: "<%= meta.viewport %>"
                },
            }
        },
        compile: {
            src: '<%= build_dir %>/*.html',
            dest: '<%= compile_dir %>',
            options: {
                parseTag: 'compile',
                beautify: false,
                relative: true,
                scripts: {
                    // This will be the custom-built version of modernizr (not the full dev version used in build)
                    modernizr: ['<%= compile_dir %>/js/modernizr.js'],
                    app: ['<%= compile_dir %>/js/vendor.js', '<%= compile_dir %>/js/app.js']
                },
                styles: {
                    app: ['<%= compile_dir %>/css/vendor.css', '<%= compile_dir %>/css/**/*.css']
                }
            }
        }
    },

    // Grunt Clean
    // Clean files and folders.
    // https://github.com/gruntjs/grunt-contrib-clean
    clean: {
        build: [
            '<%= build_dir %>'
        ],
        compile: [
            '<%= compile_dir %>'
        ]
    },

    // grunt-ng-annotate
    // Add, remove and rebuild angularjs dependency injection annotations
    // https://github.com/mzgol/grunt-ng-annotate
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        build: {
            files: [{
                src: [ 'js/**/*.js' ],
                cwd: '<%= build_dir %>',
                dest: '<%= build_dir %>',
                expand: true
            }]
        }
    },

    // grunt-html2js
    // Converts AngularJS templates to JavaScript
    // https://github.com/karlgoldstein/grunt-html2js
    html2js: {
      app: {
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/js/templates-app.js'
      }
    },

    // Grunt JS Hint
    // You know it, you hate it. Validate files with JSHint.
    // https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
        // http://www.jshint.com/docs/options/
        options: {
            camelcase: true,
            eqeqeq: true,
            eqnull: true,
            indent: 4,
            latedef: true,
            newcap: true,
            quotmark: 'single',
            trailing: true,
            undef: true,
            unused: true,
            curly: true,
            immed: true,
            noarg: true,
            sub: true,
            browser: true,
            debug: true,
            globals: {
                angular: true
            }
        },
        src: '<%= app_files.js %>',
        gruntfile: 'Gruntfile.js'
    },

    // Grunt Concat
    // Concatenate files.
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
        options: {
            sourceMap: true,
        },
        js_vendor: {
            src: [
                '<%= vendor_files.js %>',
                '!**/modernizr.js'
            ],
            dest: '<%= compile_dir %>/js/vendor.js'
        },
        css_vendor: {
            src: [
                '<%= vendor_files.css %>'
            ],
            dest: '<%= compile_dir %>/css/vendor.css'
        },
        js_app: {
            src: [
                '<%= build_dir %>/js/**/*.js',
                '<%= html2js.app.dest %>'
            ],
            dest: '<%= compile_dir %>/js/app.js'
        }
    },

    // grunt-contrib-watch
    // Run tasks whenever watched files change.
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {

        app_config: {
            files: 'app.config.js',
            tasks: [ 'build' ],
        },

        gruntfile: {
            files: 'Gruntfile.js',
            tasks: [ 'jshint:gruntfile', 'build' ]
        },

        js_src: {
            files: ['<%= app_files.js %>'],
            tasks: [ 'newer:copy:build_appjs' ]
        },

        assets: {
            files: ['src/assets/**/*'],
            tasks: [ 'newer:copy:build_assets' ]
        },

        data: {
            files: ['<%= app_files.data %>'],
            tasks: [ 'newer:copy:build_data' ]
        },

        html: {
            files: [ '<%= app_files.html %>' ],
            tasks: [ 'htmlbuild:build' ]
        },

        tpls: {
            files: [
                '<%= app_files.atpl %>'
            ],
            tasks: [ 'html2js' ]
        },

        sass: {
            files: [ '<%= app_files.styles %>' ],
            tasks: [ 'css' ]
        }
    },

    // Grunt Uglify
    // Minify files with UglifyJS.
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
        compile: {
            files: {
                '<%= concat.js_vendor.dest %>': '<%= concat.js_vendor.dest %>',
                '<%= concat.js_app.dest %>': '<%= concat.js_app.dest %>'
            }
        }
    },

    // Grunt Sass
    // Compile Sass to CSS
    // https://github.com/gruntjs/grunt-contrib-sass
    sass: {
        build: {
            options: {
                'sourcemap': true,
                'loadPath': ['vendor', 'src/sass/']
            },
            files: [{
                expand: true,
                cwd: 'src/sass/',
                src: ['**/*.scss'],
                dest: '<%= build_dir %>/css/',
                ext: '.css'
            }]
        },
        compile: {
            options: {
                'style': 'compressed',
                'sourcemap': true,
                'loadPath': ['vendor', 'src/sass/']
            },
            files: [{
                expand: true,
                cwd: 'src/sass/',
                src: ['*.scss'],
                dest: '<%= compile_dir %>/css/',
                ext: '.css'
            }]
        }
    },

    // Grunt Autoprefixer
    // Parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
        build: {
            src: '<%= build_dir %>/css/**/*.css',
        },
        compile: {
            src: '<%= compile_dir %>/css/**/*.css',
        }
    },

    // Grunt CSS Min
    // Compress CSS files.
    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
        compile: {
            expand: true,
            cwd: '<%= compile_dir %>/css/',
            src: ['**/*.css']
        }
    },

    // Grunt copy
    // Copy files and folders.
    // https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      build_assets: {
        files: [
            {
                src: [ 'fonts/**', 'images/**' ],
                dest: '<%= build_dir %>/assets/',
                cwd: 'src/assets',
                expand: true
            }
       ]
      },
      compile_assets: {
        files: [
            {
                src: [ 'fonts/**', 'images/**' ],
                dest: '<%= compile_dir %>/assets',
                cwd: 'src/assets',
                expand: true
            }
        ]
      },
      build_data: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= build_dir %>/data/',
                cwd: 'src/data',
                expand: true
            }
        ]
      },
      compile_data: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= compile_dir %>/data',
                cwd: 'src/data',
                expand: true
            }
        ]
      },
      build_appjs: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= build_dir %>/js',
                cwd: 'src/js',
                expand: true
            }
        ]
      },
      build_vendor: {
        files: [
            {
                src: '<%= vendor_files.js %>',
                dest: '<%= build_dir %>/vendor',
                expand: true,
                flatten: true
            },
            {
                src: '<%= vendor_files.css %>',
                dest: '<%= build_dir %>/vendor',
                expand: true,
                flatten: true
            }
        ]
      }
    },

    // Grunt ImageMin
    // Minify PNG, JPEG and GIF images
    // https://github.com/gruntjs/grunt-contrib-imagemin
    imagemin: {
        compile: {
            files: [{
                expand: true,
                cwd: '<%= compile_dir %>/assets/images',
                src: ['**/*.{png,jpg,gif}'],
                dest: '<%= compile_dir %>/assets/images'
            }]
        }
    },

    // Grunt Modernizr
    // Sifts through your project files, gathers up your references to Modernizr tests and outputs a lean, mean Modernizr machine.
    // https://github.com/Modernizr/grunt-modernizr
    modernizr: {
        compile: {
            devFile: 'vendor/modernizr/modernizr.js',
            outputFile: '<%= compile_dir %>/js/modernizr.js',
            extra : {
                "shiv" : false, // Only need shiv if we've supporting IE < 9
            },
            extensibility : {
                "addtest" : false,
                "prefixed" : true,
                "teststyles" : false,
                "testprops" : true,
                "testallprops" : true,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false
            },
            parseFiles: true,
            files: {
                src: ['<%= build_dir %>/js/**/*.js', '<%= build_dir %>/css/**/*.css']
            }
        }
    },

    // Grunt Express
    // Runs an Express Server
    // https://github.com/blai/grunt-express
    express: {
        dev: {
            options: {
                hostname: "localhost",
                port: 9000,
                bases: '<%= build_dir %>'
            }
        },
        compile: {
            options: {
                hostname: "localhost",
                port: 9000,
                bases: '<%= compile_dir %>'
            }
        }
    },

    // Grunt Open
    // Opens the web server in the browser
    // https://github.com/jsoverson/grunt-open
    open: {
      dev: {
        path: 'http://localhost:<%= express.dev.options.port %>'
      },
      compile: {
        path: 'http://localhost:<%= express.compile.options.port %>'
      }
    },

    // Grunt SVG Store
    // Merge svgs from a folder
    // https://github.com/FWeinb/grunt-svgstore
    svgstore: {
        options: {
            prefix : 'svg-'
        },
        dev: {
            files: {
                '<%= build_dir %>/assets/svg/icons.svg': ['src/assets/svg/*.svg'],
            },
        },
    },
};

grunt.initConfig( grunt.util._.extend( taskConfig, appConfig ) );

grunt.registerTask( 'server', [ 'build', 'express:dev', 'open:dev', 'watch' ] );
grunt.registerTask( 'ncserver', [ 'noclean', 'express:dev', 'watch' ] );
grunt.registerTask( 'noserver', [ 'build', 'watch' ] );
grunt.registerTask( 'dist', [ 'build', 'compile' ] );
grunt.registerTask( 'distserver', [ 'noclean', 'compile', 'express:compile', 'open:compile', 'watch' ] );
grunt.registerTask( 'default', [ 'server' ] );

grunt.registerTask('build', [
    'clean:build', 'jshint:src', 'html2js',
    'copy:build_assets', 'svgstore', 'copy:build_data', 'copy:build_appjs', 'copy:build_vendor',
    'sass:build', 'autoprefixer:build', 'htmlbuild:build'
]);

grunt.registerTask('noclean', [
    'jshint:src', 'html2js',
    'newer:copy:build_assets', 'newer:copy:build_data', 'newer:copy:build_appjs', 'newer:copy:build_vendor',
    'ngAnnotate',
    'sass:build', 'autoprefixer:build',
    'htmlbuild:build'
]);

grunt.registerTask('compile', [
    'clean:compile',
    'copy:compile_assets', 'copy:compile_data',
    'imagemin:compile',
    'sass:compile', 'autoprefixer:compile', 'cssmin:compile',
    'concat',
    'uglify',
    'modernizr', 'htmlbuild:compile'
]);


};
