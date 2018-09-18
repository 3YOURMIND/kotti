<template lang="md">

# Action Bar

<nuxt-link to="/examples/layouts">
	<button class="primary">Show Layout Example</button>
</nuxt-link>

```html
<KtActionbar
	slot="actionbar"
	headerTitle="KtContainer Example"
	:menuStyle="menuStyle"
	:menu="menu"
/>
```

```js
menuStyle: {
	defaultItemInMobile: 5,
	iconPosition: 'left',
},
menu: [
	{
		label: 'First Link',
		to: '/examples/layouts',
		icon: 'user',
		active: false,
		disabled: false,
	},
	{
		label: 'Second Link',
		to: 'https://google.com',
		icon: 'basket',
		active: true,
	},
	{
		label: 'Third Link',
		to: '/',
		icon: 'bell',
		disabled: true,
	},
],
```

</template>
