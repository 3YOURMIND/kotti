<template lang="md">

# Container

<nuxt-link to="/examples/layouts">
	<button class="primary">Show Layout Example</button>
</nuxt-link>

```html
<KtContainer hasActionBar>
	<KtNavbar slot="navbar" :menu="menuData" :theme="themeData"/>
	<KtActionbar slot="actionbar" headerTitle="KtContainer Example"/>
	<div slot="workspace">
		KtContainer Conetent
	</div>
</KtContainer>
```


## Usage

### Attribuites

| Attribute      | Description            | Type      | Accepted values | Default |
|:---------------|:-----------------------|:----------|:----------------|:--------|
| `hasActionBar` | show or hide actionbar | `Boolean` | —               | `false` |

### Slots

| Slot Name   | Description       |
|:------------|:------------------|
| `navbar`    | navbar section    |
| `actionbar` | actionbar section |
| `workspace` | workspace section |

</template>
