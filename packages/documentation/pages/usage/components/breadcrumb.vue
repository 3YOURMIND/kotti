<template lang="md">
<ComponentInfo v-bind="{ component }" />

Indicate the current page’s location within a navigational hierarchy.

## Basic

<div class="element-example white">
	<KtBreadcrumb :breadcrumbs="links"/>
</div>

```html
<KtBreadcrumb :breadcrumbs="links" />
```

```js
links: [
	{
		title: 'Kotti',
		onClick: () => this.$router.push('/'),
		isCompleted: true,
	},
	{
		title: 'Components',
		onClick: () => this.$router.push('/components'),
		isCompleted: true,
	},
	{
		title: 'Breadcrumbs',
		onClick: () => this.$router.push('/usage/components/breadcrumb'),
		isCompleted: false,
	},
]
```

## Separator Style

<div class="element-example white">
	<KtBreadcrumb :breadcrumbs="links" :separator="textSeparator"/>
</div>

```html
<KtBreadcrumb :breadcrumbs="links" :separator="textSeparator" />
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

import { useRouter } from '../../../hooks/use-router'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBreadcrumb',
	components: {
		ComponentInfo,
	},
	setup() {
		const router = useRouter()
		return {
			component: KtBreadcrumb,
			links: [
				{
					title: 'Kotti',
					onClick: () => router.value.push('/'),
					isCompleted: true,
				},
				{
					title: 'Usage',
					onClick: () => router.value.push('#'),
					isCompleted: true,
				},
				{
					title: 'Components',
					onClick: () => router.value.push('#'),
					isCompleted: true,
				},
				{
					title: 'Breadcrumbs',
					onClick: () => router.value.push('/usage/components/breadcrumb'),
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
