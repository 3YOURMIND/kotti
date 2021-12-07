<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Basic

<div class="element-example white">
	<KtInlineEdit2
		label="Instructions"
		placeholder="Click to edit"
		invalidMessage="Click to change instructions"
		value="be careful, it's fragile"
	/>
</div>

```html
<KtInlineEdit2
	label="Picture Title"
	placeholder="Give a title"
	invalidMessage="Click to change the title"
	value="value1"
	class="mb-16px"
/>
```

## Usage

### Attributes

| Attribute        | Description                  | Type      | Accepted values | Default           |
| :--------------- | :--------------------------- | :-------- | :-------------- | :---------------- |
| `invalidMessage` | message                      | `String`  | —               | `"Click to edit"` |
| `label`          | label text                   | `String`  | —               | —                 |
| `placeholder`    | value to display             | `String`  | —               | —                 |
| `isMultiLine`    | allow input enter multilines | `Boolean` | —               | `false`           |

### Input Events

| Event Name | Description                       | Parameters       |
| :--------- | :-------------------------------- | :--------------- |
| `input`    | triggers when input value changes | `(event: Event)` |

### Button Events

| Event Name | Description                          | Parameters       |
| :--------- | :----------------------------------- | :--------------- |
| `confirm`  | triggers when confirm button clicked | `(event: Event)` |
| `dismiss`  | triggers when dismiss button clicked | `(event: Event)` |
</template>

<script lang="ts">
import { KtInlineEdit2 } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsInlineEdit2',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtInlineEdit2,
			// showAlert: (message: string) => window.alert(message),
			value1: ref(''),
		}
	},
})
</script>
