<template lang="md">
<ComponentInfo title="Input Number" :meta="meta" />

## Basic Usage

<div class="element-example white">
	<KtInputNumber v-model="number1" />
	<pre v-text="`value: ${number1}`" />
</div>

Bind a variable to `v-model` in `KtInputNumber`.

```html
<KtInputNumber v-model="number1" />
```

### Range and Step

<div class="element-example white">
	<KtInputNumber
		v-model="number2"
		:max="12"
		:min="0"
		:step="0.2"
	/>
</div>

You can use the `min` and `max` attributes to specify a minimum and maximum value.

The `step` value specifies the step amount, which is `1` by default.

```html
<KtInputNumber v-model="number2" :max="12" :min="0" :step="0.2" />
```

### Disabled

<div class="element-example white">
	<KtInputNumber v-model="number3" disabled />
</div>

When the `disabled` attribute is `true`, the user cannot change the value.

```html
<KtInputNumber v-model="number3" disabled />
```

## Style

### Show Max Number

<div class="element-example white">
	<KtInputNumber v-model="number4" showMaxNumber :min="0" :max="12" />
</div>

When `max` attribute has a value, and `showMaxNumber` is `true`, the max number shows beside the value.

```html
<KtInputNumber v-model="number4" showMaxNumber :min="0" :max="12" />
```

### Null Value

if the bound value is `null` or if the user clears the input (making the internal value we track null),
both increment/decrement buttons will be enabled but clicking them will initialize the inputNumber to `0`.

Thus, note that if the bound value is `null` or the input is an empty string, the min/max range checks are disregarded
until the user inputs an actual value or tries to decrement/increment,
after which the component behaves as in the above examples.

<div class="element-example white">
	<KtInputNumber v-model="number5" :step="1" :min="0" :max="12" />
</div>

When `max` attribute has a value, and `showMaxNumber` is `true`, the max number shows beside the value.

```html
<KtInputNumber v-model="number5" :step="1" :min="0" :max="12" />
```
</template>

<script lang="ts">
import { KtInputNumber } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsInputNumber',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			meta: KtInputNumber.meta,
			// eslint-disable-next-line no-magic-numbers
			number1: ref(12),
			number2: ref(0),
			number3: ref(0),
			number4: ref(0),
			number5: ref(null),
		}
	},
})
</script>
