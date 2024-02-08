<template>
	<button
		ref="helpTextTriggerRef"
		:class="mainClasses"
		:type="isSubmit ? 'submit' : 'button'"
		@click="handleClick"
	>
		<i v-if="isLoading" class="kt-circle-loading" />
		<i v-if="hasIconLeft" class="yoco" v-text="icon" />
		<span v-if="hasSlot">
			<slot />
		</span>
		<span v-else-if="label !== null" v-text="label" />
		<i v-if="hasIconRight" class="yoco" v-text="icon" />
		<div v-if="showHelpText" ref="helpTextContentRef" v-text="helpText" />
	</button>
</template>

<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { roundArrow } from 'tippy.js'
import { computed, defineComponent, onMounted, ref } from 'vue'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../constants'
import { makeProps } from '../make-props'

import { KottiButton } from './types'

export default defineComponent({
	name: 'KtButton',
	props: makeProps(KottiButton.propsSchema),
	setup(props, { emit, slots }) {
		const helpTextContentRef = ref<Element | null>(null)
		const helpTextTriggerRef = ref<Element | null>(null)

		const hasSlot = computed(() => Boolean(slots.default))

		const isIconButton = computed(
			() => props.icon !== null && props.label === null,
		)

		const showHelpText = computed(
			() => isIconButton.value && props.helpText !== null,
		)

		const isToggle = computed(() => props.toggleStatus !== null)

		useTippy(
			helpTextTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: props.helpText
					? helpTextContentRef.value ?? undefined
					: undefined,
				interactive: true,
				offset: [0, TIPPY_LIGHT_BORDER_ARROW_HEIGHT],
				theme: 'light-border',
				...(showHelpText.value
					? { trigger: 'mouseenter focusin' }
					: { trigger: 'manual' }),
			})),
		)

		onMounted(() => {
			if (props.label !== null && props.helpText !== null) {
				throw new Error(
					'KtButton: Guideline Uncompliance: attempted to use helpText with a button that already has a label.',
				)
			}

			if (
				isToggle.value &&
				props.type !== KottiButton.Type.DEFAULT &&
				props.type !== KottiButton.Type.TEXT
			) {
				throw new Error(
					'KtButton: Guideline Uncompliance: attempted to use toggleStatus with a button of type different than "DEFAULT" or "TEXT"',
				)
			}
		})

		return {
			handleClick: (event: Event) => {
				if (isToggle.value)
					emit(
						'update:toggleStatus',
						props.toggleStatus === KottiButton.ToggleStatus.OFF
							? KottiButton.ToggleStatus.ON
							: KottiButton.ToggleStatus.OFF,
					)
				emit('click', event)
			},
			hasIconLeft: computed(
				() =>
					props.icon !== null &&
					props.iconPosition === KottiButton.IconPosition.LEFT,
			),
			hasIconRight: computed(
				() =>
					props.icon !== null &&
					props.iconPosition === KottiButton.IconPosition.RIGHT,
			),
			hasSlot,
			helpTextContentRef,
			helpTextTriggerRef,
			mainClasses: computed(() => ({
				'kt-button': true,
				'kt-button--has-content': props.label !== null || hasSlot.value,
				'kt-button--has-icon': props.icon !== null,
				'kt-button--is-block': props.isBlock,
				'kt-button--is-multiline': props.isMultiline,
				[`kt-button--is-toggle-${props.toggleStatus}`]: isToggle.value,
				[`kt-button--size-${props.size}`]: true,
				[`kt-button--type-${props.type}`]: true,
			})),
			showHelpText,
		}
	},
})
</script>

<style lang="scss">
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

	// Since this is an inline element (display: inline-flex), we need to
	// care about vertical-alignment. The default setting would cause
	// different alignments between buttons with or without icon.
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	border-radius: var(--border-radius);
	transition: 30ms opacity ease-in-out;

	&:active {
		opacity: 0.85;
	}

	&:disabled {
		pointer-events: none;
		opacity: 0.46;
	}

	&:focus-visible {
		outline: none;
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
				left: calc(-1 * var(--unit-1));
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
			background-color: var(--ui-01);
			border-color: var(--ui-02);

			&:hover,
			&:focus-visible {
				color: var(--text-04);
				background-color: var(--danger);
				border-color: transparent;

				.kt-circle-loading {
					border-bottom-color: var(--text-04);
					border-left-color: var(--text-04);
				}
			}

			.kt-circle-loading {
				border-bottom-color: var(--danger);
				border-left-color: var(--danger);
			}
		}

		&-default {
			color: var(--button-main-color-dark);
			background-color: var(--interactive-02);
			border-color: var(--ui-02);

			&:hover,
			&:focus-visible {
				background-color: var(--button-main-color-light);
				border-color: var(--button-main-color-light);
			}

			.kt-circle-loading {
				border-bottom-color: var(--button-main-color-dark);
				border-left-color: var(--button-main-color-dark);
			}

			&.kt-button--is-toggle-on {
				color: var(--text-04);
				background-color: var(--button-main-color);
				border-color: var(--button-main-color-dark);

				&:hover,
				&:focus-visible {
					background-color: var(--button-main-color-dark);
					border-color: var(--button-main-color-dark);
				}

				.kt-circle-loading {
					border-bottom-color: var(--text-04);
					border-left-color: var(--text-04);
				}
			}
		}

		&-primary {
			color: var(--text-04);
			background-color: var(--button-main-color);
			border-color: var(--button-main-color-dark);

			&:hover,
			&:focus-visible {
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

			&:hover,
			&:focus-visible {
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

			&:hover,
			&:focus-visible {
				background-color: var(--button-main-color-light);
				border-color: var(--button-main-color-light);
			}

			.kt-circle-loading {
				border-bottom-color: var(--button-main-color-dark);
				border-left-color: var(--button-main-color-dark);
			}

			&.kt-button--is-toggle-on {
				color: var(--button-main-color-dark);
				background-color: var(--interactive-04);

				&:hover,
				&:focus-visible {
					background-color: var(--button-main-color-light);
					border-color: var(--button-main-color-light);
				}
			}
		}
	}
}
</style>
