# Kotti Design System

## Overview

This design system helps to unify our design language and provides the
documentation for further product design decisions. The Kotti design system has
two main parts: foundation and components.

The foundation is higher level and works as a guideline for the whole system,
which defines the layout, color, icons, typography and writing style. It also
creates styles and characteristics which are different from other design
systems.

Components are more concrete elements. They are pre-defined and cannot be
changed in most cases. These components include banners, buttons, drawers and
more.

## Design Principles

**Keen:** The design should encourage users to engage with the product.

**Okay:** It’s okay not to follow the foundation if there's good reason. It’s
okay to break the design principles when it’s the only way to solve the
requirement.

**Transparent:** Making the design easy to perceive or detect, user can process
smoothly without being aware of its presence.

**Timely:** The design need to response and help user finish their task in a
timely matter.

**Intuitive:** The design should be intuitive and easy to understand, and
decrease the learning curve.

[Read the document online](https://3yourmind.github.io/kotti/)

## Project Scope

Kotti Design System includes:

| Item                | Meaning                                                                      | Purpose                                                                         |
| :------------------ | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| Design Guideline    | A suggestion documentation for non-developer to understand the design system | Give UX/UI designer a single source of truth and make sure design is consistent |
| Kotti-Styles        | A css framework which implement the design guideline                         | Help developer to write customize component easier                              |
| Kotti-UI Components | Modular and functional components based on design guideline                  | Replace the shared components in our project                                    |
| Usage Documents     | Example based documentation                                                  | Help developer to use the component                                             |
| Test                | UI Test                                                                      | —                                                                               |

## Folder Structure

```text
kotti
├─ www // nuxt.js managed design guideline & usage documentation
│  ├─ assets
|  ├─ pages
├─ packages
│  ├─ kotti-style // scss file documentation
│  ├─ kotti-icons // icon fonts
│  └─ kotti-button
│     ├─ src
│     ├─ index.js
├─ package.json
├─ CHANGELOG.md
└─ README.md
```

## Build

```bash
# install dependencies
yarn install

# build kott-ui
yarn run build:kotti

# build kotti-style
yarn run build:style

# generate kotti-docs to /docs
yarn run build:docs

# generate kotti-docs for github pages to /gh-pages
yarn run build:gh-pages
```

## Develop

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev:docs
```

## Use Kotti-Style

[![npm version](https://badge.fury.io/js/%403yourmind%2Fkotti-style.svg)](https://www.npmjs.com/package/@3yourmind/kotti-style)

### Install Kotti-Style

```bash
# install kotti-style package to your project
yarn add @3yourmind/kotti-style
```

### Use Kotti-Style

```scss
@import '@3yourmind/kotti-style';
```

## Use Kotti-UI

[![npm version](https://badge.fury.io/js/%403yourmind%2Fkotti-ui.svg)](https://www.npmjs.com/package/@3yourmind/kotti-ui)

### Install Kotti-UI

```bash
# add kotti-ui package to your project
yarn add @3yourmind/kotti-ui
```

### Use Kotti-UI

**Fully Import**

```js
// in main.js
import Vue from 'vue'
import KottiUI from 'kotti-ui'

// from v.0.0.4 kotti-ui includes kotti-style
import '@3yourmind/kotti-ui/kotti-style/dist/index.min.css'

Vue.use(KottiUI)
```
