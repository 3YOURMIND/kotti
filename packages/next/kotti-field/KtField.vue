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
					v-if="labelText !== null"
					class="kt-field__label"
					v-text="labelText"
				/>
				<div
					v-if="field.helpText"
					class="kt-field__help-text"
					v-text="field.helpText"
				/>
			</div>

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
						:showClear="showClear"
					>
						<div
							v-if="showClear"
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
			<div class="kt-field__header--loading skeleton rectangle" />
			<div class="kt-field__input-container--loading skeleton rectangle" />
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
			labelText: computed(() =>
				props.field.label === null
					? null
					: [
							props.field.label,
							props.field.isOptional ? '(Optional)' : '(Required)',
					  ].join(' '),
			),
			showClear: computed(
				() =>
					!(
						props.field.hideClear ||
						props.field.isEmpty ||
						props.field.isDisabled
					),
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

	&__wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		// overwrite native outline behavior
		* {
			outline: none;
			&:focus,
			&::-moz-focus-inner {
				outline: none;
			}
		}

		> :not(:last-child) {
			margin-bottom: 0.4rem;
		}

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
		font-size: 0.9em;

		> :not(:first-child) {
			margin-top: 0.2rem;
		}

		&--loading {
			max-width: 200px;
			height: 20px !important;
		}
	}

	&__label {
		display: flex;
		align-items: center;
		font-weight: 500;
		color: var(--text-02);
	}

	&__help-text {
		color: var(--text-03);
	}

	&__input-container {
		display: flex;
		align-items: center;
		padding: 0 0.8rem;

		border: 1px solid var(--ui-02);
		border-radius: var(--field-border-radius);

		&--loading {
			height: 40px !important;
		}

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
