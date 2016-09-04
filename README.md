# Interactive Graphic Template

Based on Phaser ES6 Boilerplate, see below for original README.

## TL;DR
```
# install nodejs and its package manager
$ npm install
$ npm start
# go to the url in the browser
```

# Interactive SVG ES6 Boilerplate

This is a template for building interactive graphics using the 
snapsvg ramework and ES6/2015. Its based on the Phaser Template by Daniel Belohlavek [@dbhvk](http://twitter.com/dbhvk)


The original idea was to create a small project that contained a robust gulpfile, 
a basic example and *some* kind of folder structure.

## Features

✔ Heavily commented, flexible Gulpfile (that means it uses [Gulp](http://gulpjs.com/)).

✔ [Browserify](https://github.com/substack/node-browserify) + [Babelify](https://github.com/babel/babelify) (Yes, it uses [Babel](https://babeljs.io/)).

✔ [Browsersync](http://www.browsersync.io/) = Livereload + Mobile debugging with [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/).

✔ Example: Extending Phaser & modular development.

✔ Production ([UglifyJS](https://github.com/mishoo/UglifyJS2)) and Development ([Sourcemaps](https://developer.chrome.com/devtools/docs/javascript-debugging#source-maps)) builds.

✔ Did I say ES6? Well.. some ES7 too! ([See Experimental features](https://babeljs.io/docs/usage/experimental/)).

## Usage

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone https://github.com/eqv/interactive_svg`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.

Please report any bugs or add requests on [Github Issues](https://github.com/eqv/interactive_svg/issues).

## License

This project is released under the MIT License.
