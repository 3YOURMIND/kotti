<template>
	<div class="kt-breadcrumb">
		<ol>
			<li
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				:class="breadCrumbClasses(breadcrumb, index)"
				:data-test="breadcrumb.dataTest ? breadcrumb.dataTest : undefined"
			>
				<span
					v-if="showSeparator(index)"
					class="kt-breadcrumb__list-item__separator"
				>
					<i
						v-if="separator.style === KottiBreadcrumb.SeparatorType.ICON"
						class="yoco"
						v-text="separator.value"
					/>
					<span
						v-else-if="separator.style === KottiBreadcrumb.SeparatorType.TEXT"
						v-text="separator.value"
					/>
				</span>
				<span
					class="kt-breadcrumb__list-item__text"
					role="button"
					@click="handleClick(breadcrumb, index)"
					v-text="breadcrumb.title"
				/>
			</li>
		</ol>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { makeProps } from '../make-props'

import { KottiBreadcrumb } from './types'

export default defineComponent({
	name: 'KtBreadcrumb',
	props: makeProps(KottiBreadcrumb.propsSchema),
	setup(props: KottiBreadcrumb.PropsInternal) {
		return {
			breadCrumbClasses: (item: KottiBreadcrumb.Breadcrumb, index: number) => {
				return {
					'kt-breadcrumb__list-item': true,
					'kt-breadcrumb__list-item--is-disabled': item.isDisabled,
					'kt-breadcrumb__list-item--is-completed':
						!item.isDisabled && item.isCompleted,
					'kt-breadcrumb__list-item--is-active':
						!item.isDisabled && index === props.activeIndex,
				}
			},
			handleClick: (item: KottiBreadcrumb.Breadcrumb) => {
				if (item.isDisabled) return
				item.onClick()
			},
			KottiBreadcrumb,
			showSeparator: (index: number) =>
				index > 0 && index < props.breadcrumbs.length,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-breadcrumb {
	--breadcrumb-color-completed: var(--interactive-03);
	display: flex;
	flex-wrap: wrap;

	ol {
		display: flex;
		justify-content: center;
	}

	&__list-item {
		display: flex;
		align-items: center;
		margin: 0.1rem 0;

		color: var(--text-01);

		&--is-active,
		&--is-completed {
			color: var(--breadcrumb-color-completed);
		}

		&--is-active {
			font-weight: 700;
		}

		&--is-disabled {
			color: var(--text-05);
			cursor: not-allowed;
			.kt-breadcrumb__list-item__text:hover {
				color: var(--text-05);
				cursor: not-allowed;
			}
		}

		&__text:hover {
			color: var(--interactive-01-hover);
			cursor: pointer;
		}

		&__separator {
			display: flex;
			align-items: center;
			margin: 0 0.2rem;

			.yoco {
				font-size: 1rem;
			}
		}
	}
}
</style>
