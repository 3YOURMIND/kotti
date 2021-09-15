<template>
	<div :class="mainClasses" @click="handleClick">
		<i v-if="isLoading" class="kt-circle-loading" />
		<i v-else-if="icon !== null" class="yoco" v-text="icon" />
		<span v-if="label !== null" v-text="label" />
	</div>
</template>

<script lang="ts">
import { isYocoIcon, Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { Kotti } from '../../types'

export default defineComponent<{
	icon: Yoco.Icon | null
	isDisabled: boolean
	isLoading: boolean
	label: string | null
	type: Kotti.Filters.ButtonLinkType
}>({
	name: 'ButtonLink',
	props: {
		icon: {
			default: null,
			type: String,
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
			default: Kotti.Filters.ButtonLinkType.PRIMARY,
			type: String,
			validator: (value: unknown): value is Kotti.Filters.ButtonLinkType =>
				Object.values(Kotti.Filters.ButtonLinkType).includes(
					value as Kotti.Filters.ButtonLinkType,
				),
		},
	},
	setup(props, { emit }) {
		const mainClasses = computed(() => ({
			'kt-button-link': true,
			'kt-button-link--is-disabled': props.isDisabled,
			[`kt-button-link--type-${props.type}`]: !props.isDisabled,
		}))

		const handleClick = (event) => {
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
