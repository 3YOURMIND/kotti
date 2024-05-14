<h1 align="center">@3yourmind/kotti-ui</h1>

<p align="center">
	<a href="https://npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/dm/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>
	<a href="https://npmjs.com/package/@3yourmind/kotti-ui"><img src="https://img.shields.io/npm/types/@3yourmind/kotti-ui.svg?style=for-the-badge"/></a>
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

**Documentation**: <https://3yourmind.github.io/kotti/>

```typescript
// in main.ts / entrypoint
import Vue from 'vue'
import KottiUI from '@3yourmind/kotti-ui'
import '@3yourmind/kotti-ui/dist/style.css'

// (optional) register all KtComponents globally
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

## Packages

|                                                  Name | NPM                                                                                                              | Downloads (Month)                                               | Downloads (Total)                                               | Size                                                                         |
| ----------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------- |
|           [`@3yourmind/kotti-ui`](/packages/kotti-ui) | [![](https://img.shields.io/npm/v/@3yourmind/kotti-ui)](https://npmjs.com/package/@3yourmind/kotti-ui)           | ![](https://img.shields.io/npm/dm/@3yourmind/kotti-ui.svg)      | ![](https://img.shields.io/npm/dt/@3yourmind/kotti-ui.svg)      | ![](https://img.shields.io/bundlephobia/minzip/@3yourmind/kotti-ui.svg)      |
|                   [`@3yourmind/yoco`](/packages/yoco) | [![](https://img.shields.io/npm/v/@3yourmind/yoco)](https://npmjs.com/package/@3yourmind/yoco)                   | ![](https://img.shields.io/npm/dm/@3yourmind/yoco.svg)          | ![](https://img.shields.io/npm/dt/@3yourmind/yoco.svg)          | ![](https://img.shields.io/bundlephobia/minzip/@3yourmind/yoco.svg)          |
| [`@3yourmind/vue-use-tippy`](/packages/vue-use-tippy) | [![](https://img.shields.io/npm/v/@3yourmind/vue-use-tippy)](https://npmjs.com/package/@3yourmind/vue-use-tippy) | ![](https://img.shields.io/npm/dm/@3yourmind/vue-use-tippy.svg) | ![](https://img.shields.io/npm/dt/@3yourmind/vue-use-tippy.svg) | ![](https://img.shields.io/bundlephobia/minzip/@3yourmind/vue-use-tippy.svg) |

## Dependencies

Some features of `KtFieldFileUpload` rely on [`WebRTC`](https://webrtc.org/). This technology should be available on all modern browsers as well as on native clients for all major platforms.

If you have issues accessing the device's camera, include the [`webrtc-adapter`](https://www.npmjs.com/package/webrtc-adapter) package.

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
# auto-build/watch
yarn run watch
```

or

```bash
# having to build should hopefully be resolved in a future update
yarn workspace @3yourmind/sass-node-modules-importer run build
yarn workspace @3yourmind/yoco run build
yarn workspace @3yourmind/vue-use-tippy run build
yarn workspace @3yourmind/kotti-ui run build
# serve at http://localhost:3000
yarn workspace @3yourmind/documentation run serve
```

### Handling Rebases

There are two workflows to help with rebasing pull requests:

1. Rebase  
   Commenting `/rebase` on any pull request will trigger a GitHub Action that rebases the PR.
   This is best used when attempting to rebase a PR without auto-rebase before merging.
2. Auto-Rebase  
   Adding the `autorebase:opt-in` label to any pull request will automatically rebase the PR as soon as it’s out-of-date.
   This should preferrably be used by the author, as it requires them to be aware of having to use `git pull --rebase`

### Linting

```bash
# es-lint (with --fix)
yarn run fix:eslint
# es-lint (without --fix)
yarn run check:eslint

# stylelint (with --fix)
yarn run fix:stylelint
# stylelint (without --fix)
yarn run check:stylelint
```

### Testing

```bash
yarn run test
```

### Publishing

This monorepo supports a semi-automatic release workflow. To trigger an automatic release:

- make sure that the package that should be auto-released is mentioned in `packagesToConsider` of [this file](internals/scripts/source/publish.ts)
- bump the package's version in the relevant `package.json`
- merge this change to `master`. This will trigger the repo's `publish` workflow which publishes any new versions it finds.

#### Kotti

1. Prepare a new release draft [here](https://github.com/3YOURMIND/kotti/releases/new)

   a. Tag format: `versions/kotti-ui/1.2.3` (select `Create new tag: versions/kotti-ui/1.2.3 on publish`)

   b. Title format: `1.2.3: tldr of what's happening`

   c. Release notes: Follow guidelines of previous releases

   d. Click on `Save draft`

2. Optional: If you haven't already, make sure to functionally test:

```bash
yarn run watch # or if already merged to master, go to <https://3yourmind.github.io/kotti/>
```

3. Create a pull request that bumps the version:
   a. Update the version in `packages/kotti-ui/package.json`
   b. Commit message format: `version(kotti-ui@1.2.3): tldr of what's happening`

4. Merge the pull request and publish the release draft from `step 1` [here](https://github.com/3YOURMIND/kotti/releases)

5. Announce the new version in the `#kotti` slack channel

#### Yoco

1. Prepare a new release draft [here](https://github.com/3YOURMIND/kotti/releases/new)

   a. Tag format: `versions/yoco/1.2.3` (select `Create new tag: versions/yoco/1.2.3 on publish`)

   b. Title format: `Yoco 1.2.3: tldr of what's happening`

   c. Release notes: Follow guidelines of previous releases

   d. Click on `Save draft`

2. Optional: If you haven't already, make sure to functionally test:

```bash
yarn run watch # or if already merged to master, go to <https://3yourmind.github.io/kotti/>
```

3. Create a pull request that bumps the version:
   a. Update the version in `packages/yoco/package.json`
   b. Update the yoco version in `packages/kotti-ui/package.json` (consider bumping kotti-ui, if the changes need to be used there as well)
   c. Commit message format: `version(yoco@1.2.3): tldr of what's happening`

4. Merge the pull request and publish the release draft from `step 1` [here](https://github.com/3YOURMIND/kotti/releases)

5. Announce the new version in the `#kotti` slack channel

#### Debugging

In case this does not work as expected, you want to check out the [publish script](internals/scripts/source/publish.ts) and the [github workflow definition](.github/workflows/publish.yml) that drive this action

### Build

```bash
yarn run build
```

## Internals

### Important Folders

| Path                     | Purpose                    |
| :----------------------- | :------------------------- |
| `packages/documentation` | Nuxt-managed documentation |

### Turborepo Tooling

#### Debugging

The best starting point for debugging turbo is:

1. Figure out what turbo command gets run (e.g. by checking `package.json`)
2. Check the relevant tasks in `turbo.json` and `packages/*/turbo.json`

The [Turborepo Documentation](https://turbo.build/repo/docs) is an excellent resource, also make sure you have the `@recommended` `Vercel.turbo-vsc` extension installed as it provides autocomplete and linting for `turbo.json`.

It is also possible to [visualize the graph used by `turbo run`](https://turbo.build/repo/docs/reference/command-line-reference/run#--graph)

```sh
# generate a graph of turbo run build (needs graphviz)
yarn run debug:turbo
```
