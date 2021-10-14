<template>
	<div>
		<ul class="kt-pagination">
			<li :class="paginatorClasses(0)" @click="previousPage">
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
			<li :class="paginatorClasses(maximumPage)" @click="nextPage">
				<i
					class="yoco kt-pagination__page-button"
					v-text="Yoco.Icon.CHEVRON_RIGHT"
				/>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { makeProps } from '../make-props'

import PaginationExpanded from './components/PaginationExpanded.vue'
import PaginationFlexible from './components/PaginationFlexible.vue'
import PaginationFractionated from './components/PaginationFractionated.vue'
import { KottiPagination } from './types'

export default defineComponent<KottiPagination.PropsInternal>({
	name: 'KtPagination',
	components: {
		PaginationExpanded,
		PaginationFlexible,
		PaginationFractionated,
	},
	props: makeProps(KottiPagination.propsSchema),
	setup(props, { emit }) {
		const currentPage = ref(props.page - 1)
		const pageAmount = computed(() => Math.ceil(props.total / props.pageSize))
		const maximumPage = computed(() => pageAmount.value - 1)

		return {
			paginationComponent: computed(() => {
				const isFlexLogical = 2 * (props.adjacentAmount + 1) < pageAmount.value
				switch (props.pagingStyle) {
					case 'flex':
						return !isFlexLogical || pageAmount.value < 2
							? PaginationExpanded.name
							: PaginationFlexible.name
					case 'fraction':
						return PaginationFractionated.name
					default:
						return PaginationExpanded.name
				}
			}),
			currentPage,
			maximumPage,
			nextPage: () => {
				if (currentPage.value === maximumPage.value) return
				currentPage.value += 1
				emit('nextPageClicked', currentPage.value + 1)
			},
			paginatorClasses: (page) => ({
				'kt-pagination__page-item': true,
				'kt-pagination__page-item--is-disabled': currentPage.value === page,
			}),
			paginationProps: computed(() => ({
				adjacentAmount: props.adjacentAmount,
				currentPage: currentPage.value,
				fixedWidth: props.fixedWidth,
				maximumPage: maximumPage.value,
				pageSize: props.pageSize,
				total: props.total,
			})),
			previousPage: () => {
				if (currentPage.value === 0) return
				currentPage.value -= 1
				emit('previousPageClicked', currentPage.value + 1)
			},
			setCurrentPage: (page) => {
				if (page === currentPage.value) return
				currentPage.value = page
				emit('currentPageChange', currentPage.value + 1)
			},
			Yoco,
		}
	},
})
</script>

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
	::v-deep &__page-item {
		--pagination-color-active: var(--interactive-03);
		display: inline-block;
		padding: var(--unit-2);
		line-height: 24px;
		text-align: center;
		&--is-active {
			color: var(--pagination-color-active);
		}
		&--is-disabled {
			cursor: not-allowed;

			.kt-pagination__page-button {
				opacity: 0.46;
			}
		}
		&:hover {
			cursor: pointer;
		}
	}
}
</style>
