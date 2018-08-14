<template lang="md">

# Date Picker

<div class="element-example">
	<KtDatePicker
		v-model="date1"
		placeholder="Choose a date"
		mondayFirst
		label="Delivery Date"
	/>
	{{date1}}
</div>

```html
<KtDatePicker
	v-model="date1"
	placeholder="Choose a date"
	mondayFirst
	label="Delivery Date"
/>
```

## Usage

### Attributes

| Attribute     | Description                        | Type      | Accepted values | Default |
|:--------------|:-----------------------------------|:----------|:----------------|:--------|
| `label`       | label input field                  | `String`  | --              | --      |
| `placeholder` | placeholder text                   | `String`  | --              | --      |
| `mondayFirst` | set Moday as first day of the week | `Boolean` | —               | `false` |



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
			date1: null,
		}
	},
}
</script>
