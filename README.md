# Kotti Design System

Design system for new version of 3YOURMIND product.

**Keen:** The design should encourage users to use and willing to engage the product.

**Okay:** It's okay not for follow the foundation, but needs a strong reason to support. It's okay break the design principles but only when its the only way to solve the requirement.

**Transparent:** Making the design easy to perceive or detect, user can process smoothly without being aware of its presence.

**Timely:** The design need to response and help user finish their task in a timely matter.

**Intuitive:** The design should be intuitive and easy to understand, and decrease the learning curve.

[Read the document online on Github Pages](https://3yourmind.github.io/kotti/)

## Project Scope

Kotti Design System includes:

|Item|Meaning|Purpose|
|---|---|---|
|Design Guideline|a suggestion documentation for non-developer to read and understand the design system|Give UX/UI designer a single source of truth and make sure design is consistent|
|Styles `kotti-style`|a css framework which implement the design guideline|Help developer to write customize component easier|
|UI Components `kotti-ui`|modular and functional components based on design guideline|replace the shared components in our project|
|Usage Documents|example based documentation|helps developer to use the component|
|Storybook|UI development env|easier UI develop|
|Test|UI Test| -- |


## Folder Structure

```bash
.kotti
|-- www // nuxt.js managed design guideline & usage documentation
     |-- packages.json
     |-- nuxt.js
|-- packages 
     |-- kotti-style // scss file documentation
     |-- kotti-icons // icon fonts
     |-- kotti-button
          |-- src
          |-- package.json
          |-- index.js
          |-- README.md
          |-- USAGE.md // usage example doc can be auto generated
|-- storybook // storybook playground for UI components
package.json
README.md
```


## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run doc

# build for production and launch server
$ yarn doc:generate

# generate github pages
$ yarn doc:gh-pages
```

## Use Kotti-Style


### Install Kotti-Style

```bash
# install kotti-style package to your project
yarn add @3yourmind/kotti-style
```

### Import Kotti-Style

```bash
@import '@3yourmind/kotti-style
```

## Use Kotti-UI

### Install Kotti-UI
```bash
# add kotti-ui package to your project
yarn add @3yourmind/kotti-ui
```

### Import Kotti-UI

**Fully Import**

```js
// in main.js
import Vue from 'vue';
import KottiUI from 'kotti-ui';
import '@3yourmind/kotti-style';

Vue.use(KottiUI);
```


