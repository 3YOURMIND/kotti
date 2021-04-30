<template>
	<div class="kt-breadcrumb">
		<ol>
			<li
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				class="kt-breadcrumb__text"
				:class="textClasses(breadcrumb)"
			>
				<span @click="handleClick(breadcrumb)" v-text="breadcrumb.title" />
				<span v-if="showSeparator(index)">
					<i
						v-if="separator.style === KottiBreadcrumb.SeparatorType.ICON"
						class="yoco"
						v-text="separator.value"
					/>
					<span
						v-if="separator.style === KottiBreadcrumb.SeparatorType.TEXT"
						class="kt-breadcrumb__text-separator"
						v-text="separator.value"
					/>
				</span>
			</li>
		</ol>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'
import { isBoolean, isFunction, isString } from 'lodash'

import { isYocoIcon } from '../validators'

import { KottiBreadcrumb } from './types'

const breadcrumbValidator = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any,
): value is KottiBreadcrumb.Breadcrumb =>
	value !== null &&
	typeof value === 'object' &&
	isBoolean(value.isCompleted) &&
	isString(value.title) &&
	isFunction(value.to)

export default defineComponent<KottiBreadcrumb.PropsInternal>({
	name: 'KtBreadcrumb',
	props: {
		breadcrumbs: {
			type: Array,
			required: true,
			validator: (value: unknown): value is Array<KottiBreadcrumb.Breadcrumb> =>
				Array.isArray(value) && value.every(breadcrumbValidator),
		},
		separator: {
			type: Object,
			default: (): KottiBreadcrumb.Style => ({
				style: KottiBreadcrumb.SeparatorType.ICON,
				value: Yoco.Icon.CHEVRON_RIGHT,
			}),
			validator: (
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				value: any,
			): value is KottiBreadcrumb.Props['separator'] =>
				value !== null &&
				typeof value === 'object' &&
				((value.style === KottiBreadcrumb.SeparatorType.ICON &&
					isYocoIcon(value.value)) ||
					(value.style === KottiBreadcrumb.SeparatorType.TEXT &&
						isString(value.value))),
		},
	},
	setup(props, { root }) {
		return {
			handleClick: (item: KottiBreadcrumb.Breadcrumb) => {
				if (!item.isCompleted) return
				root.$router.push(item.to)
			},
			KottiBreadcrumb,
			showSeparator: (index: number) => index < props.breadcrumbs.length - 1,
			textClasses: (item: KottiBreadcrumb.Breadcrumb) => ({
				'kt-breadcrumb__text--is-completed': item.isCompleted,
			}),
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-breadcrumb {
	--breadcrumb-color-active: var(--interactive-03);

	display: flex;
	flex-wrap: wrap;
	li {
		display: inline-block;
		line-height: 1.2rem;
	}

	&__text {
		color: $darkgray-300;

		&--is-completed {
			font-weight: 600;
			color: var(--breadcrumb-color-active);

			&:hover {
				cursor: pointer;
			}
		}

		&-separator {
			padding: 0 0.4rem;
		}
	}
}
</style>
