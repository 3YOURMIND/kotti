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
quickLinksData: {
	links: [{
		title: 'Create New Issue',
		link: 'https://github.com/3YOURMIND/kotti/issues/new',
	}],
},
```

## Theme Configuration

`KtNavbar` injects the theme provided by the parent or globally.

When `KtTheme` object is not provided, it will replace the default theme.

Currently supports:

- `navbarTextColor`: the default menu text color of the navbar, make sure the `textColor` has enough contrast with background
- `navbarTextActiveColor`: the color when menu is slected, the active class by default has `font-weight: 600`
- `navbarBackgroundColor`: the background color of the navbar
- `logoUrl`: the url of the logo image
- `logoHeight`: the height of the logo


Default theme fallback:

```js
provide() {
	return {
		KtTheme: {
			navbarBackgroundColor: '#122C56',
			navbarTextColor: 'rgba(255,255,255,.54)',
			navbarTextActiveColor: 'rgba(255,255,255, 1)',
			logoUrl: LogoSvg,
			logoHeight: '40px',
		},
	}
},
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

### Slots

| Slot Name       | Description              |
|:----------------|:-------------------------|
| `navbar-footer` | footer section of navbar |
</template>

<script lang="ts">
import { KtNavbar } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPagePatternsNavbar',
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
