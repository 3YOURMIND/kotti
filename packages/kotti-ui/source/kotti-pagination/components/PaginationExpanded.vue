<template>
	<div class="inline-container">
		<li
			v-for="(page, index) in totalPages"
			:key="index"
			:class="paginatorClasses(page, 'page-item--active')"
			@click="$emit('setPage', page - 1)"
			v-text="humanReadablePageNumber(page)"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import range from 'lodash/range'

export default defineComponent<{
	currentPage: number
	pageSize: number
	total: number
}>({
	name: 'PaginationExpanded',
	props: {
		currentPage: { type: Number, required: true },
		pageSize: { type: Number, required: true },
		total: { type: Number, required: true },
	},
	setup(props) {
		const pageAmount = computed(() => Math.ceil(props.total / props.pageSize))
		return {
			humanReadablePageNumber: (page: number) => page + 1,
			paginatorClasses: (page: number) => ({
				'page-item': true,
				'page-item--active': props.currentPage + 1 === page,
			}),
			totalPages: computed(() => range(pageAmount.value)),
		}
	},
})
</script>

<style lang="scss" scoped>
.inline-container {
	display: inline;
}
</style>
