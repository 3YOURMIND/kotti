<template lang="md">
# NavBar
<a href="/examples/layouts">
	<button class="primary">Check The Example</button>
</a>

```html
<div class="d-flex responsive">
	<KtNavbar src="https://picsum.photos/200/60" :menu="menuData"/>
	<Actionbar />
	<div class="workspace">
		Workspace Content
	</div>
</div>
```

```json
menuData: [{
		to: 'navbar-example/',
		label: 'Navbar',
		icon: 'dashboard',
	},
	{
		to: 'components/navbar',
		label: 'Component',
		icon: 'layer',
	},
	{
		to: 'components/navbar',
		label: 'Calendar',
		icon: 'calendar',
	}]
```

## Usage

### Attribuites

| Attribute    | Description                             | Type             | Accepted values | Default |
|:-------------|:----------------------------------------|:-----------------|:----------------|:--------|
| `src`        | logo image src                          | `String`         | —               | —       |
| `isNarrow`   | define navbar is narrow                 | `Bolean`         | —               | `false` |
| `menu`       | menu of the navbar|`Arrary`             | -                | -               |         |
| `menu.lable` | menu lable text|`String`                | -                | -               |         |
| `menu.icon`  | menu icon|`String`                      | String from yoco | -               |         |
| `menu.to`    | router link to|`String`                 | -                | -               |         |
| `menu.exact` | enable router link exact match|`Bolean` | -|`false`        |                 |         |

### Events

| Event Name                   | Type    | Payload  | Description                 |
|:-----------------------------|:--------|:---------|:----------------------------|
| `@toggleKtNavbarNarrowEvent` | `$emit` | `Bolean` | toggle the navbar to narrow |

### Slots

| Slot Name       | Description              |
|:----------------|:-------------------------|
| `navbar-header` | header section of navbar |
| `navbar-body`   | body section of navbar   |
| `navbar-footer` | footer section of navbar |

</template>
