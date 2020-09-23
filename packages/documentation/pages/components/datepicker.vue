<template lang="md">
<ComponentInfo title="Date Picker" :meta="meta" />

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
		:initialValue="new Date()"
	/>
	{{ date }}
</div>

```html
<KtDateInput
		v-model="date2"
		label="Delivery Date"
		mondayFirst
		placeholder="Choose a date"
		:initialValue="new Date()"
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

<script lang="ts">
import { KtDateInput } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsDatepicker',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			date: ref(null),
			date2: ref(null),
			date3: ref(null),
			date4: ref(null),
			meta: KtDateInput.meta,
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
})
</script>
