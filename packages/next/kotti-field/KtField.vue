<template>
	<label class="kt-field-wrapper" :class="wrapperClass">
		<div v-if="!field.isLoading" class="kt-field__header">
			<div
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
					class="kt-field__input-container__affix kt-field__input-container__affix--left"
					v-text="field.prefix"
				/>
				<div
					v-if="field.leftIcon"
					class="kt-field__input-container__icon kt-field__input-container__icon--left"
				>
					<i class="yoco" v-text="field.leftIcon" />
				</div>
				<div class="kt-field__input-container__slot">
					<slot name="default" />
				</div>
				<div
					v-if="!field.hideClear"
					class="kt-field__input-container__icon kt-field__input-container__icon--clear"
					@click="field.setValue(getEmptyValue())"
				>
					<i class="yoco" role="button" v-text="'close'" />
				</div>
				<div
					v-if="field.rightIcon"
					class="kt-field__input-container__icon kt-field__input-container__icon--right"
				>
					<i class="yoco" v-text="field.rightIcon" />
				</div>
				<div
					v-if="field.suffix"
					class="kt-field__input-container__affix kt-field__input-container__affix--right"
					v-text="field.suffix"
				/>
			</div>
		</slot>
		<div v-else class="skeleton rectangle" :style="{ height: '40px' }" />

		<div
			v-if="!field.isLoading && showValidation"
			:class="`kt-field-validation--${validationType}`"
		>
			<i class="yoco">{{ validationIcon }}</i>
			{{ field.validation.text }}
		</div>
	</label>
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
	},
	setup<DATA_TYPE>(props: {
		field: KottiField.Hook.Returns<DATA_TYPE>
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

		const validationType = computed(() => props.field.validation.type)

		const showValidation = computed(
			() => validationType.value !== null && !props.field.hideValidation,
		)

		const wrapperClass = computed(() => {
			if (showValidation.value) return `kt-field--${validationType.value}`
			return null
		})

		const formFieldLabelHelpIconClasses = [
			'kt-field-label__help-text__icon',
			'kt-field-label__help-text__icon--interactive',
			'kt-field-label__help-text__icon--primary',
		]

		const validationIcon = computed(() => {
			if (validationType.value === null) return ''

			return {
				error: 'circle_cross',
				success: 'circle_check',
				warning: 'circle_attention',
			}[validationType.value]
		})

		return {
			formFieldLabelHelpIconClasses,
			labelText,
			showValidation,
			validationIcon,
			validationType,
			wrapperClass,
		}
	},
})
</script>

<style lang="scss">
@import '../../kotti-style/_variables.scss';

:root {
	// TODO: Clarify why this is not global
	--field-border-radius: 2px;
}

.kt-field-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	// TODO: Discuss: Spacing & Sizing should be handled by the parent
	/* margin-bottom: 0.8rem; */

	> :not(:first-child) {
		margin-top: 0.4rem;
	}
}

.kt-field {
	&__header {
		// FIXME: maybe this should be rem-based
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
			color: var(--text-01);
		}
	}

	// Prefix and suffix
	&__input-container__affix {
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
	&__input-container__icon {
		font-size: 1rem;
		line-height: 1;
		color: var(--icon-02);

		.yoco {
			display: flex;

			// TODO: Why was this inline-block?
			/* display: inline-block; */
		}

		&--left .yoco {
			display: flex;
			// TODO: Why was this inline-block?
			/* display: inline-block; */

			transform: translateX(-0.2rem);
		}

		&--right .yoco {
			transform: translateX(0.2rem);
		}

		&--clear {
			cursor: pointer;
		}
	}

	// states

	&--error {
		.kt-field__input-container {
			box-shadow: 0 0 0 2px var(--support-error-light);
		}
	}

	&--success {
		.kt-field__input-container {
			box-shadow: 0 0 0 2px var(--support-success-light);
		}
	}

	&--warning {
		.kt-field__input-container {
			box-shadow: 0 0 0 2px var(--support-warning-light);
		}
	}

	&--focus {
		.kt-field__input-container {
			box-shadow: 0 0 0 2px var(--interactive-05);
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

// .kt-field__input-container {
// 	display: flex;
// 	align-items: center;
// 	min-height: 1.4em;
// 	overflow: hidden;

// 	border: $border-width solid var(--ui-03);
// 	border-radius: $border-radius;

// 	&:not(.kt-field__input-container--error):not(.kt-field__input-container--success):not(.kt-field__input-container--warning) {
// 		&:active {
// 			border-color: var(--interactive-04);
// 			> .kt-field__input-container__icon:not(.kt-field__input-container__icon--interactive) {
// 				color: var(--interactive-04);
// 			}
// 		}

// 		&:focus-within {
// 			box-shadow: 0 0 0 0.1em var(--interactive-04);
// 		}
// 	}

// 	&--error {
// 		border-color: var(--support-error);

// 		&:active {
// 			border-color: var(--support-error-light);
// 			> .kt-field__input-container__icon--error {
// 				color: var(--support-error-light);
// 			}
// 		}

// 		&:focus-within {
// 			box-shadow: 0 0 0 0.1em var(--support-error-light);
// 		}
// 	}

// 	&--success {
// 		border-color: var(--support-success);

// 		&:active {
// 			border-color: var(--support-success-light);

// 			> .kt-field__input-container__icon--success {
// 				color: var(--support-success-light);
// 			}
// 		}

// 		&:focus-within {
// 			box-shadow: 0 0 0 0.1em var(--support-success-light);
// 		}
// 	}

// 	&--warning {
// 		border-color: var(--support-warning);

// 		&:active {
// 			border-color: var(--support-warning-light);

// 			> .kt-field__input-container__icon--warning {
// 				color: var(--support-warning-light);
// 			}
// 		}

// 		&:focus-within {
// 			box-shadow: 0 0 0 0.1em var(--support-warning-light);
// 		}
// 	}

// 	&__icon {
// 		display: flex;
// 		align-items: center;
// 		align-self: stretch;
// 		justify-content: center;
// 		font-size: 1.25em;
// 		color: var(--icon-01);
// 		background: transparent;

// 		&--error {
// 			color: var(--support-error);
// 		}

// 		&--success {
// 			color: var(--support-success);
// 		}

// 		&--warning {
// 			color: var(--support-warning);
// 		}

// 		&--interactive {
// 			color: var(--icon-02);
// 			cursor: pointer;
// 		}

// 		&--interactive.kt-field__input-container__icon--danger {
// 			&:hover {
// 				color: var(--hover-danger);
// 			}

// 			&:active {
// 				color: var(--danger);
// 			}
// 		}
// 	}

// 	&__affix {
// 		display: flex;
// 		align-items: center;
// 		align-self: stretch;
// 		justify-content: center;
// 		color: var(--text-01);
// 		white-space: nowrap;
// 		background-color: var(--ui-01);
// 		border: 0;
// 	}

// 	&__affix,
// 	&__icon {
// 		padding: 0.4em 0.2em;

// 		/* any left affix/icon that is not followed by a left icon, needs to be extra padded from right */
// 		&--left > *:not(.kt-field__input-container__icon--left) {
// 			padding-right: 0.4em;
// 		}

// 		/* any right icon/affix that has an icon--right/suffix to its right, should be extra padded from left */
// 		// https://stackoverflow.com/questions/2717480/css-selector-for-first-element-with-class/8539107
// 		&--right {
// 			// pad all right icons and the suffix
// 			padding-left: 0.4em;
// 		}

// 		&--right ~ .kt-field__input-container__affix--right,
// 		&--right ~ .kt-field__input-container__icon--right {
// 			// restore normal padding to any --right encountered after the first --right class
// 			padding-left: 0.2em;
// 		}
// 	}

// 	/* field part of the field-group, other styles go to the component itself */
// 	&__slot {
// 		flex: 1;
// 		padding: 0.4em 0.2em;

// 		&:first-child {
// 			padding-left: 0.4em;
// 		}

// 		&:last-child {
// 			padding-right: 0.4em;
// 		}
// 	}
// }

// .kt-field-validation {
// 	&--error,
// 	&--success,
// 	&--warning {
// 		display: flex;
// 		align-items: center;
// 		line-height: 1.6;
// 	}

// 	&--error {
// 		color: var(--support-error);
// 	}

// 	&--success {
// 		color: var(--support-success);
// 	}

// 	&--warning {
// 		color: var(--support-warning);
// 	}
// }
</style>
