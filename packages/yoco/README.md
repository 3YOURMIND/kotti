# Yoco Icon

In-house-designed icons for [kotti design system](https://3yourmind.github.io/kotti/).

[👓 Check the Icons](https://3yourmind.github.io/kotti/foundations/icons/)

## Installation

**Using yarn**

```bash
yarn add @3yourmind/yoco
```

**Using npm**

```bash
npm install --save @3yourmind/yoco
```

## Add Yoco Icon to your project

**With module bundler**

```scss
@import '@3yourmind/yoco'; // might need a sass importer
```

```typescript
// enum of icons and the associated ligature / svg name
import { Yoco } from '@3yourmind/yoco'

console.log(Yoco.Icon.ANNOUNCE)
// 'announce'
```

**With HTML**

```html
<link rel="stylesheet" href="./path/to/yoco/style.css" />
```

## Using yoco icons

Yoco uses ligatures, which allows rendering the icon glyph by simply using its name with the `yoco` font.

```html
<i class="yoco">cloud</i>

<!-- or, use .svg -->

<img src="./path/to/yoco/svg/cloud.svg" />
```

## How to Build and Generate Yoco Font

```bash
yarn --cwd packages/yoco run build
# or
yarn run build
```
