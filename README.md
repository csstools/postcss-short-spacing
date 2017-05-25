# Spacing Shorthand [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Gitter Chat][git-img]][git-url]

[Spacing Shorthand] lets you omit sides within `margin` and `padding` properties in CSS.

```css
/* before */

section {
  margin: 1em *;
}

/* after */

section {
  margin-top: 1em;
  margin-bottom: 1em;
}
```

## Options

#### `prefix`

Type: `String`  
Default: `""`

Adds an optional prefix to the `margin` and `padding` properties (e.g. `"x"` for `-x-margin`). Wrapping dashes (`-`) are automatically applied.

#### `skip`

Type: `String`  
Default: `"*"`

Specifies the skip token used to ignore a length.

## Usage

Add [Spacing Shorthand] to your build tool:

```bash
npm install postcss-short-spacing --save-dev
```

#### Node

```js
require('postcss-short-spacing').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Spacing Shorthand] as a PostCSS plugin:

```js
postcss([
  require('postcss-short-spacing')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Spacing Shorthand] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
  return gulp.src('./src/*.css').pipe(
    postcss([
      require('postcss-short-spacing')({ /* options */ })
    ])
  ).pipe(
    gulp.dest('.')
  );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Spacing Shorthand] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
        require('postcss-short-spacing')({ /* options */ })
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[npm-url]: https://www.npmjs.com/package/postcss-short-spacing
[npm-img]: https://img.shields.io/npm/v/postcss-short-spacing.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short-spacing
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short-spacing.svg
[win-url]: https://ci.appveyor.com/project/jonathantneal/postcss-short-spacing
[win-img]: https://img.shields.io/appveyor/ci/jonathantneal/postcss-short-spacing.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[Spacing Shorthand]: https://github.com/jonathantneal/postcss-short-spacing
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
