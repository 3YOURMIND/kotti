<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Structure

![Navbar Structure](~/assets/img/navbar.png)

`KtNavbar` has four components:

1. **Notification:** Shows global notification with number indicator
2. **Menu:** Navigation links
3. **Quick Links:** Customizable quick links
4. **Navbar Footer:** Customizable slots

## Components

<nuxt-link to="/examples/layouts">
	<KtButton type="primary" icon="link">Open Example</KtButton>
</nuxt-link>

```html
<KtNavbar
	:notification="notificationData"
	:sections="menuData"
	:quickLinks="quickLinksData"
	@logoClick="redirect($event)"
	@linkClick="redirect($event)"
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

`KtNavbar` only supports this menu structure:

```js
menuData: [
	{
		title: 'Order Management',
		links: [
			{
				link: '#',
				title: 'Orders',
				icon: 'invoice',
				isActive: false,
			},
			{
				link: '#',
				title: 'Quotes',
				icon: 'request',
				isActive: false,
			},
		],
	},
]
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
|:-------------|:--------|:---------|:-----------------------------|
| `@linkClick` | `$emit` | `$event` | navbar menu link was clicked |
| `@logoClick` | `$emit` | `$event` | navbar logo was clicked      |
</template>

<script lang="ts">
import { KtNavbar } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageLayoutsNavbar',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtNavbar,
		}
	},
})
</script>
