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
import ContractedPaginator from './components/ContractedPaginator.vue'
import ExpandedPaginator from './components/ExpandedPaginator.vue'
import FractionatedPaginator from './components/FractionatedPaginator.vue'

export default {
	name: 'KtPagination',
	components: {
		ContractedPaginator,
		ExpandedPaginator,
		FractionatedPaginator,
	},
	props: {
		adjacentAmount: { type: Number, default: 1 },
		paginationStyle: { type: String, default: 'expanded' },
		page: { type: Number, default: 1 },
		pageSize: { type: Number, default: 10 },
		total: { type: Number, required: true },
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
				maximumPage: this.maximumPage,
				pageSize: this.pageSize,
				total: this.total,
				totalPages: this.totalPages,
			}
		},
		component() {
			switch (this.paginationStyle) {
				case 'contracted':
					return 'ContractedPaginator'
				case 'expanded':
					return 'ExpandedPaginator'
				case 'fractionated':
					return 'FractionatedPaginator'
			}
		},
		maximumPage() {
			return Math.ceil(this.total / this.pageSize) - 1
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
