<template lang="md">
<ComponentInfo v-bind="{ component }" />

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

<script lang="ts">
import { KtActionbar } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPagePatternsActionbar',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtActionbar,
		}
	},
})
</script>
