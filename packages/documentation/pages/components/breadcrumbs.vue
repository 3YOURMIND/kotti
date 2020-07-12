<template lang="md">

# Breadcrumbs

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
		to: '/components/breadcrumbs',
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

<script>
export default {
	name: 'KtBreadCrumbDoc',
	data() {
		return {
			textSeparator: {
				style: 'text',
				value: '/',
			},
			links: [
				{
					title: 'Kotti',
					to: '/',
					isCompleted: true,
				},
				{
					title: 'Components',
					to: '/components/avatars',
					isCompleted: true,
				},
				{
					title: 'Breadcrumbs',
					to: '/components/breadcrumbs',
					isCompleted: false,
				},
			],
		}
	},
}
</script>
