<template>
	<div class="inline-container">
		<li
			v-for="(page, index) in totalPages"
			:key="index"
			:class="paginatorClasses(page, 'page-item--active')"
			@click="$emit('setPage', page)"
			v-text="humanReadablePageNumber(page)"
		/>
	</div>
</template>

<script>
export default {
	name: 'PaginationExpanded',
	props: {
		currentPage: { type: Number, required: true },
		pageSize: { type: Number, required: true },
		total: { type: Number, required: true },
	},
	computed: {
		pageAmount() {
			return Math.ceil(this.total / this.pageSize)
		},
		totalPages() {
			return [...Array(this.pageAmount).keys()]
		},
	},
	methods: {
		humanReadablePageNumber(page) {
			return page + 1
		},
		paginatorClasses(page, className) {
			return {
				'page-item': true,
				[className]: this.currentPage === page,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.inline-container {
	display: inline;
}
</style>
