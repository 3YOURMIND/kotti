<template>
	<component :is="isGroup ? 'fieldset' : 'label'" :class="wrapperClasses">
		<div v-if="!field.isLoading" class="kt-field__header">
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

		<div
			v-else
			class="kt-field__loading skeleton rectangle"
			:style="{ height: '20px', maxWidth: '200px' }"
		/>

		<slot v-if="!field.isLoading" name="container">
			<div class="kt-field__input-container">
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
				<div
					v-if="showClear"
					:class="iconClasses(['clear'])"
					@click.stop="field.setValue(getEmptyValue())"
				>
					<i class="yoco" role="button" v-text="'close'" />
				</div>
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
		<div v-else class="skeleton rectangle" :style="{ height: '40px' }" />

		<div
			v-if="!field.isLoading && showValidation"
			:class="`kt-field__validation kt-field__validation--${validationType}`"
		>
			<i v-if="validationText" class="yoco">{{ validationIcon }}</i>
			{{ validationText }}
		</div>
	</component>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

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
		isGroup: { default: false, type: Boolean },
	},
	setup<DATA_TYPE>(props: {
		field: KottiField.Hook.Returns<DATA_TYPE>
		isGroup: boolean
		getEmptyValue: () => DATA_TYPE
	}) {
		const labelText = computed(() =>
			props.field.label === null
				? null
				: [
						props.field.label,
						props.field.isOptional ? '(Optional)' : '(Required)',
				  ].join(' '),
		)

		const affixClasses = computed(() => (modifications: string[]) => ({
			'kt-field__input-container__affix': true,
			...modifications.reduce(
				(acc: { [key: string]: boolean }, mod) => ({
					...acc,
					[`kt-field__input-container__affix--${mod}`]: true,
				}),
				{},
			),
		}))

		const iconClasses = computed(() => (modifications: string[]) => {
			return {
				'kt-field__input-container__icon': true,
				...modifications.reduce(
					(acc: { [key: string]: boolean }, mod) => ({
						...acc,
						[`kt-field__input-container__icon--${mod}`]: true,
					}),
					{},
				),
			}
		})

		const showClear = computed(
			() =>
				!props.field.hideClear &&
				props.field.currentValue !== props.getEmptyValue() &&
				!props.field.isDisabled,
		)

		const validationText = computed(
			() => props.field.validation.type !== null && props.field.validation.text,
		)

		const validationType = computed(() => props.field.validation.type)

		const showValidation = computed(
			() => props.field.validation.type !== null && !props.field.hideValidation,
		)

		const wrapperClasses = computed(() => {
			return {
				'kt-field-wrapper': true,
				'kt-field-wrapper--disabled': props.field.isDisabled,
				[`kt-field-wrapper--${validationType.value}`]: showValidation.value,
			}
		})

		const validationIcon = computed(() => {
			if (validationType.value === null) return ''

			return {
				error: 'circle_cross',
				success: 'circle_check',
				warning: 'circle_attention',
			}[validationType.value]
		})

		return {
			affixClasses,
			iconClasses,
			labelText,
			showClear,
			showValidation,
			validationIcon,
			validationText,
			validationType,
			wrapperClasses,
		}
	},
})
</script>

<style lang="scss">
:root {
	--field-border-radius: 2px;
}

.kt-field-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 0.8rem;

	> :not(:last-child) {
		margin-bottom: 0.4rem;
	}

	&:focus-within {
		&:not(.kt-field-wrapper--error):not(.kt-field-wrapper--success):not(.kt-field-wrapper--warning) {
			.kt-field__input-container {
				box-shadow: 0 0 0 2px var(--interactive-05);
			}
		}
		&.kt-field-wrapper--error {
			.kt-field__input-container {
				box-shadow: 0 0 0 2px var(--support-error-light);
			}
		}
		&.kt-field-wrapper--success {
			.kt-field__input-container {
				box-shadow: 0 0 0 2px var(--support-success-light);
			}
		}
		&.kt-field-wrapper--warning {
			.kt-field__input-container {
				box-shadow: 0 0 0 2px var(--support-warning-light);
			}
		}
	}
	// states

	&--error {
		.kt-field__input-container {
			box-shadow: 0 0 0 1px var(--support-error-light);
		}

		.kt-field__validation--error {
			color: var(--support-error);
		}
	}

	&--success {
		.kt-field__input-container {
			box-shadow: 0 0 0 1px var(--support-success-light);
		}

		.kt-field__validation--success {
			color: var(--support-success);
		}
	}

	&--warning {
		.kt-field__input-container {
			box-shadow: 0 0 0 1px var(--support-warning-light);
		}

		.kt-field__validation--warning {
			color: var(--support-warning);
		}
	}

	&--disabled {
		cursor: not-allowed;

		.kt-field__input-container {
			border: 2px solid var(--ui-01);

			&__affix {
				color: var(--text-05);
			}

			&__slot {
				input {
					// to overwrite native disabled bg for inputs
					background-color: transparent;
					cursor: not-allowed;

					&::-webkit-input-placeholder, /* Edge */
					&:-ms-input-placeholder, /* Internet Explorer */
					&::placeholder {
						color: var(--text-05);
					}
				}
			}

			&__icon {
				// no icon--disabled token
				color: var(--text-05);
			}
		}
	}
}

.kt-field {
	&__header {
		font-size: 0.9em;

		> :not(:first-child) {
			margin-top: 0.2rem;
		}
	}

	&__label {
		font-weight: 500;
		color: var(--text-02);
	}

	&__help-text {
		color: var(--text-03);
	}

	&__input-container {
		display: flex;
		align-items: center;
		height: 2rem;
		padding: 0 0.8rem;
		border: 1px solid var(--ui-02);
		border-radius: var(--field-border-radius);

		// The actual input
		&__slot {
			flex-grow: 1;

			input {
				&::-webkit-input-placeholder, /* Edge */
				&:-ms-input-placeholder, /* Internet Explorer */
				&::placeholder {
					color: var(--text-03);
				}
			}
		}

		// Prefix and suffix
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

		// Icon before and after
		&__icon {
			font-size: 1rem;
			line-height: 1;
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

			&--clear {
				&:hover {
					cursor: pointer;
				}
			}
		}
	}

	&__validation {
		display: flex;
		align-items: center;
		> i {
			margin-right: 0.1rem;
		}
	}
}

.kt-field-label {
	position: relative;
	display: flex;
	align-items: center;
	color: var(--text-02);

	> :not(:first-child) {
		margin-left: 0.2em;
	}
}
</style>
