<template>
	<div>
		<ul class="pagination">
			<li :class="paginatorClasses(0, 'disabled')" @click="previousPage">
				<i class="yoco page-button" v-text="Yoco.Icon.CHEVRON_LEFT" />
			</li>
			<component
				:is="paginationComponent"
				v-bind="paginationProps"
				@setPage="setCurrentPage($event)"
			/>
			<li :class="paginatorClasses(maximumPage, 'disabled')" @click="nextPage">
				<i class="yoco page-button" v-text="Yoco.Icon.CHEVRON_RIGHT" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from '@vue/composition-api'

import PaginationExpanded from './components/PaginationExpanded.vue'
import PaginationFlexible from './components/PaginationFlexible.vue'
import PaginationFractionated from './components/PaginationFractionated.vue'

export default defineComponent<{
	adjacentAmount: number
	fixedWidth: boolean
	fractionStyle: boolean
	page: number
	pageSize: number
	pagingStyle: 'default' | 'flex' | 'fraction'
	total: number
}>({
	name: 'KtPagination',
	components: {
		PaginationExpanded,
		PaginationFlexible,
		PaginationFractionated,
	},
	props: {
		adjacentAmount: { type: Number, default: 1 },
		fixedWidth: { type: Boolean, default: false },
		page: { type: Number, default: 1 },
		pageSize: { type: Number, default: 10 },
		pagingStyle: { type: String, default: 'expand' },
		total: { type: Number, required: true },

		/**
		 * @deprecated
		 * Use :pagingStyle='fraction' instead
		 */
		fractionStyle: { type: Boolean, default: false },
	},
	setup(props, { emit }) {
		const currentPage = ref(props.page - 1)
		const pageAmount = computed(() => Math.ceil(props.total / props.pageSize))
		const maximumPage = computed(() => pageAmount.value - 1)

		return {
			paginationComponent: computed(() => {
				const isFlexLogical = 2 * (props.adjacentAmount + 1) < pageAmount.value
				if (!isFlexLogical || pageAmount.value < 2)
					return PaginationExpanded.name

				if (props.fractionStyle) {
					// eslint-disable-next-line no-console
					console.warn(
						"<KtPagination>: fractionStyle is deprecated, please use :pagingStyle='fraction' instead",
					)
					return PaginationFractionated.name
				}

				switch (props.pagingStyle) {
					case 'flex':
						return PaginationFlexible.name
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
			paginatorClasses: (page) => {
				return {
					'page-item': true,
					disabled: currentPage.value === page,
				}
			},
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
	computed: {
		component() {
			const isFlexLogical = 2 * (this.adjacentAmount + 1) < this.pageAmount
			if (!isFlexLogical || this.pageAmount < 2) return 'PaginationExpanded'

			if (this.fractionStyle) {
				// eslint-disable-next-line no-console
				console.warn(
					"<KtPagination>: fractionStyle is deprecated, please use :pagingStyle='fraction' instead",
				)
				return PaginationFractionated.name
			}

			switch (this.pagingStyle) {
				case 'flex':
					return PaginationFlexible.name
				case 'fraction':
					return PaginationFractionated.name
				default:
					return PaginationExpanded.name
			}
		},
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

:root {
	--pagination-color-active: var(--interactive-03);
}
.pagination {
	margin: 0;
	list-style: none;
	user-select: none;
	.page-button {
		display: inline-block;
		padding: var(--unit-1);
		background: $lightgray-300;
		border-radius: var(--border-radius);
		&:hover {
			cursor: pointer;
			background: $lightgray-400;
		}
	}
	.fraction {
		display: inline-block;
	}
	.page-item {
		display: inline-block;
		padding: var(--unit-2);
		line-height: 24px;
		text-align: center;
		&--active {
			color: var(--pagination-color-active);
		}
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
