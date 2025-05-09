<template>
	<ComponentInfo v-bind="{ component }" />

	<!-- prettier-ignore -->
	<MarkdownBlock>
## Structure

![Navbar Structure](./navbar.png)

`KtNavbar` has four components:

1. **Notification:** Shows global notification with number indicator
2. **Menu:** Navigation links
3. **Quick Links:** Customizable quick links
4. **Navbar Footer:** Customizable slots

## Components

</MarkdownBlock>

	<a href="/examples/layouts">
		<KtButton icon="link" type="primary">Open Example</KtButton>
	</a>

	<!-- prettier-ignore -->
	<MarkdownBlock>

```html
<KtNavbar
	:notification="notificationData"
	:quickLinks="quickLinksData"
	:sections="menuData"
	@linkClick="redirect($event)"
	@logoClick="redirect($event)"
/>
```

### Notification

To show notifications in `KtNavbar`, you can use the `notification` prop.

```js
notificationData: {
	showNotification: true,
	number: 1,
	title: 'Message',
	link: '/messages'
}
```

### Menu

This is how you display navigation links in `KtNavbar`:

```js
menuData: [
	{
		title: 'Order Management',
		links: [
			{
				icon: 'invoice',
				isActive: false,
				props: {
					href: '#',
				},
				title: 'Orders',
			},
			{
				icon: 'request',
				isActive: false,
				props: {
					href: '#',
				},
				title: 'Quotes',
			},
		],
	},
]
```

By default the elements from the `links` prop on `KtNavbar` are bound to an anchor
HTML element (`<a />`). Therefore, providing `href` attribute on each element suffices
in most cases. In case of the need for a custom component, provide the `component`
attribute and any corresponding prop that would need to be bound to it.

```js
const links = [
	// For Nuxt's router framework
	{
		component: 'nuxt-link',
		icon: 'invoice',
		isActive: false,
		props: {
			to: '#',
		},
		title: 'Orders',
	},
	// For VueRouter
	{
		component: 'router-link',
		icon: 'request',
		isActive: false,
		props: {
			to: '#',
		},
		title: 'Quotes',
	},
],
```

### Quick Links

```js
quickLinksData: [{
	title: 'Create New Issue',
	link: 'https://github.com/3YOURMIND/kotti/issues/new',
}],
```

## Usage

### Events

| Event Name   | Type    | Payload  | Description                  |
| :----------- | :------ | :------- | :--------------------------- |
| `@linkClick` | `$emit` | `$event` | navbar menu link was clicked |
| `@logoClick` | `$emit` | `$event` | navbar logo was clicked      |

</MarkdownBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtButton, KtNavbar } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageLayoutsNavbar',
	components: {
		ComponentInfo,
		KtButton,
	},
	setup() {
		return {
			component: KtNavbar,
		}
	},
})
</script>
