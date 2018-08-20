<template lang="md">
# Input Number

Input Number is a input field only supports number type.

## Basic Usage

<div class="element-example white">
	<KtInputNumber v-model="number1" />

	Value: {{number1}}
</div>

Bind a vairable to `v-model` in `<KtInputNumber>`.

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

`step` value is specifying the step amount which is `1` by default.

```html
<KtInputNumber v-model="number2" :max="12" :min="0" :step="0.2" />
```

### Disabled

<div class="element-example white">
	<KtInputNumber v-model="number3" disabled />
</div>

When `disabled` attribute is `true`, user cannot change the value.

```html
<KtInputNumber v-model="number3" disabled />
```

## Style

### Show Max Number

<div class="element-example white">
	<KtInputNumber v-model="number4" showMaxNumber :max="12" />
</div>

When `max` attribute has value, and `showMaxNumber` is `true`, the max number shows beside the value.

```html
<KtInputNumber v-model="number4" showMaxNumber :max="12" />
```


### Full width

<div class="element-example white">
	<KtInputNumber v-model="number4" :max="12" />
	<KtInputNumber v-model="number4" fullWidth :max="12" />
</div>

You can specify the width of input, all using `fullWidth` to set the width of input to 100%.

```html
<KtInputNumber v-model="number4" :max="12" />
<KtInputNumber v-model="number4" fullWidth :max="12" />
```



</template>


<script>
import KtInputNumber from '../../../packages/kotti-input-number'
export default {
	name: 'KtInputNumberDoc',
	components: {
		KtInputNumber,
	},
	data() {
		return {
			number1: 12,
			number2: 0,
			number3: 0,
			number4: 0,
		}
	},
}
</script>
