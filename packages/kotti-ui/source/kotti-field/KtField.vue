<template>
	<div class="kt-field">
		<component
			:is="isGroup ? 'fieldset' : isComponent ? isComponent : 'label'"
			v-show="!field.isLoading"
			:class="wrapperClasses"
			@click="$emit('click', $event)"
			@mousedown="$emit('mousedown', $event)"
		>
			<div v-if="hasLabel || hasHelpText" class="kt-field__header">
				<component
					:is="isGroup ? 'legend' : 'div'"
					v-if="hasLabel"
					class="kt-field__header__label"
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
			<slot name="container">
				<div ref="inputContainerRef" class="kt-field__input-container">
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
				v-if="!field.isLoading && showValidation && validationText !== null"
				class="kt-field__validation-text"
			>
				<i class="yoco" v-text="validationTextIcon" />
				{{ validationText }}
			</div>
		</component>
		<div v-if="field.isLoading" class="kt-field__wrapper">
			<div
				v-if="hasLabel || hasHelpText"
				class="kt-field__loading__header skeleton rectangle"
			/>
			<div class="kt-field__loading__input-container skeleton rectangle" />
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, computed, ref } from '@vue/composition-api'
import { VNode } from 'vue'

import { useTranslationNamespace } from '../kotti-i18n/hooks'

import FieldHelpText from './components/FieldHelpText.vue'
import { KottiField } from './types'

export default defineComponent<{
	field: KottiField.Hook.Returns<unknown>
	helpTextSlot: VNode[]
	isComponent: string | null
	isGroup: boolean
	getEmptyValue: () => unknown
}>({
	name: 'KtField',
	components: { FieldHelpText },
	props: {
		field: { required: true, type: Object },
		/**
		 * What’s the appropriate value for an empty field of this data type?
		 * Used when clearing the field. Most likely either null or []
		 */
		getEmptyValue: { default: null, type: Function },
		helpTextSlot: { default: () => [], type: Array },
		isComponent: { default: null, type: String },
		isGroup: { default: false, type: Boolean },
	},
	setup(props) {
		const validationType = computed(() => props.field.validation.type)
		const showValidation = computed(
			() => !(props.field.hideValidation || validationType.value === 'empty'),
		)

		const translations = useTranslationNamespace('KtFields')

		return {
			affixClasses: computed(() => (modifications: string[]) => [
				'kt-field__input-container__affix',
				...modifications.map(
					(modification) => `kt-field__input-container__affix--${modification}`,
				),
			]),
			handleClear: () => {
				/**
				 * useSupports hook returns null if hideClear is not supported on ktField component
				 */
				if (props.field.hideClear === null)
					throw new Error(
						'KtField: hideClear is unsupported and yet handleClear was called',
					)

				props.field.setValue(props.getEmptyValue())
			},
			hasHelpText: computed(
				() => props.helpTextSlot.length >= 1 || props.field.helpText !== null,
			),
			hasLabel: computed(() => props.field.label !== null),
			iconClasses: computed(
				() => (element: string, modifications: string[]) =>
					[
						`kt-field__${element}__icon`,
						...modifications.map(
							(modification) => `kt-field__${element}__icon--${modification}`,
						),
					],
			),
			inputContainerRef: ref<Element | null>(null),
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
					}[validationType.value]),
			),
			wrapperClasses: computed(() => {
				const classes = ['kt-field__wrapper']

				if (props.field.isDisabled) classes.push('kt-field__wrapper--disabled')
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

<style lang="scss">
@import './mixins';

:root {
	--field-border-radius: 2px;
}

.kt-field {
	&:not(:last-child) {
		margin-bottom: 0.8rem;
	}

	&__loading {
		&__header {
			max-width: 200px;
			height: 20px !important;
		}

		&__input-container {
			height: 40px !important;
		}
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
		@include input-colors();

		@include validations using ($type) {
			/* stylelint-disable */
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

					box-shadow: 0 0 0 1px var(--support-#{$type}-light);
					border-color: var(--support-#{$type}-light);
				}
			}
			/* stylelint-enable */
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

	&__input-container {
		display: flex;
		align-items: center;
		padding: 0 0.8rem;

		border: 1px solid var(--ui-02);
		border-radius: var(--field-border-radius);

		// The actual input
		&__slot {
			flex-grow: 1;
		}

		// Prefix and Suffix
		&__affix {
			color: var(--text-02);

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
</style>
