# PostCSS Short Spacing [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Short Spacing] lets you omit sides within `margin` and `padding`
properties in CSS.

```pcss
section {
  margin: 1em *;
}

/* becomes */

section {
  margin-top: 1em;
  margin-bottom: 1em;
}
```

Supported properties include `margin`, `margin-block`, `margin-inline`,
`margin-start`, `margin-end`, `padding`, `padding-block`, `padding-inline`,
`padding-start`, and `padding-end`.

## Usage

Add [PostCSS Short Spacing] to your project:

```bash
npm install postcss-short-spacing --save-dev
```

Use [PostCSS Short Spacing] to process your CSS:

```js
const postcssShortSpacing = require('postcss-short-spacing');

postcssShortSpacing.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssShortSpacing = require('postcss-short-spacing');

postcss([
  postcssShortSpacing(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Short Spacing] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

#### prefix

The `prefix` option defines a prefix required by properties being transformed.
Wrapping dashes are automatically applied, so that `x` would transform
`-x-margin`.

```js
postcssShortSpacing({ prefix: 'x' });
```

```pcss
body {
  -x-margin: 1em *;
}

/* becomes */

section {
  margin-top: 1em;
  margin-bottom: 1em;
}
```

#### skip

The `skip` option defines the skip token used to ignore portions of the
shorthand.

```js
postcssShortSpacing({ skip: '-' });
```

```pcss
body {
  -x-margin: 1em -;
}

/* becomes */

section {
  margin-top: 1em;
  margin-bottom: 1em;
}
```

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-short-spacing.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-short-spacing
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-short-spacing.svg
[npm-url]: https://www.npmjs.com/package/postcss-short-spacing

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Short Spacing]: https://github.com/jonathantneal/postcss-short-spacing
