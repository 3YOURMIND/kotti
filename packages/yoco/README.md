# yoco

Customised icons for Yoda.

## Get yoco

**Using npm**
```bash
$ npm install @3yourmind/yoco
```

**Using yarn**

```
$ yarn add @3yourmind/yoco
```

**Using Github**

Download latest version from Github and unzip in your project.

* [Download v0.0.2-beta.4](https://github.com/3YOURMIND/yoco/releases/tag/v0.0.2-beta.4)

## Add yoco.css to your project

**With module bundler**
```bash
@import "@3yourmind/yoco";
```
**With HTML**
```html
<!-- Add yoco.css to your project -->
<link rel="stylesheet" href="./path/to/yoco-icon.css">
```

## Using yoco icons

Yoco use ligatures feature, which allows rendering of an icon glyph simply by using its textual name.

```html
<!-- cloud is icon's textual name -->
<i class="yoco">cloud</i>
```

[Icon Preview](https://3yourmind.github.io/yoco/)

[Yoco Icon tools](https://3yourmind.github.io/kotti/icons/)

## Generate font file

We use [icomoon](https://icomoon.io/app/) to generate font files. You can import `icomoon/yoco-icon.json` on icomoon website to generate new fonts. We apply follwing font metrics.

|Type|Metrics|
|----|----|
|Square Height|1024|
|Baseline Height|24|
|Whitespace Width|24|

## Build

Gulp will copy fonts to `dist/fonts` folder and minify css files then copy to `dist` directory.  

```bash
yarn gulp build
```
## Publish to gh-pages

```bash
yarn gh-pages
```




