# Yoco Icon

In house designed icons for [kotti design system](https://3yourmind.github.io/kotti/).

## Get yoco

**Using npm**

```bash
$ npm install @3yourmind/yoco
```

**Using yarn**

```
$ yarn add @3yourmind/yoco
```

## Add Yoco Icon to your project

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

[Yoco Icon tools](https://3yourmind.github.io/kotti/foundations/icons)

## Generate font file

We use [icomoon](https://icomoon.io/app/) to generate font files. You can import `icomoon/yoco-icon.json` on icomoon website to generate new fonts. We apply follwing font metrics.

| Type             | Metrics |
|------------------|---------|
| Square Height    | 1024    |
| Baseline Height  | 24      |
| Whitespace Width | 24      |

## Build

Fonts, CSS and Svg files will be copied to `dist` folder

```bash
yarn run build
```