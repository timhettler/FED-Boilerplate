module.exports = {

    build_dir: 'build',
    compile_dir: 'dist',

    meta: {
        title: '',
        description: '',
        viewport: 'width=device-width, initial-scale=1, user-scalable=no, minimal-ui'
    },

    app_files: {
        js: ['src/js/**/*.js'],
        atpl: [ 'src/templates/*.tpl.html' ],
        html: ['src/*.html'],
        fonts: ['src/assets/fonts/**/*'],
        images: ['src/assets/images/**/*'],
        data: ['src/data/**/*'],
        styles: ['src/sass/**/*'],
        favicon: ['src/assets/images/favicon.png']
    },

    vendor_files: {
        js: [
            'vendor/modernizr/modernizr.js',
            'vendor/angular/angular.js',
            'vendor/angular-route/angular-route.js'
        ],
        css: []
    }
};
