<template lang="md">
# Input Number

Input Number is an input field which only supports the `Number` type.

## Basic Usage

<div class="element-example white">
	<KtInputNumber v-model="number1" />
	<pre v-text="`value: ${number1}`"/>
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
	<KtInputNumber v-model="number4" showMaxNumber :max="12" />
</div>

When `max` attribute has a value, and `showMaxNumber` is `true`, the max number shows beside the value.

```html
<KtInputNumber v-model="number4" showMaxNumber :max="12" />
```


### Full width

<div class="element-example white">
	<KtInputNumber v-model="number4" :max="12" />
	<KtInputNumber v-model="number4" fullWidth :max="12" />
</div>

You can use `fullWidth` to set the width of input to 100%.

```html
<KtInputNumber v-model="number4" :max="12" />
<KtInputNumber v-model="number4" fullWidth :max="12" />
```
</template>
<script>
/* eslint-disable prettier/prettier */
export default {
	name: 'KtInputNumberDoc',
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
