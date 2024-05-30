<template>
	<div class="inline-container">
		<li
			v-for="(page, index) in pageAmount"
			:key="index"
			:class="paginatorClasses(page, 'page-item--active')"
			@click="$emit('setPage', page)"
			v-text="getHumanReadablePageNumber(page)"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'PaginationExpanded',
	props: {
		currentPage: { required: true, type: Number },
		pageSize: { required: true, type: Number },
		total: { required: true, type: Number },
	},
	emits: ['setPage'],
	setup(props) {
		return {
			getHumanReadablePageNumber: (pageNumber: number) => pageNumber + 1,
			pageAmount: computed(() => Math.ceil(props.total / props.pageSize)),
			paginatorClasses: (pageNumber: number, className: string) => ({
				'page-item': true,
				[className]: props.currentPage === pageNumber,
			}),
		}
	},
})
</script>

<style lang="scss" scoped>
.inline-container {
	display: inline;
}
</style>
