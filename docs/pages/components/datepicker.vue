<template lang="md">

# Date Picker

<div class="element-example">
	<KtDateInput
		v-model="date"
		label="Delivery Date"
		mondayFirst
		placeholder="Choose a date"
	/>
	{{ date }}
</div>

```html
<KtDateInput
	v-model="date"
	label="Delivery Date"
	mondayFirst
	placeholder="Choose a date"
/>
```

<div class="element-example">
	<h2>With Initial Value</h2>
	<KtDateInput
		v-model="date2"
		label="Delivery Date"
		mondayFirst
		placeholder="Choose a date"
	/>
	{{ date2 }}
</div>

```html
<KtDateInput
		v-model="date2"
		label="Delivery Date"
		mondayFirst
		placeholder="Choose a date"
/>
```

<div class="element-example">
	<h2>With Translation</h2>
	<KtDateInput
		v-model="date3"
		label="配送日期"
		:monthsTranslations="monthCN"
		:daysTranslations="dayCN"
		placeholder="选择日期"
	/>
	{{ date2 }}
</div>

```html
<KtDateInput
	v-model="date3"
	label="配送日期"
	:monthsTranslations="monthCN"
	:daysTranslations="dayCN"
	placeholder="选择日期"
/>
```

<div class="element-example">
	<h2>With Required Flag</h2>
	<KtDateInput
		v-model="date4"
		label="Delivery Date"
		required
		placeholder="Choose a date"
	/>
	{{ date4 }}
</div>

```html
<KtDateInput
	v-model="date4"
	label="Delivery Date"
	required
	placeholder="Choose a date"
/>
```

## Usage

### Attributes

| Attribute            | Description                            | Type      | Accepted values | Default |
|:---------------------|:---------------------------------------|:----------|:----------------|:--------|
| `label`              | label input field                      | `String`  | —               | —       |
| `mondayFirst`        | set Monday as first day of the week    | `Boolean` | —               | `false` |
| `placeholder`        | placeholder text                       | `String`  | —               | —       |
| `monthsTranslations` | translation strings for months|`Array` | —         | —               |         |
| `daysTranslations`   | translation strings for days|`Array`   | —         | —               |         |
| `required`           | sets it as a requiredf field           | `Boolean` | [true, false]   | `false` |
</template>

<script>
export default {
	name: 'DatePickerDoc',
	data() {
		return {
			date: null,
			date2: new Date(),
			date3: null,
			date4: null,
			monthCN: [
				'一月',
				'二月',
				'三月',
				'四月',
				'五月',
				'六月',
				'七月',
				'八月',
				'九月',
				'十月',
				'十一月',
				'十二月',
			],
			dayCN: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		}
	},
}
</script>
