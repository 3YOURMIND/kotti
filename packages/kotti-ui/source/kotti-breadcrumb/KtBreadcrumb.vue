<template>
	<div class="kt-breadcrumb">
		<ol>
			<li
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				class="kt-breadcrumb__text"
				:class="textClasses(breadcrumb, index)"
			>
				<span
					@click="handleClick(breadcrumb, index)"
					v-text="breadcrumb.title"
				/>
				<span v-if="showSeparator(index)" class="kt-breadcrumb__separator">
					<i
						v-if="separator.style === KottiBreadcrumb.SeparatorType.ICON"
						class="yoco"
						v-text="separator.value"
					/>
					<span
						v-if="separator.style === KottiBreadcrumb.SeparatorType.TEXT"
						v-text="separator.value"
					/>
				</span>
			</li>
		</ol>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { makeProps } from '../make-props'

import { KottiBreadcrumb } from './types'

export default defineComponent<KottiBreadcrumb.PropsInternal>({
	name: 'KtBreadcrumb',
	props: makeProps(KottiBreadcrumb.propsSchema),
	setup(props) {
		return {
			handleClick: (item: KottiBreadcrumb.Breadcrumb) => {
				if (!item.isCompleted) return
				item.onClick()
			},
			KottiBreadcrumb,
			showSeparator: (index: number) => index < props.breadcrumbs.length - 1,
			textClasses: (item: KottiBreadcrumb.Breadcrumb, index: number) => ({
				'kt-breadcrumb__text--is-completed': item.isCompleted,
				'kt-breadcrumb__text--is-active': index === props.activeIndex,
			}),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-breadcrumb {
	--breadcrumb-color-completed: var(--interactive-03);
	--breadcrumb-color-active: var(--text-01);
	display: flex;
	flex-wrap: wrap;

	ol {
		display: flex;
	}

	li {
		display: flex;
		align-items: center;
		margin: 0.1rem 0;
	}

	&__text {
		&--is-completed {
			font-weight: 600;
			color: var(--breadcrumb-color-completed);

			&:hover {
				cursor: pointer;
			}
		}
		&--is-active {
			font-weight: 600;
			color: var(--breadcrumb-color-active);
		}
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
</style>
