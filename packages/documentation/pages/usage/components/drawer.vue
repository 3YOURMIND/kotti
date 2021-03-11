<template lang="md">
<ComponentInfo v-bind="{ component }" />

Drawer is another layer of the interface. It adds more information or functionality to the current layout without messing up the elements.

It is best to place secondary functionality or information in the drawer, and only present the most important elements or interaction in the workspace.

## Structure

![Structure](~/assets/img/drawer_structure.png)

* **Drawer:** The size of drawer depends on information density. There are three sizes: `Default`, `Wide` and `Full Open`.
* **Handle:** By clicking the handles, the drawer can be `Full Open` to display more information.
* **Background:** The background should be black `#000000` with 46% opacity.

## Size

<div class="element-example">
	<button class="primary mr-16px" @click="showDrawer=true" >Show Default Size Drawer</button>
	<button class="primary mr-16px" @click="showWideDrawer=true">Show Wide Size Drawer</button>
	<button class="primary" @click="customizeWidthDrawer=true">Customize Size Drawer</button>
	<KtDrawer v-if="showDrawer" @close="showDrawer=false" :closeOutside="false">
		<div slot="drawer-header">
			<h2>Default Size Drawer</h2>
		</div>
		<div slot="drawer-body">
			<p>Close from outside disabled</p>
		</div>
		<div slot="drawer-footer">
			<button @click="showDrawer=false" class="w-100">Close Drawer</button>
		</div>
	</KtDrawer>
	<KtDrawer v-if="showWideDrawer" wide @close="showWideDrawer=false">
		<div slot="drawer-header">
			<h2>Wide Size Drawer</h2>
		</div>
		<div slot="drawer-body">
			<p>Close from outside allowed</p>
		</div>
	</KtDrawer>
	<KtDrawer v-if="customizeWidthDrawer" defaultWidth="400px"  expandWidth="600px" @close="customizeWidthDrawer=false">
		<div slot="drawer-header">
			<h2>Wider Size Drawer</h2>
		</div>
		<div slot="drawer-body">
			<p>Close from outside allowed</p>
		</div>
	</KtDrawer>
</div>

There are two size of drawer: `default` and `wide`.

Drawer will be half fo the window width when `wide` set to `true`.

You can also customize the width of drawer by setting `defaultWidth` and `expandWidth`.

```html
<!-- Wide width drawer -->
<KtDrawer wide>
	...
</KtDrawer>

<!-- Customize width drawer -->
<KtDrawer defaultWidth="400px"  expandWidth="600px">
	...
</KtDrawer>
```

## Close from outside

When `closeOutside` is `false`, it prevents user accidentally close the drawer by clicking outside.

<ShowCase>

<div slot="vue">

```html
<KtDrawer v-if="showDrawer" @close="showDrawer=false" :closeOutside="false">
	<div slot="drawer-header">
		<h2>Default Size Drawer</h2>
	</div>
	<div slot="drawer-body">
		<p>Close from outside disabled</p>
	</div>
	<div slot="drawer-footer">
		<button @click="showDrawer=false" class="w-100">Close Drawer</button>
	</div>
</KtDrawer>
```

</div>

<div slot="style">

```html
<div class="drawer-mask">
	<div class="drawer-container">
		<div class="drawer-header">
			<h2>default header</h2>
		</div>
		<div class="drawer-body">
				default body
		</div>
		<div class="drawer-footer">
			<button class="w-100">Close</button>
		</div>
		<div class="drawer-handle">
			<i class="yoco" v-if="expand">chevron_right</i>
			<i class="yoco" v-else>chevron_left</i>
		</div>
	</div>
</div>

<div class="drawer-mask">
	<div class="drawer-container drawer-wide">
		<div class="drawer-header"></div>
		<div class="drawer-body"></div>
		...
	</div>
</div>
```
</div>

</ShowCase>

## Usage

### Attributes

| Attribute      | Description                                | Type      | Accepted values | Default |
|:---------------|:-------------------------------------------|:----------|:----------------|:--------|
| `closeOutside` | closed drawer when click outside of drawer | `Boolean` | —               | `true`  |
| `defaultWidth` | width when drawer is closed                | `String`  | CSS width       | —       |
| `expandWidth`  | width when drawer is expanded              | `String`  | CSS width       | —       |
| `wide`         | wide drawer                                | `Boolean` | —               | `false` |

### Slots

| Slot Name       | Description    |
|:----------------|:---------------|
| `drawer-header` | header section |
| `drawer-body`   | body section   |
| `drawer-footer` | footer section |
</template>

<script lang="ts">
import { KtDrawer } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'
import ShowCase from '~/components/ShowCase.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsDrawer',
	components: {
		ComponentInfo,
		ShowCase,
	},
	data() {
		return {
			component: KtDrawer,
			customizeWidthDrawer: false,
			showDrawer: false,
			showWideDrawer: false,
		}
	},
})
</script>
