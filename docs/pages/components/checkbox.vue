<template lang="md">

# Checkbox

## Basic usage

The `KtCheckbox` component requires the `v-model` and `label` properties. Other arguments (e.g. `name`) get directly passed to the `<input>` element.

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

### Provide an `initialValue`

In certain cases we may wat to have a default value in case the one used by `v-model` is `undefined` (while it's retrieved for example).
We can then define `initialValue` props:
``` html
<div class="element-example">
	<KtCheckbox v-model="value3" :initialValue="true" label="Will you give everything up for kotti?" />
	<h4>Value: {{value3}}</h4>
</div>
```
<div class="element-example">
	<KtCheckbox v-model="value3" :initialValue="true" label="Will you give everything up for kotti?" />
	<h4>Value: {{value3}}</h4>
</div>
In the example above, `value3` is `undefined` and will default to `true`.

## Properties

| Attribute            | Description                                   | Type      | Accepted values | Default |
|:---------------------|:----------------------------------------------|:----------|:----------------|:--------|
| `label`              | label input field                             | `String`  | —               | —       |
| `name`               | name attribute for the field                  | `String`  | —               | —       |
| `value`              | value                                         | `Boolean` | —               | —       |
| `initialValue`       | initial value (in case `value` is not defined)| `Boolean` | —               | —       |


</template>

<script>
export default {
	name: 'KtCheckboxDoc',
	data() {
		return {
			value1: true,
			value2: false,
			value3: undefined,
		}
	},
}
</script>
