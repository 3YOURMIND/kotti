<template>
	<label class="kt-field-wrapper">
		<div v-if="!field.isLoading" class="ktfield-label">
			<div v-if="labelText !== null" v-text="labelText" />
			<!-- TODO: implement the final design for the tooltip for helptext -->
			<div v-if="field.helpText" class="ktfield-label__help-text">
				<div :class="formFieldLabelHelpIconClasses">
					<i class="yoco">circle_question</i>
				</div>
				<div
					class="ktfield-label__help-text__tooltip"
					v-text="field.helpText"
				/>
			</div>
		</div>

		<div
			v-else
			class="skeleton rectangle"
			:style="{ height: '20px', maxWidth: '200px' }"
		/>

		<div v-if="!field.isLoading" :class="formFieldGroupClasses">
			<div
				v-if="field.prefix"
				class="ktfield-form-group__affix ktfield-form-group__affix--left"
				v-text="field.prefix"
			/>
			<div
				v-if="field.leftIcon"
				:class="formFieldGroupIconClasses('left', ['left'])"
			>
				<i class="yoco" v-text="field.leftIcon" />
			</div>
			<div class="ktfield-form-group__slot">
				<slot name="default" />
			</div>
			<div
				v-if="!field.hideClear"
				:class="
					formFieldGroupIconClasses('right', ['right', 'interactive', 'danger'])
				"
				@click="field.setValue(getEmptyValue())"
			>
				<i class="yoco" role="button" v-text="'close'" />
			</div>
			<div
				v-if="field.rightIcon"
				:class="formFieldGroupIconClasses('right', ['right'])"
			>
				<i class="yoco" v-text="field.rightIcon" />
			</div>
			<div
				v-if="field.suffix"
				class="ktfield-form-group__affix ktfield-form-group__affix--right"
				v-text="field.suffix"
			/>
		</div>
		<div v-else class="skeleton rectangle" :style="{ height: '40px' }" />

		<div
			v-if="!field.isLoading && showValidation"
			:class="`ktfield-validation--${validationType}`"
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

		const formFieldGroupClasses = computed(() => {
			const classes = ['ktfield-form-group']

			if (showValidation.value)
				classes.push(`ktfield-form-group--${validationType.value}`)

			return classes
		})

		const formFieldLabelHelpIconClasses = [
			'ktfield-label__help-text__icon',
			'ktfield-label__help-text__icon--interactive',
			'ktfield-label__help-text__icon--primary',
		]

		const formFieldGroupIconClasses = computed(
			() => (placement: 'left' | 'right', modifications: string[] = []) => {
				const classes = ['ktfield-form-group__icon']

				// forEach -> push is usually a sign of a missing .map()
				modifications.forEach((mod) =>
					classes.push(`ktfield-form-group__icon--${mod}`),
				)
				/*
					if an icon is interactive (ex: clear field icon)
					it shouldn't be styled with validation,
					it's only styled with hover or click interactions
					by default, it's styled with primary colors upon hover/activate
				*/
				if (!modifications.includes('interactive') && showValidation.value) {
					classes.push(`ktfield-form-group__icon--${validationType.value}`)
				}

				return classes
			},
		)

		const validationIcon = computed(() => {
			if (validationType.value === null) return ''

			return {
				error: 'circle_cross',
				success: 'circle_check',
				warning: 'circle_attention',
			}[validationType.value]
		})

		return {
			formFieldGroupClasses,
			formFieldGroupIconClasses,
			formFieldLabelHelpIconClasses,
			labelText,
			showValidation,
			validationIcon,
			validationType,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.ktfield-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	// same as `:not(:first-child)`
	> * + * {
		margin-top: 0.5em;
	}

	.ktfield-label {
		display: flex;
		align-items: center;
		color: var(--text-02);
		position: relative;

		> * + * {
			margin-left: 0.2em;
		}

		&__help-text {
			display: flex;
			align-items: center;

			&__tooltip {
				display: none;
				background-color: var(--ui-01);
				border: 1px solid var(--ui-02);
				border-radius: 3px;
				bottom: 20px;
				color: var(--support-info);
				cursor: none;
				padding: 0.25em;
				position: absolute;
				transform: translateX(calc(-50% + 5px));
			}

			&__icon {
				cursor: help;
				font-size: 1.25em;
				color: var(--icon-02);

				&--interactive.ktfield-label__help-text__icon--primary {
					&:hover {
						color: var(--interactive-01-hover);
					}
				}
			}

			&:hover {
				.ktfield-label__help-text__tooltip {
					display: block;
				}
			}
		}
	}

	.ktfield-form-group {
		display: flex;
		align-items: center;
		border-radius: $border-radius;
		min-height: 1.4em;
		overflow: hidden;

		border: $border-width solid var(--ui-03);

		&:not(.ktfield-form-group--error):not(.ktfield-form-group--success):not(.ktfield-form-group--warning) {
			&:active {
				border-color: var(--interactive-04);
				> .ktfield-form-group__icon:not(.ktfield-form-group__icon--interactive) {
					color: var(--interactive-04);
				}
			}
			&:focus-within {
				box-shadow: 0 0 0 0.1em var(--interactive-04);
			}
		}

		&--error {
			border-color: var(--support-error);
			&:active {
				border-color: var(--support-error-light);
				> .ktfield-form-group__icon--error {
					color: var(--support-error-light);
				}
			}
			&:focus-within {
				box-shadow: 0 0 0 0.1em var(--support-error-light);
			}
		}

		&--success {
			border-color: var(--support-success);
			&:active {
				border-color: var(--support-success-light);
				> .ktfield-form-group__icon--success {
					color: var(--support-success-light);
				}
			}
			&:focus-within {
				box-shadow: 0 0 0 0.1em var(--support-success-light);
			}
		}

		&--warning {
			border-color: var(--support-warning);
			&:active {
				border-color: var(--support-warning-light);
				> .ktfield-form-group__icon--warning {
					color: var(--support-warning-light);
				}
			}
			&:focus-within {
				box-shadow: 0 0 0 0.1em var(--support-warning-light);
			}
		}

		&__icon {
			display: flex;
			align-items: center;
			align-self: stretch;
			background: transparent;
			color: var(--icon-01);
			font-size: 1.25em;
			justify-content: center;

			&--error {
				color: var(--support-error);
			}

			&--success {
				color: var(--support-success);
			}

			&--warning {
				color: var(--support-warning);
			}

			&--interactive {
				color: var(--icon-02);
				cursor: pointer;
			}

			&--interactive.ktfield-form-group__icon--danger {
				&:hover {
					color: var(--hover-danger);
				}
				&:active {
					color: var(--danger);
				}
			}
		}

		&__affix {
			display: flex;
			align-items: center;
			align-self: stretch;
			background-color: var(--ui-01);
			border: 0;
			color: var(--text-01);
			justify-content: center;
			white-space: nowrap;
		}

		&__affix,
		&__icon {
			padding: 0.4em 0.2em;

			/* any left affix/icon that is not followed by a left icon, needs to be extra padded from right */
			&--left > *:not(.ktfield-form-group__icon--left) {
				padding-right: 0.4em;
			}

			/* any right icon/affix that has an icon--right/suffix to its right, should be extra padded from left */
			// https://stackoverflow.com/questions/2717480/css-selector-for-first-element-with-class/8539107
			&--right {
				// pad all right icons and the suffix
				padding-left: 0.4em;
			}

			&--right ~ .ktfield-form-group__affix--right,
			&--right ~ .ktfield-form-group__icon--right {
				// restore normal padding to any --right encountered after the first --right class
				padding-left: 0.2em;
			}
		}

		/* field part of the field-group, other styles go to the component itself */
		&__slot {
			flex: 1;
			padding: 0.4em 0.2em;
			&:first-child {
				padding-left: 0.4em;
			}
			&:last-child {
				padding-right: 0.4em;
			}
		}
	}

	.ktfield-validation {
		&--error,
		&--success,
		&--warning {
			display: flex;
			align-items: center;
			line-height: 1.6;
		}

		&--error {
			color: var(--support-error);
		}

		&--success {
			color: var(--support-success);
		}

		&--warning {
			color: var(--support-warning);
		}
	}
}
</style>
