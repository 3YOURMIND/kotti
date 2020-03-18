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

## Documentation

### Stable Documentation

Build after every release → https://3yourmind.github.io/kotti/

### Nightly Documentation

Auto build after PR merged to master → https://kotti.netlify.com/

## Project Scope

Kotti Design System includes:

| Item                | Meaning                                                                      | Purpose                                                                         |
| :------------------ | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| Design Guideline    | A suggestion documentation for non-developer to understand the design system | Give UX/UI designer a single source of truth and make sure design is consistent |
| Kotti-UI Components | Modular and functional components based on design guideline                  | Replace the shared components in our project                                    |
| Usage Documents     | Example based documentation                                                  | Help developer to use the component                                             |
| Test                | UI Test                                                                      | —                                                                               |

## Folder Structure

```text
kotti
├─ docs // nuxt.js managed design guideline & usage documentation
│  ├─ assets
|  ├─ pages
├─ packages
│  ├─ kotti-style // scss file documentation
│  └─ kotti-button
│     ├─ src
│     ├─ index.js
├─ package.json
├─ CHANGELOG.md
└─ README.md
```

## Install

[![npm version](https://badge.fury.io/js/%403yourmind%2Fkotti-ui.svg)](https://www.npmjs.com/package/@3yourmind/kotti-ui)

```bash
# add kotti-ui package to your project
yarn add @3yourmind/kotti-ui
```

```js
// in main.js
import Vue from 'vue'
import KottiUI from '@3yourmind/kotti-ui'

// from v.0.0.4 kotti-ui includes kotti-style
import '@3yourmind/kotti-ui/dist/KottiUI.css'

Vue.use(KottiUI)
```

## Build

```bash
# install dependencies
yarn install

# build kott-ui
yarn run build:kotti

# generate kotti-docs for github pages to /gh-pages
yarn run build:gh-pages
```

## Develop

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev:docs

# deploy documents on github
yarn deploy:docs
```

## Publish

```bash
# you may need login to npm with your credentials if you have publishing rights
npm login

# update version according to one of the valid options
 npm version {patch, minor, major}
# OR change the version directly in package.json
# then commit & push

# finally, publish
  npm publish

# the postPublish hook will create and automatically push the new tag

```
