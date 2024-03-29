module.exports = {

    build_dir: 'build',
    compile_dir: 'dist',

    meta: {
        title: '',
        description: '',
        viewport: 'width=device-width, initial-scale=1, user-scalable=no, minimal-ui'
    },

    app_files: {
        main: ['app.module.js'],
        js: ['src/js/**/*.js'],
        atpl: [ 'src/templates/*.tpl.html' ],
        html: ['src/*.html'],
        data: ['src/data/**/*'],
        styles: ['src/sass/**/*'],
        favicon: ['src/assets/images/favicon.png']
    },

    vendor_files: {
        js: [
            'vendor/modernizr/modernizr.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js'
        ],
        css: []
    }
};
