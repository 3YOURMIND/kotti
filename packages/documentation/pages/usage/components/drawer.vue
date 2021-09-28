<template lang="md">
<ComponentInfo v-bind="{ component }" />

Drawer is another layer of the interface. It adds more information or functionality to the current layout without messing up the elements.

It is best to place secondary functionality or information into the drawer, and only present the most important elements or interaction in the workspace.

## Structure

![Structure](~/assets/img/drawer_structure.png)

- **Drawer:** The size of drawer depends on information density.
- **Handle:** By clicking the handles, the drawer can be `Expanded` to display more information.
- **Background:** The background should be black `#000000` with `46%` opacity.

## Size

<div class="element-example">
	<KtButton type="primary" class="mr-16px" @click="showDrawer=true" label="Show Default Size Drawer" />
	<KtButton type="primary" class="mr-16px" @click="showWideDrawer=true" label="Show Wide Size Drawer" />
	<KtButton type="primary" @click="customizeWidthDrawer=true" label="Customize Size Drawer" />
	<KtDrawer v-if="showDrawer" @close="showDrawer=false" disallowCloseOutside>
		<div slot="drawer-header">
			<h2>Default Size Drawer</h2>
		</div>
		<div slot="drawer-body">
			<p>Close from outside disabled</p>
		</div>
		<div slot="drawer-footer">
			<KtButton @click="showDrawer=false" class="w-100" label="Close Drawer" />
		</div>
	</KtDrawer>
	<KtDrawer v-if="showWideDrawer" isWide @close="showWideDrawer=false">
		<div slot="drawer-header">
			<h2>Wide Size Drawer</h2>
		</div>
		<div slot="drawer-body">
			<p>Close from outside allowed</p>
		</div>
		<div slot="drawer-footer">
			<KtButton @click="showWideDrawer=false" class="w-100" label="Close Drawer" />
		</div>
	</KtDrawer>
	<KtDrawer v-if="customizeWidthDrawer" defaultWidth="400px"  expandWidth="600px" @close="customizeWidthDrawer=false">
		<div slot="drawer-header">
			<h2>Custom Size Drawer</h2>
		</div>
		<div slot="drawer-body">
			<p>Close from outside allowed</p>
		</div>
		<div slot="drawer-footer">
			<KtButton @click="customizeWidthDrawer=false" class="w-100" label="Close Drawer" />
		</div>
	</KtDrawer>
</div>

There are different ways to customize the width of the drawer.

Each drawer has a default state and a wide state, the transition can be triggered by clicking on the arrow at the edge of the drawer.

When the `isWide` flag is set to `true` the default state will cover `50%` of the screen, the wide screen will cover `75%`.

You can also customize the width of drawer by setting both `defaultWidth` and `expandWidth`. If only one values is set, this will not work

```html
<!-- Wide width drawer -->
<KtDrawer isWide> ... </KtDrawer>

<!-- Customize width drawer -->
<KtDrawer defaultWidth="400px" expandWidth="600px"> ... </KtDrawer>
```

## Close from outside

When the `disallowCloseOutside` flag is set, it prevents the user from accidentally closing the drawer by clicking outside of the drawer.

<ShowCase>

<div slot="vue">

```html
<KtDrawer v-if="showDrawer" @close="showDrawer=false" disallowCloseOutside>
	<div slot="drawer-header">
		<h2>Default Size Drawer</h2>
	</div>
	<div slot="drawer-body">
		<p>Close from outside disabled</p>
	</div>
	<div slot="drawer-footer">
		<KtButton @click="showDrawer=false" class="w-100" label="Close Drawer" />
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
		<div class="drawer-body">default body</div>
		<div class="drawer-footer">
			<KtButton class="w-100" label="Close" />
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

| Attribute              | Description                                | Type      | Accepted values | Default |
| :--------------------- | :----------------------------------------- | :-------- | :-------------- | :------ |
| `disallowCloseOutside` | closed drawer when click outside of drawer | `Boolean` | —               | `true`  |
| `defaultWidth`         | width when drawer is closed                | `String`  | CSS width       | —       |
| `expandWidth`          | width when drawer is expanded              | `String`  | CSS width       | —       |
| `isWide`               | wide drawer                                | `Boolean` | —               | `false` |
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
