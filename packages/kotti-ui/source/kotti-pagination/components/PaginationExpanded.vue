<template>
	<div class="inline-container">
		<li
			v-for="page in pageAmount"
			:key="page"
			:class="paginatorClasses(page - 1, 'page-item--active')"
			@click="$emit('setPage', page - 1)"
			v-text="page"
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
