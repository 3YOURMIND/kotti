<template lang="md">
<ComponentInfo v-bind="{ component }" />

A toaster is a small message shown in the upper right corner of the screen, which disappears after few seconds.

Toasters can deliver messages that the user needs to pay attention to without interrupting their current workflow. Using banners is a better solution, when the message is important and shouldn't automatically disappear without the user taking action.

## Structure

![Toaster Structure](~/assets/img/toaster_structure.png)

1. Type Color: Depends on the type of toaster. There are three colors:

   - `Green-500`: for success information
   - `Orange-500`: for warning message
   - `Red-500`: for fail/alert message

2. Message: Keep the message short and easy to understand, since the toaster disappears automatically after a few seconds.

3. Close Button: Allows the user to dismiss this message.

## Usage

Since `Kotti-UI 1.0.0`, [vue-yodify](https://github.com/3YOURMIND/vue-yodify) is merged into Kotti-UI as `KtToaster`.

<div class="element-example">
	<KtToaster/>
	<KtButton
		@click="$yodify({ text: 'Wow very looooooooooooong text, and it breaks the line!', type: 'success' })"
		v-text="'Success Long Message'"
	/>
	<KtButton
		@click="$yodify({ text: 'Error message', type: 'error' })"
		v-text="'Error Message'"
	/>
	<KtButton
		@click="$yodify({ text: 'Warning message', type: 'warning' })"
		v-text="'Warning Message'"
	/>
</div>

You should include `KtToaster` as global component in your Vue application.

```html
<!-- for example in app.vue -->
<div id="app">
	<KtToaster />
	<router-view />
</div>
```

After registering the component you can call it globally by using the Vue instance in the script part of a component.

```js
this.$yodify({
	text: 'This was successful :)',
	type: 'success', // optional, default
	duration: 3000, // optional, default
})
```

### Attributes

| Attribute  | Description                                 | Type     | Accepted values               | Default   |
| :--------- | :------------------------------------------ | :------- | :---------------------------- | :-------- |
| `duration` | duration after which the toaster disappears | `Number` | —                             | `3000`    |
| `text`     | text message in the toaster                 | `String` | —                             | —         |
| `type`     | define the type of the toaster              | `String` | `success`, `error`, `warning` | `success` |
</template>

<script lang="ts">
import { KtToaster } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'KtToasterDoc',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtToaster,
		}
	},
})
</script>
