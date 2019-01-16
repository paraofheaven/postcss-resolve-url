# PostCSS Resolve Url [![Build Status][ci-img]][ci]

[PostCSS] plugin which resolve relative url problems in css-loader.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/paraofheaven/postcss-resolve-url.svg
[ci]:      https://travis-ci.org/paraofheaven/postcss-resolve-url

```scss
#a.scss
.foo {
    background-image: url('./a.png')
}
```

```scss
#b.scss
@import './a.scss';
```
**Output**
```scss
#b.scss
.foo {
  background-image: url('./a.png')
  // context is a.scss abdolute path
}
```

## Usage

```js
  postcss.plugin('postcss-resolve-url');
```

See [PostCSS] docs for examples for your environment.
