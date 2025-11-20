<template>
	<div class="inline-container" :style="containerStyle">
		<li
			v-if="showFirstPage"
			:class="paginatorClasses(1)"
			@click="$emit('update:page', 1)"
			v-text="1"
		/>
		<li
			v-if="showLeftDots"
			class="c-auto-important kt-pagination__page-item"
			v-text="'…'"
		/>
		<li
			v-for="page in neighborValues"
			:key="page"
			:class="paginatorClasses(page)"
			@click="$emit('update:page', page)"
			v-text="page"
		/>
		<li
			v-if="showRightDots"
			class="c-auto-important kt-pagination__page-item"
			v-text="'…'"
		/>
		<li
			v-if="showLastPage"
			:class="paginatorClasses(maximumPage)"
			@click="$emit('update:page', maximumPage)"
			v-text="maximumPage"
		/>
	</div>
</template>

<script lang="ts">
import range from 'lodash/range.js'
import { computed, defineComponent, type PropType } from 'vue'

const ADJACENT_MULTIPLIER = 20
const BASE_NUMBER_WIDTH = 24.5
const BASE_OFFSET = 3
const MAX_NUMBER_OF_ELEMENTS = 5
const PIXEL_MULTIPLIER = 2.8

export default defineComponent({
	name: 'PaginationFlexible',
	props: {
		adjacentAmount: { required: true, type: Number },
		currentPage: { required: true, type: Number },
		fixedWidth: { required: true, type: Boolean },
		maximumPage: { default: null, type: Number as PropType<number | null> },
	},
	emits: ['update:page'],
	setup(props) {
		const pixelMargin = computed(() => {
			const widestDigit =
				props.maximumPage ?? props.currentPage + props.adjacentAmount
			const digitWidth = widestDigit.toString().length - 1
			const numberWidth = BASE_NUMBER_WIDTH + digitWidth * PIXEL_MULTIPLIER
			const baseElementsWidth =
				(2 * props.adjacentAmount + MAX_NUMBER_OF_ELEMENTS) * numberWidth
			const adjacentPagesOffset = props.adjacentAmount * ADJACENT_MULTIPLIER
			return baseElementsWidth + BASE_OFFSET * 2 + adjacentPagesOffset
		})

		/**
		 * Adjusts the page range to eliminate single-page gaps between the first/last page and the ellipsis.
		 * This function effectively "closes the gap" when the range of pages around the current page
		 * is just one page away from either the first page (page 1) or the last page.
		 *
		 * For example, this pagination state: 1 … 3 4 5 6 7 … 9
		 * becomes:                            1 2 3 4 5 6 7 8 9
		 *
		 * @param start The starting page number of the range.
		 * @param end The ending page number of the range.
		 * @param maximumPage The total number of pages available.
		 * @returns A new, "cleaned" array of page numbers.
		 */
		const getCleanRange = (start: number, end: number) => {
			const { maximumPage } = props
			const cleanStart = start - 2 <= 1 ? 1 : start
			const cleanEnd =
				maximumPage !== null && maximumPage - 2 <= end ? maximumPage : end
			return range(cleanStart, cleanEnd + 1)
		}

		const neighborValues = computed(() => {
			const start = Math.max(1, props.currentPage - props.adjacentAmount)
			const end = Math.min(
				props.maximumPage ?? Number.MAX_SAFE_INTEGER,
				props.currentPage + props.adjacentAmount,
			)
			return getCleanRange(start, end)
		})

		const showFirstPage = computed(() => !neighborValues.value.includes(1))
		const showLastPage = computed(
			() =>
				props.maximumPage !== null &&
				!neighborValues.value.includes(props.maximumPage),
		)

		return {
			containerStyle: computed(
				() => props.fixedWidth && { width: `${pixelMargin.value}px` },
			),
			neighborValues,
			paginatorClasses: (page: number) => ({
				'kt-pagination__page-item': true,
				'kt-pagination__page-item--is-active': props.currentPage === page,
			}),
			showFirstPage,
			showLastPage,
			showLeftDots: computed(
				() => showFirstPage.value && !neighborValues.value.includes(2),
			),
			showRightDots: computed(
				() =>
					props.maximumPage === null ||
					(showLastPage.value &&
						!neighborValues.value.includes(props.maximumPage - 1)),
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.inline-container {
	display: inline-flex;
	justify-content: center;
}
</style>
