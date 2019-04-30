<template>
	<div class="inline-container">
		<li
			v-if="showFirstPage"
			v-text="humanReadablePageNumber(0)"
			:class="paginatorClasses(0, 'page-item--active')"
			@click="$emit('setPage', 0)"
		/>
		<li v-if="showLeftDots" v-text="'...'" class="c-auto-important page-item" />
		<li
			v-for="(page, index) in neighborValues"
			:key="index"
			:class="paginatorClasses(page, 'page-item--active')"
			v-text="humanReadablePageNumber(page)"
			@click="$emit('setPage', page)"
		/>
		<li
			v-if="showRightDots"
			v-text="'...'"
			class="c-auto-important page-item"
		/>
		<li
			v-if="showLastPage"
			v-text="humanReadablePageNumber(maximumPage)"
			:class="paginatorClasses(maximumPage, 'page-item--active')"
			@click="$emit('setPage', maximumPage)"
		/>
	</div>
</template>

<script>
export default {
	name: 'ContractedPaginator',
	props: {
		adjacentAmount: { type: Number, required: true },
		currentPage: { type: Number, required: true },
		maximumPage: { type: Number, required: true },
	},
	methods: {
		paginatorClasses(page, className) {
			return {
				'page-item': true,
				[className]: this.currentPage === page,
			}
		},
		humanReadablePageNumber(page) {
			return page + 1
		},
	},
	computed: {
		showFirstPage() {
			return !this.neighborValues.includes(0)
		},
		showLeftDots() {
			return this.showFirstPage && !this.neighborValues.includes(1)
		},
		showRightDots() {
			return (
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
				else if (canJumpRight) max += 1
				else break

				if (canJumpRight) max += 1
				else if (canJumpLeft) min -= 1
				else break
			}

			const values = []
			for (let i = min; i <= max; i++) values.push(i)
			return values
		},
	},
}
</script>

<style lang="scss" scoped>
.inline-container {
	display: inline-flex;
}
</style>
