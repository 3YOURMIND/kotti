<template>
	<div class="inline-container" :style="containerStyle">
		<li
			v-if="showFirstPage"
			:class="paginatorClasses(0, 'page-item--active')"
			@click="$emit('setPage', 0)"
			v-text="humanReadablePageNumber(0)"
		/>
		<li v-if="showLeftDots" class="c-auto-important page-item" v-text="'...'" />
		<li
			v-for="(page, index) in neighborValues"
			:key="index"
			:class="paginatorClasses(page, 'page-item--active')"
			@click="$emit('setPage', page)"
			v-text="humanReadablePageNumber(page)"
		/>
		<li
			v-if="showRightDots"
			class="c-auto-important page-item"
			v-text="'...'"
		/>
		<li
			v-if="showLastPage"
			:class="paginatorClasses(maximumPage, 'page-item--active')"
			@click="$emit('setPage', maximumPage)"
			v-text="humanReadablePageNumber(maximumPage)"
		/>
	</div>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const ADJACENT_MULTIPLIER = 20
const BASE_NUMBER_WIDTH = 24.5
const BASE_OFFSET = 3
const MAX_NUMBER_OF_ELEMENTS = 5
const PIXEL_MULTIPLIER = 2.8

export default {
	name: 'PaginationFlexible',
	props: {
		adjacentAmount: { type: Number, required: true },
		currentPage: { type: Number, required: true },
		fixedWidth: { type: Boolean, required: true },
		maximumPage: { type: Number, required: true },
	},
	emits: ['setPage'],
	computed: {
		pixelMargin() {
			const digitWidth = this.maximumPage.toString().length - 1
			const numberWidth = BASE_NUMBER_WIDTH + digitWidth * PIXEL_MULTIPLIER
			const baseElementsWidth =
				(2 * this.adjacentAmount + MAX_NUMBER_OF_ELEMENTS) * numberWidth
			const adjacentPagesOffset = this.adjacentAmount * ADJACENT_MULTIPLIER
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			return baseElementsWidth + BASE_OFFSET * 2 + adjacentPagesOffset
		},
		containerStyle() {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			return this.fixedWidth ? { width: `${String(this.pixelMargin)}px` } : {}
		},
		showFirstPage() {
			return !this.neighborValues.includes(0)
		},
		showLeftDots() {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			return this.showFirstPage && !this.neighborValues.includes(1)
		},
		showRightDots() {
			return (
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				this.showLastPage && !this.neighborValues.includes(this.maximumPage - 1)
			)
		},
		showLastPage() {
			return !this.neighborValues.includes(this.maximumPage)
		},
		neighborValues() {
			let min = this.currentPage
			let max = this.currentPage

			for (let i = 0; i < this.adjacentAmount; i++) {
				const canJumpLeft = min > 0
				const canJumpRight = max < this.maximumPage

				if (canJumpLeft) min -= 1
				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				else if (canJumpRight) max += 1
				else break

				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				if (canJumpRight) max += 1
				else if (canJumpLeft) min -= 1
				else break
			}

			const values = []
			for (let i = min; i <= max; i++) values.push(i)

			/**
			 * Snippet to reduce width variations around edges
			 */
			if (this.currentPage >= this.maximumPage - this.adjacentAmount)
				values.unshift(this.maximumPage - 2 * this.adjacentAmount - 1)
			if (this.currentPage <= this.adjacentAmount)
				values.push(2 * this.adjacentAmount + 1)

			return values
		},
	},
	methods: {
		paginatorClasses(page, className) {
			return {
				'page-item': true,
				[className]: this.currentPage === page,
			}
		},
		humanReadablePageNumber(page) {
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			return page + 1
		},
	},
}
</script>

<style lang="scss" scoped>
.inline-container {
	display: inline-flex;
	justify-content: center;
}
</style>
