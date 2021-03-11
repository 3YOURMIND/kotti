<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Basic
<div class="element-example white">
	<KtInlineEdit
		label="Picture Title"
		placeholder="Give a title"
		invalidMessage="Click to change the title"
		v-model="value1"
		@confirm="showAlert('Confirmed Function')"
		@dismiss="showAlert('Dismissed Function')"
		class="mb-16px"
	/>
	<img src="https://picsum.photos/800/200"/>
</div>

```html
<KtInlineEdit
	label="Picture Title"
	placeholder="this holder"
	invalidMessage="Click to change the title"
	v-model="value1"
	@confirm="showAlert('Confirmed Function')"
	@dismiss="showAlert('Dismissed Function')"
	class="mb-16px"
/>
<img src="https://picsum.photos/800/200"/>
```

## Usage

### Attributes

| Attribute        | Description                      | Type      | Accepted values | Default           |
|:-----------------|:---------------------------------|:----------|:----------------|:------------------|
| `invalidMessage` | message                          | `String`  | —               | `"Click to edit"` |
| `label`          | label text                       | `String`  | —               | —                 |
| `value`          | value of message and input value | `v-model` | —               | —                 |
| `multiline`      | allow input enter multilines     | `Boolean` | —               | `false`           |

### Input Events

| Event Name | Description                       | Parameters       |
|:-----------|:----------------------------------|:-----------------|
| `change`   | triggers when input value changes | `(event: Event)` |

### Button Events

| Event Name | Description                          | Parameters       |
|:-----------|:-------------------------------------|:-----------------|
| `confirm`  | triggers when confirm button clicked | `(event: Event)` |
| `dismiss`  | triggers when dismiss button clicked | `(event: Event)` |

</template>

<script lang="ts">
import { KtInlineEdit } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsInlineEdit',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtInlineEdit,
			showAlert: (message: string) => window.alert(message),
			value1: ref(''),
		}
	},
})
</script>
