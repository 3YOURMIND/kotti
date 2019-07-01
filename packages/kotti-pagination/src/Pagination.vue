<template>
	<div>
		<ul class="pagination">
			<li :class="paginatorClasses(0, 'disabled')" @click="previousPage">
				<i class="yoco page-button">chevron_left</i>
			</li>
			<component
				:is="component"
				v-bind="bound"
				@setPage="setCurrentPage($event)"
			/>
			<li :class="paginatorClasses(maximumPage, 'disabled')" @click="nextPage">
				<i class="yoco page-button">chevron_right</i>
			</li>
		</ul>
	</div>
</template>

<script>
import ExpandedPaginator from './components/ExpandedPaginator.vue'
import FlexiblePaginator from './components/FlexiblePaginator.vue'
import FractionatedPaginator from './components/FractionatedPaginator.vue'

export default {
	name: 'KtPagination',
	components: {
		ExpandedPaginator,
		FlexiblePaginator,
		FractionatedPaginator,
	},
	props: {
		adjacentAmount: { type: Number, default: 1 },
		fixedWidth: { type: Boolean, default: false },
		page: { type: Number, default: 1 },
		pageSize: { type: Number, default: 10 },
		pagingStyle: { type: String, default: 'expand' },
		total: { type: Number, required: true },

		/**
		 * @deprecated
		 * Use :pagingStyle='fraction' instead
		 */
		fractionStyle: { type: Boolean, default: false },
	},
	data() {
		return {
			currentPage: this.page - 1,
		}
	},
	computed: {
		bound() {
			return {
				adjacentAmount: this.adjacentAmount,
				currentPage: this.currentPage,
				fixedWidth: this.fixedWidth,
				maximumPage: this.maximumPage,
				pageSize: this.pageSize,
				total: this.total,
				totalPages: this.totalPages,
			}
		},
		component() {
			const isFlexLogical = 2 * (this.adjacentAmount + 1) < this.pageAmount
			if (!isFlexLogical || this.pageAmount < 2) return 'ExpandedPaginator'
			if (this.fractionStyle) {
				console.warn(
					"WARNING : fractionStyle is deprecated, please use :pagingStyle='fraction' instead",
				)
				return 'FractionatedPaginator'
			}
			switch (this.pagingStyle) {
				case 'flex':
					return 'FlexiblePaginator'
				case 'fraction':
					return 'FractionatedPaginator'
				default:
					return 'ExpandedPaginator'
			}
		},
		maximumPage() {
			return Math.ceil(this.total / this.pageSize) - 1
		},
		pageAmount() {
			return Math.ceil(this.total / this.pageSize)
		},
	},
	methods: {
		paginatorClasses(page, className) {
			return {
				'page-item': true,
				[className]: this.currentPage === page,
			}
		},
		setCurrentPage(page) {
			if (page === this.currentPage) return
			this.currentPage = page
			this.eventEmitter('currentPageChange')
		},
		nextPage() {
			if (this.currentPage === this.maximumPage) return
			this.currentPage += 1
			this.eventEmitter('nextPageClicked')
		},
		previousPage() {
			if (this.currentPage === 0) return
			this.currentPage -= 1
			this.eventEmitter('previousPageClicked')
		},
		eventEmitter(eventName) {
			this.$emit(eventName, this.currentPage + 1)
		},
	},
}
</script>
