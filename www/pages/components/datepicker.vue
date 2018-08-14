<template lang="md">

# Date Picker

<div class="element-example">
	<KtDatePicker v-model="date1" placeholder="Choose a date" mondayFirst/>
	{{date1}}
</div>

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
