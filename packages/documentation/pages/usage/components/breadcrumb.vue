<template lang="md">
<ComponentInfo v-bind="{ component }" />

Indicate the current page’s location within a navigational hierarchy.

## Basic

<div class="element-example white">
	<KtBreadcrumb :breadcrumbs="links"/>
</div>

```html
<KtBreadcrumb :breadcrumbs="links"/>
```

```js
links: [
	{
		title: 'Kotti',
		to: '/',
		isCompleted: true,
	},
	{
		title: 'Components',
		to: '/components',
		isCompleted: true,
	},
	{
		title: 'Breadcrumbs',
		to: '/usage/components/breadcrumb',
		isCompleted: false,
	},
]
```

## Separator Style

<div class="element-example white">
	<KtBreadcrumb :breadcrumbs="links" :separator="textSeparator"/>
</div>

```html
<KtBreadcrumb :breadcrumbs="links" :separator="textSeparator"/>
```

```js
// default separator
iconSeparator: {
	style: 'icon',
	value: 'chevron_right'
},
textSeparator: {
	style: 'text',
	value: '/'
},
```
</template>

<script lang="ts">
import { KtBreadcrumb } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBreadcrumb',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtBreadcrumb,
			links: [
				{
					title: 'Kotti',
					to: '/',
					isCompleted: true,
				},
				{
					title: 'Usage',
					to: '#',
					isCompleted: true,
				},
				{
					title: 'Components',
					to: '#',
					isCompleted: true,
				},
				{
					title: 'Breadcrumbs',
					to: '/usage/components/breadcrumb',
					isCompleted: false,
				},
			],
			textSeparator: {
				style: 'text',
				value: '/',
			},
		}
	},
})
</script>