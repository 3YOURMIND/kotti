<template>
	<div>
		<ul class="pagination">
			<li :class="paginatorClasses(1, 'disabled')" @click="previousPage">
				<i class="yoco page-button">chevron_left</i>
			</li>
			<li v-if="fractionStyle" class="fraction" v-text="fractionRep" />
			<li
				v-else
				v-for="(page,index) in totalPages"
				:key="index"
				:class="paginatorClasses(page, 'page-item--active')"
				v-text="page"
				@click="setCurrentPage(page)"
			/>
			<li :class="paginatorClasses(maximumPage, 'disabled')" @click="nextPage">
				<i class="yoco page-button">chevron_right</i>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'KtPagination',
	props: {
		page: { type: Number, default: 1 },
		total: { type: Number, required: true },
		pageSize: { type: Number, default: 10 },
		fractionStyle: { type: Boolean, default: false },
	},
	data() {
		return {
			currentPage: this.page,
		}
	},
	computed: {
		maximumPage() {
			return Math.ceil(this.total / this.pageSize)
		},
		totalPages() {
			return [...Array(this.maximumPage).keys()].map(e => e + 1)
		},
		fractionRep() {
			return `${this.currentPage}/${this.maximumPage}`
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
			if (this.currentPage === 1) return
			this.currentPage -= 1
			this.eventEmitter('previousPageClicked')
		},
		eventEmitter(eventName) {
			this.$emit(eventName, this.currentPage)
		},
	},
}
</script>
