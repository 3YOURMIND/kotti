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
	--field-border-radius: 2px;
}

.kt-field-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 0.8rem;

	:last-child {
		margin-bottom: 0;
	}

	&:focus-within {
		.kt-field__input-container {
			box-shadow: 0 0 0 2px var(--interactive-05);
		}
	}
}

.kt-field {
	&__header {
		margin-bottom: 0.4rem;
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
		}

		&--left .yoco {
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
