<template>
	<button
		:class="mainClasses"
		role="button"
		:type="isSubmit ? 'submit' : 'button'"
		@click="handleClick"
	>
		<i v-if="isLoading" class="kt-circle-loading" />
		<i v-else-if="icon !== null" class="yoco" v-text="icon" />
		<span v-if="hasSlot">
			<slot />
		</span>
		<span v-else-if="label !== null" v-text="label" />
	</button>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { isYocoIcon } from '../validators'

import { KottiButton } from './types'

export default defineComponent<KottiButton.PropsInternal>({
	name: 'KtButton',
	props: {
		icon: { default: null, type: String, validator: isYocoIcon },
		isBlock: { default: false, type: Boolean },
		isLoading: { default: false, type: Boolean },
		isMultiline: { default: false, type: Boolean },
		isSubmit: { default: false, type: Boolean },
		label: { default: null, type: String },
		size: {
			default: KottiButton.Size.MEDIUM,
			type: String,
			validator: (value: unknown): value is KottiButton.Size =>
				Object.values(KottiButton.Size).includes(value as KottiButton.Size),
		},
		type: {
			default: KottiButton.Type.DEFAULT,
			type: String,
			validator: (value: unknown): value is KottiButton.Type =>
				Object.values(KottiButton.Type).includes(value as KottiButton.Type),
		},
	},
	setup(props, { emit, slots }) {
		const hasSlot = computed(() => Boolean(slots.default))

		return {
			handleClick: (event) => emit('click', event),
			hasSlot,
			mainClasses: computed(() => ({
				'kt-button': true,
				'kt-button--has-content': props.label !== null || hasSlot.value,
				'kt-button--has-icon': props.icon !== null,
				'kt-button--is-block': props.isBlock,
				'kt-button--is-multiline': props.isMultiline,
				[`kt-button--size-${props.size}`]: true,
				[`kt-button--type-${props.type}`]: true,
			})),
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

:root {
	--default-button-height: var(--unit-8);
	--default-button-line-height: var(--unit-6);
	--large-button-height: var(--unit-9);
	--small-button-height: var(--unit-6);
	--button-main-color: var(--interactive-01);
	--button-main-color-dark: var(--interactive-01-hover);
	--button-main-color-light: var(--interactive-02-hover);
}

.kt-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;

	font-weight: 600;

	cursor: pointer;
	user-select: none;

	border: 1px solid transparent;
	border-radius: $border-radius;

	transition: 30ms opacity ease-in-out;

	&:active {
		opacity: 0.85;
	}

	&:disabled {
		pointer-events: none;
		opacity: 0.46;
	}

	> *:not(:first-child) {
		margin-left: 0.2rem;
	}

	&--has-content {
		padding: 0 var(--unit-4);
	}

	&--has-icon {
		.yoco {
			font-size: 1rem;
		}

		&:not(.kt-button--has-content) {
			padding: 0 var(--unit-2);
		}
	}

	// increase selector specificity by using .kt-button twice
	&--is-block.kt-button {
		display: flex;
		width: 100%;
	}

	// increase selector specificity by using .kt-button twice
	&--is-multiline.kt-button {
		height: auto;
		padding-top: var(--unit-1);
		padding-bottom: var(--unit-1);
		line-height: var(--default-button-line-height);

		&.kt-button--has-icon {
			align-items: baseline;
			text-align: left;

			.yoco {
				position: relative;
				left: calc(var(--unit-1) * -1);
			}
		}
	}

	&--size {
		&-small {
			height: var(--small-button-height);
		}

		&-medium {
			height: var(--default-button-height);
		}

		&-large {
			height: var(--large-button-height);
		}
	}

	&--type {
		&-danger {
			color: var(--danger);

			.kt-circle-loading {
				border-bottom-color: var(--danger);
				border-left-color: var(--danger);
			}

			&:hover {
				color: var(--text-04);
				background-color: var(--danger);
				border-color: transparent;

				.kt-circle-loading {
					border-bottom-color: var(--text-04);
					border-left-color: var(--text-04);
				}
			}
		}

		&-default {
			color: var(--button-main-color-dark);
			background-color: var(--interactive-02);
			border-color: var(--ui-02);

			&:hover {
				background-color: var(--button-main-color-light);
				border-color: var(--button-main-color-light);
			}

			.kt-circle-loading {
				border-bottom-color: var(--button-main-color-dark);
				border-left-color: var(--button-main-color-dark);
			}
		}

		&-primary {
			color: var(--text-04);
			background-color: var(--button-main-color);
			border-color: var(--button-main-color-dark);

			&:hover {
				background-color: var(--button-main-color-dark);
				border-color: var(--button-main-color-dark);
			}

			.kt-circle-loading {
				border-bottom-color: var(--text-04);
				border-left-color: var(--text-04);
			}
		}

		&-secondary {
			color: var(--button-main-color-dark);
			background-color: var(--interactive-02);
			border-color: var(--button-main-color-dark);

			&:hover {
				background-color: var(--button-main-color-light);
				border-color: var(--button-main-color-dark);
			}

			.kt-circle-loading {
				border-bottom-color: var(--button-main-color-dark);
				border-left-color: var(--button-main-color-dark);
			}
		}

		&-text {
			color: var(--button-main-color-dark);
			background-color: transparent;
			border-color: transparent;

			&:hover {
				background-color: var(--button-main-color-light);
				border-color: var(--button-main-color-light);
			}

			.kt-circle-loading {
				border-bottom-color: var(--button-main-color-dark);
				border-left-color: var(--button-main-color-dark);
			}
		}
	}
}
</style>
