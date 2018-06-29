<template lang=md>

# Select

## Default

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value1"
		:options="words"/>
	<h5 v-text="`English: ${value1}`" class="mt-16px"/>
</div>

## Allow Empty

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value2"
		allowEmpty
		:options="words"/>
	<h5 v-text="`English: ${value2}`" class="mt-16px"/>
</div>

## Filterable

<div class="element-example">
	<KtSelect label="Words"
		placeholder="Select Word"
		v-model="value3"
		filterable
		allowEmpty
		:options="words"/>
	<h5 v-text="`English: ${value3}`" class="mt-16px"/>
</div>

```js
{
	words: [
		{
			label: '西瓜',
			value: 'Watermelon',
		},
		{
			label: '香蕉',
			value: 'Bananna',
		},
		{
			label: '鳄梨',
			value: 'Avacados',
		},
		{
			label: '苹果',
			value: 'Apple',
		},
	],
}
```



</template>


<script>
import KtSelect from '../../../packages/kotti-single-select'

export default {
	name: 'KtSelectDoc',
	components: {
		KtSelect,
	},
	data() {
		return {
			value1: '',
			value2: 'Avacados',
			value3: 'Avacados',
			words: [
				{
					label: 'Empty',
					value: null,
				},
				{
					label: '西瓜',
					value: 'Watermelon',
				},
				{
					label: '香蕉',
					value: 'Bananna',
					disabled: true,
				},
				{
					label: '鳄梨',
					value: 'Avacados',
				},
				{
					label: '苹果',
					value: 'Apple',
				},
			],
		}
	},
}
</script>
