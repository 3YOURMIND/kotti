<template>
	<div class="kt-pagination__inline-container" :style="containerStyle">
		<li
			v-if="showFirstPage"
			:class="paginatorClasses(0)"
			@click="$emit('setPage', 0)"
			v-text="humanReadablePageNumber(0)"
		/>
		<li
			v-if="showLeftDots"
			class="c-auto-important kt-pagination__page-item"
			v-text="'...'"
		/>
		<li
			v-for="(page, index) in neighborValues"
			:key="index"
			:class="paginatorClasses(page)"
			@click="$emit('setPage', page)"
			v-text="humanReadablePageNumber(page)"
		/>
		<li
			v-if="showRightDots"
			class="c-auto-important kt-pagination__page-item"
			v-text="'...'"
		/>
		<li
			v-if="showLastPage"
			:class="paginatorClasses(maximumPage)"
			@click="$emit('setPage', maximumPage)"
			v-text="humanReadablePageNumber(maximumPage)"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import range from 'lodash/range'
const ADJACENT_MULTIPLIER = 20
const BASE_NUMBER_WIDTH = 24.5
const BASE_OFFSET = 3
const MAX_NUMBER_OF_ELEMENTS = 5
const PIXEL_MULTIPLIER = 2.8

export default defineComponent<{
	adjacentAmount: number
	currentPage: number
	fixedWidth: boolean
	maximumPage: number
}>({
	name: 'PaginationFlexible',
	props: {
		adjacentAmount: { type: Number, required: true },
		currentPage: { type: Number, required: true },
		fixedWidth: { type: Boolean, required: true },
		maximumPage: { type: Number, required: true },
	},
	setup(props) {
		const pixelMargin = computed(() => {
			const digitWidth = props.maximumPage.toString().length - 1
			const numberWidth = BASE_NUMBER_WIDTH + digitWidth * PIXEL_MULTIPLIER
			const baseElementsWidth =
				(2 * props.adjacentAmount + MAX_NUMBER_OF_ELEMENTS) * numberWidth
			const adjacentPagesOffset = props.adjacentAmount * ADJACENT_MULTIPLIER
			return baseElementsWidth + BASE_OFFSET * 2 + adjacentPagesOffset
		})

		const neighborValues = computed(() => {
			const center = ((): number => {
				if (props.currentPage - props.adjacentAmount < 1)
					return props.adjacentAmount + 1
				if (props.currentPage + props.adjacentAmount > props.maximumPage - 2)
					return props.maximumPage - props.adjacentAmount - 1
				return props.currentPage
			})()
			const start = Math.max(0, center - props.adjacentAmount)
			const end = Math.min(props.maximumPage, center + props.adjacentAmount)
			return range(start, end + 1)
		})

		const showFirstPage = computed(() => !neighborValues.value.includes(0))
		const showLastPage = computed(
			() => !neighborValues.value.includes(props.maximumPage),
		)

		return {
			containerStyle: computed(
				() => props.fixedWidth && { width: `${pixelMargin.value}px` },
			),
			humanReadablePageNumber: (page: number) => page + 1,
			neighborValues,
			paginatorClasses: (page: number) => ({
				'kt-pagination__page-item': true,
				'kt-pagination__page-item--is-active': props.currentPage === page,
			}),
			showFirstPage,
			showLastPage,
			showLeftDots: computed(
				() => showFirstPage.value && !neighborValues.value.includes(1),
			),
			showRightDots: computed(
				() =>
					showLastPage.value &&
					!neighborValues.value.includes(props.maximumPage - 1),
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-pagination__inline-container {
	display: inline-flex;
	justify-content: center;
}
</style>
