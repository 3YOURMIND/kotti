<template lang="md">

# Container

<nuxt-link to="/examples/layouts">
	<button class="primary">Show Layout Example</button>
</nuxt-link>

```html
<KtContainer>
	<KtNavbar slot="navbar" :menu="menuData" :theme="themeData"/>
	<KtActionbar slot="actionbar" headerTitle="KtContainer Example"/>
	<div slot="workspace">
		KtContainer Content
	</div>
</KtContainer>
```

## Usage

### Slots

| Slot Name   | Description       |
|:------------|:------------------|
| `navbar`    | navbar section    |
| `actionbar` | actionbar section |
| `workspace` | workspace section |
</template>
