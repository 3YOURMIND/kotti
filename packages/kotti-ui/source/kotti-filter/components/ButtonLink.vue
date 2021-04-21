<template>
	<div :class="mainClasses" @click="handleClick">
		<i v-if="isLoading" class="kt-circle-loading" />
		<i v-else-if="icon !== null" class="yoco" v-text="icon" />
		<span v-if="label !== null" v-text="label" />
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { Kotti } from '../../types'
import { isYocoIcon } from '../../validators'

export default defineComponent<{
	disabled: boolean
	icon: Yoco.Icon | null
	isLoading: boolean
	label: string | null
	type: Kotti.Filter.ButtonLinkType
}>({
	name: 'ButtonLink',
	props: {
		disabled: {
			default: false,
			type: Boolean,
		},
		icon: {
			default: null,
			type: String,
			validator: isYocoIcon,
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
			default: Kotti.Filter.ButtonLinkType.PRIMARY,
			type: String,
			validator: (value: unknown): value is Kotti.Filter.ButtonLinkType =>
				Object.values(Kotti.Filter.ButtonLinkType).includes(
					value as Kotti.Filter.ButtonLinkType,
				),
		},
	},
	setup(props, { emit }) {
		const mainClasses = computed(() => ({
			'kt-button-link': true,
			'kt-button-link--disabled': props.disabled,
			[`kt-button-link--type-${props.type}`]: true,
		}))

		const handleClick = (event) => {
			if (props.disabled || props.isLoading) return
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

	// increase selector specificity by using .kt-button-link twice
	&--disabled.kt-button-link {
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
