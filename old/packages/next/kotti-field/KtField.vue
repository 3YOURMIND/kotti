<template>
	<div class="kt-field">
		<component
			:is="isGroup ? 'fieldset' : isComponent ? isComponent : 'label'"
			v-show="!field.isLoading"
			:class="wrapperClasses"
			@click="emit('click', $event)"
			@mousedown="emit('mousedown', $event)"
		>
			<div class="kt-field__header">
				<component
					:is="isGroup ? 'legend' : 'div'"
					v-if="field.label !== null"
					class="kt-field__header__label"
				>
					<span class="kt-field__header__label__text" v-text="field.label" />
					<span class="kt-field__header__label__suffix" v-text="labelSuffix" />
				</component>
				<div
					v-if="field.helpText"
					class="kt-field__header__help-text"
					:class="iconClasses(['interactive'])"
				>
					<div class="kt-field__header__help-text__icon">
						<i class="yoco" v-text="'circle_question'" />
					</div>
					<div
						class="kt-field__header__help-text__tooltip"
						v-text="field.helpText"
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
					<div v-if="field.leftIcon" :class="iconClasses(['left'])">
						<i class="yoco" v-text="field.leftIcon" />
					</div>
					<div class="kt-field__input-container__slot">
						<slot name="default" />
					</div>
					<slot
						:classes="iconClasses(['interactive'])"
						:handleClear="handleClear"
						name="actionIcon"
						:showClear="!field.hideClear"
					>
						<div
							v-if="!field.hideClear"
							:class="iconClasses(['interactive'])"
							role="button"
							@click.stop="handleClear"
						>
							<i class="yoco" v-text="'close'" />
						</div>
					</slot>
					<div v-if="field.rightIcon" :class="iconClasses(['right'])">
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
				v-text="validationText"
			/>
		</component>

		<div v-if="field.isLoading" class="kt-field__wrapper">
			<div class="kt-field__loading__header skeleton rectangle" />
			<div class="kt-field__loading__input-container skeleton rectangle" />
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	ref,
	SetupContext,
} from '@vue/composition-api'

import { useTranslationNamespace } from '../kotti-translation/hooks'

import { KottiField } from './types'

export default defineComponent({
	name: 'KtField',
	props: {
		field: { required: true, type: Object },
		/**
		 * What’s the appropriate value for an empty field of this data type?
		 * Used when clearing the field. Most likely either null or []
		 */
		getEmptyValue: { required: true, type: Function },
		isComponent: { default: null, type: String },
		isGroup: { default: false, type: Boolean },
	},
	setup<DATA_TYPE>(
		props: {
			field: KottiField.Hook.Returns<DATA_TYPE>
			isComponent: string | null
			isGroup: boolean
			getEmptyValue: () => DATA_TYPE
		},
		{ emit }: SetupContext,
	) {
		const validationType = computed(() => props.field.validation.type)
		const showValidation = computed(
			() => !(props.field.hideValidation || validationType.value === null),
		)

		const translations = useTranslationNamespace('KtFields')

		return {
			affixClasses: computed(() => (modifications: string[]) => [
				'kt-field__input-container__affix',
				...modifications.map(
					(modification) => `kt-field__input-container__affix--${modification}`,
				),
			]),
			emit,
			handleClear: () => props.field.setValue(props.getEmptyValue()),
			iconClasses: computed(() => (modifications: string[]) => [
				'kt-field__input-container__icon',
				...modifications.map(
					(modification) => `kt-field__input-container__icon--${modification}`,
				),
			]),
			inputContainerRef: ref(null),
			labelSuffix: computed(
				() =>
					`(${
						props.field.isOptional
							? translations.value.optionalLabel
							: translations.value.requiredLabel
					})`,
			),
			showValidation,
			validationText: computed(() =>
				props.field.validation.type === null
					? null
					: props.field.validation.text,
			),
			validationType,
			wrapperClasses: computed(() => {
				const classes = ['kt-field__wrapper']

				if (props.field.isDisabled) classes.push('kt-field__wrapper--disabled')
				if (props.field.size)
					classes.push(`kt-field__wrapper--is-${props.field.size}`)

				classes.push(
					showValidation.value
						? `kt-field__wrapper--${validationType.value ?? 'no-validation'}`
						: `kt-field__wrapper--no-validation`,
				)

				return classes
			}),
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

		@include no-outline-or-border;
		@include sizes;
		@include input-colors();

		@include validations using ($type) {
			/* stylelint-disable */
			&:not(.kt-field__wrapper--disabled) {
				@if $type != no-validation {
					.kt-field__input-container {
						border-color: var(--support-#{$type}-light);
					}

					.kt-field__validation-text {
						color: var(--support-#{$type});
					}
				}

				&:focus-within {
					--support-no-validation-light: var(--interactive-05);

					.kt-field__input-container {
						box-shadow: 0 0 0 1px var(--support-#{$type}-light);
						border-color: var(--support-#{$type}-light);
					}
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

		&__help-text {
			position: relative;
			display: flex;
			align-items: center;

			&__tooltip {
				position: absolute;
				bottom: 20px;
				display: none;
				padding: 0.25em;
				color: var(--support-info);
				cursor: none;
				background-color: var(--ui-01);
				border: 1px solid var(--ui-02);
				border-radius: var(--field-border-radius);
				transform: translateX(calc(-50% + 5px));
			}

			&:hover {
				.kt-field__header__help-text__tooltip {
					display: block;
				}
			}
		}

		&__label {
			display: flex;
			align-items: center;
			color: var(--text-02);

			&__suffix {
				margin-left: 0.2rem;
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

		// Icons (left or right)
		&__icon {
			color: var(--icon-02);

			.yoco {
				display: flex;
				font-size: 1.1em;
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
