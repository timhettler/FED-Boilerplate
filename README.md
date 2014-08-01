# Angular Project Boilerplate

## Dependencies

* [Node.js](http://nodejs.org/)
* [NPM](https://npmjs.org/) - Node Package Manager
* [Bower](http://bower.io/) - Web Package manager
* [Grunt](http://gruntjs.com/) - JavaScript Task Runner
* [Sass 3.3](http://sass-lang.com/) - CSS Preprocessor

## Nice to Have

* [EditorConfig](http://editorconfig.org/) - EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs.

## Getting started

### Update Project Info

Edit the **meta.title** & **meta.description** fields in `build.config.js`. These values are used for the TITLE & META DESCRIPTION in your project's HTML file.

### Install Dependencies

Run the follow from the root of this project:

    $ npm install
    $ bower install

## Get to Work

Start the Grunt watch command:

    $ grunt server

This will automatically rebuild the project in the `build` directory when changes are detected in the `src` directory.

## Adding or removing 3rd party front-end libraries

1. Include library files

Use `bower install --save` or copy the files directly to the `vendor` directory.

2. Add main files to project config.

Update the `vendor_files` of `app.config.js` to include the main file of the project library.

## Testing devices

Use [Chrome DevTool's Emulation feature](https://developer.chrome.com/devtools/docs/mobile-emulation) to test different experiences on your computer.

## General Code Style Guidelines

### General
* Browser support is IE 9+. 

### CSS
* Use a namespace for all CSS classes. (Ex. ".namespace-section")
* The class-names should be loosely [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)-based, but don't stress out about it.
* All z-index values are defined in `src/sass/_zIndex.scss`. Please don't define z-Index vlaues elsewhere.
* Vendor prefixes are added with the 'autoprefixer' build script. There's no need to write them out by hand or use mixins.

### JS
* jQuery is not used in this project. AngularJS uses jqLite, a tiny, API-compatible subset of jQuery. See the [documentation for angular.element](https://docs.angularjs.org/api/ng/function/angular.element) for more info, and [You Might Not Need jQuery](http://youmightnotneedjquery.com/) for solutions to common problems.

## Packages Not Included But May Prove Useful in Certain Circumstances

* [angular-gestures](http://eightmedia.github.io/hammer.js/) - AngularJS directive that adds support for multi touch gestures to your app.
* [ng-touch](https://github.com/angular/bower-angular-touch) - The ngTouch module provides touch events and other helpers for touch-enabled devices.
* [FastClick](https://github.com/ftlabs/fastclick) - Polyfill to remove click delays on browsers with touch UIs
* [ScrollFix](https://github.com/joelambert/ScrollFix) - Small script to fix some of the issues with iOS5's overflow:scroll;
* [Detectizr](https://github.com/barisaydinoglu/Detectizr) - A Modernizr extension to detect device, device model, screen size, operating system, and browser details



