<template lang="md">
# Navbar

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
	:section="menuData"
	:quickLinks="quickLinksData"
	@logoClick="redirect($event)"
	@linkClick="redirect($event)"
/>
```

### Notification

If you need notification in the `KtNavbar`, you can use `notification` props.

```js
notificationData: {
	showNotification: true,
	number: 1,
	title: 'Message',
	link: '/messages'
}
```

### Menu

`KtNavbar` only support pre-designed menu structure.

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
		link:'https://google.com',
	}],
},
```

## Theme Configuration

`KtNavbar` injects the theme which provides by partent or globally.

When `KtNavbarTheme` object is provided, it will replace the defatul theme.

Currently supports:

- `backgroundColor`: the background color of the navbar
- `textColor`: the default menu text color of the navbar, make sure the `textColor` has enough contrast with background
- `activeColor`: the color when menu is slected, the active class by default has `font-weight: 600`
- `logoUrl`: the url of the logo image

Example theme configuration shows as below:

```js
provide() {
	return {
		KtNavbarTheme: {
			backgroundColor: '#fff',
			textColor: 'rgba(0,0,0,0.58)',
			borderColor: '#dbdbdb',
			activeColor: '#2c64cc',
			logoUrl: 'https://picsum.photos/200/80',
		},
	}
}
```


## Toggle Narrow Navbar

<div class="element-example">
	<KtButton @click="$KtNavbar.toggle(true)">Set to Narrow</KtButton>
	<KtButton @click="$KtNavbar.toggle(false)">Set to Wide</KtButton>
	<KtButton @click="$KtNavbar.toggle()">isNarrow: {{$KtNavbar.isNarrow}}</KtButton>
</div>

You can control the isNarrow globally via `$KtNavbar.toggle(value)` function.

You can get the value of narrow navbar via `$KtNavbar.isNarrow`

```html
<KtButton @click="$KtNavbar.toggle(true)">Set to Narrow</KtButton>
<KtButton @click="$KtNavbar.toggle(false)">Set to Wide</KtButton>
<KtButton @click="$KtNavbar.toggle()">Toggle</KtButton>
<h2>Navbar is narrow: {{$KtNavbar.isNarrow}}</h2>
```

## Usage

### Attribuites

| Attribute            | Description                            | Type      | Accepted values        | Default |
|:---------------------|:---------------------------------------|:----------|:-----------------------|:--------|
| `$KtNavbar.isNarrow` | define navbar is narrow                | `Boolean` | -                      | `false` |
| `labelText`          | using text when logoUrl is not defined | `String`  | -                      | -       |
| `notification`       | notification section of the navbar     | `Arrary`  | See above Notification | -       |
| `sections`           | menu section of the navbar             | `Arrary`  | See above Menu         | -       |
| `quickLinks`         | quick link section of the navbar       | `Arrary`  | See above Quick Links  | -       |

### Events

| Event Name   | Type    | Payload  | Description                  |
|:-------------|:--------|:---------|:-----------------------------|
| `@logoClick` | `$emit` | `$event` | navbar logo was clicked      |
| `@linkClick` | `$emit` | `$event` | navbar menu link was clicked |

### Slots

| Slot Name       | Description              |
|:----------------|:-------------------------|
| `navbar-footer` | footer section of navbar |

</template>
