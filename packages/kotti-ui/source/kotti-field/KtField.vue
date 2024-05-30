<template>
	<div class="kt-field">
		<component
			:is="useFieldset ? 'fieldset' : isComponent ? isComponent : 'div'"
			:class="wrapperClasses"
			@click="$emit('click', $event)"
			@mousedown="$emit('mousedown', $event)"
		>
			<div v-if="hasLabel || hasHelpText" class="kt-field__header">
				<component
					:is="useFieldset ? 'legend' : 'label'"
					v-if="hasLabel"
					class="kt-field__header__label"
					:for="useFieldset ? undefined : inputId"
					@click="onClickLabel"
				>
					<span class="kt-field__header__label__text" v-text="field.label" />
					<span :class="labelSuffixClasses" v-text="labelSuffix" />
				</component>
				<div
					v-if="hasHelpText"
					class="kt-field__header__help-text"
					:class="iconClasses('header__help-text', ['interactive'])"
				>
					<FieldHelpText
						:helpText="field.helpText"
						:helpTextSlot="helpTextSlot"
					/>
				</div>
			</div>
			<div
				v-if="field.helpDescription"
				class="kt-field__help-description"
				v-text="field.helpDescription"
			/>
			<div
				v-if="field.isLoading"
				class="kt-field__input-container-wrapper-loading skeleton rectangle"
			/>
			<div
				v-show="!field.isLoading"
				ref="inputContainerWrapperRef"
				class="kt-field__input-container-wrapper"
			>
				<div
					v-if="$slots['container-left']"
					class="kt-field__input-container__prefix"
				>
					<slot name="container-left" />
				</div>
				<slot name="container">
					<div
						ref="inputContainerRef"
						class="kt-field__input-container"
						@click="focusInput"
					>
						<div
							v-if="field.prefix"
							:class="affixClasses(['left'])"
							v-text="field.prefix"
						/>
						<div
							v-if="field.leftIcon"
							:class="iconClasses('input-container', ['left'])"
						>
							<i class="yoco" v-text="field.leftIcon" />
						</div>
						<div class="kt-field__input-container__slot">
							<slot name="default" />
						</div>
						<slot
							:classes="iconClasses('input-container', ['interactive'])"
							:handleClear="handleClear"
							name="actionIcon"
							:showClear="!field.hideClear"
						>
							<div
								v-if="!field.hideClear"
								:class="iconClasses('input-container', ['interactive'])"
								role="button"
								@click.stop="handleClear"
							>
								<i class="yoco" v-text="Yoco.Icon.CLOSE" />
							</div>
						</slot>
						<div
							v-if="field.rightIcon"
							:class="iconClasses('input-container', ['right'])"
						>
							<i class="yoco" v-text="field.rightIcon" />
						</div>
						<div
							v-if="field.suffix"
							:class="affixClasses(['right'])"
							v-text="field.suffix"
						/>
					</div>
				</slot>
				<div
					v-if="$slots['container-right']"
					class="kt-field__input-container__suffix"
				>
					<slot name="container-right" />
				</div>
			</div>
			<div
				v-if="!field.isLoading && showValidation && validationText !== null"
				class="kt-field__validation-text"
			>
				<i class="yoco" v-text="validationTextIcon" />
				{{ validationText }}
			</div>
		</component>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import debounce from 'lodash/debounce'
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { VNode } from 'vue'

import { useTranslationNamespace } from '../kotti-i18n/hooks'

import FieldHelpText from './components/FieldHelpText.vue'
import { useInput } from './hooks'
import type { KottiField } from './types'

const LABEL_CLICK_DEBOUNCE = 200

export default defineComponent({
	name: 'KtField',
	components: { FieldHelpText },
	props: {
		debounceLabelClick: { default: false, type: Boolean },
		field: {
			required: true,
			type: Object as PropType<KottiField.Hook.Returns<unknown>>,
		},
		/**
		 * What’s the appropriate value for an empty field of this data type?
		 * Used when clearing the field. Most likely either null or []
		 */
		getEmptyValue: { default: null, type: Function as PropType<() => unknown> },
		helpTextSlot: { default: () => [], type: Array as PropType<VNode[]> },
		isComponent: { default: null, type: String as PropType<string | null> },
		isRange: { default: false, type: Boolean },
		useFieldset: { default: false, type: Boolean },
	},
	emits: ['click', 'mousedown'],
	setup(props) {
		const inputId = computed(() =>
			props.isRange
				? `${props.field.inputProps.id}-start`
				: props.field.inputProps.id,
		)
		const validationType = computed(() => props.field.validation.type)
		const showValidation = computed(
			() => !(props.field.hideValidation || validationType.value === 'empty'),
		)

		const { clickInput, focusInput } = useInput(inputId.value)
		const translations = useTranslationNamespace('KtFields')

		const debouncedLabelClick = debounce((event: MouseEvent) => {
			if (event.detail === 1) {
				focusInput()
				clickInput()
			}
		}, LABEL_CLICK_DEBOUNCE)

		return {
			affixClasses: computed(() => (modifications: string[]) => [
				'kt-field__input-container__affix',
				...modifications.map(
					(modification) => `kt-field__input-container__affix--${modification}`,
				),
			]),
			focusInput,
			handleClear: () => {
				/**
				 * useSupports hook returns null if hideClear is not supported on ktField component
				 */
				if (props.field.hideClear === null)
					throw new Error(
						'KtField: hideClear is unsupported and yet handleClear was called',
					)

				props.field.setValue(props.getEmptyValue())
				focusInput()
			},
			hasHelpText: computed(
				() => props.helpTextSlot.length > 0 || props.field.helpText !== null,
			),
			hasLabel: computed(() => props.field.label !== null),
			iconClasses: computed(
				() => (element: string, modifications: string[]) => [
					`kt-field__${element}__icon`,
					...modifications.map(
						(modification) => `kt-field__${element}__icon--${modification}`,
					),
				],
			),
			inputId,
			/**
			 * HACK: This template ref is used by child components, refactor with caution if needed
			 */
			inputContainerRef: ref<Element | null>(null),
			/**
			 * HACK: This template ref is used by child components, refactor with caution if needed
			 */
			inputContainerWrapperRef: ref<HTMLDivElement | null>(null),
			labelSuffix: computed(() =>
				props.field.isOptional ? `(${translations.value.optionalLabel})` : '*',
			),
			labelSuffixClasses: computed(() => {
				return {
					'kt-field__header__label__suffix': true,
					'kt-field__header__label__suffix--error':
						showValidation.value &&
						!props.field.isOptional &&
						props.field.isEmpty,
				}
			}),
			onClickLabel: (event: MouseEvent) => {
				if (props.debounceLabelClick) {
					event.preventDefault()
					debouncedLabelClick(event)
				} else if (event.detail > 1) event.preventDefault()
			},
			showValidation,
			validationText: computed(() =>
				props.field.validation.type === 'empty'
					? null
					: props.field.validation.text,
			),
			validationTextIcon: computed(
				() =>
					({
						empty: null,
						error: Yoco.Icon.CIRCLE_CROSS,
						success: Yoco.Icon.CIRCLE_CHECK,
						warning: Yoco.Icon.CIRCLE_ATTENTION,
					})[validationType.value],
			),
			wrapperClasses: computed(() => {
				const classes = ['kt-field__wrapper']

				if (props.field.isDisabled) classes.push('kt-field__wrapper--disabled')
				// eslint-disable-next-line unicorn/explicit-length-check -- size is an enum, and thus a false positive
				if (props.field.size)
					classes.push(`kt-field__wrapper--is-${props.field.size}`)

				classes.push(
					`kt-field__wrapper--is-validation-${
						showValidation.value ? validationType.value : 'empty'
					}`,
				)

				return classes
			}),
			Yoco,
		}
	},
})
</script>

<!-- FIXME: https://github.com/3YOURMIND/kotti/issues/829 should this be implemented,
we would be able to extend on demand instead of unscoping all field classes -->
<style lang="scss">
@import './mixins';

:root {
	--field-border-radius: 2px;
}

/* stylelint-disable selector-class-pattern */
.kt-field {
	&:not(:last-child) {
		margin-bottom: 0.8rem;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		> :not(:last-child) {
			margin-bottom: 0.4rem;
		}

		@include no-outline;
		@include sizes;
		@include input-colors;

		@include validations using ($type) {
			&:not(.kt-field__wrapper--disabled) {
				@if $type != empty {
					.kt-field__input-container {
						border-color: var(--support-#{$type}-light);
					}

					.kt-field__validation-text {
						color: var(--support-#{$type});
					}
				}

				.kt-field__input-container:focus-within {
					--support-empty-light: var(--interactive-05);

					border-color: var(--support-#{$type}-light);
					box-shadow: 0 0 0 1px var(--support-#{$type}-light);
				}
			}
		}

		&--disabled {
			* {
				cursor: not-allowed;
			}

			.kt-field__input-container {
				border: 1px solid var(--ui-01);

				&__affix {
					color: var(--text-05);
				}

				&__icon {
					color: var(--text-05);
				}
			}
		}
	}

	fieldset {
		padding: 0;
		margin: 0;
		border: 0;
	}

	&__header {
		display: flex;
		font-size: 0.9em;

		> :not(:first-child) {
			margin-left: 0.2rem;
		}

		&--is-suffix {
			/*
			For suffix case, align the suffix with the first line of the toggle's label.
			to roughly calculate this, note that the fontsize of the suffix is 90% of the
			label's fontsize (0.9em). So we push it 10% down to make them even (enough)
			*/
			align-self: flex-start;
			transform: translateY(10%);
		}

		&__help-text {
			display: flex;
			align-items: center;

			&__icon {
				.yoco {
					font-size: 1.4em;
				}
			}
		}

		&__label {
			display: flex;
			align-items: center;
			color: var(--text-02);

			&__suffix {
				margin-left: 0.2rem;

				&--error {
					color: var(--support-error);
				}
			}

			&__text {
				font-weight: 500;
			}
		}
	}

	&__help-description {
		color: var(--text-03);
	}

	&__input-container-wrapper {
		display: flex;
		gap: var(--unit-2);
		align-items: stretch;
	}

	&__input-container-wrapper-loading {
		height: 40px !important;
		margin-bottom: 0 !important;
	}

	// placeholders for slots
	&__input-container__prefix,
	&__input-container__suffix {
		display: flex;
		align-items: center;
	}

	&__input-container {
		display: flex;
		flex: 1;
		align-items: center;
		padding: 0 0.8rem;
		border: 1px solid var(--ui-02);
		border-radius: var(--field-border-radius);

		// The actual input
		&__slot {
			flex: 1;
		}

		// Prefix and Suffix
		&__affix {
			color: var(--text-02);
			cursor: default;

			&--left {
				padding-right: 0.8rem;
				margin-right: 0.8rem;
				border-right: 1px solid var(--ui-02);
			}

			&--right {
				padding-left: 0.8rem;
				margin-left: 0.8rem;
				border-left: 1px solid var(--ui-02);
			}
		}

		&__icon {
			.yoco {
				font-size: 1.1em;
			}
		}
	}

	&__header__help-text,
	&__input-container {
		&__icon {
			color: var(--icon-02);

			.yoco {
				display: flex;
			}

			&--left,
			&--right {
				cursor: default;
			}

			&--left {
				transform: translateX(-0.2rem);
			}

			&--right {
				transform: translateX(0.2rem);
			}

			&--interactive {
				cursor: pointer;
			}
		}
	}

	&__validation-text {
		display: flex;
		align-items: center;
		color: var(--text-03);

		> i {
			margin-right: 0.1rem;
		}
	}
}
/* stylelint-enable selector-class-pattern */
</style>
