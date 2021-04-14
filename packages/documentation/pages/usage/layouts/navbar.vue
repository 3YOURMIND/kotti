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

## Toggle Narrow Navbar

<div class="element-example">
	<KtButton @click="$KtNavbar.toggle(true)">Set to Narrow</KtButton>
	<KtButton @click="$KtNavbar.toggle(false)">Set to Wide</KtButton>
	<KtButton @click="$KtNavbar.toggle()">isNarrow: {{$KtNavbar.isNarrow}}</KtButton>
</div>

You can control `isNarrow` globally via `$KtNavbar.toggle(value)` function.

You can get the value of narrow navbar via `$KtNavbar.isNarrow`

```html
<KtButton @click="$KtNavbar.toggle(true)">Set to Narrow</KtButton>
<KtButton @click="$KtNavbar.toggle(false)">Set to Wide</KtButton>
<KtButton @click="$KtNavbar.toggle()">Toggle</KtButton>
<h2>Navbar is narrow: {{ $KtNavbar.isNarrow }}</h2>
```

## Usage

### Attributes

| Attribute            | Description                            | Type      | Accepted values        | Default |
|:---------------------|:---------------------------------------|:----------|:-----------------------|:--------|
| `$KtNavbar.isNarrow` | define navbar is narrow                | `Boolean` | —                      | `false` |
| `notification`       | notification section of the navbar     | `Array`   | See above Notification | —       |
| `quickLinks`         | quick link section of the navbar       | `Array`   | See above Quick Links  | —       |
| `sections`           | menu section of the navbar             | `Array`   | See above Menu         | —       |

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
