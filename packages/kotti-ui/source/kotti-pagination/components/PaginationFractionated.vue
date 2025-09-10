<template>
	<li class="kt-pagination__fractionated" v-text="fractionRep" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { validateTotalIsNumber } from '../utils'

export default defineComponent<{
	currentPage: number
	maximumPage: number
}>({
	name: 'PaginationFractionated',
	props: {
		currentPage: { required: true, type: Number },
		maximumPage: {
			required: true,
			type: Number,
			validator: validateTotalIsNumber,
		},
	},
	setup(props) {
		return {
			fractionRep: computed(
				() => `${props.currentPage} / ${props.maximumPage}`,
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-pagination__fractionated {
	display: inline-block;
}
</style>
