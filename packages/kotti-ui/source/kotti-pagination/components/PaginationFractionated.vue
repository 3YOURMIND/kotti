<template>
	<li class="kt-pagination__fractionated" v-text="fractionRep" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent<{
	currentPage: number
	maximumPage: number
}>({
	name: 'PaginationFractionated',
	props: {
		currentPage: { type: Number, required: true },
		maximumPage: { type: Number, required: true },
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
