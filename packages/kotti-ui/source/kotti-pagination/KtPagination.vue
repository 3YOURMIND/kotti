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
				@update:page="setCurrentPage($event)"
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
	emits: ['update:page'],
	setup(props, { emit }) {
		const pageAmount = computed(() =>
			props.total === null ? null : Math.ceil(props.total / props.pageSize),
		)

		return {
			nextPage: () => {
				if (pageAmount.value !== null && props.page >= pageAmount.value) return
				emit('update:page', props.page + 1)
			},
			pageAmount,
			paginationComponent: computed(() => {
				switch (props.pagingStyle) {
					case KottiPagination.PagingStyle.FLEX:
						return pageAmount.value !== null &&
							(2 * (props.adjacentAmount + 1) >= pageAmount.value ||
								pageAmount.value < 2)
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
				emit('update:page', props.page - 1)
			},
			setCurrentPage: (page: number) => {
				if (page === props.page) return
				emit('update:page', page)
			},
			Yoco,
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables';

:root {
	--kt-pagination-color-active: var(--interactive-03);
}
</style>

<style lang="scss" scoped>
.kt-pagination {
	margin: 0;
	user-select: none;
	list-style: none;

	&__page-button {
		display: inline-block;
		padding: var(--unit-1);
		background: var(--ui-02);
		border-radius: var(--border-radius);

		&:hover {
			cursor: pointer;
			background: var(--ui-02);
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
