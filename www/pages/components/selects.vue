<template lang=md>

# Select


<div class="element-example">
<KtSelect label="Words" placeholder="Select Word" v-model="value" filterable :options="words"/>
<h4 v-text="`English: ${value}`" class="mt-16px"/>
</div>


</template>


<script>
import KtSelect from '../../../packages/kotti-single-select';

export default {
	name: 'KtSelectDoc',
	components: {
		KtSelect,
	},
	data() {
		return {
			value: 'Watermelon',
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
		};
	},
};
</script>
