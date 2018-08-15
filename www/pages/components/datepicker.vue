<template lang="md">

# Date Picker

<div class="element-example">
	<KtDatePicker
		v-model="date"
		label="Delivery Date"
		mondayFirst
		placeholder="Choose a date"
	/>
	{{ date }}
</div>

```html
<KtDatePicker
	v-model="date"
	label="Delivery Date"
	mondayFirst
	placeholder="Choose a date"
/>

{{ date }}
```

## Usage

### Attributes

| Attribute     | Description                         | Type      | Accepted values | Default |
|:--------------|:------------------------------------|:----------|:----------------|:--------|
| `label`       | label input field                   | `String`  | —               | —       |
| `mondayFirst` | set Monday as first day of the week | `Boolean` | —               | `false` |
| `placeholder` | placeholder text                    | `String`  | —               | —       |
</template>

<script>
import KtDatePicker from '../../../packages/kotti-datepicker'
export default {
	name: 'DatePicker',
	components: {
		KtDatePicker,
	},
	data() {
		return {
			date: null,
		}
	},
}
</script>
