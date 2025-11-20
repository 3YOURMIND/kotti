<template>
	<div class="inline-container">
		<li
			v-for="page in pageAmount"
			:key="page"
			:class="paginatorClasses(page)"
			@click="$emit('update:page', page)"
			v-text="page"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { validateTotalIsNumber } from '../utils'

export default defineComponent({
	name: 'PaginationExpanded',
	props: {
		currentPage: { required: true, type: Number },
		pageSize: { required: true, type: Number },
		total: {
			required: true,
			type: Number,
			validator: validateTotalIsNumber,
		},
	},
	emits: ['update:page'],
	setup(props) {
		return {
			pageAmount: computed(() => Math.ceil(props.total / props.pageSize)),
			paginatorClasses: (page: number) => ({
				'kt-pagination__page-item': true,
				'kt-pagination__page-item--is-active': props.currentPage === page,
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
