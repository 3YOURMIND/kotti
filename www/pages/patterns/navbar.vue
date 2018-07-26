<template lang="md">
# NavBar
<a href="/examples/layouts">
	<button class="primary">Check The Example</button>
</a>

```html
<div class="d-flex responsive">
	<KtNavbar theme="themeData" :menu="menuData"/>
	<Actionbar />
	<div class="workspace">
		Workspace Content
	</div>
</div>
```

```js
{
	menuData: [
		{ to: 'navbar-example/',   label: 'Navbar',    icon: 'dashboard' },
		{ to: 'components/navbar', label: 'Component', icon: 'layer' },
		{ to: 'components/navbar', label: 'Calendar',  icon: 'calendar' }
	],
	themeData: {
		logoUrl: https://picsum.photos/200/60
	}
}
```

## Usage

### Attribuites

| Attribute       | Description                    | Type      | Accepted values  | Default |
|:----------------|:-------------------------------|:----------|:-----------------|:--------|
| `isNarrow`      | define navbar is narrow        | `Boolean` | —                | `false` |
| `menu`          | menu of the navbar             | `Arrary`  | —                | —       |
| `menu.exact`    | enable router link exact match | `Bolean`  | `false`          | —       |
| `menu.icon`     | menu icon                      | `String`  | String from yoco | —       |
| `menu.lable`    | menu lable text                | `String`  | —                | —       |
| `menu.to`       | router link to                 | `String`  | —                | —       |
| `theme`         | kotti theme                    | `Object`  | —                | `{}`    |
| `theme.logoUrl` | navbar logo url                | `String`  | `''`             | `null`  |

### Events

| Event Name                   | Type    | Payload   | Description                 |
|:-----------------------------|:--------|:----------|:----------------------------|
| `@toggleKtNavbarNarrowEvent` | `$emit` | `Boolean` | toggle the navbar to narrow |

### Slots

| Slot Name       | Description              |
|:----------------|:-------------------------|
| `navbar-header` | header section of navbar |
| `navbar-body`   | body section of navbar   |
| `navbar-footer` | footer section of navbar |

</template>
