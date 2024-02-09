<template>
	<div :class="mainClasses" :data-test="dataTest" @click="handleClick">
		<i v-if="isLoading" class="kt-circle-loading" />
		<i v-else-if="icon !== null" class="yoco" v-text="icon" />
		<span v-if="label !== null" v-text="label" />
	</div>
</template>

<script lang="ts">
import { isYocoIcon, Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, PropType } from 'vue'

import { KottiFilters } from '../types'

export default defineComponent({
	name: 'ButtonLink',
	props: {
		dataTest: {
			default: null,
			type: String,
		},
		icon: {
			default: null,
			type: String as PropType<Yoco.Icon>,
			validator: isYocoIcon,
		},
		isDisabled: {
			default: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
		label: {
			default: null,
			type: String,
		},
		type: {
			default: KottiFilters.ButtonLinkType.PRIMARY,
			type: String as PropType<KottiFilters.ButtonLinkType>,
			validator: (value: unknown): value is KottiFilters.ButtonLinkType => {
				return Object.values(KottiFilters.ButtonLinkType).includes(
					value as KottiFilters.ButtonLinkType,
				)
			},
		},
	},
	setup(props, { emit }) {
		const mainClasses = computed(() => ({
			'kt-button-link': true,
			'kt-button-link--is-disabled': props.isDisabled,
			[`kt-button-link--type-${props.type}`]: !props.isDisabled,
		}))

		const handleClick = (event: Event) => {
			if (props.isDisabled || props.isLoading) return
			emit('click', event)
		}

		return {
			handleClick,
			mainClasses,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-button-link {
	display: flex;
	font-weight: 500;
	cursor: pointer;

	&--is-disabled {
		color: var(--text-05);
		pointer-events: none;
		cursor: default;
	}

	&--type {
		&-danger {
			color: var(--text-02);

			&:hover {
				color: var(--hover-danger);
			}
		}

		&-primary {
			color: var(--interactive-01);

			&:hover {
				color: var(--interactive-01-hover);
			}
		}
	}

	.yoco {
		font-size: 1rem;
	}
}
</style>
