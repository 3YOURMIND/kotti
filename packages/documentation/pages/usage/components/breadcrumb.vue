<template lang="md">
<ComponentInfo v-bind="{ component }" />

Indicate the current page’s location within a navigational hierarchy.

## Basic

<div class="element-example white">
	<KtBreadcrumb :activeIndex="activeIndex" :breadcrumbs="links"/>
</div>

```html
<KtBreadcrumb :activeIndex="activeIndex" :breadcrumbs="links" />
```

```js
links: [
	{
		title: 'Kotti',
		onClick: () => {
			activeIndex.value = 0,
			router.value.push('#')
		}
		isCompleted: true,
	},
	{
		title: 'Usage',
		onClick: () => {
			activeIndex.value = 1,
			router.value.push('#'),
		}
		isCompleted: true,
	},
	{
		title: 'Components',
		onClick: () => {
			activeIndex.value = 2,
			router.value.push('#')
		}
		isCompleted: true,
	},
	{
		title: 'Links',
		onClick: () => {
			activeIndex.value = 3
			router.value.push('#')
		},
		isCompleted: false,
	},
	{
		title: 'Breadcrumbs',
		onClick: () => {
			activeIndex.value = 4,
			router.value.push('#')
		}
		isDisabled: true,
	}
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
import { defineComponent, ref } from 'vue'

import { KtBreadcrumb } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

import { useRouter } from '../../../hooks/use-router'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBreadcrumb',
	components: {
		ComponentInfo,
	},
	setup() {
		const router = useRouter()
		const activeIndex = ref<number | null>(2)
		return {
			activeIndex,
			component: KtBreadcrumb,
			links: [
				{
					title: 'Kotti',
					onClick: () => {
						activeIndex.value = 0
						void router.value.push('#')
					},
					isCompleted: true,
				},
				{
					title: 'Usage',
					onClick: () => {
						activeIndex.value = 1
						void router.value.push('#')
					},
					isCompleted: true,
				},
				{
					title: 'Components',
					onClick: () => {
						activeIndex.value = 2
						void router.value.push('#')
					},
					isCompleted: true,
				},
				{
					title: 'Links',
					onClick: () => {
						activeIndex.value = 3
						void router.value.push('#')
					},
					isCompleted: false,
				},
				{
					title: 'Breadcrumbs',
					onClick: () => {
						activeIndex.value = 4
						void router.value.push('#')
					},
					isDisabled: true,
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
