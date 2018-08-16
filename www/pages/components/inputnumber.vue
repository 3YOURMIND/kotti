<template>
<div class="element-example white">
	<kt-input-number v-model="number"/>
	{{number}}
</div>
</template>


<script>
import KtInputNumber from '../../../packages/kotti-input-number'
export default {
	name: 'KtInputNumberDoc',
	components: {
		KtInputNumber,
	},
	data() {
		return {
			number: null,
		}
	},
}
</script>
