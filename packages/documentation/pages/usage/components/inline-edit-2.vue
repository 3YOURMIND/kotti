<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Basic

<div class="element-example white">
	<KtInlineEdit2
		label="Instructions"
		placeholder="Click to edit"
		value="my instructions"
	/>
</div>

```html
<KtInlineEdit2
	label="Instructions"
	placeholder="Click to edit"
	value="my instructions"
/>
```

## Multiline

<div class="element-example white">
	<KtInlineEdit2
		isMultiLine
		label="Instructions"
		placeholder="Edit instructions"
		value="my instructions"
	/>
</div>

```html
<KtInlineEdit2
	isMultiLine
	label="Instructions"
	placeholder="Edit instructions"
	value="my instructions"
/>
```

## Usage

### Attributes

| Attribute     | Description                  | Type      | Accepted values | Default           |
| :------------ | :--------------------------- | :-------- | :-------------- | :---------------- |
| `isMultiLine` | allow input enter multilines | `Boolean` | —               | `false`           |
| `label`       | label text                   | `String`  | —               | `null`            |
| `placeholder` | value to display             | `String`  | —               | `"Click to edit"` |

### Input Events

| Event Name | Description                       | Parameters       |
| :--------- | :-------------------------------- | :--------------- |
| `change`   | triggers when click outside input | `(event: Event)` |
| `input`    | triggers when input value changes | `(event: Event)` |

### Button Events

| Event Name | Description                          | Parameters       |
| :--------- | :----------------------------------- | :--------------- |
| `confirm`  | triggers when confirm button clicked | --               |
| `dismiss`  | triggers when dismiss button clicked | `(event: Event)` |
</template>

<script lang="ts">
import { KtInlineEdit2 } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsInlineEdit2',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtInlineEdit2,
		}
	},
})
</script>
