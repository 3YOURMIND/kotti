<template lang="md">
# NavBar
<nuxt-link to="/examples/layouts">
	<button class="primary">Show Layout Example</button>
</nuxt-link>

```html
<div class="d-flex responsive">
	<KtNavbar theme="themeData" :menu="menuData"/>
	<Actionbar />
	<div class="workspace">
		Workspace Content
	</div>
</div>
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

## Menu Structure

`KtNavbar` only support pre-designed menu structure.

```js
menuData: [
	{
		links: [
			{
				link: '#',
				title: 'Dashboard',
				icon: 'dashboard',
				isActive: true,
			},
		],
	},
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

## Notification

If you need notification in the `KtNavbar`, you can use `notification` props.

```js
myNotification: {
	showNotification: true,
	number: 1,
	title: 'Message',
	link: '/messages'
}
```

## Usage

### Attribuites

| Attribute    | Description                    | Type      | Accepted values  | Default |
|:-------------|:-------------------------------|:----------|:-----------------|:--------|
| `isNarrow`   | define navbar is narrow        | `Boolean` | —                | `false` |
| `menu`       | menu of the navbar             | `Arrary`  | —                | —       |
| `menu.exact` | enable router link exact match | `Bolean`  | `false`          | —       |
| `menu.icon`  | menu icon                      | `String`  | String from yoco | —       |
| `menu.lable` | menu lable text                | `String`  | —                | —       |
| `menu.to`    | router link to                 | `String`  | —                | —       |

### Events

| Event Name                   | Type    | Payload   | Description                 |
|:-----------------------------|:--------|:----------|:----------------------------|
| `@toggleKtNavbarNarrowEvent` | `$emit` | `Boolean` | toggle the navbar to narrow |
| `@clickLogo`                 | `$emit` | `Boolean` | navbar logo was clicked     |

### Slots

| Slot Name       | Description              |
|:----------------|:-------------------------|
| `navbar-header` | header section of navbar |
| `navbar-body`   | body section of navbar   |
| `navbar-footer` | footer section of navbar |

</template>
