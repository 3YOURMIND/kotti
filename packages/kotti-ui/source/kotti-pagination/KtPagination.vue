<template>
	<div>
		<ul class="kt-pagination">
			<li :class="paginatorClasses(1)" @click="previousPage">
				<i
					class="yoco kt-pagination__page-button"
					v-text="Yoco.Icon.CHEVRON_LEFT"
				/>
			</li>
			<component
				:is="paginationComponent"
				v-bind="paginationProps"
				@setPage="setCurrentPage($event)"
			/>
			<li :class="paginatorClasses(pageAmount)" @click="nextPage">
				<i
					class="yoco kt-pagination__page-button"
					v-text="Yoco.Icon.CHEVRON_RIGHT"
				/>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { makeProps } from '../make-props'

import PaginationExpanded from './components/PaginationExpanded.vue'
import PaginationFlexible from './components/PaginationFlexible.vue'
import PaginationFractionated from './components/PaginationFractionated.vue'
import { KottiPagination } from './types'

export default defineComponent({
	name: 'KtPagination',
	components: {
		PaginationExpanded,
		PaginationFlexible,
		PaginationFractionated,
	},
	props: makeProps(KottiPagination.propsSchema),
	emits: [
		'currentPageChange',
		'previousPageClicked',
		'nextPageClicked',
		'setPage',
	],
	setup(props, { emit }) {
		const pageAmount = computed(() => Math.ceil(props.total / props.pageSize))

		return {
			nextPage: () => {
				if (props.page >= pageAmount.value) return
				emit('nextPageClicked', props.page + 1)
				emit('setPage', props.page + 1)
			},
			pageAmount,
			paginationComponent: computed(() => {
				const isFlexLogical = 2 * (props.adjacentAmount + 1) < pageAmount.value
				switch (props.pagingStyle) {
					case KottiPagination.PagingStyle.FLEX:
						return !isFlexLogical || pageAmount.value < 2
							? PaginationExpanded.name
							: PaginationFlexible.name
					case KottiPagination.PagingStyle.FRACTION:
						return PaginationFractionated.name
					case KottiPagination.PagingStyle.EXPAND:
					default:
						return PaginationExpanded.name
				}
			}),
			paginationProps: computed(() => ({
				adjacentAmount: props.adjacentAmount,
				currentPage: props.page,
				fixedWidth: props.fixedWidth,
				maximumPage: pageAmount.value,
				pageSize: props.pageSize,
				total: props.total,
			})),
			paginatorClasses: (page: number) => ({
				'kt-pagination__page-item': true,
				'kt-pagination__page-item--is-disabled': props.page === page,
			}),
			previousPage: () => {
				if (props.page === 1) return
				emit('previousPageClicked', props.page - 1)
				emit('setPage', props.page - 1)
			},
			setCurrentPage: (page: number) => {
				if (page === props.page) return
				emit('currentPageChange', page)
				emit('setPage', page)
			},
			Yoco,
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

:root {
	--kt-pagination-color-active: var(--interactive-03);
}
</style>

<style lang="scss" scoped>
.kt-pagination {
	margin: 0;
	list-style: none;
	user-select: none;

	&__page-button {
		display: inline-block;
		padding: var(--unit-1);
		background: var(--gray-10);
		border-radius: var(--border-radius);

		&:hover {
			cursor: pointer;
			background: var(--gray-20);
		}
	}

	:deep(.kt-pagination__page-item--is-active) {
		color: var(--kt-pagination-color-active);
	}

	:deep(.kt-pagination__page-item--is-disabled) {
		cursor: not-allowed;

		.kt-pagination__page-button {
			opacity: 0.46;
		}
	}

	:deep(.kt-pagination__page-item) {
		display: inline-block;
		padding: var(--unit-2);
		line-height: 24px;
		text-align: center;

		&:hover {
			cursor: pointer;
		}
	}

	.disabled {
		cursor: not-allowed;

		.page-button {
			opacity: 0.46;
		}
	}
}
</style>
