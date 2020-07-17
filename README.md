<h1 align="center">@3yourmind/kotti-ui</h1>

<p align="center">
	<a href="https://npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/dm/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>
	<a href="https://david-dm.org/3yourmind/kotti"><img src="https://img.shields.io/david/3yourmind/kotti.svg?style=for-the-badge"/></a>
</p>
<p align="center">
	<a href="https://bundlephobia.com/result?p=@3yourmind/kotti-ui"><img src="https://img.shields.io/bundlephobia/minzip/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>
	<a href="https://www.npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/v/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>
</p>

<table border="0" width="100%">
<col style="width:33%">
<col style="width:33%">
<col style="width:33%">
<tbody>
<tr style="border: 0px !important;">
<td valign="top" style="border: 0px !important;"><b>Complete</b>. The most commonly-needed components are implemented in Kotti. More components will be implemented when there is a specific need for them.</td>
<td valign="top" style="border: 0px !important;"><b>TypeScript Support</b>. Kotti is transitioning to a fully TypeScript-based code-base. While Vue doesn’t support all TS features, we believe that it’s still benefitial in the supported cases.</td>
<td valign="top" style="border: 0px !important;"><b>Modern</b>. Kotti aims to be a modern UI framework, regularly iterating over the existing design and adjusting it with newer UX improvements.</td>
</tr>
<tr style="border: 0px !important;">
<td valign="top" style="border: 0px !important;"><b>Consistent</b>. The goal is to provide consistent, intuitive, and easy-to-use Vue components that users can immediately understand. Similar components shouldn’t defy expectations.</td>
<td valign="top" style="border: 0px !important;"><b>Fail-fast</b>. We believe that it’s better to error early than to have hard-to-catch bugs due to API misuse. Our components provide prop validation to catch common mistakes and throw errors in unexpected situations.</td>
<td valign="top" style="border: 0px !important;"><b>Open-Source</b>. Kotti is licensed under the MIT License — one of the most-permissible software licenses out there. Feel free to fork, modify, and use it. For any project you want.</td>
</tr>
</tbody>
</table>

## Installation

<pre>
<a href="https://yarnpkg.com">yarn</a> add <a href="https://yarnpkg.com/en/package/@3yourmind/kotti-ui">@3yourmind/kotti-ui</a>
</pre>

or

<pre>
<a href="https://npmjs.com">npm</a> install --save <a href="https://npmjs.com/package/@3yourmind/kotti-ui">@3yourmind/kotti-ui</a>
</pre>

## Documentation & Usage

**Documentation**: [current release](https://3yourmind.github.io/kotti/) or [current master](https://kotti.netlify.com/)

```typescript
// in main.js / entrypoint
import Vue from 'vue'
import KottiUI from '@3yourmind/kotti-ui'
import '@3yourmind/kotti-ui/dist/KottiUI.css'

// register all KtComponents globally
Vue.use(KottiUI)

// Alternatively, import the components you need
import { KtForm } from '@3yourmind/kotti-ui'

const CustomVueComponent = {
	// ...
	components: {
		//...
		KtForm,
	},
}
```

## Development Workflow

### Initial Setup

Remember to use [your GitHub email](https://github.com/settings/emails) for this repo

```bash
git clone git@github.com:3yourmind/kotti

cd kotti

# configure github email for this repository
git config user.email "123456+githubusername@users.noreply.github.com"

# install dependencies
yarn config set workspaces-experimental true
yarn install
yarn run lerna bootstrap
```

### Develop

```bash
# having to build should hopefully be resolved in a future update
yarn --cwd packages/kotti-ui run build
# serve with hot reload at http://localhost:3000
yarn --cwd packages/documentation run serve
```

### Linting

```bash
# es-lint (with --fix)
yarn run lint:script
# es-lint (without --fix)
yarn run check:script

# stylelint (with --fix)
yarn run lint:style
# stylelint (without --fix)
yarn run check:style
```

### Testing

```bash
yarn run test
```

### Publish

```bash
# you may need login to npm with your credentials if you have publishing rights
npm login

yarn run lerna publish from-package

# update release notes
# https://github.com/3YOURMIND/kotti/releases/new
```

### Build

```bash
yarn run lerna run build
```

## Internals

### Important Folders

| Path        | Purpose                              |
| :---------- | :----------------------------------- |
| `/docs`     | Nuxt-managed documentation           |
| `/packages` | Source-code for all Kotti Components |
