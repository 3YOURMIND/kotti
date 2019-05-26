<template lang="md">

# Checkbox

## Basic usage

The `KtCheckbox` component requires the `v-model` and `label` properties.
The 'color' property is optional, if set it will pass the color code to the '<i>' element.
Other arguments (e.g. `name`) get directly passed to the `<input>` element.

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
		I agree to the <a href="https://3yourmind.com">Terms of usage</a>
	</KtCheckbox>
</div>
```
<div class="element-example">
	<KtCheckbox v-model="value2">
		I agree to the <a href="https://3yourmind.com">Terms of usage</a>
	</KtCheckbox>
	<h4>Value: {{value2}}</h4>
</div>

Example of using the required field:

<div class="element-example">
	<KtCheckbox v-model="value3" required label="i am required"/>
	<h4>Value: {{value3}}</h4>
</div>

```html
<div class="element-example">
	<KtCheckbox v-model="value3" required label="i am required"/>
	<h4>Value: {{value3}}</h4>
</div>
```

With color:

<div class="element-example">
	<KtCheckbox v-model="value1" label="With color" color="#FFD600"/>
	<h4>Value: {{value1}}</h4>
</div>

```html
<div class="element-example">
	<KtCheckbox v-model="value1" label="With color" color="#FFD600"/>
</div>
```

## Properties

| Attribute | Description                                      | Type      | Accepted values | Default |
|:----------|:-------------------------------------------------|:----------|:----------------|:--------|
| `color`   | Color for the checkmark                          | `string`  | any css color   | —       |
| `label`   | label input field                                | `string`  | —               | —       |
| `name`    | name attribute for the field                     | `string`  | —               | —       |
| `required`| required                                         | `boolean` | `true`, `false` | `false` |
| `value`   | value                                            | `boolean` | `true`, `false` | `false` |
| `$attrs`  | Other attributes are added directly to the input | `any`     | `any`           | —       |
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
