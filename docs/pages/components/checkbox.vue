<template lang="md">

# Checkbox

## Basic usage

The `KtCheckbox` component needs a `v-model` and a `label` props. An optional `name` can be used.

```html
<div class="element-example">
	<KtCheckbox v-model="value1" label="Will you give everything up for kotti?" />
</div>
```

<div class="element-example">
	<KtCheckbox v-model="value1" label="Will you give everything up for kotti?" />
	<h4>Value: {{value1}}</h4>
</div>

We can also specify the label as a default scope:

```html
<div class="element-example">
	<KtCheckbox v-model="value2">
		I agree to the <a href="http://google.com">Terms of usage</a>
	</KtCheckbox>
</div>
```
<div class="element-example">
	<KtCheckbox v-model="value2">
		I agree to the <a href="http://google.com">Terms of usage</a>
	</KtCheckbox>
		<h4>Value: {{value2}}</h4>
</div>

## Properties

| Attribute            | Description                            | Type      | Accepted values | Default |
|:---------------------|:---------------------------------------|:----------|:----------------|:--------|
| `label`              | label input field                      | `String`  | —               | —       |
| `name`               | name attribute for the field           | `String`  | —               | -       |
| `value`              | initial value (handled by `v-model`)   | `Boolean` | —               | `false` |


</template>

<script>
export default {
	name: 'KtCheckboxDoc',
	data() {
		return {
			value1: true,
			value2: false,
		}
	},
}
</script>
