# Kotti Style

The library for kotti style CSS

## Getting started

**Install with NPM**

```bash
npm install @3yourmind/kotti-style --save
```

**Install with Yarn**

```bash
yarn add @3yourmind/kotti-style
```

## Compiling CSS

Kotti-style uses Gulp for compiling CSS. First you need to install dependences.

```bash
yarn install
```

All available Gulp tasks:

- `yarn gulp build` - compile Sass to CSS and minify files (default)
- `yarn gulp watch` - watch file changes and re-compile CSS files

The compiled CSS file located in `/dist` directory.

## Import Kotti Style

```scss
@import '@3yourmind/kotti-style/lib/index.min.css';
```
